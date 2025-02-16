const l = [37.588144, 55.733842], r = 10, d = "#map", i = [[37.588144, 55.733842]];
async function p() {
  await ymaps3.ready;
  const { YMap: n, YMapDefaultSchemeLayer: c, YMapMarker: o, YMapDefaultFeaturesLayer: s } = ymaps3, a = document.querySelector(d);
  if (a instanceof HTMLElement) {
    const t = new n(a, {
      location: { center: l, zoom: r }
    });
    t.addChild(new c({})), t.addChild(new s({})), i.forEach((m) => {
      const e = document.createElement("img");
      e.src = "/public/img/holder-map.svg", e.style.width = "40px", e.style.height = "40px", e.style.maxWidth = "unset", t.addChild(new o({ coordinates: m }, e));
    });
  }
}
p();
