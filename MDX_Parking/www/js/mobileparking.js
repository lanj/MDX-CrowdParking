
/**
 * @fileOverview implement google map for parking
 * @author <a href="mailto:lj297@mdx.ac.uk">Lanre Jinadu</a>
 * @version 0.4
 */
	
	        /**
	          * declare global variables for taking map, LatLng , infoWindow , array of Street and  array of Marker
 			  * @class parkingMDX_GeoJSON
			  * @param {Map} map
              * @param {LatLng} parkLatLng
              * @param {InfoWindow} info
              * @param {Marker | Array} marker
              * @param {address| Array}
              * @param {Marker} markerX
              * @param {yname} 
			  * @param {isAccessble | boolean} 
			  * @return none;
 	          */

			var map ;
			
			var parkLatLng ;
			
		    var info;
			
			var isClick;
			
			var markerX;
			
			var scoreCount = 0;

			var streets = [];
			
			var bays = [];
			
			var marker = [];
			
			var address = [];
			
			var yname ;
			
	
			var isAccessible = true;
			
			var markerTemp = [];
			
			/**		
			  *
			  * initiate Map using google.maps.Map and mapOptions
			  *apply maptype and setup map coordinates 
			  *@constructor map;
			  *@param {Div};
			  *@param { MapOption} mapOptions;
    		  *@param none;
			  **/
			
		  	  function initMap() {
				
					// @ google.maps.Map.mapoptions set zoom and coordianate settings.
			       var mapOptions = {
						zoom: 15 ,
						center: {lat: 51.5898860, lng: -0.2269573 }, mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					
					// initiate map 
			  	  	map = new google.maps.Map(document.getElementById('map'), mapOptions);
				

                    // assign jsonp object to script 
					var script = document.createElement('script');

					script.src = 'js/parkMDX.js';
				    document.getElementsByTagName('head')[0].appendChild(script);
							

		
			    }
			/**
			  *  callback function, runs a loop and 
			  *  set coordinates lat and longitude
			  *  to each marker 
			  *  @constructor eqfeed_callback
			  *  {@link maps#LatLng} to set the  marker coordinates 
              *  {@link maps.Marker} to create marker for each coordinate
			  *  {@link marker.setMap} to set marker 
			  *  @param {Array}results returned results from GEOJSON class
			  *
			  */
			
	        window.eqfeed_callback = function(results) {
			
			  // loop through array of results and assign to global variables
	          for (var i = 0; i < results.features.length; i++) {
			  
	            var coords = results.features[i].geometry.coordinates;
				streets = results.features[i].properties.street;
				bays = results.features[i].properties.baytype;
				//var bays = "blah";
				
	            parkLatLng = new google.maps.LatLng(coords[1],coords[0]);
				
				// for each loop create marker with the assigned variables as properties
	            var marker = new google.maps.Marker({

				  position: parkLatLng,
				  map: map
				
				 });
				 
				 marker.setMap(map);
				 addListenerMarker(marker, streets, bays , map );
	
	          }
			  
		  };
		  
			    /**
		          *   name: addListener
		          *   Description: function addListener class for click event to initiate info object
		   		  *   which creates InfoWindow object with content about parking.
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
					" <p  id=leave align=center><a href=# target = _self onClick=notAccess() > Leave </a></p>  </div> " ;
					
					parkinContent[1] = "<div><p><b>Street: </b> "  + aStreet + " </p> "  + "<p ><b>Restrictions:</b>" + aBay + "  " + 
					" (last updated: 15|04|16 ) </p>" + "<p id = report  align=center > <a href = #  onclick=toReport()> Report issues</a> </p> "  + 
					" <p  id=park align=center> </p>" + 
					" <p  id=leave align=center><a href=# target = _self onClick= notAccess() > Leave </a></p>  </div> " ;
					
				
	
					// assign content with all links if flag is set true otherwise assign only report
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

	
	
	
					/**
					  * name: addListener
					  * 
					  * Description: listens for doubleclick on Marker 
					  * calls open function of the infowindow class.
					  *@param {Marker }
					  *@param {Event  } dblclick
					  *@param {callback}
					  *@return: none
					  **/
	
	 				google.maps.event.addListener(aMarker, 'dblclick', function(event) {
						 
							info.open(map, aMarker);
							
							 
  
	 				})

					 /**
					  * name: addListener
					  * 
					  * Description: listens for click on links Park, Leave and Report
					  * as document level events in InfoWindow googlemap class.
					  *@param {Marker }
					  *@param {Event  } click
					  *@param {callback}
					  *@return: none
					  **/
                    
   	   			     google.maps.event.addListener(aMarker, 'click', function( event) {
						 
						 
						
					/**
					  * name: toAccess
					  * @constructor
					  * Description: registers when user is parking at a location 
					  * label is set to X to identify locations reported as occupied.
					  * 
					  *@return : none
					  **/
  	   	 		     toAccess = function()
		              {
						 isAccessible = true;
						   
                      // set up precondition to set label only when there isAccessbile flag is true.
				     if(isAccessible === true){
							  
						   aMarker.setLabel('x');
						   
						   markerX = aMarker;
							   
					       info.close();
							  
						   
					       $(this).on(setoffMarkers(aMarker , aStreet , aBay , map ));
	 
							// test if parking is allocated
  	   					   alert("Parking taken");
  	   					   

						    isAccessible = false;
					  } 

						   
	
						  
			
  	   	 		       } 
					   
					   
					   
					/**
					  * name: notAccess
					  * @constructor
					  * Description: registers when user has left location
					  * label is unset from X to to default value 
					  * 
					  *@return : none
					  **/
						
						
   	   	 		     notAccess = function()
 		              {
					   
                             // precondition to check flag has been set false by access function and the marker 
                             // being reset is one labelled X
						    if((this.isAccessible == false) && (markerX.getLabel() === 'x')){
						
						       markerX.setLabel('');
						   
 					           $(this).on(setoffMarkers(aMarker , aStreet , aBay , map ));
	
   	   					       alert("parking freed ");

					     	   info.close();
							  
					     	   isAccessible = true;
						   
						   
					     } 
   	   	 		       } 
						
						
					/**
					  * name: toReport
					  * @constructor
					  * Description: registers when user is making a report 
					  * label is set to U to identify locations reported with issues
					  * 
					  *@return boolean
					  **/
					
   	   	 		     toReport = function()
  	                 {
				   
					     // precondition to check that none of the markers chosen has labelled X.

						 if(!(aMarker.getLabel() === 'x')){
				   
  				            aMarker.setLabel('u');
							
  					  	   $(this).on(setoffMarkers(aMarker , aStreet , aBay , map ));
   	   					   alert("Parking problems");


						   return true;
   	   	 		      } 
				  }
						
				
   	   			     } ) 

                 
				 
				 /**
				   * Description setofMarkers converts values to JSON to be passed on to server.
				   * name: setoffMarkers
				   * 
				   *@param {Marker }aMarker
				   *@param {Street} aStreet
				   *@param {Bay} aBay
				   *@param {Map} map
				   *
				   *
				   **/
					

				 function setoffMarkers(aMarker , aStreet , aBay, map ) {
					 
					 
					 
					 	  // initating local variables 
						  var available = 'false';
						  var infodata = [];
						  var b = aBay;
						  var s = aStreet;
						  
						  // assign lng and lat taken from marker 
						  var long = aMarker.getPosition().lng();
						  var lat = aMarker.getPosition().lat();
						 
						  infodata[0] = aMarker.getPosition();
						  infodata[1] = info.getContent();
						  
						  
						  // create geodata objects using the acquired properties taken from marker
						  var geodata = [{ type:"Point", "coordinates": [infodata[0].lat(),infodata[0].lng()]}];
						  var geodata = [{street: aStreet, bay: b, }];
						  var georank = [{ name:"  " , "scores": scoreCount}]	
						  
						  //create reference to firebase remote database				  
	 					  var scoreListRef = new Firebase('https://parkspace.firebaseio.com/scoreList');
		
						  //increment the global variable scoreCount to keep score of number of reports/actions by participant.
						  scoreCount += 1;
						  // push score to score list database in firebase.
						  scoreListRef.push({ name: 'test1', score: scoreCount});
						  
					
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
				 
				 
		      
				 
			 
