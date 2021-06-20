var map =null;
let infoWindow;
var coord = { lat: 29.11911519796352 , lng:-110.9860431925739 };
function initMap(){
    map =   new google.maps.Map( document.getElementById("map"), {
    zoom:6,
    center:coord
    });
}

function addLocationButton(){
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Localizame";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              infoWindow.setPosition(pos);
              infoWindow.setContent("Tu estás aquí.");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
 function crear_marca(){
    var _coord = { lat: parseFloat(document.getElementById("lat").value) , lng: parseFloat(document.getElementById("lon").value) };
    var mark = new google.maps.Marker({
        position:_coord,
        map:map
    });
}

function customMark(){
    var _coord = { lat: parseFloat(document.getElementById("lat").value) , lng: parseFloat(document.getElementById("lon").value) };
    
    var content = document.getElementById("descripcion").value; // obtiene el contenido de la descripcion
    
    const infowindow = new google.maps.InfoWindow({
        content: content,
    }); // construye el elemento con el conenido 

    const marker = new google.maps.Marker({
        position: _coord,
        map,
        title: document.getElementById("title").value,
    }); // agrega el mark construido 
    marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
    }); // agrega un listener click para mostrar el contenido 

}
