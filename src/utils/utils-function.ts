export function replaceEmptyStrings(obj: any) {
  // Base case: If the input is not an object, return it as is
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // Iterate over each key in the object
  for (const key in obj) {
    // Check if the value is an empty string
    if (obj[key] === "") {
      // Replace empty string with "default"
      obj[key] = "default";
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      // If the value is an object, recursively call the function
      obj[key] = replaceEmptyStrings(obj[key]);
    }
    // Note: If the value is a non-empty string, number, boolean, etc.,
    // it will be left unchanged.
  }

  return obj;
}
