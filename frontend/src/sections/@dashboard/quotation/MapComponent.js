import React, { useEffect,useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { Icon, Style, Stroke, Text, Fill } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';

const MapComponent = ({ onCaptureMap, mapLngLat = [{}] }) => {

  const mapRef = useRef(null);

  useEffect(() => {

    if(mapLngLat.length>1){

    const map = new Map({
      // interactions:[],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: mapRef.current,
      view: new View({
        center: fromLonLat([86, 19]),
        zoom: 4.5,
      }),
    });

    // Disable zoom-related interactions (mouse wheel zoom)
    map.getInteractions().forEach(function (interaction) {
      if (interaction instanceof MouseWheelZoom) {
        interaction.setActive(false);
      }
    });

    const cities = [
      { name: "Chennai", coordinates: [80.2707, 13.0827] },
      { name: "Mumbai", coordinates: [72.8777, 18.9711] },
      { name: "Delhi", coordinates: [77.2088, 28.6139] },
      { name: "Kolkata", coordinates: [88.3639, 22.5673] },
    ];

    // cities.sort((a, b) => a.name.localeCompare(b.name));

    const markerStyle = (label) => {
      return new Style({
        image: new Icon({
          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAABqElEQVR4nO3U3StDYRwH8DOGG+Ri4g9wv1x4uRirlZa1jTuUxIUN40byduFGriakYZQUKzUveWmJxSYulNEaNW/JjQtJp1CE7avn1HaczuzivNztW796ep6n59PvOT2HolJJRe4AyMY7XcwUkC0fFDwyYdR6hfqiL2jTwBQZ29vCCB0bpMU8806YCyKooJCwagoj8CxMSYP5V4egz4n+i8VKnxvF4fqAOAzIgE3zxjnYbgWuAkD4FLBbuGiX9hWAUjh47u9gvlXswJEm8DLcyK5r04DQkUU4uDW7xOngZIcPkrm/ezbnFoWDXtc057DDNT7oW+GC3mWHcPD+Qg9dJntYZyXw881iZGzTsOu6LODhUicYZNBewzOnA0spsOkENmaA1hJud32mZwAKceDekgOViuRPghTZs+uaFIUxIKBEv5nbZaIarH0CkC4aZNDT/QYYVf8/flN+FGcHdZJgcdQ9vp3wasmce2JLUoyEXBfs1jseONZ+K+rvkiyg6Tz0VL/Ese4qGo+PKkrO4CZQjmb1J1rUH7gOlMmKxYKgz0gqPpFKKpSM+QWCE9td5se8BQAAAABJRU5ErkJggg==",
        }),
        text: new Text({
          text: label,

          offsetY: -18,
          font: "bold  15px T",
          fill: new Fill({
            color: "black",
          }),
        }),
      });
    };

    const markers = mapLngLat.map((mapLngLat, index) => {
      const label = String.fromCharCode(65 + index);
      const marker = new Feature({
        geometry: new Point(fromLonLat(mapLngLat.coordinates)),
        name: mapLngLat.name,
      });
      marker.setStyle(markerStyle(label));
      return marker;
    });

    const lineStringCoordinates = markers.map((marker) =>
      marker.getGeometry().getCoordinates()
    );

    const lineString = new LineString(lineStringCoordinates);

    const lineStyle = new Style({
      stroke: new Stroke({
        color: "blue",
        width: 2,
        lineDash: [4, 4],
      }),
    });

    const lineFeature = new Feature({
      geometry: lineString,
    });

    lineFeature.setStyle(lineStyle);

    const vectorSource = new VectorSource({
      features: [...markers, lineFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    map.once("rendercomplete", function () {
      const canvas = document.createElement("canvas");
      canvas.width = map.getSize()[0];
      canvas.height = map.getSize()[1];

      const context = canvas.getContext("2d");
      Array.from(document.querySelectorAll(".ol-layer canvas")).forEach(
        function (layerCanvas) {
          if (layerCanvas.width > 0) {
            const opacity = layerCanvas.parentNode.style.opacity;
            context.globalAlpha = opacity === "" ? 1 : Number(opacity);
            context.drawImage(layerCanvas, 0, 0);
          }
        }
      );

      const base64Image = canvas.toDataURL("image/png");
      // console.log(base64Image);
      onCaptureMap(base64Image);
    });
  }
    return () => {
      // Clean up code if needed
    };
  }, [mapLngLat]); // Empty dependency array to run the effect only once

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default MapComponent;
