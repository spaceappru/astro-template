/**
 * Яндекс.Карта API v3
 *
 * Для работы нужен токен
 */

import type { LngLat, YMapProps } from "ymaps3";

interface MapArgs {
  /**
   * https://yandex.com/maps-api/docs/js-api/ref/index.html#YMapProps
   */
  YMapProps: YMapProps;
  /**
   * Селектор dom-элемента, например: #map
   */
  selector: string;
  /**
   * Координаты: массив двух чисел
   *
   * Путь к маркеру /img/marker.svg
   *
   * width и height в уже пикселях
   */
  points?: {
    coordinates: LngLat;
    image: string;
    width: number;
    height: number;
  }[];
}

const PATH = (import.meta.env.PUBLIC_YMAP_IMAGE_PATH || "").trim();

export async function initYandexMap({ selector, points, YMapProps }: MapArgs) {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } =
    ymaps3;

  const mapElement = document.querySelector(selector);

  if (mapElement instanceof HTMLElement) {
    const map = new YMap(mapElement, YMapProps);

    map.addChild(new YMapDefaultSchemeLayer({}));
    map.addChild(new YMapDefaultFeaturesLayer({}));

    points?.forEach(({ coordinates, image, width, height }) => {
      const markerElement = document.createElement("img");
      markerElement.src = PATH + image;
      markerElement.style.width = `${width}px`;
      markerElement.style.height = `${height}px`;
      markerElement.style.maxWidth = "unset";
      map.addChild(new YMapMarker({ coordinates }, markerElement));
    });
  }
}
