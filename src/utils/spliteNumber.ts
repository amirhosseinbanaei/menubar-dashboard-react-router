import { digitsEnToFa } from "@persian-tools/persian-tools";

export function splitNumber(n: any) {
  //   const getLanguage = localStorage.getItem("language");
  const getLanguage = "fa";
  return getLanguage === "fa" || getLanguage === "ar"
    ? digitsEnToFa(n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
