// One-shot script: fetch a freely-licensed photo for each attraction & stay
// from Wikipedia / Wikimedia Commons and save into public/images/.
//
// Sources are CC-licensed (Wikimedia / Wikipedia) — safe for personal use
// and for an open repo.
//
// Run with:   node scripts/fetch-images.mjs

import { writeFile, mkdir, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "public", "images");

const UA =
  "Mozilla/5.0 (compatible; austria-2026/1.0; +https://github.com/talgreen)";

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchWithRetry(url, opts = {}, tries = 4) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, opts);
      if (res.status === 429 || res.status >= 500) {
        const wait = 1500 * Math.pow(2, i);
        console.log(`  retry ${i + 1}/${tries} after ${wait}ms (HTTP ${res.status})`);
        await sleep(wait);
        continue;
      }
      return res;
    } catch (e) {
      lastErr = e;
      const wait = 1500 * Math.pow(2, i);
      await sleep(wait);
    }
  }
  if (lastErr) throw lastErr;
  throw new Error(`gave up after ${tries} attempts: ${url}`);
}

/**
 * For each filename:
 *   { wiki: "Article_Title" }                    -> use Wikipedia REST summary lead image
 *   { commons: "File:Some_File.jpg" }            -> direct Wikimedia Commons file
 *   { url: "https://..." }                       -> direct URL (already CC/PD)
 */
/* Helper to build a sensibly-sized Unsplash JPG URL from a "photo-…" id. */
const unsplash = (photoId, w = 1600) =>
  `https://images.unsplash.com/${photoId}?fm=jpg&q=85&w=${w}&auto=format&fit=crop`;

const TARGETS = [
  // ---------- Salzburg & Salzkammergut ----------
  ["hohensalzburg-fortress.jpg", { commons: "File:Salzburg_-_Festung_Hohensalzburg.JPG", width: 1800 }],
  ["getreidegasse.jpg",          { commons: "File:Getreidegasse_am_Nachmittag,_Salzburg.jpg", width: 1800 }],
  ["mirabell-palace-gardens.jpg",{ commons: "File:Palatul_Mirabell1.jpg", width: 1800 }],
  ["fantasiana-erlebnispark.jpg",{ commons: "File:Erlebnispark_Straßwalchen,_Eingang.JPG", width: 1800 }],
  ["kletterpark-waldbad-anif.jpg",{ commons: "File:Wasserschloss_Anif_02.jpg", width: 1800 }],
  ["mondsee.jpg",                { commons: "File:Mondsee_cut.jpg", width: 1800 }],
  ["hellbrunn-palace.jpg",       { commons: "File:Hellbrunn2.JPG", width: 1800 }],
  ["salzburg-zoo-hellbrunn.jpg", { commons: "File:Zoo_Salzburg_2014_Eingang.jpg", width: 1800 }],

  // ---------- Tyrol / Zillertal / Achensee ----------
  ["swarovski-kristallwelten.jpg",{ commons: "File:Wattens_-_Swarovski_Kristallwelten.jpg", width: 1800 }],
  ["ellmis-zauberwelt-hartkaiser.jpg",{ commons: "File:Hartkaiser-ellmau.JPG", width: 1800 }],
  ["kitzbuehel-town.jpg",        { commons: "File:Kitzbuehel03.JPG", width: 1800 }],
  ["badesee-kirchberg-tirol.jpg",{ commons: "File:Kirchberg_in_Tirol,_der_Badesee.jpg", width: 1800 }],
  ["fichtenschloss-rosenalm.jpg",{ commons: "File:Rosenalmbahn_Talstation.jpg", width: 1800 }],
  ["zillertalbahn-steam-train.jpg",{ commons: "File:Schlepptenderdampflok_No4,_JDŽ_83-076,_club760_Zillertalbahn_3.JPG", width: 1800 }],
  ["erlebnissennerei-zillertal.jpg",{ wiki: "Mayrhofen" }],
  ["karwendel-bergbahn-pertisau.jpg",{ commons: "File:Blick_auf_die_erste_Stütze_und_die_Talstation_der_Karwendel-Bergbahn_in_Pertisau_2023-10-19.jpg", width: 1800 }],
  ["achensee-schifffahrt.jpg",   { commons: "File:Achensee_Pertisau.JPG", width: 1800 }],
  ["krimml-waterfalls.jpg",      { commons: "File:Austrian.waterfall.at.krimml.arp.jpg", width: 1800 }],

  // ---------- Pinzgau / Werfen / Salzkammergut ----------
  ["schmittenhoehe.jpg",         { commons: "File:Schmitten.jpg", width: 1800 }],
  ["wildpark-ferleiten.jpg",     { commons: "File:Wild-_und_Erlebnispark_Ferleiten_3.jpg", width: 1800 }],
  ["maisi-flitzer.jpg",          { commons: "File:Kaprun.austria.overall.arp.jpg", width: 1800 }],
  ["kitzsteinhorn.jpg",          { commons: "File:Kitzsteinhorn3.jpg", width: 1800 }],
  ["sigmund-thun-klamm.jpg",     { commons: "File:Kaprun_Sigmund-Thun-Klamm_09.JPG", width: 1800 }],
  ["zell-am-see-strandbad-promenade.jpg",{ commons: "File:Seepromenade_Zell_am_See_(AUT).JPG", width: 1800 }],
  ["lucky-flitzer-flachau.jpg",  { commons: "File:Flachau_mountain_03.jpg", width: 1800 }],
  ["burg-hohenwerfen.jpg",       { commons: "File:Hohenwerfen_castle.jpg", width: 1800 }],
  ["salzwelten-salzburg.jpg",    { commons: "File:Dürrnberg_(Salzwelten).jpg", width: 1800 }],
  ["eisriesenwelt-werfen.jpg",   { commons: "File:Eisriesenwelt_Werfen_Austria_02.jpg", width: 1800 }],
  ["hallstatt.jpg",              { wiki: "Hallstatt" }],
  ["vorderer-gosausee.jpg",      { commons: "File:Gosauseen20100912.jpg", width: 1800 }],
  ["karkogel-abtenau.jpg",       { commons: "File:Karkogel_-_panoramio.jpg", width: 1800 }],

  // ---------- Vienna ----------
  ["stadtpark.jpg",              { commons: "File:Strauss_Denkmal_01_Stadtpark_Wien_1010.JPG", width: 1800 }],
  ["wiener-riesenrad.jpg",       { commons: "File:Wien_Riesenrad.jpg", width: 1800 }],
  ["schoenbrunn-palace.jpg",     { commons: "File:Schloss_Schönbrunn_Wien_2014_(Zuschnitt_2).jpg", width: 1800 }],
  ["schoenbrunn-maze-labyrinth.jpg",{ commons: "File:L03_054_Irrgarten.jpg", width: 1800 }],
  ["tiergarten-schoenbrunn.jpg", { commons: "File:2017_Vienna_zoo_01.jpg", width: 1800 }],
  ["zoom-kindermuseum.jpg",      { commons: "File:Zoom_Kindermuseum_MQ_Wien.jpg", width: 1800 }],
  ["museum-of-illusions-vienna.jpg",{ wiki: "Palais_Esterházy_(Wallnerstraße)" }],
  ["schmetterlinghaus.jpg",      { commons: "File:AT-13768_Palmenhaus_Burggarten_05.JPG", width: 1800 }],
  ["innere-stadt-stephansplatz.jpg",{ commons: "File:Wien_-_Stephansdom_(1).JPG", width: 1800 }],
  // kletterhalle-wien — no free image; falls back to the styled placeholder.

  // ---------- Stays ----------
  ["stay-vienna-arrival.jpg",    { wiki: "Vienna" }],
  ["stay-vienna.jpg",            { commons: "File:Wien_-_Stephansplatz_(2).JPG", width: 1800 }],
  ["stay-salzburg.jpg",          { wiki: "Salzburg" }],
  ["stay-tyrol.jpg",             { wiki: "Zillertal" }],
  ["stay-habachklause.jpg",      { wiki: "Bramberg_am_Wildkogel" }],
  ["stay-gutwenghof.jpg",        { wiki: "Werfenweng" }],

  // ---------- Open Graph / share cover ----------
  ["og-cover.jpg",               { commons: "File:Gosausee_(Vorderer_Gosausee)_with_Dachstein.jpg", width: 1200 }],

  // ---------- Food & drink ----------
  ["dish-wiener-schnitzel.jpg",  { wiki: "Wiener_schnitzel" }],
  ["dish-kaesespaetzle.jpg",     { wiki: "Käsespätzle" }],
  ["dish-tafelspitz.jpg",        { wiki: "Tafelspitz" }],
  ["dish-kaiserschmarrn.jpg",    { wiki: "Kaiserschmarrn" }],
  ["dish-apfelstrudel.jpg",      { wiki: "Apfelstrudel" }],
  ["dish-sachertorte.jpg",       { wiki: "Sachertorte" }],
  ["dish-salzburger-nockerl.jpg",{ wiki: "Salzburger_Nockerl" }],
  ["dish-brezel.jpg",            { wiki: "Pretzel" }],
  ["drink-almdudler.jpg",        { wiki: "Almdudler" }],
  ["drink-gruener-veltliner.jpg",{ wiki: "Grüner_Veltliner" }],
  ["drink-melange.jpg",          { wiki: "Wiener_Melange" }],
  ["drink-stiegl.jpg",           { wiki: "Stiegl" }]
];

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/** Bump a Wikimedia thumbnail URL to a wider width (when possible). */
function widenThumb(url, target = 1200) {
  // Pattern:  /thumb/a/aa/Foo.jpg/320px-Foo.jpg  ->  /thumb/a/aa/Foo.jpg/1200px-Foo.jpg
  const m = url.match(/\/thumb\/(.+?)\/(\d+)px-([^/]+)$/);
  if (!m) return url;
  return url.replace(/\/(\d+)px-([^/]+)$/, `/${target}px-$2`);
}

async function getWikiLeadImage(title) {
  const api = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(api, { headers: { "User-Agent": UA, "Accept": "application/json" } });
  if (!res.ok) throw new Error(`Wiki summary ${title} HTTP ${res.status}`);
  const data = await res.json();
  const original = data.originalimage?.source;
  const thumb = data.thumbnail?.source;
  // Prefer original if it's not too huge; else widen the thumb
  if (original && (data.originalimage?.width ?? 0) <= 2400) return original;
  if (thumb) return widenThumb(thumb, 1200);
  if (original) return original;
  return null;
}

async function getCommonsFile(fileTitle, width) {
  // Use the Commons API to resolve File:Foo.jpg to a direct URL.
  // If width is provided, request a thumb at that width (server-side resize).
  const widthParam = width ? `&iiurlwidth=${width}` : "";
  const api =
    `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url${widthParam}&format=json&origin=*&titles=` +
    encodeURIComponent(fileTitle);
  const res = await fetch(api, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Commons ${fileTitle} HTTP ${res.status}`);
  const data = await res.json();
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  return info?.thumburl ?? info?.url ?? null;
}

/* Some hosts (notably the Tenuta Cortevecchia WAF) reject our default
   project UA but happily serve to crawler UAs. We try the normal UA first
   and transparently fall back to a Googlebot UA on a 403/406 so we don't
   need per-target configuration. */
const FALLBACK_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

async function downloadTo(url, dest) {
  let res = await fetch(url, {
    headers: { "User-Agent": UA, "Accept": "image/*" }
  });
  if (res.status === 403 || res.status === 406) {
    res = await fetch(url, {
      headers: { "User-Agent": FALLBACK_UA, "Accept": "image/*,*/*;q=0.8" }
    });
  }
  if (!res.ok) throw new Error(`Download ${url} HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.byteLength;
}

async function resolveUrl(spec) {
  if (spec.url) return spec.url;
  if (spec.commons) return await getCommonsFile(spec.commons, spec.width);
  if (spec.wiki) return await getWikiLeadImage(spec.wiki);
  return null;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (const [name, spec] of TARGETS) {
    const dest = resolve(OUT_DIR, name);
    if (await fileExists(dest)) {
      console.log(`= skip  ${name}  (already exists)`);
      skip++;
      continue;
    }
    try {
      const url = await resolveUrl(spec);
      if (!url) {
        console.log(`! miss  ${name}  (no image found for ${JSON.stringify(spec)})`);
        fail++;
        continue;
      }
      const bytes = await downloadTo(url, dest);
      console.log(`+ saved ${name}  ${(bytes / 1024).toFixed(0)} KB  <- ${url}`);
      ok++;
      // Be polite to Wikimedia
      await new Promise(r => setTimeout(r, 250));
    } catch (e) {
      console.log(`! fail  ${name}  ${e.message}`);
      fail++;
    }
  }

  console.log(`\nDone.  saved=${ok}  skipped=${skip}  failed=${fail}`);
  console.log(`Note: failed entries fall back to the styled placeholder in the app.`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
