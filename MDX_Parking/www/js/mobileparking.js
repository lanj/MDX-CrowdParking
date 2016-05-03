
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
			
			var markerX;
			
			var address = [];
			
			var isClick;
	
			var isAccessible = true;
			
			var markerTemp = [];
			
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
					        script.src = 'js/parkMDX.js';
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
					
					var parkinContent = [];
					var parkinDetails;
					
					parkinContent[0] = "<div><p><b>Street: </b> "  + aStreet + " </p> "  + "<p ><b>Restrictions:</b>" + aBay + "  " + 
					" (last updated: 15|04|16 ) </p>" + "<p id = report  align=center > <a href = #  onclick=toReport()> Report issues</a> </p> "  + 
					" <p  id=park align=center> <a href= #  target =_self onClick=toAccess() id = park > Park </a></p>" + 
					" <p  id=leave align=center><a href=# target = _self onClick= notAccess() > Leave </a></p>  </div> " ;
					
					parkinContent[1] = "<div><p><b>Street: </b> "  + aStreet + " </p> "  + "<p ><b>Restrictions:</b>" + aBay + "  " + 
					" (last updated: 15|04|16 ) </p>" + "<p id = report  align=center > <a href = #  onclick=toReport()> Report issues</a> </p> "  + 
					" <p  id=park align=center> </p>" + 
					" <p  id=leave align=center><a href=# target = _self onClick= notAccess() > Leave </a></p>  </div> " ;
					
				
	
					if(isAccessible === true){
						
				        info = new google.maps.InfoWindow({

							content: parkinContent[0]
					    });
					}else{
						parkDetails = parkingContent[1];
				        info = new google.maps.InfoWindow({

						 content: parkingContent[1]

					   });
					}

					
						//marker.setLabel(streets);
					     
						
						
					
					
					
	 				google.maps.event.addListener(aMarker, 'dblclick', function(event) {
						 
							info.open(map, aMarker);
							
							 
  
	 				})

					 

   	   			     google.maps.event.addListener(aMarker, 'click', function( event) {
						 
						

 
						 
						
						 

						
						
  	   	 		     toAccess = function(event)
		              {
						  

				  if(isAccessible === true){
							  
						       aMarker.setLabel('x');
							   
					           info.close();
							   
					//		   markerX = aMarker;
							   
					//		   markersTemp = marker;
							  
							
	
						   
					       $(this).on(setoffMarkers(aMarker , aStreet , aBay , map ));
	 
	                       
					       
  	   					   alert("Parking taken"  );
  	   					   console.log('called');

						   
						    isAccessible = false;
					  } 

						   
	
						  
			
  	   	 		       } 
					   
					   
					   
					  
				
						
						
   	   	 		     notAccess = function()
 		              {
					   

						    if((isAccessible == false) && (aMarker.getLabel() === 'x')){
						
						       aMarker.setLabel('');
						   
 					           $(this).on(setoffMarkers(aMarker , aStreet , aBay , map ));
	
   	   					       alert("parking freed ");

					      info.close();
					      isAccessible = true;
						   
						   
					     } 
   	   	 		       } 
						
						
						
					
   	   	 		     toReport = function()
  	                 {
				   
					  

				   
				   
  				            aMarker.setLabel('u');
							
  					  	     $(this).on(setoffMarkers(aMarker , aStreet , aBay , map ));
   	   					   alert("Parking problems");
   	   					   console.log('called');
						   
					     
					   
						   return true;
   	   	 		      } 
						
				
   	   			     } ) 


					


				 function setoffMarkers(aMarker , aStreet , aBay, map ) {
						  var available = 'false';
						//  aMarker.setLabel('X');
						  var infodata = [];
						  infodata[0] = aMarker.getPosition();
						  infodata[1] = info.getContent();
						  var b = aBay;
						  var s = aStreet;
	

						  var geodata = [{ type:"Point", "coordinates": [infodata[0].lat(),infodata[0].lng()]}];
						  var geodata = [{street: aStreet, bay: b, }];
						  
						  
						 
						 
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
				 
				 
		
				 
			 
