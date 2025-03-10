export const fallbackLng = "fa";
export const languages = [fallbackLng, "en"];
export const defaultNS = "home";
export const cookieName = "lang";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
