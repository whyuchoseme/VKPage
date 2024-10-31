export function cropText(text, maxLength) {
  return text
    .split("")
    .slice(0, maxLength)
    .map((letter, index) => {
      if (index == maxLength - 1 && letter == " ") {
        return "";
      } else {
        return letter;
      }
    })
    .join("");
}

export function getMonetaryFormat(
  locales,
  style,
  currency,
  minimumFractionDigits,
  price
) {
  const requiredFormat = new Intl.NumberFormat(locales, {
    style: style,
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
  });
  return requiredFormat.format(price);
}

export function createRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
