import type { LngLat } from "ymaps3";

/**
 * Яндекс.Карта API v3
 *
 * Для работы нужен токен
 */

/**
 * Координаты центра карты
 */
const center: LngLat = [37.588144, 55.733842];
const zoom = 10;
const selector = "#map";

/**
 * Координаты для маркеров на карте
 */
const coords: LngLat[] = [[37.588144, 55.733842]];

export async function initMap() {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } =
    ymaps3;

  const mapElement = document.querySelector(selector);

  if (mapElement instanceof HTMLElement) {
    const map = new YMap(mapElement, {
      location: { center, zoom },
    });

    map.addChild(new YMapDefaultSchemeLayer({}));
    map.addChild(new YMapDefaultFeaturesLayer({}));

    coords.forEach((coordinates) => {
      const markerElement = document.createElement("img");
      markerElement.src = "/public/img/holder-map.svg";
      markerElement.style.width = "40px";
      markerElement.style.height = "40px";
      markerElement.style.maxWidth = "unset";

      map.addChild(new YMapMarker({ coordinates }, markerElement));
    });
  }
}
