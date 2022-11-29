import "./style.css";
import { Map, View } from "ol";
import { VectorTile, MapboxVector } from "ol/layer";
import { VectorTile as VectorTileSource, WMTS } from "ol/source";
import { MVT } from "ol/format";
import Synchronize from "ol-ext/interaction/Synchronize";
import { applyStyle } from "ol-mapbox-style";

// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";

const ign_source = new WMTS({
  url: "https://wxs.ign.fr/essentiels/geoportail/tms/1.0.0/",
  layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
  matrixSet: "PM",
  format: "image/png",
  projection: "EPSG:3857",
  // tileGrid: tileGrid,
  // attributions:
  //   '<a href="https://www.ign.fr/" target="_blank">' +
  //   '<img src="https://wxs.ign.fr/static/logos/IGN/IGN.gif" title="Institut national de l\'' +
  //   'information géographique et forestière" alt="IGN"></a>',
});

const mapboxLayer = new MapboxVector({
  title: "Plan IGN",
  source: new VectorTileSource({
    format: new MVT(),
    url: "https://wxs.ign.fr/essentiels/geoportail/tms/1.0.0/PLAN.IGN/{z}/{x}/{y}.pbf",
    layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
  }),
  styleUrl:
    "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/classique.json",
  visible: true,
  declutter: true,
});

const planignLayer = new VectorTile({
  title: "Plan IGN",
  description: "Plan IGN Vecteur tuilÃ©",
  // mapboxStyleUrl:
  // "https://wxs.ign.fr/static/vectorTiles/styles/BDTOPO/classique.json",
  // mapboxStyleSource: "normal",
  visible: true,
  source: new VectorTileSource({
    format: new MVT(),
    // https://wxs.ign.fr/essentiels/geoportail/tms/1.0.0/PLAN.IGN/16/33191/22557.pbf
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

// const vlayer = new VectorTile({
//   title: "Plan IGN vecteur",
//   renderMode: "hybrid",
//   source: new VectorTileSource({
//     tilePixelRatio: 1,
//     tileGrid: ol.tilegrid.createXYZ({ maxZoom: 19 }),
//     format: new MVT(),
//     projection: new ol.proj.Projection({ code: "EPSG:3857" }),
//     url: url_pbf,
//     attributions: attribution,
//   }),
//   declutter: true,
//   styleUrl:
//     "https://wxs.ign.fr/essentiels/static/vectorTiles/styles/PLAN.IGN/standard.json",
// });

const planignLayer2 = new VectorTile({
  title: "Plan IGN",
  description: "Plan IGN Vecteur tuilÃ©",
  // mapboxStyleUrl:
  //   "https://wxs.ign.fr/latuile/static/vectorTiles/styles/PLAN.IGN/standard.json",
  // mapboxStyleSource: "plan_ign",
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
