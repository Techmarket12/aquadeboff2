const normalizeServiceLabel = (label = "") =>
  label
    .toLowerCase()
    .replace(/&/g, " et ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/é"/g, "oe")
    .replace(/[^a-z0-9]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const SERVICE_ROUTE_MAP = {
  "depannage fuites": "/services/plomberie",
  "depannage sanitaires": "/depannage-sanitaires",
  "depannage chauffage": "/depannage-chauffage",
  "renovation sanitaires": "/renovation-sanitaires",
  entretien: "/entretien",
  "service de robinetterie": "/service-robinetterie",
  "service de boiler chauffe eau": "/service-boiler-chauffe-eau",
  "service de boiler / chauffe eau": "/service-boiler-chauffe-eau",
  "service de boiler": "/service-boiler-chauffe-eau",
  "remplacement canalisation en gres": "/remplacement-canalisation-gres",
  "inspection camera et recherche fuites": "/inspection-camera-recherche-fuites",
  "inspection camera": "/inspection-camera-recherche-fuites",
  "debouchage wc eviers": "/services/debouchage",
  "debouchage canalisations": "/services/debouchage",
  "service de debouchage egout": "/services/debouchage",
  "service de curage et entretien": "/entretien",
};

export const getServiceLink = (label = "") => {
  const key = normalizeServiceLabel(label);
  if (SERVICE_ROUTE_MAP[key]) return SERVICE_ROUTE_MAP[key];

  if (key.includes("chauffage") || key.includes("boiler")) return "/depannage-chauffage";
  if (key.includes("fuite")) return "/services/plomberie";
  if (key.includes("sanitaire")) return "/depannage-sanitaires";
  if (key.includes("renovation")) return "/renovation-sanitaires";
  if (key.includes("debouchage") || key.includes("curage") || key.includes("egout")) return "/services/debouchage";
  if (key.includes("entretien")) return "/entretien";

  return "/contact";
};



