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
    return(
  
    
   <div>
        <div class="mapGuiBackground">
            <svg viewBox="0 0 50 150">
                <path fill="#9ADCFF" fill-opacity="1" d="M0,0 L50,0 L50,150 L0,150 Z"/>
            </svg>
        </div>
        
        <div class = "filtersGui">
            <div class = "menu">
                <input class = "menuButton" type = "button" id = "menu" name = "menu" value = "Menu"></input>
            </div>
            <div class = "filtersHeading">
                <p>
                    Filters
                </p>
            </div>

            <div class = "categorieHeading">
                <h4>
                    Criminal Offences  
                </h4>
            </div>

            <div class = "categorieSelects">
                <table class = "selectTable">
                    <td>
                        <input class = "checkboxes" type = "checkbox" id = "cat1" name = "cat1" value = "assault"></input> 
                        <label class = "checkLabel" for = "cat1">
                            Assault
                        </label>
                        <br></br>

                        <input class = "checkboxes" type = "checkbox" id = "cat2" name = "cat2" value = "criminalHarassment"></input> 
                        <label class = "checkLabel" for = "cat2">
                            Criminal Harassment
                        </label>
                        <br></br>

                        <input class = "checkboxes" type = "checkbox" id = "cat3" name = "cat3" value = "indecentAct"></input> 
                        <label class = "checkLabel" for = "cat3">
                            Indecent Act
                        </label>
                        <br></br>
                    </td>

                    <td>
                        <input class = "checkboxes" type = "checkbox" id = "cat4" name = "cat4" value = "robbery"></input> 
                        <label class = "checkLabel" for = "cat4">
                            Robbery
                        </label>
                        <br></br>

                        <input class = "checkboxes" type = "checkbox" id = "cat5" name = "cat5" value = "sexualAssault"></input> 
                        <label class = "checkLabel" for = "cat5">
                            Sexual Assault
                        </label>
                        <br></br>

                        <input class = "checkboxes" type = "checkbox" id = "cat6" name = "cat6" value = "Voyeurism"></input> 
                        <label class = "checkLabel" for = "cat1">
                            Voyeurism
                        </label>
                        <br></br>
                    </td>
                </table>
                

                
            </div>

            <div class = "dateHeader">
                <h4>
                    Recency 
                </h4>
            </div>

            <div class = "dateButtons">
                <input class = "buttons" type = "button" id = "date1" name = "date1" value = "Last Week"></input>
                <br></br>
        
                <input class = "buttons" type = "button" id = "date2" name = "date2" value = "Last Month"></input>
                <br></br>
                
                <input class = "buttons" type = "button" id = "date3" name = "date3" value = "Last 3 Months"></input>
                <br></br>

                <input class = "buttons" type = "button" id = "date4" name = "date4" value = "Last 6 Months"></input>
                <br></br>

                <input class = "buttons" type = "button" id = "date5" name = "date5" value = "Last Year"></input>
                <br></br>

            </div>
        </div>
    </div>
    )
}

export default MapPage;