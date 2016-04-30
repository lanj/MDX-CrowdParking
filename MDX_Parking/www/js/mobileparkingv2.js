
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

			var streets = [];
			
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
						zoom: 15 ,
						center: {lat: 51.5898860, lng: -0.2269573 }, mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					
			  	  	map = new google.maps.Map(document.getElementById('map'), mapOptions);
				

					        var script = document.createElement('script');
							
							/**
							  *  get GeoJson script with parking details for location.
							  *  
							  */
					        script.src = 'js/parkingMDX_GeoJSONP.js';
					        document.getElementsByTagName('head')[0].appendChild(script);
							
							
					

	  						
		
		
			    }
			/**
			  *  callback function, runs a loop and 
			  *  set coordinates lat and longitude
			  *  to each marker 
			  *  @constructor eqfeed_callback
			  *  use {@link maps#LatLng} to set the  marker coordinates 
              *  use {@link maps.Marker} to create marker for each coordinate
			  *  use {@link marker.setMap} to set marker 
			  *  @param {Array}results returned results from GEOJSON class
			  *
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
				
				 });
				 
				 marker.setMap(map);
				 addListenerMarker(marker, streets, bays , map );

                 
			    
	          }
			  
		  };
		  
			    /**
		          *   function addListener class for click event 
		   		  *   and calls the InfoWindow function to get parking details
		          *   @param {Marker}aMarker
		          *   @param {Street} aSTreet
		          *   @param {Map } map
		          */
		
		  		function addListenerMarker(aMarker, aStreet , aBay , map )
		        {
					var parkinContent = "<div><p><b>Street: </b> "  + aStreet + " </p> "  + "<p><b>Restrictions:</b>" + aBay + "  " + " (last updated: 15|04|16 ) </p>" + "<p id=report > <a href = # > Report issues</a> </p> "  + " <p > <a href= #  data-role= button target =_self > Park </a>" + "  |  " + " <a href=# target = _self data-role= button style= > Leave </a></p>  </div> " ;
					
						//marker.setLabel(streets);
						var info = new google.maps.InfoWindow({
														//content: "" + aStreet + " "+ aBay  
							content: parkinContent 
							
						})
								
						
					  /**
						*  add listener
						* @param {Marker} aMarker
						* @param {MouseEvent} click
						* @param {Event} 
						*/

				    google.maps.event.addListener(aMarker, 'click', function(event) {

				      /**
				      *  to be binded to links in infowindow and to report page.
				      */
					   info.open(map, aMarker);
						  

				   })
				
               }



		         google.maps.event.addDomListener( window, 'load', initMap);
				 
				 
		
				 
			 
