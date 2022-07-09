import React, { useEffect, useRef } from 'react';
import { map, tileLayer, Browser, Bounds, Layer, Marker, GeoJSON } from 'leaflet';

import './myMap.css';
import data from './states.json';

const MyMap = ({
  mapIsReadyCallback /* To be triggered when a map object is created */,
}) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const initialState = {
      lng: -71.5,
      lat: 44,
      zoom: 7,
    };

    const leafletMap = map(mapContainer.current).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    // This API key is for use only in stackblitz.com
    // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
    // The Geoapify service is free for small projects and the development phase.
    const myAPIKey = '18c85a44a76042788847e2fb74d27386';
    const isRetina = Browser.retina;
    var baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
    var retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

    tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'asd',
      maxZoom: 20,
      id: 'osm-bright',
    }).addTo(leafletMap);

    const json: any = data;

    const geoRI = json.features.filter(el => el.properties.name === "Rhode Island")[0];
    const geoVE = json.features.filter(el => el.properties.name === "Vermont")[0];
    const geoME = json.features.filter(el => el.properties.name === "Maine")[0];


    new Marker([42.7544, -71.4477]).bindPopup('This is Littleton, CO.').addTo(leafletMap);

    new GeoJSON(geoRI, {
      onEachFeature: onEachFeature,
      style : {
        fillColor: "red",
        weight: 1,
        opacity: 0.4,
        color: 'red',
        fillOpacity: 0.2
      }
    }).addTo(leafletMap);
    new GeoJSON(geoVE, {
      onEachFeature: onEachFeature,
      style : {
        fillColor: "blue",
        weight: 1,
        opacity: 0.4,
        color: 'blue',
        fillOpacity: 0.2
      }
    }).addTo(leafletMap);
    new GeoJSON(geoME, {
      onEachFeature: onEachFeature,
      style : {
        fillColor: "green",
        weight: 1,
        opacity: 0.4,
        color: 'green',
        fillOpacity: 0.2
      }
    }).addTo(leafletMap);

    mapIsReadyCallback(leafletMap);
  }, [mapContainer.current]);

  return <div className="map-container" ref={mapContainer}></div>;
};

function onEachFeature(feature, layer) {
  layer.on({
    click
  });
}

export default MyMap;
