/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

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

window.setInterval(function(){ 
 map.locate();


  }, 30000);
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



 

$("#but_select").click(function () {
    document.getElementById("loader").style.display = "block";

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 75,
        targetWidth: 325,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});


function onSuccess(imageURI) {
    // Set image source
    var image = document.getElementById('img');
    image.src = imageURI + '?' + Math.random();

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = "xray.jpg" //imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "https://kedar123.pythonanywhere.com/ctpredict/", function (result) {
        //var data1 = result.response.replace(new RegExp("&#39;", "'"), replace);
        document.getElementById("loader").style.display = "none";

        //data1 = result.response.replace("&#39;", " ' ");
        alert("X-Ray Scan Results are : "+result.response);
        document.getElementById("xray").value = result.response;
 

    }, function (error) {
        alert('error : ' + JSON.stringify(error));
    }, options);

}


function onFail(message) {
alert('Failed because: ' + message);
}
 


$("#but_selectctscan").click(function () {
    document.getElementById("loader").style.display = "block";
 
    navigator.camera.getPicture(onSuccess2, onFail2, {
        quality: 75,
        targetWidth: 325,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});

function onSuccess2(imageURI) {
    // Set image source
    var image = document.getElementById('img2');
    image.src = imageURI + '?' + Math.random();

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = "xray.jpg" //imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "https://kedar123.pythonanywhere.com/ctpredict/", function (result) {
        //var data1 = result.response.replace(new RegExp("&#39;", "'"), replace);
        document.getElementById("loader").style.display = "none";

        //data1 = result.response.replace("&#39;", " ' ");
        alert("CT Scan Results are : "+result.response);
        document.getElementById("ctscan").value = result.response;



    }, function (error) {
        alert('error : ' + JSON.stringify(error));
    }, options);

}


function onFail2(message) {
alert('Failed because: ' + message);
}
var d = window.localStorage;
function upload(e){
    var id = d.getItem("ID");

    $.ajax({
        type: 'POST',
        data: {lon: e.latlng.lng, lat: e.latlng.lat,userID: id},
        url: 'http://192.168.0.103:8000/updateloc/',
        success: function(data){
            console.log(data);
            //alert('Your Location was successfully added');
            //findFriends();
            
        },
        error: function(){
            console.log(data);
            alert('There was an error adding your Location');
        }
    });
 
    return false;
}

function findFriends(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://example.com"; // site that doesn’t send Access-Control-*
    fetch(proxyurl+url) 
    $.getJSON(proxyurl+url, function(data) {
    //data is the JSON string
    L.marker([data.lng+5,data.lat+5]).addTo(map);
}); 
}


$.extend( $.ui.slider.prototype.options, { 
    animate: 300
});

$(".slider")
    .slider({
        max: 106,
        min: 97.7,
        range: "min", 
        
        step: 0.1,
    })
    .slider("pips", {
        first: "pip",
        last: "pip", 
        step: 1,
    })
    .slider("float");


    
$(".slider2")
.slider({
    max: 3,
    min: 1,
    range: "min",
     
})
.slider("pips", {
    first: "pip",
    last: "pip",
    
})
.slider("float", {
    labels:[ "LOW", "MED", "HIGH"],
});

 

// jQuery v3.3.1 is supported
$("#slider").roundSlider({
	radius: 72,
	circleShape: "half-top",
  sliderType: "min-range",
	mouseScrollAction: true,
  value: 96,
	handleSize: "+1",
	min: 96,
	max: 106
});


function updateData()
{  var phone = document.getElementById("Phone").value;
    var d = window.localStorage;

        d.setItem("number",phone);
        

}

$("#mainForm").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    /* get the action attribute from the <form action=""> element */
    var $form = $( this ),
        url = $form.attr( 'action' );

  
        $.ajax({
            url:url,
            type:'POST',
            data:$(this).serialize(),
            success:function(result){
                alert(result);

            }

    });
  });

 