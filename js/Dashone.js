//add map
	// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
		// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);

var legend;
var i;

var  layoutTable = null;
	anychart.onDocumentReady(chartfiresta);


	
//remove layer

function removeLayer (){
	
	if ( firestationlayer) { // check
	mymap.removeLayer( firestationlayer); }// remove the marker from the map
	if ( hospitallayer) { // check
	mymap.removeLayer( hospitallayer); // remove the marker from the map

	}
	if ( boroughfirestalayer) { // check
	mymap.removeLayer( boroughfirestalayer); // remove the marker from the map
	}
	if (boroughallinclayer){
		mymap.removeLayer( boroughallinclayer); // remove the marker from the map
	}
	if (boroughfireincfloodinclayer){
		mymap.removeLayer(boroughfireincfloodinclayer);
	}
	// REMOVING PREVIOUS INFO BOX
	if (legend != undefined) {
	legend.remove();
	}
}

	
	//adding interaction
function highlightFeature(e) {
var layer = e.target;

layer.setStyle({
	weight: 5,
	color: '#666',
	dashArray: '',
	fillOpacity: 0.7
});

if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	layer.bringToFront();
}
}


function zoomToFeature(e) {
mymap.fitBounds(e.target.getBounds());
}


//click on map
function selectFeature(e) {
	
	e.target.feature.properties.selected = !e.target.feature.properties.selected;
	var seriesallincarray=seriesallinc.xe.FN;


	clickmap = e.target.feature.properties.NAME;
	var i = seriesallincarray.indexOf(clickmap)
	seriesallinc.select([i]);
	pieonechart.unselect();
	pietwochart.unselect();
	// }
	//select barchart
	boroughallinclayer.setStyle(function (feature){
	var i;
		if (clickmap === feature.properties.NAME ){
		feature.properties.selected = true;
			if (feature.properties.selected){
		return {
				weight: 5,
				fillColor: '#666',
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
				
			} }
		
	}else {
		feature.properties.selected = false;
		return allincBostyle(feature);
		// seriesallinc.unselect();
		
		}
	});
	
	//select pie chart one
	var i;
	for (i = 0; i < pieonechart.$h.length; i++){
	if (clickmap === pieonechart.$h[i][0] ){
	pieonechart.select([i]);}}
	
	//select map
	if (e.target.feature.properties.selected ) {
		e.target.setStyle({
			fillColor: '#666'
		});
	} else {
		e.target.setStyle({
			fillColor: '#ffffff'
		});
		
	}
	
	//select pie chart two
	var i;
	for (i = 0; i < pietwochart.$h.length; i++){
	if (clickmap === pietwochart.$h[i][0] ){
	pietwochart.select([i]);}}
	
	//select map
	if (e.target.feature.properties.selected ) {
		e.target.setStyle({
			fillColor: '#666'
		});
	} else {
		e.target.setStyle({
			fillColor: '#ffffff'
		});
		
	}
	
	console.log(clickmap);
    mymap.fitBounds(e.target.getBounds());
}


		



// fire station tooltip
function onEachfirestaFeature(feature, layer) {
FireSta = feature.properties.FireStat_1 ;
Borough = feature.properties.BOROUGH ;
onpopup = "<b>Fire Station Name:</b>"+FireSta+"<br />"+"<b>Borough:</b>"+Borough ;


layer.bindTooltip(onpopup);

}

var fireStyle = {
        radius: 7,
        fillColor: "red",
        color: "red",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };

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

if ( hospitallayer) { // check
	mymap.removeLayer( hospitallayer); // remove the marker from the map

	}
if ( boroughfirestalayer) { // check
	mymap.removeLayer( boroughfirestalayer); // remove the marker from the map
	}
if (boroughallinclayer){
	mymap.removeLayer( boroughallinclayer); // remove the marker from the map
}
if (boroughfireincfloodinclayer){
		mymap.removeLayer(boroughfireincfloodinclayer);
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

//hospital tooltip
function onEachhospitalFeature(feature, layer) {
Hospital = feature.properties.Hospital_1 ;
Borough = feature.properties.BOROUGH ;
onpopup = "<b>Hospital Name:</b>"+Hospital+"<br />"+"<b>Borough:</b>"+Borough ;


layer.bindTooltip(onpopup);
}

var hosStyle = {
        radius: 7,
        fillColor: "white",
        color: "red",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };

var hospitallayer;
var hospitaldata;
var hospitaljson;
function getHospital(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/hospital.geojson');
	client.onreadystatechange = hospitalResponse;
	client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function hospitalResponse(){
if(client.readyState == 4){
	var hospitaldata = client.responseText;
	loadhospitallayer(hospitaldata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadhospitallayer(hospitaldata){
var hospitaljson = JSON.parse(hospitaldata);



if ( firestationlayer) { // check
mymap.removeLayer( firestationlayer); }// remove the marker from the map
if ( hospitallayer) { // check
mymap.removeLayer( hospitallayer); // remove the marker from the map

}
if ( boroughfirestalayer) { // check
mymap.removeLayer( boroughfirestalayer); // remove the marker from the map
}
if (boroughallinclayer){
	mymap.removeLayer( boroughallinclayer); // remove the marker from the map
}
if (boroughfireincfloodinclayer){
		mymap.removeLayer(boroughfireincfloodinclayer);
	}

// REMOVING PREVIOUS INFO BOX
if (legend != undefined) {
legend.remove();
}
hospitallayer=L.geoJson(hospitaljson,{onEachFeature:onEachhospitalFeature});
hospitallayer.addTo(mymap);
// change the map zoom so that all the data is shown
mymap.fitBounds(hospitallayer.getBounds());
}


//adding fire station range pink color
function getFireStaBoColor(d) {
	return d >= 4 ? '#a3297a' :
			d >= 3  ? '#ff4da6' :
		   d >= 2  ? '#ff80bf' :
		   d >= 1 ? '#ffb3d9' :
			 d >= 0 ?'#ffe6f2':
			 '#ffe6f2';
}

//adding population borough color
function FireStaBostyle(feature) {
	return {
		fillColor: getFireStaBoColor(feature.properties.Fire_Stati),
		weight: 1,
		opacity: 1,
		color: '#979895',
		fillOpacity: 0.7
	};
}

function resetfirestaboHighlight(e) {
boroughfirestalayer.resetStyle(e.target);
}


function onEachfirestaboFeature(feature, layer) {
bo_name = feature.properties.NAME ;
popbo = feature.properties.popden ;
firesta = feature.properties.Fire_Stati;
fireinc = feature.properties.FireIncide;
onpopup = "<b>Borough Name:</b>"+bo_name +"<br />"+"<b>Population Density:</b>"+popbo +"<br />"+"<b>Fire Station:</b>"+firesta+"<br />"+"<b>Fire Incident:</b>"+fireinc

layer.on({
	mouseover: highlightFeature,
	mouseout: resetfirestaboHighlight,
	click: zoomToFeature
});

layer.bindTooltip(onpopup);


}



var boroughfirestaarray = [];
var boroughfiresta = [];
var boroughfirestalayer;
function getfirestaBorough(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/Borough.geojson');
	client.onreadystatechange = boroughfirestaResponse;
	client.send();
	
}
// create the code to wait for the response from the data server, and process the response once it is received
function boroughfirestaResponse(){
if(client.readyState == 4){
	var boroughfirestadata = client.responseText;
	loadBoroughfirestalayer(boroughfirestadata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadBoroughfirestalayer(boroughfirestadata){
var boroughfirestajson = JSON.parse(boroughfirestadata);
var features = []; 
features = boroughfirestajson.features; 
var jproperties = boroughfirestajson.features.map(function (el) { return el.properties; });
var i;
for (i = 0; i < jproperties.length; i++) { 
	boroughfirestaarray.push(Object.values(jproperties[i]));
}
for (i = 0; i < boroughfirestaarray.length; i++) { 
	boroughfiresta.push([boroughfirestaarray[i][0],boroughfirestaarray[i][2],boroughfirestaarray[i][6]]);
}

highfiresta = [
  ["Croydon", 4],
  ["Southwark", 4],
  ["Kingston upon Thames", 3]
];

lowfiresta = [
  ["Wandsworth", 0],
  ["Islington", 0],
  ["Barking and Dagenham", 0]
  ["City of London", 0]
];



if (boroughallinclayer){
		mymap.removeLayer( boroughallinclayer); // remove the marker from the map
	}


// REMOVING PREVIOUS INFO BOX
if (legend != undefined) {
legend.remove();
}

boroughfirestalayer=L.geoJson(boroughfirestajson, {style: FireStaBostyle,onEachFeature: onEachfirestaboFeature}).addTo(mymap);
// change the map zoom so that all the data is shown
mymap.fitBounds(boroughfirestalayer.getBounds());

legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = [3,2,1,0],
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + getFireStaBoColor(from + 1) + '"></i> ' +
			from + (to ? '&ndash;' + to : '+'));
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

legend.addTo(mymap);
anychart.onDocumentReady(chartfiresta);
}

//for chart
//variable for chart one (fire station, population and borough)
var highfiresta ;
var lowfiresta ;

//chart for (fire station, population and borough)
function chartfiresta() {
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
layoutTable.getCol(1).width('50%');
layoutTable.getCol(3).width('2.5%');
layoutTable.getRow(0).height(20);
layoutTable.getRow(2).height(10);
layoutTable.getRow(4).height(20);

detailCellName = layoutTable.getCell(2, 1);
detailCellName.colSpan(2)
		.hAlign('center')
		.vAlign('bottom')
		.padding(0, 0, 5, 0)
		.fontSize(14);
detailCellName.border().bottom('3 #464748');

layoutTable.getCell(1, 1).colSpan(2).content(mainChart());
layoutTable.getCell(3, 1).content(drawDetailPieOne());
layoutTable.getCell(3, 2).content(drawDetailPieTwo());
layoutTable.container('container1');
layoutTable.draw();



	//barchart
	function mainChart() {
	
	var rawData = boroughfiresta;
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
			.orientation('right')
			.scale(scale);
	// create extra axis on the right side of chart
	var yyTitle = barchart.yAxis(1).title();
	yyTitle.enabled(true);
	yyTitle.text('Population Density');
	yyTitle.fontSize(10);
	
	// create extra axis on the right side of chart
	var yTitle = barchart.yAxis().title();
	yTitle.enabled(true);
	yTitle.text('Fire Stations');
	yTitle.fontSize(10);

	// create the first series, set the data and name
	var series1 = barchart.column(seriesData_1);
	series1.name("Fire Station")
	.color('#ff3399');
	
	 // create line series and set scale for it
	var lineSeries = barchart.spline(seriesData_2);
	lineSeries.name('Population Density/sq.km')
			.yScale(scale)
			.stroke('1.5 #003366');
	
	// turn the legend on
    barchart.legend()
            .enabled(true)
            .fontSize(8)
            .padding([0, 0, 20, 0]);
		
		
	// enable stagger mode
	barchart.xAxis().staggerMode(true);
	// set the number of lines for labels to stagger 
	barchart.xAxis().staggerLines(1);
	// disabling first and last labels
	barchart.xAxis().drawFirstLabel(false);
	barchart.xAxis().drawLastLabel(false);
	//chart scale
	barchart.yScale(anychart.scales.linear());
	
	//chart grid
	barchart.yGrid().stroke({
	  // set stroke color
	  color: "#ff3399",
	  // set dashes and gaps length
	  dash: "3 5"
	});
	
	// turn on chart animation
    barchart.animation(true);
	
	var title;
	title = barchart.title();
	title.enabled(true);
	title.text("Comparing the number of fire stations with population density");
	title.fontSize(12);
	
	var labelsx = barchart.xAxis().labels();
	labelsx.fontSize(8);
	var labelsy = barchart.yAxis().labels();
	labelsy.fontSize(8);
	var labelsyy = barchart.yAxis(1).labels();
	labelsyy.fontSize(8);

	
	//multi select
	// multi-select enabling
	var interactivity = barchart.interactivity();
	interactivity.selectionMode("multiSelect");
	//tooltip
	// configure tooltips on the chart
	series1.tooltip().format("Fire Station:{%value}");
	lineSeries.tooltip().format("Population Density:{%value}");
	
	barchart.xScroller(true);
	
	return barchart

		}
		
	function drawDetailPieOne(){

	var pieonechart = anychart.pie(highfiresta);
	var title;
	title = pieonechart.title();
	title.enabled(true);
	title.text("Highest number of fire stations Per Borough");
	title.fontSize(12);
	


	pieonechart.normal().fill("#a3297a", 0.5);
	pieonechart.hovered().fill("#a3297a", 0.3);
	pieonechart.normal().stroke("#a3297a", 3);
	pieonechart.hovered().stroke("#a3297a", 3);
	return pieonechart
	}
	
	function drawDetailPieTwo(){

	var pietwochart = anychart.pie(lowfiresta);

	var title;
	title = pietwochart.title();
	title.enabled(true);
	title.text("Lowest number of fire stations Per Borough");
	title.fontSize(12);
	
	

	// configure connectors
	pietwochart.connectorStroke({color: "#595959", thickness: 0.5, dash:"2 2"});
	pietwochart.normal().fill("#faebf5", 0.5);
	pietwochart.hovered().fill("#faebf5", 0.3);
	pietwochart.normal().stroke("#faebf5", 3);
	pietwochart.hovered().stroke("#faebf5", 3);

	return pietwochart
	}

}

//adding all incident color
function getallincBoColor(d) {
	return d >= 1479 ? '#6f3800' :
			d >= 1238  ? '#934a00' :
		   d >= 990  ? '#b75c00' :
		   d >= 602 ? '#ff9224' :
			 d >= 144 ?'#ffc890':
			 '#ffc890';
}


function allincBostyle (feature) {
	return {
		fillColor: getallincBoColor(feature.properties.AllInciden),
		weight: 1,
		opacity: 1,
		color: '#979895',
		fillOpacity: 0.7
	};
}

function resetallincboHighlight(e) {
if (!e.target.feature.properties.selected){
boroughallinclayer.resetStyle(e.target);
};
}




function onEachallincboFeature (feature, layer) {
bo_name = feature.properties.NAME ;
popbo = feature.properties.popden ;
hospital = feature.properties.Hospital;
allinc = feature.properties.AllInciden;

onpopup = "<b>Borough Name:</b>"+bo_name +"<br />"+"<b>Population Density:</b>"+popbo +"<br />"+"<b>Hospital:</b>"+hospital+"<br />"+"<b>All Incident:</b>"+allinc

layer.on({
	mouseover: highlightFeature,
	mouseout: resetallincboHighlight,
	click: selectFeature
});

layer.bindTooltip(onpopup);


}


//click on chart select map and pie
function selectallincMap(){
	boroughallinclayer.setStyle(function (feature){
	
	//select on map
	if (clickchartallinc === feature.properties.NAME ){
	feature.properties.selected = true;
		return {
				weight: 5,
				fillColor: '#666',
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
				
		} 
		
	}else { 
		feature.properties.selected = false;
		 return allincBostyle(feature);
		}
	});
	//select pie one chart
	pieonechart.unselect();
	var i;
	for (i = 0; i < pieonechart.$h.length; i++){
	if (clickchartallinc === pieonechart.$h[i][0] ){
		pieonechart.select([i]);}

	}
	//select pie two chart
	pietwochart.unselect();
	var i;
	for (i = 0; i < pietwochart.$h.length; i++){
	if (clickchartallinc === pietwochart.$h[i][0] ){
		pietwochart.select([i]);}

	}
}

//click on pie chart one	
function selectallincPieChartOne(){
	var i;
	var seriesallincarray=seriesallinc.xe.FN;
	
	//select chart
	var i = seriesallincarray.indexOf(clickpiechartoneallinc)
	seriesallinc.select([i]);

	// }
	//select map
	boroughallinclayer.setStyle(function (feature){
	var i;
		if (clickpiechartoneallinc === feature.properties.NAME ){
		feature.properties.selected = true;
			if (feature.properties.selected){
		return {
				weight: 5,
				fillColor: '#666',
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
				
			} }
		
	}else {
		feature.properties.selected = false;
		return allincBostyle(feature);
		pieonechart.unselect();
		}
	});
		
}

//click on pie chart two
function selectallincPieChartTwo(){
	var i;
	var seriesallincarray=seriesallinc.xe.FN;
	
	//select chart
	var i = seriesallincarray.indexOf(clickpiecharttwoallinc)
	seriesallinc.select([i]);

	// }
	//select map
	boroughallinclayer.setStyle(function (feature){
	var i;
		if (clickpiecharttwoallinc === feature.properties.NAME ){
		feature.properties.selected = true;
			if (feature.properties.selected){
		return {
				weight: 5,
				fillColor: '#666',
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
				
			} }
		
	}else {
		feature.properties.selected = false;
		return allincBostyle(feature);
		pietwochart.unselect();
		}
	});
		
}
	

	

var boroughallincarray = [];
var boroughallinc = [];
var boroughallinclayer;
function getallincBorough(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/Borough.geojson');
	client.onreadystatechange = boroughallincResponse;
	client.send();
	
}
// create the code to wait for the response from the data server, and process the response once it is received
function boroughallincResponse(){
if(client.readyState == 4){
	var boroughallincdata = client.responseText;
	loadBoroughallinclayer(boroughallincdata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadBoroughallinclayer(boroughallincdata){
var boroughallincjson = JSON.parse(boroughallincdata);
var features = []; 
features = boroughallincjson.features; 
var jproperties = boroughallincjson.features.map(function (el) { return el.properties; });
var i;
for (i = 0; i < jproperties.length; i++) { 
	boroughallincarray.push(Object.values(jproperties[i]));
}
for (i = 0; i < boroughallincarray.length; i++) { 
	boroughallinc.push([boroughallincarray[i][0],boroughallincarray[i][7],boroughallincarray[i][2],boroughallincarray[i][6]]);
}

highallinc = [
  ["Westminster", 1816],
  ["Tower Hamlets", 1549],
  ["Southwark", 1478]
];

lowallinc = [
  ["City of London", 144],
  ["Richmond upon Thames", 476],
  ["Kingston upon Thames", 484]
];

if ( boroughfirestalayer) { // check
mymap.removeLayer( boroughfirestalayer); // remove the marker from the map
}


// REMOVING PREVIOUS INFO BOX
if (legend != undefined) {
legend.remove();
}

boroughallinclayer=L.geoJson(boroughallincjson, {style: allincBostyle,onEachFeature: onEachallincboFeature}).addTo(mymap);
// change the map zoom so that all the data is shown
mymap.fitBounds(boroughallinclayer.getBounds());

legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = [1479,1238,990,602,144],
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + getallincBoColor(from + 1) + '"></i> ' +
			from + (to ? '&ndash;' + to : '+'));
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

legend.addTo(mymap);
anychart.onDocumentReady(chartallinc);
}

//for chart
//variable for chart one (fire station, population and borough)
var highallinc ;
var lowallinc ;
var clickchartallinc;
var clickpiechartoneallinc;
var clickpiecharttwoallinc;

//chart for (fire station, population and borough)
function chartallinc() {
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
layoutTable.getCol(1).width('50%');
layoutTable.getCol(3).width('2.5%');
layoutTable.getRow(0).height(20);
layoutTable.getRow(2).height(10);
layoutTable.getRow(4).height(20);

detailCellName = layoutTable.getCell(2, 1);
detailCellName.colSpan(2)
		.hAlign('center')
		.vAlign('bottom')
		.padding(0, 0, 5, 0)
		.fontSize(14);
detailCellName.border().bottom('3 #464748');

layoutTable.getCell(1, 1).colSpan(2).content(mainChart());
layoutTable.getCell(3, 1).content(drawDetailPieOne());
layoutTable.getCell(3, 2).content(drawDetailPieTwo());
layoutTable.container('container1');
layoutTable.draw();

	function chartPointClick(e) {
    var index = e.point.getIndex();
	var row = data.row(index);
	clickchartallinc = row[0];
	console.log(clickchartallinc);
	selectallincMap();}
	
	function chartPointClickpieone(e){
	var index = e.point.getIndex();
	var row = highallinc[index];	
	clickpiechartoneallinc = row[0];
	console.log(clickpiechartoneallinc);
	pieonechart.unselect();
	for (i = 0; i < pieonechart.$h.length; i++){
		
	if (clickpiechartoneallinc === pieonechart.$h[i][0] ){
			
		pieonechart.select([i]);}
	}
	selectallincPieChartOne();
	}
	
	function chartPointClickpietwo(e){
	var index = e.point.getIndex();
	var row = lowallinc[index];	
	clickpiecharttwoallinc = row[0];
	console.log(clickpiecharttwoallinc);
	pietwochart.unselect();
	for (i = 0; i < pietwochart.$h.length; i++){
		
	if (clickpiecharttwoallinc === pietwochart.$h[i][0] ){
			
		pietwochart.select([i]);}
	}
	selectallincPieChartTwo();
	}
	
	//barchart
	function mainChart() {
	
	var rawData = boroughallinc;
	data = anychart.data.set(rawData);
	// map the data
	seriesData_allinc = data.mapAs({x: 0, value: 1});
	var seriesData_2 = data.mapAs({x: 0, value: 2});
	var seriesData_3 = data.mapAs({x: 0, value: 3});
	// create a chart
	barchart = anychart.column();
	
	// create scale for line series and extraYAxis
	// it force line series to not stuck values with over series
	var scale = anychart.scales.linear();

	

	// create the first series, set the data and name
	seriesallinc = barchart.column(seriesData_allinc);
	seriesallinc.name("All Incident")
	.color('#DEB887');
	
	 // create line series and set scale for it
	var lineSeries = barchart.spline(seriesData_2);
	lineSeries.name('Hospital')
			.yScale(scale)
			.stroke('1.5 #FF0000');



	var title;
	title = barchart.title();
	title.enabled(true);
	title.text("Comparing all incidents with the number of hospitals");
	title.fontSize(12);
	
	var labelsx = barchart.xAxis().labels();
	labelsx.fontSize(8);
	
	var labelsy = barchart.yAxis().labels();
	labelsy.fontSize(8);
	
	var labelsyy = barchart.yAxis(1).labels();
	labelsyy.fontSize(8);
	
	
	// enable stagger mode
	barchart.xAxis().staggerMode(true);
	// set the number of lines for labels to stagger 
	barchart.xAxis().staggerLines(1);
	// disabling first and last labels
	barchart.xAxis().drawFirstLabel(false);
	barchart.xAxis().drawLastLabel(false);
	//chart scale
	barchart.yScale(anychart.scales.linear());
	
	// create extra axis on the right side of chart
	var yyTitle = barchart.yAxis(1).title();
	yyTitle.enabled(true);
	yyTitle.text('Hospitals');
	yyTitle.fontSize(10);
	
	// create extra axis on the right side of chart
	var yTitle = barchart.yAxis().title();
	yTitle.enabled(true);
	yTitle.text('All incidents');
	yTitle.fontSize(10);
	
	barchart.yAxis(1)
			.orientation('right')
			.scale(scale);
	
	//chart grid
	barchart.yGrid().stroke({
	  // set stroke color
	  color: "#DEB887",
	  // set dashes and gaps length
	  dash: "3 5"
	});
	
	// turn the legend on
    barchart.legend()
            .enabled(true)
            .fontSize(8)
            .padding([0, 0, 20, 0]);


	// turn on chart animation
    barchart.animation(true);
	//multi select
	// multi-select enabling
	var interactivity = barchart.interactivity();
	interactivity.selectionMode("multiSelect");
	//tooltip
	// configure tooltips on the chart
	seriesallinc.tooltip().format("All Incident:{%value}");
	lineSeries.tooltip().format("Hospital:{%value}");
	
	barchart.xScroller(true);
	seriesallinc.listen('pointclick', chartPointClick);
	
	return barchart
		}
		
	function drawDetailPieOne(){

	pieonechart = anychart.pie(highallinc);

	var title;
	title = pieonechart.title();
	title.enabled(true);
	title.text("Highest all incidents Per Borough");
	title.fontSize(12);
	


	pieonechart.normal().fill("#4b2600", 0.5);
	pieonechart.hovered().fill("#4b2600", 0.3);
	pieonechart.normal().stroke("#4b2600", 3);
	pieonechart.hovered().stroke("#4b2600", 3);
	pieonechart.listen('pointclick', chartPointClickpieone);
	return pieonechart
	}
	
	function drawDetailPieTwo(){

	pietwochart = anychart.pie(lowallinc);
	var title;
	title = pietwochart.title();
	title.enabled(true);
	title.text("Lowest all incidents Per Borough");
	title.fontSize(12);


	pietwochart.normal().fill("#ffc890", 0.5);
	pietwochart.hovered().fill("#ffc890", 0.3);
	pietwochart.normal().stroke("#ffc890", 3);
	pietwochart.hovered().stroke("#ffc890", 3);
	pietwochart.listen('pointclick', chartPointClickpietwo);
	return pietwochart
	}

}




//compare fire and flood incident 	
//adding population borough color
function FireincFloodincBostyle(feature) {
	return {
		fillColor: '#DAF7A6  ',
		weight: 1,
		opacity: 1,
		color: '#979895',
		fillOpacity: 0.7
	};
}

function resetfireincfloodincboHighlight(e) {
	if (!e.target.feature.properties.selected){
boroughfireincfloodinclayer.resetStyle(e.target);
};
}



function onEachfireincfloodincboFeature(feature, layer) {
bo_name = feature.properties.NAME ;
popbo = feature.properties.popden ;
fireinc = feature.properties.FireIncide;
floodinc = feature.properties.FloodIncid;
onpopup = "<b>Borough Name:</b>"+bo_name +"<br />"+"<b>Population Density:</b>"+popbo +"<br />"+"<b>Fire Incident:</b>"+fireinc+"<br />"+"<b>Flood Incident:</b>"+floodinc




layer.on({
	mouseover: highlightFeature,
	mouseout: resetfireincfloodincboHighlight,
	click: selectFeature
});

layer.bindTooltip(onpopup);


}

var boroughfireincfloodincarray = [];
var boroughfireincfloodinc = [];
var boroughfireincfloodinclayer;
function getfireincfloodincBorough(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/Borough.geojson');
	client.onreadystatechange = boroughfireincfloodincResponse;
	client.send();
	
}
// create the code to wait for the response from the data server, and process the response once it is received
function boroughfireincfloodincResponse(){
if(client.readyState == 4){
	var boroughfireincfloodincdata = client.responseText;
	loadBoroughfireincfloodinclayer(boroughfireincfloodincdata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadBoroughfireincfloodinclayer(boroughfireincfloodincdata){
var boroughfireincfloodincjson = JSON.parse(boroughfireincfloodincdata);
var features = []; 
features = boroughfireincfloodincjson.features; 
var jproperties = boroughfireincfloodincjson.features.map(function (el) { return el.properties; });
var i;
for (i = 0; i < jproperties.length; i++) { 
	boroughfireincfloodincarray.push(Object.values(jproperties[i]));
}
for (i = 0; i < boroughfireincfloodincarray.length; i++) { 
	boroughfireincfloodinc.push([boroughfireincfloodincarray[i][0],boroughfireincfloodincarray[i][6],boroughfireincfloodincarray[i][3],boroughfireincfloodincarray[i][4]]);
}

highfireincfloodinc = [
  ["Westminster", 1251,565],
  ["Tower Hamlets", 1066,483],
  ["Hillingdons", 1047,190],
  ["Lambeth", 842,525],
  ["Southwark", 977,501]
];

lowfireincfloodinc = [
  ["Kingston upon Thames", 387,97],
  ["Richmond upon Thames", 361,115],
  ["City of London", 107,37]
];



if (boroughallinclayer){
	mymap.removeLayer( boroughallinclayer); // remove the marker from the map
}

if (boroughfirestalayer){
	mymap.removeLayer( boroughfirestalayer); // remove the marker from the map
}


// REMOVING PREVIOUS INFO BOX
if (legend != undefined) {
legend.remove();
}

boroughfireincfloodinclayer=L.geoJson(boroughfireincfloodincjson, {style: FireincFloodincBostyle,onEachFeature: onEachfireincfloodincboFeature}).addTo(mymap);
// change the map zoom so that all the data is shown
mymap.fitBounds(boroughfireincfloodinclayer.getBounds());

anychart.onDocumentReady(chartfireincfloodinc);
}

//for chart
//variable for chart one (fire station, population and borough)
var highfireincfloodinc ;
var lowfireincfloodinc ;
var clickchartfireincfloodinc;

//chart for (fire station, population and borough)
function chartfireincfloodinc() {
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
layoutTable.getCol(1).width('50%');
layoutTable.getCol(3).width('2.5%');
layoutTable.getRow(0).height(20);
layoutTable.getRow(2).height(10);
layoutTable.getRow(4).height(20);

detailCellName = layoutTable.getCell(2, 1);
detailCellName.colSpan(2)
		.hAlign('center')
		.vAlign('bottom')
		.padding(0, 0, 0, 0)
		.fontSize(14);
detailCellName.border().bottom('2 #464748');

layoutTable.getCell(1, 1).colSpan(2).content(mainChart());
layoutTable.getCell(3, 1).content(drawDetailPieOne());
layoutTable.getCell(3, 2).content(drawDetailPieTwo());
layoutTable.container('container1');
layoutTable.draw();

	function chartPointClick(e) {
    var index = e.point.getIndex();
	var row = data.row(index);
	clickchartfireincfloodinc = row[0];
	console.log(clickchartfireincfloodinc);

	}

	var data;
	//barchart
	function mainChart() {
	
	var rawData = boroughfireincfloodinc;
	data = anychart.data.set(rawData);
	
	// create line chart
    var barline = anychart.line();

    // set chart padding
    barline.padding([0, 0, 0, 0]);

    // turn on chart animation
    barline.animation(true);
	
	// map the data
	var seriesData_1 = data.mapAs({x: 0, value: 2});
	var seriesData_2 = data.mapAs({x: 0, value: 3});
	var seriesData_3 = data.mapAs({x: 0, value: 1});
	
	   // create logarithmic scale
    var logScale = anychart.scales.log();
    logScale.minimum(1)
            .maximum(2500);
			
	// set scale for the chart, this scale will be used in all scale dependent entries such axes, grids, etc
    barline.yScale(logScale);
	
	// turn on the crosshair
    barline.crosshair(true);
	
	// temp variable to store series instance
    var series;

    // setup first series
    series = barline.line(seriesData_1);
    series.name('Fire Incident')
	.stroke('1.5 #FF3633');

    // setup second series
    series = barline.line(seriesData_2);
    series.name('Flood Incident')
	.stroke('1.5 #33CCFF');


   
    // turn the legend on
    barline.legend()
            .enabled(true)
            .fontSize(8)
            .padding([0, 0, 20, 0]);
	

		
	// enable stagger mode
	barline.xAxis().staggerMode(true);
	// set the number of lines for labels to stagger 
	barline.xAxis().staggerLines(1);
	// disabling first and last labels
	barline.xAxis().drawFirstLabel(false);
	barline.xAxis().drawLastLabel(false);

	
	//chart grid
	barline.yGrid().stroke({
	  // set stroke color
	  color: "#003366",
	  // set dashes and gaps length
	  dash: "3 5"
	});
	

	//multi select
	// multi-select enabling
	var interactivity = barline.interactivity();
	interactivity.selectionMode("multiSelect");

	
	barline.xScroller(true);
	
	var title;
	title = barline.title();
	title.enabled(true);
	title.text("Comparing the number of fire incidents with flood incidents");
	title.fontSize(12);
	
	var labelsx = barline.xAxis().labels();
	labelsx.fontSize(8);

	var labelsy = barline.yAxis().labels();
	labelsy.fontSize(8);
	
	barline.listen('pointclick', chartPointClick);
	
	return barline
		}
		
	function drawDetailPieOne(){
	// create a data set
    var data = anychart.data.set(highfireincfloodinc);
	 // map the data
    var seriesData_1 = data.mapAs({x: 0, value: 1});
    var seriesData_2 = data.mapAs({x: 0, value: 2});

    // create a chart
    var polychartone = anychart.polar();

	// set the type of the x-scale
	polychartone.xScale("ordinal");

    // enable sorting points by x
    polychartone.sortPointsByX(true);

    // set the inner radius
    polychartone.innerRadius(10);

    // set the interactivity mode
    polychartone.interactivity().hoverMode("single");

    // create the first series, set the data and name
    var series1 = polychartone.polyline(seriesData_1);
    series1.name("Fire Incident");

    // configure the visual settings of the first series
    series1.normal().stroke("#FF3633", 1);
    series1.hovered().stroke("#FF3633", 0.5);
    series1.selected().stroke("#FF3633", 0.5);

	
	
	// create the first series, set the data and name
    var series2 = polychartone.polyline(seriesData_2);
    series2.name("Flood Incident");

    // configure the visual settings of the first series
    series2.normal().stroke("#33CCFF", 1);
    series2.hovered().stroke("#33CCFF", 0.5);
    series2.selected().stroke("#33CCFF", 0.5);

	
	// turn the legend on
    polychartone.legend()
            .enabled(true)
            .fontSize(8)
            .padding([0, 0, 20, 0]);
			
	var title;
	
	 title = polychartone.title();
	 title.enabled(true);
	 title.text('Comparing the highest fire incident and flood incident');
	title.fontSize(12);
	
	var labelsx = polychartone.xAxis().labels();
	labelsx.fontSize(8);
	var labelsy = polychartone.yAxis().labels();
	labelsy.fontSize(8);
	
	return polychartone
	}
	
	function drawDetailPieTwo(){
	// create a data set
    var data = anychart.data.set(lowfireincfloodinc);
	 // map the data
    var seriesData_1 = data.mapAs({x: 0, value: 1});
    var seriesData_2 = data.mapAs({x: 0, value: 2});

    // create a chart
    var polycharttwo = anychart.polar();

	// set the type of the x-scale
	polycharttwo.xScale("ordinal");

    // enable sorting points by x
    polycharttwo.sortPointsByX(true);

    // set the inner radius
    polycharttwo.innerRadius(10);

    // set the interactivity mode
    polycharttwo.interactivity().hoverMode("single");

    // create the first series, set the data and name
    var series1 = polycharttwo.polyline(seriesData_1);
    series1.name("Fire Incident");

    // configure the visual settings of the first series
    series1.normal().stroke("#FF3633", 1);
    series1.hovered().stroke("#FF3633", 0.5);
    series1.selected().stroke("#FF3633", 0.5);

	// create the first series, set the data and name
    var series2 = polycharttwo.polyline(seriesData_2);
    series2.name("Flood Incident");

    // configure the visual settings of the first series
    series2.normal().stroke("#33CCFF", 1);
    series2.hovered().stroke("#33CCFF", 0.5);
    series2.selected().stroke("#33CCFF", 0.5);

	
	    // turn the legend on
    polycharttwo.legend()
            .enabled(true)
            .fontSize(8)
            .padding([0, 0, 20, 0]);
			
	var title;
	title = polycharttwo.title();
	title.enabled(true);
	title.text('Comparing the lowest fire incident and flood incident');
	title.fontSize(12);
	var labelsx = polycharttwo.xAxis().labels();
	labelsx.fontSize(8);
	var labelsy = polycharttwo.yAxis().labels();
	labelsy.fontSize(8);
	
	return polycharttwo
	}

}