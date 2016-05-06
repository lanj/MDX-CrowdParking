
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


			
			
			
			/**		
			  * initiate Map using google.maps.Map and mapOptions
    		  * @param none;
			  **/

				var map;
				var markers = [];
				var labels = "ABCDEFGHIJK"
				var index = 0;
				var newData ;
			
		  	  function initMap() {
				
				
			  /***
				*
				*apply maptype and setup map coordinates 
				*@constructor map;
				*@param {Div};
				*@param { MapOption} mapOptions;
				**/
			 
				  var middlesex = {lat:51.5898 , lng: -0.22695 };

				    map = new google.maps.Map(document.getElementById('map'), {
				      zoom: 15,
				      center: middlesex,
				      mapTypeId: google.maps.MapTypeId.TERRAIN
				    });
					
					
			        var script = document.createElement('script');
			        script.src = 'js/parkingMDX_GeoJSONP.js';
			        document.getElementsByTagName('head')[0].appendChild(script);
					
			        script = document.createElement('script');
			        script.src = 'js/schoolparking.js';
			        document.getElementsByTagName('head')[0].appendChild(script);
					

				    // This event listener will call addMarker() when the map is clicked.
				   
				    map.addListener('click', function(event) {
				      addMarker(event.latLng);
				    });
					

				    // Adds a marker at the center of the map.
				    addMarker(middlesex);
				  }
				  
				  
	  	          window.eqfeed_callback = function(results) {
			
	  	          	for (var i = 0; i < results.features.length; i++) {
			  
	  	            	var coords = results.features[i].geometry.coordinates;
	  					streets = results.features[i].properties.street;
	  					var bays = results.features[i].properties.baytype;
	  				//var bays = "blah";
				
	  	           	  var parkLatLng = { lat: coords[1], lng: coords[0] };
				

				  	addMarker(parkLatLng);
	
					}
					
	  	          }
				  

				  // Adds a marker to the map and push to the array.
				  function addMarker(location) {
					
				    var marker = new google.maps.Marker({
				      position: location,
					 // label: labels[index++ % labels.length],
					  icon:'img/map-pin-32.png',
				      map: map
						
				    });
					
					map.panTo(location);
					
					var info = new google.maps.InfoWindow();

				    marker.addListener('click', function() {
					  marker.setMap(map);
				      map.setZoom(15);
				      map.setCenter(marker.getPosition());
					  info.setContent("report new Location?" + "</hr>" + "<p align= center > <a href= Report.html  data-role=button target =_self  class = notify > Update status? </a> </p>" );
					  info.open(map,marker);
					  

					  
					  var userlatlng  = marker.getPosition();
					  

 				  	  
				    });
					
					marker.setMap(map);
						

				    markers.push(marker);

					
				  }

				  // Sets the map on all markers in the array.
				  function setMapOnAll(map) {
				    for (var i = 0; i < markers.length; i++) {
				      markers[i].setMap(map);
				    }
				  }

				  // Removes the markers from the map, but keeps them in the array.
				  function clearMarkers() {
				    setMapOnAll(null);
				  }

				  // Shows any markers currently in the array.
				  function showMarkers() {
				    setMapOnAll(map);
				  }

				  // Deletes all markers in the array by removing references to them.
				  function deleteMarkers() {
				    clearMarkers();
				    markers = [];
				  }
				  
				  
				  

				 
			 


