/**
 * Options for number formatting
 */
interface NumberFormatOptions {
  withCommas?: boolean; // Whether to include commas in the output
  toPersian?: boolean; // Whether to convert to Persian numbers
  removeCommas?: boolean; // Whether to remove commas from input
}

/**
 * Converts Persian numbers to English numbers
 */
function persianToEnglish(value: string): string {
  return value.replace(/[\u06F0-\u06F9]/g, (d) =>
    String.fromCharCode(d.charCodeAt(0) - 1728),
  );
}

/**
 * Converts English numbers to Persian numbers
 */
function englishToPersian(value: string): string {
    return value.replace(/[0-9]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) + 1728),
    );
  // const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  //   return value.replace(/[0-9]/g, (d) => persianNumbers[d]);
}

/**
 * Adds commas to a number string
 */
function addCommas(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Removes commas from a number string
 */
function removeCommas(value: string): string {
  return value.replace(/[,،]/g, '');
}

/**
 * Main function to format numbers with various options
 * @param value - The number or string to format
 * @param options - Formatting options
 * @returns Formatted number string
 */
export function formatNumber(
  value: string | number,
  options: NumberFormatOptions = {},
): string {
  const {
    withCommas = false,
    toPersian = false,
    removeCommas: shouldRemoveCommas = true,
  } = options;

  // Convert to string and handle null/undefined
  if (!value && value !== 0) return '';
  let result = String(value);

  // Remove commas if requested
  if (shouldRemoveCommas) {
    result = removeCommas(result);
  }

  // Convert Persian to English first (if input contains Persian numbers)
  if (/[\u06F0-\u06F9]/.test(result)) {
    result = persianToEnglish(result);
  }

  // Add commas if requested
  if (withCommas) {
    result = addCommas(result);
  }

  // Convert to Persian if requested
  if (toPersian) {
    result = englishToPersian(result);
  }

  return result;
}

/**
 * Utility function to check if a string contains only numbers (English or Persian)
 */
export function isNumeric(value: string): boolean {
  return /^[\u06F0-\u06F90-9]+$/.test(removeCommas(value));
}
