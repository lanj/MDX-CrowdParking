
// street taken from windows.content where no conntent user enters manually
// 





$(input:button).keyup(function(){ 
	// get search
	var availability =  $('register').val();
	var date = Date();
	var userID =  localstorage.getItem('ID');
	var restriction = localstorage.getItem('Restriction');
	
	
	
	 // validate data for position
	
	
	/**
	 
	   x = document.getElementById("numb").value;
	   
	   if( isNAN(x)) {
		   
		   text = " entry not a number"
		   
		}else{
		   	
			text = " entry is good"
			
		 }
	   	
		document.getElementById("demo").innerHTML = text;
	   }
	
      **/


	function getValue(map , marker){
		
		
		
		
			$( document ).on( "pagecontainerbeforeload", function( event, data ) {
			
			// get page and store before changing pages.
			
				var long = marker.getPosition().lng();
				
				var Lati = marker.getPosition().Lat();
			
				var page =  data.url ;
				
				var items[] ;
				
				
				if(typeof(Storage) !== "undefined") {
					
				
					
					    items[1] =  localStorage.setItem("position" : position);
						items[2] =  localStorage.setItem(" url " :page);
						items[3] = localStorage.setItem(" ")
				    // Code for localStorage/sessionStorage.
					
					
				} else {
				    // Sorry! No Web Storage support..
				}
			
			
			});
			
			
			
		}
		
	}