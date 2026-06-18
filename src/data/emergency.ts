import type { EmergencyGroup } from "./types";

/** Verified Austrian emergency numbers + a hospital per region. The
 *  pan-European 112 reaches everything; the others are the direct lines.
 *  Hospital phones/addresses confirmed 2026. */
export const emergencyGroups: EmergencyGroup[] = [
  {
    title: "Austria — emergency numbers",
    items: [
      { label: "Pan-European emergency", value: "112", type: "phone", detail: "Reaches police, ambulance and fire — English available" },
      { label: "Ambulance (Rettung)", value: "144", type: "phone" },
      { label: "Police (Polizei)", value: "133", type: "phone" },
      { label: "Fire (Feuerwehr)", value: "122", type: "phone" },
      { label: "Mountain rescue (Alpinnotruf)", value: "140", type: "phone", detail: "For cable-car / hiking / alpine emergencies" },
      { label: "Health advice hotline", value: "1450", type: "phone", detail: "Non-emergency: which doctor / hospital to go to" },
      { label: "Poison control (Vienna, 24/7)", value: "+43 1 406 43 43", type: "phone" }
    ]
  },
  {
    title: "Driving & roadside",
    items: [
      { label: "ÖAMTC roadside assistance", value: "120", type: "phone", detail: "Breakdown service (most common)" },
      { label: "ARBÖ roadside assistance", value: "123", type: "phone" },
      { label: "Vignette & tolls", value: "asfinag.at", type: "website", link: "https://www.asfinag.at/en/", detail: "Buy the digital motorway Vignette here" }
    ]
  },
  {
    title: "Hospitals by region",
    items: [
      { label: "Uniklinikum Salzburg (SALK)", value: "+43 5 7255-0", type: "phone", detail: "Müllner Hauptstraße 48, 5020 Salzburg — for the Salzburg & Pinzgau weeks" },
      { label: "Tauernklinikum Zell am See", value: "+43 50272-0", type: "phone", detail: "Paracelsusstraße 8, 5700 Zell am See — closest to the Kaprun / Habachklause base" },
      { label: "Uniklinik Innsbruck", value: "+43 50504-0", type: "phone", detail: "Anichstraße 35, 6020 Innsbruck — for the Tyrol / Zillertal week" },
      { label: "AKH Wien", value: "+43 1 40400-0", type: "phone", detail: "Währinger Gürtel 18–20, 1090 Wien — for the Vienna days" }
    ]
  }
];
