import React from 'react'
import ReactDOM from 'react-dom'

import '../css/map.css'

import { Loader } from "@googlemaps/js-api-loader"

function MapPage() {
    let map;
    const additionalOptions = {};
    const loader = new Loader({
        apiKey: "AIzaSyBYOQr_EjZiS-CV1AuLighoZ_Sr_ZGWFto",
        version: "weekly",
        ...additionalOptions,
    }); 
      
    loader.load().then((google) => {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.663744035827754, lng: -79.39479158104825 },
        zoom: 16,
    });
    });
}

export default MapPage;