export const languageToCountry = {
  tr: "TR",
  en: "US",
  de: "DE",
  fr: "FR",
  es: "ES",
  it: "IT",
  ru: "RU",
  zh: "CN",
  ja: "JP",
  ko: "KR",
  ar: "SA",
  pt: "PT",
  nl: "NL",
  pl: "PL",
  sv: "SE",
  da: "DK",
  fi: "FI",
  no: "NO",
  cs: "CZ",
  hu: "HU",
  el: "GR",
  he: "IL",
  th: "TH",
  vi: "VN",
  id: "ID",
  ro: "RO",
  bg: "BG",
  hr: "HR",
  sr: "RS",
  sk: "SK",
  sl: "SI",
  et: "EE",
  lv: "LV",
  lt: "LT",
  uk: "UA",
  hi: "IN",
  bn: "BD",
  fa: "IR",
  ur: "PK",
  ms: "MY",
  tl: "PH",
  ta: "LK",
  te: "IN",
  ml: "IN",
  mr: "IN",
  pa: "IN",
};

export const countryTranslationKeys = {
  TR: "turkey",
  US: "unitedStates",
  DE: "germany",
  FR: "france",
  ES: "spain",
  IT: "italy",
  RU: "russia",
  CN: "china",
  JP: "japan",
  KR: "southKorea",
  SA: "saudiArabia",
  PT: "portugal",
  NL: "netherlands",
  PL: "poland",
  SE: "sweden",
  DK: "denmark",
  FI: "finland",
  NO: "norway",
  CZ: "czechRepublic",
  HU: "hungary",
  GR: "greece",
  IL: "israel",
  TH: "thailand",
  VN: "vietnam",
  ID: "indonesia",
  RO: "romania",
  BG: "bulgaria",
  HR: "croatia",
  RS: "serbia",
  SK: "slovakia",
  SI: "slovenia",
  EE: "estonia",
  LV: "latvia",
  LT: "lithuania",
  UA: "ukraine",
  IN: "india",
  BD: "bangladesh",
  IR: "iran",
  PK: "pakistan",
  MY: "malaysia",
  PH: "philippines",
  LK: "sriLanka",
  GB: "unitedKingdom",
  CA: "canada",
  AU: "australia",
  NZ: "newZealand",
  CH: "switzerland",
  AT: "austria",
  BE: "belgium",
  IE: "ireland",
  MX: "mexico",
  BR: "brazil",
  AR: "argentina",
  CL: "chile",
  CO: "colombia",
  PE: "peru",
  VE: "venezuela",
  ZA: "southAfrica",
  EG: "egypt",
  NG: "nigeria",
  KE: "kenya",
  SG: "singapore",
  HK: "hongKong",
  TW: "taiwan",
};

export const getUserCountryFromBrowser = () => {
  const locale = navigator.language || navigator.userLanguage || "en-US";

  const parts = locale.split("-");
  if (parts.length > 1 && parts[1].length === 2) {
    return parts[1].toUpperCase();
  }

  return languageToCountry[parts[0].toLowerCase()] || "US";
};

export const getCountryTranslationKey = (countryCode) => {
  if (!countryCode) return null;

  const code = countryCode.toUpperCase();
  return countryTranslationKeys[code] || null;
};

export const getLocalizedCountryName = (countryCode, t) => {
  if (!countryCode || !t) return "";

  const translationKey = getCountryTranslationKey(countryCode);
  if (translationKey) {
    return t(translationKey);
  }

  return countryCode;
};
