
/**
 * @fileOverview implement google map for parking
 * @author <a href="mailto:lj297@mdx.ac.uk">Lanre Jinadu</a>
 * @version 0.4
 */
	
	        /**
	          * declare global variables for taking map, LatLng , infoWindow , array of Street and  array of Marker
 			  * @class parkingMDX_GeoJSON
			  * @param {Map}
              * @param {LatLng} parkLatLng
              * @param {InfoWindow} info
              * @param {Marker []} marker
	          */

function initialize()
{
var mapProp = {
  center:myCenter,
  zoom:5,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });
}

function placeMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  var infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
  });
  infowindow.open(map,marker);
}

google.maps.event.addDomListener(window, 'load', initialize);
				