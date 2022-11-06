import React from 'react'
import ReactDOM from 'react-dom'

import '../css/map.css'

import { Loader } from "@googlemaps/js-api-loader"

import Arrow from '../images/arrow.png'

async function loadData() {
    const res = await fetch("http://127.0.0.1:5000/testIncident");
    var data = await res.json()
    console.log(data)
}

function FlipArrow() {
    var arrow = document.getElementById("#arrow");
    var arrowBox = document.getElementById("#arrowBox")
    var guiBackground = document.getElementsByClassName("mapGuiBackground")[0]
    var gui = document.getElementsByClassName("filtersGui")[0]
    console.log(guiBackground)

    if(arrow.style.rotate == "0deg") {
        arrow.style.rotate = "180deg";
        arrowBox.style.left = "32%";
        guiBackground.style.left = "0%";
        gui.style.left = "0%";
        arrow.style.setProperty('--hover-left', '-5%');
    } else {
        arrow.style.rotate = "0deg";
        arrowBox.style.left = "1%";
        guiBackground.style.left = "-31%";
        gui.style.left = "-31%";
        
        arrow.style.setProperty('--hover-left', '5%');
    }
}

function MapPage() {
    let map;    
    const additionalOptions = {};
    const loader = new Loader({
        apiKey: "AIzaSyBYOQr_EjZiS-CV1AuLighoZ_Sr_ZGWFto",
        version: "weekly",
        ...additionalOptions,
    }); 

    loadData();
    
    /*loader.load().then((google) => {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.663744035827754, lng: -79.39479158104825 },
        zoom: 16,
    });
    }); */
    return(
  
    
   <div>
        <div class="mapGuiBackground">
            <svg viewBox="0 0 400 640">
                <path fill="#9ADCFF" fill-opacity="1" d="M0,0 L400,0 L400,640 L0,640 Z"/>
            </svg>
            <svg viewBox="0 0 10 640">
                <path fill="#9ADCFF" fill-opacity="0.5" d="M0,0 L10,0 L10,640 L0,640 Z"/>
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
        <div id="#arrowBox" onClick={() => FlipArrow()} class="sideButton">
            <img id="#arrow" src={Arrow}/>
        </div>
    </div>
    )
}

export default MapPage;