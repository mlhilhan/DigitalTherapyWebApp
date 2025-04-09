import { currencySymbols } from "./currency";

/**
 * Para birimini formatlar
 * @param {number} amount - Formatlanacak miktar
 * @param {string} currencyCode - Para birimi kodu (TRY, USD, EUR, vb.)
 * @param {boolean} useSymbol - Symbol kullanılsın mı? (varsayılan: true)
 * @param {number} decimalPlaces - Ondalık basamak sayısı (varsayılan: 2)
 * @returns {string} Formatlanmış para değeri
 */
export const formatCurrency = (
  amount,
  currencyCode = "USD",
  useSymbol = true,
  decimalPlaces = 2
) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "";
  }

  const numericAmount = parseFloat(amount);
  let formattedAmount = numericAmount.toFixed(decimalPlaces);

  formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (useSymbol) {
    const symbol = currencySymbols[currencyCode] || currencyCode;

    if (currencyCode === "NOK") {
      return `${formattedAmount} ${symbol}`;
    } else {
      return `${symbol}${formattedAmount}`;
    }
  } else {
    return `${formattedAmount} ${currencyCode}`;
  }
};

/**
 * Bir para miktarını belirli bir locale'e göre formatlar
 * @param {number} amount - Para miktarı
 * @param {string} currencyCode - Para birimi kodu
 * @param {string} locale - Kullanılacak locale (örn. 'tr-TR', 'en-US')
 * @returns {string} Locale'e göre formatlanmış para miktarı
 */
export const formatCurrencyForLocale = (
  amount,
  currencyCode = "TRY",
  locale = "tr-TR"
) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "";
  }

  const localeMap = {
    TRY: "tr-TR",
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
    RUB: "ru-RU",
    CHF: "de-CH",
    NOK: "nb-NO",
  };

  const selectedLocale = locale || localeMap[currencyCode] || "tr-TR";

  return new Intl.NumberFormat(selectedLocale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Bir sayıyı locale'e göre formatlar
 * @param {number} number - Formatlanacak sayı
 * @param {string} locale - Kullanılacak locale (örn. 'tr-TR', 'en-US')
 * @param {number} minimumFractionDigits - Minimum ondalık basamak
 * @param {number} maximumFractionDigits - Maximum ondalık basamak
 * @returns {string} Formatlanmış sayı
 */
export const formatNumber = (
  number,
  locale = "tr-TR",
  minimumFractionDigits = 0,
  maximumFractionDigits = 2
) => {
  if (number === null || number === undefined || isNaN(number)) {
    return "";
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(number);
};
