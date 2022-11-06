import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'

import '../css/map.css'

import { Loader } from "@googlemaps/js-api-loader"

import Arrow from '../images/arrow.png'

import { FilterByCategory, FilterByDate } from './mapFormat.js'

function getLatLong(address, setResults){
    var geocoder;
    const additionalOptions = {};
    const loader = new Loader({
        apiKey: "AIzaSyD3c6wzabNKGdieh53xvuM9qn_vFt2mugs",
        version: "weekly",
        ...additionalOptions
    }); 
    useEffect(() => {
            loader.load().then((google) => {
                geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': address, 'componentRestrictions': {'country': 'CA'}}, function(results, status) {
                    if (status == 'OK') {
                        var lat = results[1].geometry.location.lat();
                        var lng = results[1].geometry.location.lng();
                        setResults([lat,lng]);

                    } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            })
        
    }, []);
};


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

function updateData(currentData, RawData) {
    var categories = [];
    if(document.getElementById("assault").checked)
        categories.push("Assault")
    if(document.getElementById("robbery").checked)
        categories.push("Robbery")
    if(document.getElementById("indecentAct").checked)
        categories.push("Indecent Act")
    if(document.getElementById("sexualAssault").checked)
        categories.push("Sexual Assault")
    if(document.getElementById("criminalHarassment").checked)
        categories.push("Criminal Harassment")
    if(document.getElementById("voyeurism").checked)
        categories.push("Voyeurism")

    if(categories.length == 0) return


    var range = -1;

    if(document.getElementById("lweek").checked)
        range = 0
    if(document.getElementById("lmonth").checked)
        range = 1
    if(document.getElementById("l3month").checked)
        range = 2
    if(document.getElementById("l6month").checked)
        range = 3
    if(document.getElementById("lyear").checked)
        range = 4
    if(range == -1)
        return

    currentData = FilterByCategory(categories, RawData)

    

    currentData = FilterByDate(range, currentData)
    console.log(currentData)
}

const checkBoxClick = (e) => {
    var checkboxes = document.querySelectorAll("input[type=checkbox][class='dates']");
    console.log(checkboxes)
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false
    })

    document.getElementById(e.target.id).checked = true;
}

function createCoordList (currentData, results, setResults){
    let address = "";
    let coordList = [[]];

    console.log(currentData)
    for (let i=0; i< 110; i++){
        address = currentData[i][3];
        
        getLatLong(address, setResults)
        coordList[i].push(results);
    }
    console.log(coordList)
}

function MapPage() {
    
    const [RawData, setRawData] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/uoft-incidents").then(res => res.json()).then((data) => setRawData(data))
    }, [])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/tmu-incidents").then(res => res.json()).then((data) => setRawData(data))
    }, [])


    var currentData = RawData;

    
    let map;
    const additionalOptions = {};
    const loader = new Loader({
        apiKey: "AIzaSyD3c6wzabNKGdieh53xvuM9qn_vFt2mugs",
        version: "weekly",
        ...additionalOptions,
    }); 

    
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

        
    });

    // const [results, setResults] = useState([]);
    // createCoordList(currentData, results, setResults);


    const [coordList, setCoordList] = useState([[]]);
    getLatLong("55 St.George Street", setCoordList)
    console.log(coordList)

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
                <a href="/"><input class = "menuButton" type = "button" id = "menu" name = "menu" value = "Menu"></input></a>
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
                    <div class = "categorieSelects">
                    <p>
                        Toronto Mans University
                    </p>
                    <table class = "selectTable" id = "TMUTable">
                        <td>
                            <input class = "checkboxes" type = "checkbox" id = "assault" name = "cat1" value = "assault"></input> 
                            <label class = "checkLabel" for = "cat1">
                                Assault
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "criminalHarassment" name = "cat2" value = "criminalHarassment"></input> 
                            <label class = "checkLabel" for = "cat2">
                                Criminal Harassment
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "indecentAct" name = "cat3" value = "indecentAct"></input> 
                            <label class = "checkLabel" for = "cat3">
                                Indecent Act
                            </label>
                            <br></br>
                        </td>

                        <td>
                            <input class = "checkboxes" type = "checkbox" id = "robbery" name = "cat4" value = "robbery"></input> 
                            <label class = "checkLabel" for = "cat4">
                                Robbery
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "sexualAssault" name = "cat5" value = "sexualAssault"></input> 
                            <label class = "checkLabel" for = "cat5">
                                Sexual Assault
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "voyeurism" name = "cat6" value = "Voyeurism"></input> 
                            <label class = "checkLabel" for = "cat6">
                                Voyeurism
                            </label>
                            <br></br>
                        </td>

                            

                    </table>

                    <p>
                        University of Toronto
                    </p>
                    <table class = "selectTable" id = "UofTTable">
                        <td>
                            <input class = "checkboxes" type = "checkbox" id = "assault" name = "cat1" value = "assault"></input> 
                            <label class = "checkLabel" for = "cat1">
                                Suspicious Person
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "criminalHarassment" name = "cat2" value = "criminalHarassment"></input> 
                            <label class = "checkLabel" for = "cat2">
                                Trespass
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "indecentAct" name = "cat3" value = "indecentAct"></input> 
                            <label class = "checkLabel" for = "cat3">
                                Alarm
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "voyeurism" name = "cat6" value = "Voyeurism"></input> 
                            <label class = "checkLabel" for = "cat6">
                                Break & Enter
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "voyeurism" name = "cat6" value = "Voyeurism"></input> 
                            <label class = "checkLabel" for = "cat6">
                                Medical
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "voyeurism" name = "cat6" value = "Voyeurism"></input> 
                            <label class = "checkLabel" for = "cat6">
                                Driving
                            </label>
                            <br></br>
                        </td>

                        <td>
                            <input class = "checkboxes" type = "checkbox" id = "robbery" name = "cat4" value = "robbery"></input> 
                            <label class = "checkLabel" for = "cat4">
                                Mischief
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "sexualAssault" name = "cat5" value = "sexualAssault"></input> 
                            <label class = "checkLabel" for = "cat5">
                                Robbery & Theft
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "voyeurism" name = "cat6" value = "Voyeurism"></input> 
                            <label class = "checkLabel" for = "cat6">
                                Break & Enter
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "voyeurism" name = "cat6" value = "Voyeurism"></input> 
                            <label class = "checkLabel" for = "cat6">
                                Fraud
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "voyeurism" name = "cat6" value = "Voyeurism"></input> 
                            <label class = "checkLabel" for = "cat6">
                                Property Damage
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "voyeurism" name = "cat6" value = "Voyeurism"></input> 
                            <label class = "checkLabel" for = "cat6">
                                Protest
                            </label>
                            <br></br>
                        </td>

                            

                    </table>

                
                </div>
            </div>

           

            <div class = "dateHeader">
                <h4>
                    Recency 
                </h4>
            </div>

            <div class = "categorieSelects">
                <table class = "selectTable">
                    <td>
                        <input class = "dates" type = "checkbox" id = "lweek" name = "dog1" value = "Last Week" onClick={checkBoxClick}></input> 
                        <label class = "checkLabel" for = "dog1">
                            Last Week
                        </label>
                        <br></br>

                        <input class = "dates" type = "checkbox" id = "lmonth" name = "dog2" value = "Last Month" onClick={checkBoxClick}></input> 
                        <label class = "checkLabel" for = "dog2">
                            Last Month
                        </label>
                        <br></br>

                        <input class = "dates" type = "checkbox" id = "l3month" name = "dog3" value = "Last 3 Months" onClick={checkBoxClick}></input> 
                        <label class = "checkLabel" for = "dog3">
                            Last 3 Months
                        </label>
                        <br></br>
                    </td>

                    <td>
                        <input class = "dates" type = "checkbox" id = "l6month" name = "dog4" value = "Last 6 Months" onClick={checkBoxClick}></input> 
                        <label class = "checkLabel" for = "dog4">
                            Last 6 Months
                        </label>
                        <br></br>

                        <input class = "dates" type = "checkbox" id = "lyear" name = "dog5" value = "Last Year" onClick={checkBoxClick}></input> 
                        <label class = "checkLabel" for = "dog5">
                            Last Year
                        </label>
                        <br></br>
                        <br></br>
                    </td>

                        

                </table>
                <input class="changeButton" type = "button" value= "Change" onClick={() => updateData(currentData, RawData)}></input>
                

                
            </div>
        </div>
        <div id="#arrowBox" onClick={() => FlipArrow()} class="sideButton">
            <img id="#arrow" src={Arrow}/>
        </div>
    </div>
    )
}

export default MapPage;