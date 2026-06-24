// One-shot helper: fetch CC-licensed photos for the Austrian cards that
// don't have an image yet, straight from Wikimedia Commons.
//
//   node scripts/fetch-austria-images.mjs            # only fetch missing files
//   node scripts/fetch-austria-images.mjs --force    # re-fetch even if present
//
// Unlike a hardcoded "File:Exact_Title.jpg" list, this SEARCHES Commons for
// each subject and picks the first result carrying a reusable licence
// (CC0 / Public domain / CC BY / CC BY-SA). That way it keeps working as the
// catalogue grows — add a row to TARGETS and re-run.
//
// For every downloaded file it records the real author + licence + source
// page into  public/images/credits.austria.json  and prints a ready-to-paste
// `imageCredit: { ... }` line, because every Commons image must be attributed
// (see the `imageCredit` field on POI / Dish in src/data/types.ts and the
// PhotoCredit component that renders it).
//
// Local only — never run from CI. Needs network access to commons.wikimedia.org.

import { writeFile, mkdir, access, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "public", "images");
const CREDITS_FILE = resolve(OUT_DIR, "credits.austria.json");
const FORCE = process.argv.includes("--force");
const WIDTH = 1400; // ample for a card / hero; keeps files well under ~300 KB

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "austria-2026/1.0 (trip companion; image backfill script)";

// Licences we may legally reuse with attribution. Substring match against
// Commons' LicenseShortName (e.g. "CC BY-SA 4.0", "CC0", "Public domain").
const OK_LICENCE = /(^|\s)(cc0|cc by|public domain|pd-)/i;

// filename (without extension) -> what to search Commons for. Queries are
// tuned to land on the real subject; tweak the query if a run picks a dud.
const TARGETS = [
  { file: "dish-eis",                  query: "Eiscreme Italian ice cream gelato cup" },
  { file: "dish-kasnocken",            query: "Kasnocken Kaspressknödel Käsespätzle Austrian cheese" },
  { file: "drink-apfelsaft",           query: "Apfelsaft gespritzt apple juice spritzer glass" },
  { file: "museum-of-illusions-vienna",query: "Palais Esterházy Wallnerstraße Wien" },
  { file: "kletterhalle-wien",         query: "indoor climbing gym Kletterhalle bouldering wall" }
];

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: "json", ...params })}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Commons API ${res.status}`);
  return res.json();
}

/** Search Commons (file namespace) and return candidate file titles. */
async function searchFiles(query) {
  const data = await api({
    action: "query", list: "search", srnamespace: "6",
    srsearch: query, srlimit: "12"
  });
  return (data?.query?.search ?? []).map(r => r.title);
}

/** Resolve a "File:..." title to { thumbUrl, author, licence, licenceUrl, page }. */
async function fileInfo(title) {
  const data = await api({
    action: "query", titles: title, prop: "imageinfo",
    iiprop: "url|extmetadata|mime", iiurlwidth: String(WIDTH)
  });
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info) return null;
  if (info.mime && !/^image\/(jpeg|png|webp)$/.test(info.mime)) return null; // skip svg/tiff/etc
  const m = info.extmetadata ?? {};
  const strip = s => (s ? String(s).replace(/<[^>]+>/g, "").trim() : "");
  return {
    thumbUrl: info.thumburl || info.url,
    author: strip(m.Artist?.value) || "Wikimedia Commons",
    licence: strip(m.LicenseShortName?.value) || "see source",
    licenceUrl: m.LicenseUrl?.value || "",
    page: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(title)}`
  };
}

async function exists(p) { try { await access(p); return true; } catch { return false; } }

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const credits = JSON.parse(await readFile(CREDITS_FILE, "utf8").catch(() => "{}"));
  let ok = 0, skipped = 0, failed = 0;

  for (const { file, query } of TARGETS) {
    const dest = resolve(OUT_DIR, `${file}.jpg`);
    if (!FORCE && await exists(dest)) { console.log(`• skip   ${file}.jpg (exists)`); skipped++; continue; }

    try {
      const titles = await searchFiles(query);
      let picked = null;
      for (const title of titles) {
        const info = await fileInfo(title);
        if (info && OK_LICENCE.test(info.licence)) { picked = info; break; }
      }
      if (!picked) { console.log(`✗ FAIL  ${file}: no reusably-licensed match for "${query}"`); failed++; continue; }

      const img = await fetch(picked.thumbUrl, { headers: { "User-Agent": UA } });
      if (!img.ok) throw new Error(`download ${img.status}`);
      await writeFile(dest, Buffer.from(await img.arrayBuffer()));

      credits[file] = { author: picked.author, license: picked.licence, source: picked.page, licenseUrl: picked.licenceUrl };
      console.log(`✓ got    ${file}.jpg  — ${picked.author} (${picked.licence})`);
      ok++;
    } catch (e) {
      console.log(`✗ FAIL  ${file}: ${e.message}`);
      failed++;
    }
  }

  await writeFile(CREDITS_FILE, JSON.stringify(credits, null, 2) + "\n");
  console.log(`\nDone: ${ok} fetched, ${skipped} skipped, ${failed} failed.`);
  if (ok > 0) {
    console.log(`\nAttribution written to public/images/credits.austria.json.`);
    console.log(`Paste each into the matching entry in src/data/ as, e.g.:`);
    for (const [file, c] of Object.entries(credits)) {
      console.log(`  // ${file}.jpg\n  imageCredit: { author: ${JSON.stringify(c.author)}, license: ${JSON.stringify(c.license)}, source: ${JSON.stringify(c.source)} },`);
    }
  }
}

run().catch(e => { console.error(e); process.exit(1); });
