
$("#friendForm").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault(); 
    var d = window.localStorage;
    var id;
    id = document.getElementById("userID").value;
    d.setItem("ID",id);
   

    /* get the action attribute from the <form action=""> element */
    var $form = $( this ),
        url = $form.attr( 'action' );

  
        $.ajax({
            url:url,
            type:'POST',
            data:$(this).serialize(),
            success:function(result){
                alert(result);
                location.reload();

            }

    });
  });

$("#addid").click(function(event){
    var d = window.localStorage;
    var id;
    id = document.getElementById("userID").value;
    d.setItem("ID",id);
    //location.reload();

    url = "http://192.168.0.103:8000/friendloc/"

    var d = window.localStorage;

        $.ajax({
            url:url,
            type:'POST',
            data:{userID: d.getItem("ID")},
            success:function(result){
                 var str_array = result.split(',');
                var frndId = [];
                var lat = [];
                var lon = []; 
                
                for(var i = 0; i < str_array.length; i++) {
                     
                    if ((i+1)%3 == 2)
                        {
                            lat.push(str_array[i]);  
                        }
                        if((i+1)%3==1){
                            frndId.push(str_array[i]);
                        }
                        if((i+1)%3==0){ 
                            lon.push(str_array[i]); 
                        }  
                } 
                
                 for(i=0;i<frndId.length;i++){
                    var latt = lat[i];
                    var lng = lon[i];
                    L.marker([parseFloat(latt),parseFloat(lng)]).addTo(map).bindPopup("Your Friend "+frndId[i]+" is Here" );
                    L.circle([parseFloat(latt),parseFloat(lng)], 5).addTo(map); 
                 } 
            }

    });

});


var map = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmlzaGlrZXNoazkiLCJhIjoiY2s4dWFtMzhkMDJvYTNtcDM2dnI1ZWxoNSJ9.iDACWKNRrGfnRlw93f9cEQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmlzaGlrZXNoazkiLCJhIjoiY2s4dWFtMzhkMDJvYTNtcDM2dnI1ZWxoNSJ9.iDACWKNRrGfnRlw93f9cEQ'
}).addTo(map);


map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({setView: true, maxZoom: 16});

var themarker = {}    
  var thecircle = {}  
function onLocationFound(e) {
    var radius = e.accuracy / 2;
    

    if (themarker != undefined) {
        map.removeLayer(themarker);
        map.removeLayer(thecircle);
  };


    themarker = L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point" + e.latlng);

    
    thecircle =  L.circle(e.latlng, radius).addTo(map);

    /*var lat = 18.659257;
            var lng = 73.777220;
            L.marker([parseFloat(lat),parseFloat(lng)]).addTo(map).bindPopup("Your Friend  is Here" );
            L.circle([parseFloat(lat),parseFloat(lng)], 50).addTo(map);*/
     upload(e);
}

function onLocationError(e) {
    if (tries < 10) {
        getLocation();
    }
    alert(e.message);
}

function getLocation() {
    tries += 1;
     map.locate({
         setView: true,
         maxZoom: 16,
         timeout: 5000,
         enableHighAccuracy: true
     });
 }

  $("#confirm").click(function(event) {

   
    /* get the action attribute from the <form action=""> element */
    
    url = "http://192.168.0.103:8000/accept/"

    var d = window.localStorage;

        $.ajax({
            url:url,
            type:'POST',
            data:{userID: d.getItem("ID"),friendID:document.getElementById("friendName").innerHTML},
            success:function(result){
                alert(result);
                location.reload();

            }

    });
  });


  $("#reject").click(function(event) {

   
    /* get the action attribute from the <form action=""> element */
    
    url = "http://192.168.0.103:8000/reject/"

    var d = window.localStorage;

        $.ajax({
            url:url,
            type:'POST',
            data:{userID: d.getItem("ID"),friendID:document.getElementById("friendName").innerHTML},
            success:function(result){
                alert(result);
                location.reload();

            }

    });
  });


