import "./style.css";
import { Map, View } from "ol";
import { VectorTile } from "ol/layer";
import { VectorTile as VectorTileSource } from "ol/source";
import { MVT } from "ol/format";
import Synchronize from "ol-ext/interaction/Synchronize";
import { applyStyle } from "ol-mapbox-style";

const planignLayer = new VectorTile({
  title: "Plan IGN",
  description: "Plan IGN Vecteur tuilÃ©",
  visible: true,
  source: new VectorTileSource({
    format: new MVT(),
    url: "https://wxs.ign.fr/essentiels/geoportail/tms/1.0.0/PLAN.IGN/{z}/{x}/{y}.pbf",
    layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
  }),
  declutter: true,
  attributions:
    '<a href="https://geoservices.ign.fr/documentation/geoservices/vecteur-tuile.html">&copy; IGN</a>',
});

const url_style =
  "https://wxs.ign.fr/essentiels/static/vectorTiles/styles/PLAN.IGN/standard.json";
fetch(url_style)
  .then((res) => res.json())
  .then((style) => {
    applyStyle(planignLayer, style, "plan_ign").then(function () {});
  });

const planignLayer2 = new VectorTile({
  title: "Plan IGN",
  description: "Plan IGN Vecteur tuilÃ©",
  visible: true,
  source: new VectorTileSource({
    format: new MVT(),
    url: "https://wxs.ign.fr/latuile/geoportail/tms/1.0.0/PLAN.IGN/{z}/{x}/{y}.pbf",
  }),
  declutter: true,
  attributions:
    '<a href="https://geoservices.ign.fr/documentation/geoservices/vecteur-tuile.html">&copy; IGN</a>',
});

const url_style2 =
  "https://wxs.ign.fr/essentiels/static/vectorTiles/styles/PLAN.IGN/accentue.json";
fetch(url_style2)
  .then((res) => res.json())
  .then((style) => {
    applyStyle(planignLayer2, style, "plan_ign").then(function () {});
  });

const map1 = new Map({
  target: "map1",
  layers: [planignLayer],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

const map2 = new Map({
  target: "map2",
  layers: [planignLayer2],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

map1.addInteraction(new Synchronize({ maps: [map2] }));
map2.addInteraction(new Synchronize({ maps: [map1] }));
