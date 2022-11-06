import MapImage from '../images/mapdemo.png'
import React from 'react';

import { Loader } from "@googlemaps/js-api-loader"

async function loadData() {
    const res = await fetch("http://127.0.0.1:5000/tmu-incidents");
    var data = await res.json()
    console.log(data)
}

function getLatLong(address){
    var geocoder;
    const additionalOptions = {};
    const loader = new Loader({
        apiKey: "AIzaSyBYOQr_EjZiS-CV1AuLighoZ_Sr_ZGWFto",
        version: "weekly",
        ...additionalOptions,
    }); 

    loader.load().then((google) => {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == 'OK') {
                console.log(results);
                return results;
            } else {
            alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    });
};

function MainPage() {
    var projectName = "Map For Hu Tao Enthusiasts in UofT";
        let map;
        const additionalOptions = {};
        const loader = new Loader({
            apiKey: "AIzaSyBYOQr_EjZiS-CV1AuLighoZ_Sr_ZGWFto",
            version: "weekly",
            ...additionalOptions,
        }); 
    
        loadData();
    
        
        loader.load().then((google) => {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 43.66361717124133,  lng:  -79.40054575699752 },
                zoom: 15.95,
                mapTypeId: 'roadmap',
                styles: [ 
                    { 
                    "featureType": "poi.business", 
                    "stylers": [ 
                        { "visibility": "off" } 
                    ]
                    },
                    { 
                        "featureType": "poi.medical", 
                        "stylers": [ 
                        { "visibility": "off" } 
                        ]
                    },
                    { 
                        "featureType": "transit", 
                        "stylers": [ 
                        { "visibility": "off" } 
                        ]
                    },
                    { 
                        "featureType": "poi.attraction", 
                        "stylers": [ 
                        { "visibility": "off" } 
                        ]
                    },
                    { 
                        "featureType": "poi.place_of_worship", 
                        "stylers": [ 
                        { "visibility": "off" } 
                        ]
                    },
                    { 
                        "featureType": "poi.sports_complex", 
                        "stylers": [ 
                        { "visibility": "off" } 
                        ]
                    }  
                ] 
            });
    
            const marker = new google.maps.Marker({
                position: { lat: 43.66659035511779, lng: -79.3949516968313 },
                map: map,
            });
        });
    
    getLatLong("55 St.George Street");
    

    return (
        <div>
            
            <header class="mainTitle">
                <div class="mainTitleBackground">
                    <svg viewBox="0 0 150 150">
                        <path fill="#00C2DC" fill-opacity="0.8" d="M0,0 L120,0 C120,0 150,75 120,150 L0 150 Z"/>
                    </svg>
                </div>
                <div class="mainTitleBackgroundBorder">
                    <svg viewBox="0 0 154 150">
                        <path fill="#0088A6" fill-opacity="0.5" d="M0,0 L124,0 C124,0 154,75 124,150 L0 150 Z"/>
                    </svg>
                </div>
                <div class="mainTitleText">
                    <h1>{projectName}</h1>
                    <p>
                        An interactive map for UofT incident reports...<br/>
                        Awareness, becoming simple
                    </p>
                </div>
                
            </header>
            <a href="/map">
                <span class="mapDemo" >
                    <p>
                        Click To Explore
                    </p>
                </span>
            </a>
            
        </div>
    )
}

export default MainPage;