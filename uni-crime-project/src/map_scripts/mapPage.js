import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'

import '../css/map.css'

import { Loader } from "@googlemaps/js-api-loader"

import Arrow from '../images/arrow.png'

import { FilterByCategory, FilterByDate } from './mapFormat.js'

var coordinates = [];

//Demo markers
var markers = [[43.65917234681383, -79.39810606351988], [43.66025625958288, -79.39253756960474], [43.66643418871954, -79.40110256248767], [43.660671754289524, -79.39553406857253], [43.66206273738076, -79.39950442970485], [43.663453688270884, -79.39348646067563], [43.66574778357029, -79.3974817926327]] 

const loader = new Loader({
    apiKey: "AIzaSyD3c6wzabNKGdieh53xvuM9qn_vFt2mugs",
    version: "weekly",
}); 


function getLatLong(address){
    var geocoder;
    
    
    loader.load().then((google) => {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address, 'componentRestrictions': {'country': 'CA'}}, function(results, status) {
            if (status == 'OK') {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();

                coordinates.push([lat, lng]);
                console.log(coordinates);


            } else {
            alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    })
        
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

function updateData(currentData, RawData, map) {
    var categories = [];
    if(document.getElementById("assault").checked)
        categories.push("Assault")
    if(document.getElementById("robbery").checked) {
        categories.push("Robbery")
        categories.push("Theft")
    }
    if(document.getElementById("indecentAct").checked)
        categories.push("Indecent Act")
    if(document.getElementById("sexualAssault").checked)
        categories.push("Sexual Assault")
    if(document.getElementById("criminalHarassment").checked)
        categories.push("Criminal Harassment")
    if(document.getElementById("voyeurism").checked)
        categories.push("Voyeurism")
    if(document.getElementById("trespass").checked)
        categories.push("Trespass")
    if(document.getElementById("alarm").checked)
        categories.push("Alarm")
    if(document.getElementById("sus").checked) {
        categories.push("Suspicious Person")
        categories.push("Unwanted Person")
    }
    if(document.getElementById("property").checked) 
        categories.push("Property Damage")
    if(document.getElementById("fraud").checked)
        categories.push("Fraud")
    if(document.getElementById("protest").checked)
        categories.push("Protest")
    if(document.getElementById("medical").checked)
        categories.push("Medical")
    if(document.getElementById("drugs").checked)
        categories.push("Drugs")
    if(document.getElementById("mischief").checked)
        categories.push("Mischief")
    if(document.getElementById("driving").checked)
        categories.push("Impaired Driving")
    if(document.getElementById("break").checked)
        categories.push("Break and Enter")
    if(document.getElementById("harassment").checked)
        categories.push("Harassment")
    

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
    placeMarkers(categories, range, map)
}

function resetAll(currentData, RawData, map) {
    currentData = RawData;

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
        markers.forEach((marker) => {
            const markerAdd = new google.maps.Marker({
                position: { lat: marker[0], lng: marker[1] },
                map,
            });
        })
        
    });

}

//Hard-coded for demo
function placeMarkers(categories, range, map) {
    var markerList = []
    for(let i = 0; i < categories.length; i++) {
        if(categories[i].toLowerCase() == "Property Damage".toLowerCase())
            markerList.push(markers[0])
        if(categories[i].toLowerCase() == "Medical".toLowerCase())
            markerList.push(markers[1])
        if(categories[i].toLowerCase() == "Mischief".toLowerCase())
            markerList.push(markers[2])
        if(categories[i].toLowerCase() == "Impaired Driving".toLowerCase())
            markerList.push(markers[3])
        if(categories[i].toLowerCase() == "Suspicious Person".toLowerCase())
            markerList.push(markers[4])
        if(categories[i].toLowerCase() == "Theft".toLowerCase())
            markerList.push(markers[5])
        if(categories[i].toLowerCase() == "Break and Enter".toLowerCase())
            markerList.push(markers[6])
    }

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

        markerList.forEach((marker) => {
            const markerAdd = new google.maps.Marker({
                position: { lat: marker[0], lng: marker[1] },
                map,
            });
        })
    });


}

const checkBoxClick = (e) => {
    var checkboxes = document.querySelectorAll("input[type=checkbox][class='dates']");
    console.log(checkboxes)
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false
    })

    document.getElementById(e.target.id).checked = true;
}

function createCoordList (currentData){

    //console.log(getLatLong("300 Huron Street"))
    console.log(coordinates)
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
    createCoordList(currentData)
    
    let map;
    
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

        markers.forEach((marker) => {
            const markerAdd = new google.maps.Marker({
                position: { lat: marker[0], lng: marker[1] },
                map,
            });
        })

        const infowindow2 = new google.maps.InfoWindow({
            content: "Someone stubbed their toe. Address - 63 St.George Street",
            ariaLabel: "Medical",
        });

        marker2.addListener("click", () => {
            infowindow2.open({
              anchor: marker2,
              map,
            });
        });

        const marker3 = new google.maps.Marker({
            position: { lat: 43.663453688270884, lng: -79.39348646067563 },
            map,
        });

        const infowindow3 = new google.maps.InfoWindow({
            content: "Stolen Pencil. Address - 279 Bloor Street West",
            ariaLabel: "Theft",
        });

        marker3.addListener("click", () => {
            infowindow3.open({
              anchor: marker3,
              map,
            });
        });
         
        const marker4 = new google.maps.Marker({
            position: { lat: 43.66206273738076, lng: -79.39950442970485 },
            map,
        });

        const infowindow4 = new google.maps.InfoWindow({
            content: "Stolen Eraser. Address - 259 Bloor Street West",
            ariaLabel: "Theft",
        });

        marker4.addListener("click", () => {
            infowindow4.open({
              anchor: marker4,
              map,
            });
        });
         
        const marker5 = new google.maps.Marker({
            position: { lat: 43.660671754289524, lng: -79.39553406857253 },
            map,
        });

        const infowindow5 = new google.maps.InfoWindow({
            content: "False fire alarm. Address - 259 Bloor Street West",
            ariaLabel: "Alarm",
        });

        marker5.addListener("click", () => {
            infowindow5.open({
              anchor: marker5,
              map,
            });
        });
         
        const marker6 = new google.maps.Marker({
            position: { lat: 43.66643418871954, lng: -79.40110256248767 },
            map,
        });

        const infowindow6 = new google.maps.InfoWindow({
            content: "Unknown persons seen trespassing. Address - 32 Sussex St",
            ariaLabel: "Trespass",
        });

        marker6.addListener("click", () => {
            infowindow6.open({
              anchor: marker6,
              map,
            });
        });

        const marker7 = new google.maps.Marker({
            position: { lat: 43.66025625958288, lng: -79.39253756960474 },
            map,
        });

        const infowindow7 = new google.maps.InfoWindow({
            content: "Person taken to hospital. Address - 40 Sussex St",
            ariaLabel: "Medical",
        });

        marker7.addListener("click", () => {
            infowindow7.open({
              anchor: marker7,
              map,
            });
        });
         

    });

    
    // const [results, setResults] = useState([]);
    // createCoordList(currentData, results, setResults);


    

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
                            <input class = "checkboxes" type = "checkbox" id = "sus" name = "lion1" value = "sus"></input> 
                            <label class = "checkLabel" for = "lion1">
                                Suspicious Person
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "trespass" name = "lion2" value = "trespass"></input> 
                            <label class = "checkLabel" for = "lion2">
                                Trespass
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "alarm" name = "lion3" value = "alarm"></input> 
                            <label class = "checkLabel" for = "lion3">
                                Alarm
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "break" name = "lion4" value = "break"></input> 
                            <label class = "checkLabel" for = "lion4">
                                Break & Enter
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "medical" name = "lion5" value = "medical"></input> 
                            <label class = "checkLabel" for = "lion5">
                                Medical
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "driving" name = "lion6" value = "driving"></input> 
                            <label class = "checkLabel" for = "lion6">
                                Driving
                            </label>
                            <br></br>
                            
                            <input class = "checkboxes" type = "checkbox" id = "assault" name = "lion7" value = "assault"></input> 
                            <label class = "checkLabel" for = "lion7">
                                Assault
                            </label>
                            <br></br>
                        </td>

                        <td>
                            <input class = "checkboxes" type = "checkbox" id = "mischief" name = "lion8" value = "mischief"></input> 
                            <label class = "checkLabel" for = "lion8">
                                Mischief
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "robbery" name = "lion9" value = "robbery"></input> 
                            <label class = "checkLabel" for = "lion9">
                                Robbery & Theft
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "drugs" name = "lion10" value = "drugs"></input> 
                            <label class = "checkLabel" for = "lion10">
                                Drugs
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "fraud" name = "lion11" value = "fraud"></input> 
                            <label class = "checkLabel" for = "lion11">
                                Fraud
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "property" name = "lion12" value = "property"></input> 
                            <label class = "checkLabel" for = "lion12">
                                Property Damage
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "protest" name = "lion13" value = "protest"></input> 
                            <label class = "checkLabel" for = "lion13">
                                Protest
                            </label>
                            <br></br>

                            <input class = "checkboxes" type = "checkbox" id = "harassment" name = "lion14" value = "harassment"></input> 
                            <label class = "checkLabel" for = "lion14">
                                Harassment
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
                <input class="changeButton" type = "button" value= "Change" onClick={() => updateData(currentData, RawData, map)}></input>
                <br/>
                <input class="changeButton" type = "button" value= "Reset" onClick={() => resetAll(currentData, RawData, map)}></input>


                
            </div>
        </div>
        <div id="#arrowBox" onClick={() => FlipArrow()} class="sideButton">
            <img id="#arrow" src={Arrow}/>
        </div>
    </div>
    )
}

export default MapPage;