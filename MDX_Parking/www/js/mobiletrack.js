
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

			var map ;
			
			var parkLatLng ;
			
		    var info;
			
			//var streets = [];
			
			var streets ;
			
			var marker = [];
			
			
			
			/**		
			  * initiate Map using google.maps.Map and mapOptions
    		  * @param none;
			  **/
			
		  	  function initMap() {
				
				
			  /***
				*
				*apply maptype and setup map coordinates 
				*@constructor map;
				*@param {Div};
				*@param { MapOption} mapOptions;
				**/
				  
		     
				  
			  var mapOptions = {
						zoom: 19 ,
						center: {lat: 51.5898860, lng: -0.2269573 }, mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					

					  map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
					  
					  
			        var script = document.createElement('script');
					
					/**
					  *  get GeoJson script with parking details for location.
					  *  
					  */
			        script.src = 'js/parkingMDX_GeoJSONP.js';
			        document.getElementsByTagName('head')[0].appendChild(script);

					  google.maps.event.addListener(map, 'click', function(event) {
					    placeMarker(event.latLng);
					  });
					}
					
					
					

					function currentLocation(location) {
					  var marker = new google.maps.Marker({
					    position: location,
					    map: map,
					  });
					  var infowindow = new google.maps.InfoWindow({
						  content: ' your current location'
					  });
					  infowindow.open(map,marker);
					}
					
					
					/**
					  * get geojson data for locations.
					  */
			        window.eqfeed_callback = function(results) {
			
			          for (var i = 0; i < results.features.length; i++) {
			  
			            var coords = results.features[i].geometry.coordinates;
						streets = results.features[i].properties.street;
						var bays = results.features[i].properties.baytype;
						//var bays = "blah";
				
			            parkLatLng = new google.maps.LatLng(coords[1],coords[0]);
				
			            var marker = new google.maps.Marker({

						  position: parkLatLng,
						  map: map
				
						 })
				 
						 marker.setMap(map);
						 

          
			    
			          }
			  
				  }

					google.maps.event.addDomListener(window, 'load', initMap);
				