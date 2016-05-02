
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
			
			var bays = [];
			
			var marker = [];
			
			var address = [];
	
			var parked = false;
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
				bays = results.features[i].properties.baytype;
				//var bays = "blah";
				
	            parkLatLng = new google.maps.LatLng(coords[1],coords[0]);
				
	            var marker = new google.maps.Marker({

				  position: parkLatLng,
				  map: map
				
				 });
				 
				 marker.setMap(map);
				 addListenerMarker(marker, streets, bays , map );
				 //addListenerDetails(marker,street, bays , map);

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
					var parkinContent = "<div><p><b>Street: </b> "  + aStreet + " </p> "  + "<p ><b>Restrictions:</b>" + aBay + "  " + " (last updated: 15|04|16 ) </p>" + "<p id = report  align=center > <a href = # > Report issues</a> </p> "  + 
					" <p  id=park align=center> <a href= #  data-role= button target =_self > Park </a></p>" + "  <p  id=leave align=center><a href=# target = _self data-role= button > Leave </a></p>  </div> " ;
					
						//marker.setLabel(streets);
						var info = new google.maps.InfoWindow({
														//content: "" + aStreet + " "+ aBay  
							content: parkinContent 
							

							
						})
						
					 

   	   			     google.maps.event.addListener(aMarker, 'click', function( event) {

	                
					
						//$(this).on(setDetails( aMarker, aStreet , aBay ));
   						 // store data collected
   	   				 $(this).on(setoffMarkers(aMarker , aStreet , aBay , map ));

						 
	 					google.maps.event.addListener(aMarker, 'click', function(event) {
						 
	 				
							/**
							  *  launch infoWindow 
							  */
							 info.open(map, aMarker);
							 
                           // info.addDomListener( document.getElementByTag("a"), 'click', notifyFirebase);	
						 
	 					})

   	   			     })





								
		   
	 		       google.maps.event.addListener( aMarker, 'click', function(event) {

	 	
	 							 
	 							  $('#leave').on(setofMarkers(aMarker));
								  $('#report').on(setofMarkers(aMarker))
	 				
							  
					
						
	 							//$('#park').on(setoffMarkers(aMarker));
								
								//event.setProperty(name:"Access",false);
						
						    //toGeoJson(callback:function(geodata))

	 		       })
						
					  /**
						*  add listener
						* @param {Marker} aMarker
						* @param {MouseEvent} click
						* @param {Event} 
						*/


				   
			 	 

				 
				 
				 // get all the info values from infowindow.
				 function setoffMarkers(aMarker , aStreet , aBay, map ) {
						  var available = 'false';
						  // mark.setLabel('X');
						  var infodata = [];
						  infodata[0] = aMarker.getPosition();
						  infodata[1] = info.getContent();
						  var b = aBay;
						  var s = aStreet;
						  // var res = str.split(" ");

						  //		infodata[2] = map.data.features.Data.Features.getProperty().val;


						  //alert ( " hello" + infodata[0] + infodata[1]  + " street:" + s +  "<b> " + b + "</b>" );

						  // here I would update the records by calling some function to find the data based on
						  // input infodata , then I will addtogeojson file.
						  // finally i will call back the file with new updated data using
						  // map.data.loadGeoJson('url');


						  var geodata = [{street: aStreet, bay: b, lat: '39.984', lng: '-75.343'}];

						  /**

						   map.data.setStyle(function(feature) {
				   var label = " ";
				   
				   if (feature.getProperty('Accessible')) {
					 var theStreet = feature.getProperty(streets));
					 var clicked = theSTreet === s ? 'true' : 'false';
				   }
				   return ({
					 clickable: clicked
				   });
				 });

						   **/
					  }


				 function usersData(data) {


							  if (typeof(Storage) !== "undefined") {

								  $(document).on("pagecontainerbeforeload", function (event, data) {
									  // store data against users ID.
									  localStorage.setItem(JSON.stringify(geodata));

								  });

							  } else {

								  return false;
							  }

						  }



					  }
					  google.maps.event.addDomListener( window, 'load', initMap);
				 
				 
		
				 
			 
