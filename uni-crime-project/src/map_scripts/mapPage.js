function MapPage() {
    return (
      <div className="mapPage">
        <body>
            <h1>Map</h1>
            <div id="map"></div>
            <script src="mapMarker.js"></script>
            <script async defer src="https://maps.googleapis.com/maps/api/js?AIzaSyBYOQr_EjZiS-CV1AuLighoZ_Sr_ZGWFto&callback=initMap"></script>
        </body>
      </div>
    );
}
  
export default MapPage;
  