	var legend;
	var  layoutTable = null;
	anychart.onDocumentReady(chartone);






	//adding interaction
	function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#484847',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
	}
	
	
	function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
	}
	

	
	function onEachfirestaFeature(feature, layer) {
	FireSta = feature.properties.FireStat_1 ;
	onpopup = "<b>Fire Station Name:</b>"+FireSta ;

	
	layer.bindTooltip(onpopup);
	
	}
	

		
	var firestationlayer;
	var firestationdata;
	var firestationjson;
	function getFireStation(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/FireStation.geojson');
		client.onreadystatechange = firestationResponse;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function firestationResponse(){
	if(client.readyState == 4){
		var firestationdata = client.responseText;
		loadFireStationlayer(firestationdata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadFireStationlayer(firestationdata){
	var firestationjson = JSON.parse(firestationdata);
	if (hospitallayer) { // check
        mymap.removeLayer(hospitallayer); // remove the marker from the map

    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	if (boroughfireinclayer){
		mymap.removeLayer(boroughfireinclayer);
	}
	if (fireincident2017layer) { // check
		mymap.removeLayer(fireincident2017layer);
    }
	if (fireincident2018layer) { // check
		mymap.removeLayer(fireincident2018layer);
    }
	if (floodincidentlayer) { // check
		mymap.removeLayer(floodincidentlayer);
    }
	if (hazmatincidentlayer) { // check
		mymap.removeLayer(hazmatincidentlayer);
    }
	if (transportincidentlayer) { // check
		mymap.removeLayer(transportincidentlayer);
    }
	// REMOVING PREVIOUS INFO BOX
    if (legend != undefined) {
    legend.remove();
    }
	firestationlayer=L.geoJson(firestationjson,{onEachFeature:onEachfirestaFeature});
	firestationlayer.addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(firestationlayer.getBounds());
	}
	
	var hospitallayer;
	function getHospital(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/Hospital.geojson');
		client.onreadystatechange = hospitalResponse;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function hospitalResponse(){
	if(client.readyState == 4){
		var hospitaldata = client.responseText;
		loadHospitallayer(hospitaldata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadHospitallayer(hospitaldata){
	var hospitaljson = JSON.parse(hospitaldata);
	if (firestationlayer) { // check
        mymap.removeLayer(firestationlayer); // remove the marker from the map
		
    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	if (fireincident2017layer) { // check
		mymap.removeLayer(fireincident2017layer);
    }
	if (fireincident2018layer) { // check
		mymap.removeLayer(fireincident2018layer);
    }
	if (floodincidentlayer) { // check
		mymap.removeLayer(floodincidentlayer);
    }
	if (hazmatincidentlayer) { // check
		mymap.removeLayer(hazmatincidentlayer);
    }
	if (transportincidentlayer) { // check
		mymap.removeLayer(transportincidentlayer);
    }
	// REMOVING PREVIOUS INFO BOX
    if (legend != undefined) {
    legend.remove();
    }
	hospitallayer=L.geoJson(hospitaljson).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(hospitallayer.getBounds());
	}
	
	
	//adding fire Incident color
	function getFireIncBoColor(d) {
		return d > 1042 ? '#FC1F04' :
			   d > 923  ? '#FC9204' :
			   d > 788 ? '#F9FC04' :
			   d > 504  ? '#81FC04' :
			   d > 107  ?'#53A204':
			   '#53A204';
	}
	
	//adding population borough color
	function FireIncBostyle(feature) {
		return {
			fillColor: getFireIncBoColor(feature.properties.FireIncide),
			weight: 1,
			opacity: 1,
			color: '#979895',
			fillOpacity: 0.7
		};
	}
	
	function resetfireincboHighlight(e) {
    boroughfireinclayer.resetStyle(e.target);
	}
	
	
	function onEachfireincboFeature(feature, layer) {
	bo_name = feature.properties.NAME ;
	popbo = feature.properties.GLA_Popula ;
	firesta = feature.properties.Fire_Stati;
	fireinc = feature.properties.FireIncide ;
	onpopup = "<b>Borough Name:</b>"+bo_name +"<br />"+"<b>Borough Population:</b>"+popbo +"<br />"+"<b>Fire Station:</b>"+firesta+"<br />"+"<b>Fire Incident:</b>"+fireinc;
	
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetfireincboHighlight,
        click: zoomToFeature
    });
	
	layer.bindTooltip(onpopup);
	
	
	}
	
	
	
	
	var boroughfireincarray = [];
	var boroughfireinc = [];
	var boroughfireinclayer;
	function getfireincBorough(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/Borough.geojson');
		client.onreadystatechange = boroughfireincResponse;
		client.send();
		
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function boroughfireincResponse(){
	if(client.readyState == 4){
		console.log('1')
		var boroughfireincdata = client.responseText;
		loadBoroughfireinclayer(boroughfireincdata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadBoroughfireinclayer(boroughfireincdata){
	var boroughfireincjson = JSON.parse(boroughfireincdata);
	var features = []; 
	features = boroughfireincjson.features; 
	var jproperties = boroughfireincjson.features.map(function (el) { return el.properties; });
	var i;
	for (i = 0; i < jproperties.length; i++) { 
		boroughfireincarray.push(Object.values(jproperties[i]));
	}
	for (i = 0; i < boroughfireincarray.length; i++) { 
		boroughfireinc.push([boroughfireincarray[i][0],boroughfireincarray[i][5],boroughfireincarray[i][2]]);
	}
	
	highfireinc = [
      ["Westminster", 1251],
      ["Tower Hamlets", 1066],
      ["Hillingdon", 1047]
    ];
	
	lowfireinc = [
      ["City of London", 107],
      ["Richmond upon Thames", 361],
      ["Kingston upon Thames", 381]
    ];

	
	if (wardlayer) { // check
        mymap.removeLayer(wardlayer); // remove the marker from the map
    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	if (firestationlayer) { // check
        mymap.removeLayer(firestationlayer); // remove the marker from the map
		
    }
	if (hospitallayer) { // check
		mymap.removeLayer(hospitallayer);
    }
	if (fireincident2017layer) { // check
		mymap.removeLayer(fireincident2017layer);
    }
	if (fireincident2018layer) { // check
		mymap.removeLayer(fireincident2018layer);
    }
	if (floodincidentlayer) { // check
		mymap.removeLayer(floodincidentlayer);
    }
	if (hazmatincidentlayer) { // check
		mymap.removeLayer(hazmatincidentlayer);
    }
	if (transportincidentlayer) { // check
		mymap.removeLayer(transportincidentlayer);
    }
	// REMOVING PREVIOUS INFO BOX
    if (legend != undefined) {
    legend.remove();
    }
	
	boroughfireinclayer=L.geoJson(boroughfireincjson, {style: FireIncBostyle,onEachFeature: onEachfireincboFeature}).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(boroughfireinclayer.getBounds());
	
	legend = L.control({position: 'bottomright'});

	legend.onAdd = function (mymap) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [1042,923,788,504,107 ],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getFireIncBoColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(mymap);
	anychart.onDocumentReady(chartone);
	}
	
		//adding flood Incident color
	function getfloodIncBoColor(d) {
		return d > 492 ? '#FC1F04' :
			   d > 341  ? '#FC9204' :
			   d > 226 ? '#F9FC04' :
			   d > 150  ? '#81FC04' :
			   d > 37 ?'#53A204':
			   '#53A204';
	}
	
	//adding population borough color
	function floodIncBostyle(feature) {
		return {
			fillColor: getfloodIncBoColor(feature.properties.FloodIncid),
			weight: 1,
			opacity: 1,
			color: '#979895',
			fillOpacity: 0.7
		};
	}
	
	function resetfloodincboHighlight(e) {
    boroughfloodinclayer.resetStyle(e.target);
	}
	
	
	function onEachfloodincboFeature(feature, layer) {
	bo_name = feature.properties.NAME ;
	popbo = feature.properties.GLA_Popula ;
	firesta = feature.properties.Fire_Stati;
	floodinc = feature.properties.FloodIncid ;
	onpopup = "<b>Borough Name:</b>"+bo_name +"<br />"+"<b>Borough Population:</b>"+popbo +"<br />"+"<b>Fire Station:</b>"+firesta+"<br />"+"<b>Flood Incident:</b>"+floodinc;
	
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetfloodincboHighlight,
        click: zoomToFeature
    });
	
	layer.bindTooltip(onpopup);
	
	
	}

var boroughfloodincarray = [];
	var boroughfloodinc = [];
	var boroughfloodinclayer;
	function getfloodincBorough(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/Borough.geojson');
		client.onreadystatechange = boroughfloodincResponse;
		client.send();
		
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function boroughfloodincResponse(){
	if(client.readyState == 4){
		console.log('1')
		var boroughfloodincdata = client.responseText;
		loadBoroughfloodinclayer(boroughfloodincdata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadBoroughfloodinclayer(boroughfloodincdata){
	var boroughfloodincjson = JSON.parse(boroughfloodincdata);
	var features = []; 
	features = boroughfloodincjson.features; 
	var jproperties = boroughfloodincjson.features.map(function (el) { return el.properties; });
	var i;
	for (i = 0; i < jproperties.length; i++) { 
		boroughfloodincarray.push(Object.values(jproperties[i]));
	}
	for (i = 0; i < boroughfloodincarray.length; i++) { 
		boroughfloodinc.push([boroughfloodincarray[i][0],boroughfloodincarray[i][6],boroughfloodincarray[i][2]]);
	}
	
	// set the data
    highfloodinc= [
      ["Westminster", 565],
      ["Lambeth", 525],
      ["Southwark", 501]
    ];
	lowfloodinc = [
      ["City of London", 37],
      ["Kingston upon Thames", 97],
      ["Richmond upon Thames", 115]
    ];
	
	
	if (wardlayer) { // check
        mymap.removeLayer(wardlayer); // remove the marker from the map
    }
	if (boroughfireinclayer) { // check
        mymap.removeLayer(boroughfireinclayer); // remove the marker from the map
    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	if (firestationlayer) { // check
        mymap.removeLayer(firestationlayer); // remove the marker from the map
		
    }
	if (hospitallayer) { // check
		mymap.removeLayer(hospitallayer);
    }
	if (fireincident2017layer) { // check
		mymap.removeLayer(fireincident2017layer);
    }
	if (fireincident2018layer) { // check
		mymap.removeLayer(fireincident2018layer);
    }
	if (floodincidentlayer) { // check
		mymap.removeLayer(floodincidentlayer);
    }
	if (hazmatincidentlayer) { // check
		mymap.removeLayer(hazmatincidentlayer);
    }
	if (transportincidentlayer) { // check
		mymap.removeLayer(transportincidentlayer);
    }
	 if (legend != undefined) {
    legend.remove();
    }
	boroughfloodinclayer=L.geoJson(boroughfloodincjson, {style: floodIncBostyle,onEachFeature: onEachfloodincboFeature}).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(boroughfloodinclayer.getBounds());
	
	legend = L.control({position: 'bottomright'});

	legend.onAdd = function (mymap) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [492,341,226,150,37  ],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getfloodIncBoColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(mymap);
	anychart.onDocumentReady(charttwo);

	}
	
	var wardlayer;
	function getWard(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/Ward.geojson');
		client.onreadystatechange = wardResponse;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function wardResponse(){
	if(client.readyState == 4){
		var warddata = client.responseText;
		loadWardlayer(warddata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadWardlayer(warddata){
	var wardjson = JSON.parse(warddata);
		if (boroughfireinclayer) { // check
        mymap.removeLayer(boroughfireinclayer); // remove the marker from the map
    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	if (firestationlayer) { // check
        mymap.removeLayer(firestationlayer); // remove the marker from the map
		
    }
	if (hospitallayer) { // check
		mymap.removeLayer(hospitallayer);
    }
	if (fireincident2017layer) { // check
		mymap.removeLayer(fireincident2017layer);
    }
	if (fireincident2018layer) { // check
		mymap.removeLayer(fireincident2018layer);
    }
	if (floodincidentlayer) { // check
		mymap.removeLayer(floodincidentlayer);
    }
	if (hazmatincidentlayer) { // check
		mymap.removeLayer(hazmatincidentlayer);
    }
	if (transportincidentlayer) { // check
		mymap.removeLayer(transportincidentlayer);
    }
	// REMOVING PREVIOUS INFO BOX
    if (legend != undefined) {
    legend.remove();
    }
	wardlayer=L.geoJson(wardjson).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(wardlayer.getBounds());
	}
	
	var fireStyle = {
        radius: 2,
        fillColor: "red",
        color: "red",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };
	
	var fireincident2017layer;
	function getFireIncident2017(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/FireIncident_2017.geojson');
		client.onreadystatechange = fireincident2017Response;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function fireincident2017Response(){
	if(client.readyState == 4){
		var fireincident2017data = client.responseText;
		loadFireIncident2017layer(fireincident2017data);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadFireIncident2017layer(fireincident2017data){
	var fireincident2017json = JSON.parse(fireincident2017data);
	if (firestationlayer) { // check
        mymap.removeLayer(firestationlayer); // remove the marker from the map
    }
	if (hospitallayer) { // check
		mymap.removeLayer(hospitallayer);
    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	if (floodincidentlayer) { // check
		mymap.removeLayer(floodincidentlayer);
    }
	if (hazmatincidentlayer) { // check
		mymap.removeLayer(hazmatincidentlayer);
    }
	if (transportincidentlayer) { // check
		mymap.removeLayer(transportincidentlayer);
    }
	if (boroughfireinclayer) { // check
        mymap.removeLayer(boroughfireinclayer); // remove the marker from the map
    }
	// REMOVING PREVIOUS INFO BOX
    if (legend != undefined) {
    legend.remove();
    }
	fireincident2017layer=L.geoJson(fireincident2017json , {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, fireStyle);
        }
    }).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(fireincident2017layer.getBounds());
	}
	
	var fireincident2018layer;
	function getFireIncident2018(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/FireIncident_2018.geojson');
		client.onreadystatechange = fireincident2018Response;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function fireincident2018Response(){
	if(client.readyState == 4){
		var fireincident2018data = client.responseText;
		loadFireIncident2018layer(fireincident2018data);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadFireIncident2018layer(fireincident2018data){
	var fireincident2018json = JSON.parse(fireincident2018data);
	if (firestationlayer) { // check
        mymap.removeLayer(firestationlayer); // remove the marker from the map
    }
	if (hospitallayer) { // check
		mymap.removeLayer(hospitallayer);
    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	if (floodincidentlayer) { // check
		mymap.removeLayer(floodincidentlayer);
    }
	if (hazmatincidentlayer) { // check
		mymap.removeLayer(hazmatincidentlayer);
    }
	if (transportincidentlayer) { // check
		mymap.removeLayer(transportincidentlayer);
    }
	if (boroughfireinclayer) { // check
        mymap.removeLayer(boroughfireinclayer); // remove the marker from the map
    }
	// REMOVING PREVIOUS INFO BOX
    if (legend != undefined) {
    legend.remove();
    }
	fireincident2018layer=L.geoJson(fireincident2018json , {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, fireStyle);
        }
    }).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(fireincident2018layer.getBounds());
	}
	
	var floodStyle = {
        radius: 2,
        fillColor: "blue",
        color: "blue",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };
	
	var floodincidentlayer;
	function getFloodIncident(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/FloodIncident.geojson');
		client.onreadystatechange = floodincidentResponse;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function floodincidentResponse(){
	if(client.readyState == 4){
		var floodincidentdata = client.responseText;
		loadFloodIncidentlayer(floodincidentdata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadFloodIncidentlayer(floodincidentdata){
	var floodincidentjson = JSON.parse(floodincidentdata);
	if (firestationlayer) { // check
        mymap.removeLayer(firestationlayer); // remove the marker from the map
    }
	if (hospitallayer) { // check
		mymap.removeLayer(hospitallayer);
    }
	if (fireincident2017layer) { // check
		mymap.removeLayer(fireincident2017layer);
    }
	if (fireincident2018layer) { // check
		mymap.removeLayer(fireincident2018layer);
    }
	if (hazmatincidentlayer) { // check
		mymap.removeLayer(hazmatincidentlayer);
    }
	if (transportincidentlayer) { // check
		mymap.removeLayer(transportincidentlayer);
    }
	if (boroughfireinclayer) { // check
        mymap.removeLayer(boroughfireinclayer); // remove the marker from the map
    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	// REMOVING PREVIOUS INFO BOX
    if (legend != undefined) {
    legend.remove();
    }
	floodincidentlayer=L.geoJson(floodincidentjson , {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, floodStyle);
        }
    }).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(floodincidentlayer.getBounds());
	}
	
	var hazmatStyle = {
        radius: 2,
        fillColor: "brown",
        color: "brown",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };
	
	
	var hazmatincidentlayer;
	function getHazmatIncident(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/HazmatIncident.geojson');
		client.onreadystatechange = hazmatincidentResponse;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function hazmatincidentResponse(){
	if(client.readyState == 4){
		var hazmatincidentdata = client.responseText;
		loadHazmatIncidentlayer(hazmatincidentdata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadHazmatIncidentlayer(hazmatincidentdata){
	var hazmatincidentjson = JSON.parse(hazmatincidentdata);
	if (firestationlayer) { // check
        mymap.removeLayer(firestationlayer); // remove the marker from the map
    }
	if (hospitallayer) { // check
		mymap.removeLayer(hospitallayer);
    }
	if (fireincident2017layer) { // check
		mymap.removeLayer(fireincident2017layer);
    }
	if (fireincident2018layer) { // check
		mymap.removeLayer(fireincident2018layer);
    }
	if (floodincidentlayer) { // check
		mymap.removeLayer(floodincidentlayer);
    }
	if (transportincidentlayer) { // check
		mymap.removeLayer(transportincidentlayer);
    }
	if (boroughfireinclayer) { // check
        mymap.removeLayer(boroughfireinclayer); // remove the marker from the map
    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	// REMOVING PREVIOUS INFO BOX
    if (legend != undefined) {
    legend.remove();
    }
	hazmatincidentlayer=L.geoJson(hazmatincidentjson , {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, hazmatStyle);
        }
    }).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(hazmatincidentlayer.getBounds());
	}
	
	var transportStyle = {
        radius: 2,
        fillColor: "green",
        color: "green",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };
	
	
	var transportincidentlayer;
	function getTransportIncident(){
		client = new XMLHttpRequest();
		client.open('GET','GeoJSON/TransportIncident.geojson');
		client.onreadystatechange = transportincidentResponse;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function transportincidentResponse(){
	if(client.readyState == 4){
		var transportincidentdata = client.responseText;
		loadTransportIncidentlayer(transportincidentdata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadTransportIncidentlayer(transportincidentdata){
	var transportincidentjson = JSON.parse(transportincidentdata);
	if (firestationlayer) { // check
        mymap.removeLayer(firestationlayer); // remove the marker from the map
    }
	if (hospitallayer) { // check
		mymap.removeLayer(hospitallayer);
    }
	if (fireincident2017layer) { // check
		mymap.removeLayer(fireincident2017layer);
    }
	if (fireincident2018layer) { // check
		mymap.removeLayer(fireincident2018layer);
    }
	if (floodincidentlayer) { // check
		mymap.removeLayer(floodincidentlayer);
    }
	if (hazmatincidentlayer) { // check
		mymap.removeLayer(hazmatincidentlayer);
    }
	if (boroughfireinclayer) { // check
        mymap.removeLayer(boroughfireinclayer); // remove the marker from the map
    }
	if (boroughfloodinclayer) { // check
        mymap.removeLayer(boroughfloodinclayer); // remove the marker from the map
    }
	// REMOVING PREVIOUS INFO BOX
    if (legend != undefined) {
    legend.remove();
    }
	transportincidentlayer=L.geoJson(transportincidentjson , {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, transportStyle);
        }
    }).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(transportincidentlayer.getBounds());
	}

		// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
		// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);


//for chart

//variable in chart
var highfireinc ;
var lowfireinc ;
var highfloodinc ;
var lowfloodinc ;

//chart for fire	 
	function chartone() {
	if ( layoutTable != null)  layoutTable.container(null);
	
	// Variables for this dashboard
    var totalDataArray, detailCellName;
    var detailChart, detailPie;
    var selectedX = null;
    var totalSeries = null;
    var detailSeries_1 = null;
    var detailSeries_2 = null;

    layoutTable = anychart.standalones.table(5, 4);
    layoutTable.cellBorder(null);
    layoutTable.getCol(0).width('2.5%');
    layoutTable.getCol(1).width('55%');
    layoutTable.getCol(3).width('2.5%');
    layoutTable.getRow(0).height(20);
    layoutTable.getRow(2).height(50);
    layoutTable.getRow(4).height(20);

    detailCellName = layoutTable.getCell(2, 1);
    detailCellName.colSpan(2)
            .hAlign('center')
            .vAlign('bottom')
            .padding(0, 0, 5, 0)
            .fontSize(16);
    detailCellName.border().bottom('3 #EAEAEA');

    layoutTable.getCell(1, 1).colSpan(2).content(mainChart());
    layoutTable.getCell(3, 1).content(drawDetailPieOne());
    layoutTable.getCell(3, 2).content(drawDetailPieTwo());
    layoutTable.container('container1');
    layoutTable.draw();
	
		//barchart
		function mainChart() {
		
		var rawData = boroughfireinc;
		var data = anychart.data.set(rawData);
		// map the data
		var seriesData_1 = data.mapAs({x: 0, value: 1});
		var seriesData_2 = data.mapAs({x: 0, value: 2});
		// create a chart
		var barchart = anychart.column();
		
		// create scale for line series and extraYAxis
		// it force line series to not stuck values with over series
		var scale = anychart.scales.linear();

		// create extra axis on the right side of chart
		barchart.yAxis(1)
				.title('Population')
				.orientation('right')
				.scale(scale);

		// create the first series, set the data and name
		var series1 = barchart.column(seriesData_1);
		series1.name("Fire Incident")
		.color('#ff8080');
		
		 // create line series and set scale for it
		var lineSeries = barchart.spline(seriesData_2);
		lineSeries.name('Population')
				.yScale(scale)
				.stroke('1.5 #ef6c00');
			
			
		// enable stagger mode
		barchart.xAxis().staggerMode(true);
		// set the number of lines for labels to stagger 
		barchart.xAxis().staggerLines(2);
		// disabling first and last labels
		barchart.xAxis().drawFirstLabel(false);
		barchart.xAxis().drawLastLabel(false);
		//chart scale
		barchart.yScale(anychart.scales.linear());
		
		//chart grid
		barchart.yGrid().stroke({
		  // set stroke color
		  color: "#ff8080",
		  // set dashes and gaps length
		  dash: "3 5"
		});
		
		barchart.title('Fire Incident per Borough');
		
		//multi select
		// multi-select enabling
		var interactivity = barchart.interactivity();
		interactivity.selectionMode("multiSelect");
		//tooltip
		// configure tooltips on the chart
		series1.tooltip().format("Flood Incident:{%value}");
		lineSeries.tooltip().format("Population:{%value}");
		
		barchart.xScroller(true);
		
		return barchart
			}
			
		function drawDetailPieOne(){

		var pieonechart = anychart.pie(highfireinc);
		pieonechart.title("Highest ");
		return pieonechart
		}
		
		function drawDetailPieTwo(){

		var pietwochart = anychart.pie(lowfireinc);
		pietwochart.title("Lowest");
		return pietwochart
		}
    
	}

//chart for flood	
	function charttwo() {
	if ( layoutTable != null)  layoutTable.container(null);
	
	// Variables for this dashboard
    var totalDataArray, detailCellName;
    var detailChart, detailPie;
    var selectedX = null;
    var totalSeries = null;
    var detailSeries_1 = null;
    var detailSeries_2 = null;

    layoutTable = anychart.standalones.table(5, 4);
    layoutTable.cellBorder(null);
    layoutTable.getCol(0).width('2.5%');
    layoutTable.getCol(1).width('55%');
    layoutTable.getCol(3).width('2.5%');
    layoutTable.getRow(0).height(20);
    layoutTable.getRow(2).height(50);
    layoutTable.getRow(4).height(20);

    detailCellName = layoutTable.getCell(2, 1);
    detailCellName.colSpan(2)
            .hAlign('center')
            .vAlign('bottom')
            .padding(0, 0, 5, 0)
            .fontSize(16);
    detailCellName.border().bottom('3 #EAEAEA');

    layoutTable.getCell(1, 1).colSpan(2).content(mainChart());
    layoutTable.getCell(3, 1).content(drawDetailPieOne());
    layoutTable.getCell(3, 2).content(drawDetailPieTwo());
    layoutTable.container('container1');
    layoutTable.draw();
	
	
		function mainChart() {
		
		var rawData = boroughfloodinc;
		var data = anychart.data.set(rawData);
		// map the data
		var seriesData_1 = data.mapAs({x: 0, value: 1});
		var seriesData_2 = data.mapAs({x: 0, value: 2});
		// create a chart
		var barchart = anychart.column();
		
		// create scale for line series and extraYAxis
		// it force line series to not stuck values with over series
		var scale = anychart.scales.linear();

		// create extra axis on the right side of chart
		barchart.yAxis(1)
				.title('Population')
				.orientation('right')
				.scale(scale);

		// create the first series, set the data and name
		var series1 = barchart.column(seriesData_1);
		series1.name("Flood Incident")
		.color('#99ebff');
		
		 // create line series and set scale for it
		var lineSeries = barchart.spline(seriesData_2);
		lineSeries.name('Population')
				.yScale(scale)
				.stroke('1.5 #ef6c00');
		
		// enable stagger mode
		barchart.xAxis().staggerMode(true);
		// set the number of lines for labels to stagger 
		barchart.xAxis().staggerLines(2);
		// disabling first and last labels
		barchart.xAxis().drawFirstLabel(false);
		barchart.xAxis().drawLastLabel(false);
		//chart scale
		barchart.yScale(anychart.scales.linear());
		
		//chart grid
		barchart.yGrid().stroke({
		  // set stroke color
		  color: "#99ebff",
		  // set dashes and gaps length
		  dash: "3 5"
		});
		barchart.title('Flood Incident per Borough');
		
		
		
		//multi select
		// multi-select enabling
		var interactivity = barchart.interactivity();
		interactivity.selectionMode("multiSelect");
		//tooltip
		series1.tooltip().format("Flood Incident:{%value}");
		lineSeries.tooltip().format("Population:{%value}");

		barchart.xScroller(true);
		return barchart
			}
			
		function drawDetailPieOne(){

		var pieonechart = anychart.pie(highfloodinc);
		pieonechart.title("Highest Flood Incident Per Borough ");
		return pieonechart
		}
		
		function drawDetailPieTwo(){

		var pietwochart = anychart.pie(lowfloodinc);
		pietwochart.title("Lowest Flood Incident Per Borough");
		return pietwochart
		}
    
	}



