/**
 * Ülke koduna göre para birimi kodunu belirleyen fonksiyon
 * @param {string} countryCode - ISO ülke kodu (TR, US, GB, vb.)
 * @returns {string} Para birimi kodu (TRY, USD, EUR, vb.)
 */
export const getCurrencyByCountry = (countryCode) => {
  const country = (countryCode || "").toUpperCase();

  const countryCurrencyMap = {
    // Türkiye
    TR: "TRY",

    // Dolar
    US: "USD",
    AU: "USD",
    CA: "USD",

    // Euro
    DE: "EUR", // Almanya
    FR: "EUR", // Fransa
    IT: "EUR", // İtalya
    ES: "EUR", // İspanya
    NL: "EUR", // Hollanda
    BE: "EUR", // Belçika
    AT: "EUR", // Avusturya
    FI: "EUR", // Finlandiya
    IE: "EUR", // İrlanda
    LT: "EUR", // Litvanya
    LV: "EUR", // Letonya
    PT: "EUR", // Portekiz
    GR: "EUR", // Yunanistan
    SK: "EUR", // Slovakya
    SI: "EUR", // Slovenya
    EE: "EUR", // Estonya
    LU: "EUR", // Lüksemburg
    MT: "EUR", // Malta
    CY: "EUR", // Kıbrıs

    // İngiliz Sterlini
    GB: "GBP",

    // Rus Rublesi
    RU: "RUB",

    // İsviçre Frangı
    CH: "CHF",

    // Norveç Kronu
    NO: "NOK",
  };

  return countryCurrencyMap[country] || "USD";
};

export const currencySymbols = {
  TRY: "₺",
  USD: "$",
  EUR: "€",
  GBP: "£",
  RUB: "₽",
  CHF: "CHF",
  NOK: "kr",
};

export const supportedCurrencies = [
  "TRY",
  "USD",
  "EUR",
  "GBP",
  "RUB",
  "CHF",
  "NOK",
];
