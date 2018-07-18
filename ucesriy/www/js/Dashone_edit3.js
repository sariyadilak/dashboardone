//add map
	// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
		// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);

var legend;
var i;
var x;
var y;
var highchart;
var  layoutTable = null;

anychart.onDocumentReady(chartfiresta);


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

	//adding interaction
function highlightfirestaFeature(e) {
var layer = e.target;

layer.setStyle({
	radius: 5,
	fillColor: "#ff0000",
	color: "#000000",
	weight: 1,
	opacity: 1,
	fillOpacity: 1
});

if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	layer.bringToFront();
}
}


// var firestacoords;
// var fireGroup; 
function resetfirestaHighlight(e) {
 if (!e.target.feature.properties.selected){
var layer = e.target;

layer.setStyle({
	radius: 5,
	fillColor: "#ff0000",
	color: "#ff0000",
	weight: 1,
	opacity: 1,
	fillOpacity: 1
 });};	



}

var clickfire;
var seriesfirestaarray =[];
var highchartfiresta;
//click on map
function selectfirestaFeature(e) {

e.target.feature.properties.selected = !e.target.feature.properties.selected;	

seriesfirestaarray = seriesfiresta.xe.FN;
clickfire = e.target.feature.properties.FireStat_1;
var i =seriesfirestaarray.indexOf(clickfire);
		seriesfiresta.select([i]);
console.log(clickfire);

//style on map
firestationlayer.setStyle(function (feature){
	var i;
		if (clickfire === feature.properties.FireStat_1 ){
		feature.properties.selected = true;
			if (feature.properties.selected){
		return {
				radius: 5,
				fillColor: "#476b6b",
				color: "#000000",
				weight: 1,
				opacity: 1,
				fillOpacity: 1
				
			} }
		
	}else {
		feature.properties.selected = false;
			return firestaStyle;
		}
	});
	
mymap.fitBounds(e.target.getBounds());

y = barchartfiresta.getSelectedPoints();
highchartfiresta = y[0].Gn.categoryname;
console.log(highchartfiresta);

var i;
	for (i = 0; i < firestafireinc.length; i++) { 
	if (highchartfiresta === firestafireinc[i][0]){
		fireincvalue = firestafireinc[i][1];
		
	}



anychart.onDocumentReady(chartfiresta);
selectonchartfiresta();
}
}

function selectonchartfiresta(){
var seriesfirestaarray = seriesfiresta.xe.FN;
var i =seriesfirestaarray.indexOf(clickfire);
		seriesfiresta.select([i]);
}


var firestaStyle = {
        radius: 5,
        fillColor: "#ff0000",
        color: "#ff0000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };

var firestacoords;
var fireGroup; 
function firestadisplay (feature, latlng) {
	fireGroup = L.featureGroup([]).addTo(mymap);
	firestacoords = fireGroup.addLayer(L.circleMarker(latlng, firestaStyle));
 return firestacoords;
}	
	
	
// fire station tooltip
function onEachfirestaFeature(feature, layer) {
FireSta = feature.properties.FireStat_1 ;
Borough = feature.properties.BOROUGH ;
onpopup = "<b>Fire Station Name:</b>"+FireSta+"<br />"+"<b>Borough:</b>"+Borough ;

layer.on({
	mouseover:highlightfirestaFeature,
	mouseout:resetfirestaHighlight,
	click: selectfirestaFeature
});

layer.bindTooltip(onpopup);

}




//add fire station layer
var firestationlayer;
var firestationdata;
var firestationjson;
var firestationarray = [];
var firestafireinc = [];
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
var jproperties = firestationjson.features.map(function (el) { return el.properties; });
var i;
if (firestationarray=[]){
for (i = 0; i < jproperties.length; i++) { 
	firestationarray.push(Object.values(jproperties[i]));
}}
if (firestafireinc =[]){
for (i = 0; i < firestationarray.length; i++) { 
	firestafireinc.push([firestationarray[i][0],firestationarray[i][4]]);
}}

if (boroughfireinclayer){
		mymap.removeLayer(boroughfireinclayer);
	}
	


// REMOVING PREVIOUS INFO BOX
if (legend != undefined) {
legend.remove();
}
firestationlayer=L.geoJson(firestationjson,{pointToLayer: firestadisplay,onEachFeature:onEachfirestaFeature});
firestationlayer.addTo(mymap);
// change the map zoom so that all the data is shown
mymap.fitBounds(firestationlayer.getBounds());
anychart.onDocumentReady(chartfiresta);
}

//chart for (fire station, population and borough)
function chartfiresta() {
	if ( layoutTable != null)  layoutTable.container(null);


layoutTable = anychart.standalones.table(2,1 );
layoutTable.cellBorder(null);
layoutTable.getCol(0).width('100%');
layoutTable.getRow(0).height('50%');
layoutTable.getRow(1).height('50%');



layoutTable.getCell(0, 0).content(fireChart());
layoutTable.getCell(1, 0).content(Detailgauge());
layoutTable.container('container1');
layoutTable.draw();
		
}

var barchartfiresta;
//barchart for fire station
function fireChart() {

var rawData = firestafireinc;
data = anychart.data.set(rawData);
// map the data
var seriesData_1 = data.mapAs({x: 0, value: 1});

// create a chart
barchartfiresta = anychart.column();



var yTitle = barchartfiresta.yAxis().title();
yTitle.enabled(true);
yTitle.text('Number of fire incidents');
yTitle.fontSize(10);

// create the first series, set the data and name
seriesfiresta = barchartfiresta.column(seriesData_1);
seriesfiresta.name("Fire Incidents")
.color('#ff0000');


// turn the legend on
barchartfiresta.legend()
		.enabled(true)
		.fontSize(8)
		.padding([0, 0, 20, 0]);
	
	
// enable stagger mode
barchartfiresta.xAxis().staggerMode(true);
// disabling first and last labels
barchartfiresta.xAxis().drawFirstLabel(false);
barchartfiresta.xAxis().drawLastLabel(false);


//chart grid
barchartfiresta.yGrid().stroke({
  // set stroke color
  color: "#ff3399",
  // set dashes and gaps length
  dash: "3 5"
});

// turn on chart animation
barchartfiresta.animation(true);

var title;
title = barchartfiresta.title();
title.enabled(true);
title.text("Fire incident per fire station");
title.fontSize(12);

var labelsx = barchartfiresta.xAxis().labels();
labelsx.fontSize(8);
var labelsy = barchartfiresta.yAxis().labels();
labelsy.fontSize(8);



//multi select
// multi-select enabling
var interactivity = barchartfiresta.interactivity();
interactivity.selectionMode("multiSelect");
//tooltip
// configure tooltips on the chart
seriesfiresta.tooltip().format("Fire Incident:{%value}");


seriesfiresta.listen('pointclick', chartPointClickfiresta);
barchartfiresta.xScroller(true);



return barchartfiresta

}

//gauge chart
var gauge;
function Detailgauge(){
gauge = anychart.gauges.circular();
  gauge.fill('#fff')
    .stroke(null)
    .startAngle(270)
    .sweepAngle(180);

  gauge.axis()
    .labels()
    .fontSize(14)
    .position('outside')
    .format('{%Value}');

  gauge.data([fireincvalue]);
  gauge.axis().scale()
    .minimum(0)
    .maximum(750)
    .ticks({
      interval: 10
    })
    .minorTicks({
      interval: 5
    });

  gauge.axis()
    .fill('#545f69')
    .width(1)
    .ticks({
      type: 'line',
      fill: 'white',
      length: 2
    });



  gauge.needle()
    .stroke('2 #545f69')
    .startRadius('5%')
    .endRadius('90%')
    .startWidth('0.1%')
    .endWidth('0.1%')
    .middleWidth('0.1%');

  gauge.cap()
    .radius('3%')
    .enabled(true)
    .fill('#545f69');

  gauge.range(0, {
    from: 0,
    to: 250,
    position: 'inside',
    fill: '#009900 0.4',
    startSize: 50,
    endSize: 50,
    radius: 98
  });

  gauge.range(1, {
    from: 250,
    to: 500,
    position: 'inside',
    fill: '#ffa000 0.4',
    startSize: 50,
    endSize: 50,
    radius: 98
  });

  gauge.range(2, {
    from: 500,
    to: 750,
    position: 'inside',
    fill: '#dd2c00 0.4',
    startSize: 50,
    endSize: 50,
    radius: 98
  });

  gauge.label(1)
    .text('Good')
    .fontColor('#212121')
    .fontSize(14)
    .offsetY('68%')
    .offsetX(25)
    .anchor('center');

  gauge.label(2)
    .text('Average')
    .fontColor('#212121')
    .fontSize(14)
    .offsetY('68%')
    .offsetX(90)
    .anchor('center');

  gauge.label(3)
    .text('Poor')
    .fontColor('#212121')
    .fontSize(14)
    .offsetY('68%')
    .offsetX(155)
    .anchor('center');
	

  gauge.title('Assessment of fire incident case handle per fire station');
    gauge.title()
			.fontSize(12)
            .hAlign('center')
            .margin([0, 0, 10, 0]);

  gauge.container('container');
  gauge.draw();
  return gauge
}

//click on chart fire station
var clickchartfiresta;
function chartPointClickfiresta(e) {
    var index = e.point.getIndex();
	var row = data.row(index);
	clickchartfiresta = row[0];
	console.log(clickchartfiresta);
	selectfirestaMapChart();
	}

//click on chart active on map and detail chart
var fireincvalue;
function selectfirestaMapChart(){
	
	//set map style
	//style on map
	firestationlayer.setStyle(function (feature){
	var i;
		if (clickchartfiresta === feature.properties.FireStat_1 ){
		feature.properties.selected = true;
			if (feature.properties.selected){
		return {
				radius: 5,
				fillColor: "#476b6b",
				color: "#000000",
				weight: 1,
				opacity: 1,
				fillOpacity: 1
				
			} }
		
	}else {
		feature.properties.selected = false;
			return firestaStyle;
		}
	});
	
	
	
	//change detail chart
	var i;
	for (i = 0; i < firestafireinc.length; i++) { 
	if (clickchartfiresta === firestafireinc[i][0]){
		fireincvalue = firestafireinc[i][1];
	}
	layoutTable.getCell(1, 0).content(Detailgauge());
}
}

//adding fire station range pink color
function getFireIncBoColor(d) {
	return d >= 745 ? ' #990000' :
			d >= 671 ? ' #cc0000' :
		   d >= 609  ? '#ff0000' :
		   d >= 368 ? ' #ff3333' :
			 d >= 79 ?'#ff6666':
			 '#ff9999';
}

 
//adding population borough color
function FireIncBostyle(feature) {
	return {
		fillColor: getFireIncBoColor(feature.properties.FireInc),
		weight: 1,
		opacity: 1,
		color: '#979895',
		fillOpacity: 0.7
	};
}

function resetfireincboHighlight(e) {
	if (!e.target.feature.properties.selected){
boroughfireinclayer.resetStyle(e.target);
};

}


//click on map
function selectfireincFeature(e) {
	
	e.target.feature.properties.selected = !e.target.feature.properties.selected;
	var seriesfireincarray=seriesfireinc.xe.FN;


	clickmap = e.target.feature.properties.NAME;
	var i =seriesfireincarray.indexOf(clickmap);
		seriesfireinc.select([i]);


	//select on map
	boroughfireinclayer.setStyle(function (feature){
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
		return FireIncBostyle(feature);
		
		}
	});

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
	x = barchart.getSelectedPoints();
	highchart = x[0].Gn.categoryname;
	mymap.fitBounds(e.target.getBounds());
	
	for (i = 0; i < fireincarray.length; i++) { 
	
	if (highchart === fireincarray[i][2] ){

	if (fireincarray[i][1] === '1'){
	fireincmonth.push(['Jan',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '2'){
	fireincmonth.push(['Feb',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '3'){
	fireincmonth.push(['Mar',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '4'){
	fireincmonth.push(['Apr',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '5'){
	fireincmonth.push(['May',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '6'){
	fireincmonth.push(['Jun',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '7'){
	fireincmonth.push(['Jul',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '8'){
	fireincmonth.push(['Aug',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '9'){
	fireincmonth.push(['Sep',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '91'){
	fireincmonth.push(['Oct',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '92'){
	fireincmonth.push(['Nov',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '93'){
	fireincmonth.push(['Dec',fireincarray[i][3]]);}
		}
	}
	
		for (i = 0; i < sitearray.length; i++) { 
	
	if (highchart === sitearray[i][2] ){
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Area of Site"){
			sitea_areasite = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Distance from A Road"){
			sitea_road = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Distance from center of borough"){
			sitea_center = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Area of Site"){
			siteb_areasite = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Distance from A Road"){
			siteb_road = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Distance from center of borough"){
			siteb_center = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Area of Site"){
			sitec_areasite = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Distance from A Road"){
			sitec_road = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Distance from center of borough"){
			sitec_center = sitearray[i][3];
		}
	}
	}
	
	//arrange data for chart two and three
	if (highchart === 'Kingston upon Thames'){
		dataCO = KingstonuponThamesCO;
	}
	
	if (highchart === 'Croydon'){
		dataCO = CroydonCO;
	}
	
	if (highchart === 'Bromley'){
		dataCO = BromleyCO;
	}
	
	if (highchart === 'Hounslow'){
		dataCO = HounslowCO;
	}
	
	if (highchart === 'Ealing'){
		dataCO = EalingCO;
	}
	
	if (highchart === 'Havering'){
		dataCO = HaveringCO;
	}
	if (highchart === 'Hillingdon'){
		dataCO = HillingdonCO;
	}
	if (highchart === 'Harrow'){
		dataCO = HarrowCO;
	}
	if (highchart === 'Brent'){
		dataCO = BrentCO;
	}
	if (highchart === 'Barnet'){
		dataCO = BarnetCO;
	}
	if (highchart === 'Lambeth'){
		dataCO = LambethCO;
	}
	if (highchart === 'Southwark'){
		dataCO = SouthwarkCO;
	}
	if (highchart === 'Lewisham'){
		dataCO = LewishamCO;
	}
	if (highchart === 'Greenwich'){
		dataCO = GreenwichCO;
	}
	if (highchart === 'Bexley'){
		dataCO = BexleyCO;
	}
	if (highchart === 'Enfield'){
		dataCO = EnfieldCO;
	}
	if (highchart === 'Waltham Forest'){
		dataCO = WalthamForestCO;
	}
	if (highchart === 'Redbridge'){
		dataCO = RedbridgeCO;
	}
	if (highchart === 'Sutton'){
		dataCO = SuttonCO;
	}
	if (highchart === 'Richmond upon Thames'){
		dataCO = RichmonduponThamesCO;
	}
	if (highchart === 'Merton'){
		dataCO = MertonCO;
	}
	if (highchart === 'Wandsworth'){
		dataCO = WandsworthCO;
	}
	if (highchart === 'Hammersmith and Fulham'){
		dataCO = HammersmithandFulhamCO;
	}
	if (highchart === 'Kensington and Chelsea'){
		dataCO = KensingtonandChelseaCO;
	}
	if (highchart === 'Westminster'){
		dataCO = WestminsterCO;
	}
	if (highchart === 'Camden'){
		dataCO = CamdenCO;
	}
	if (highchart === 'Tower Hamlets'){
		dataCO = TowerHamletsCO;
	}
	if (highchart === 'Islington'){
		dataCO = IslingtonCO;
	}
	if (highchart === 'Hackney'){
		dataCO = HackneyCO;
	}
	if (highchart === 'Haringey'){
		dataCO = HaringeyCO;
	}
	if (highchart === 'Newham'){
		dataCO = NewhamCO;
	}
	if (highchart === 'Barking and Dagenham'){
		dataCO = BarkingandDagenhamCO;
	}
	if (highchart === 'City of London'){
		dataCO = CityofLondonCO;
	}
	
	
	anychart.onDocumentReady(chartfireinc);
	selectonchartfireinc();

    // mymap.fitBounds(e.target.getBounds());
}

function selectonchartfireinc(){
	var seriesfireincarray=seriesfireinc.xe.FN;
	var i =seriesfireincarray.indexOf(clickmap);
		seriesfireinc.select([i]);
}


function onEachfireincboFeature(feature, layer) {
bo_name = feature.properties.NAME ;

fireinc = feature.properties.FireInc;
onpopup = "<b>Borough Name:</b>"+bo_name +"<br />"+"<b>Fire Incident:</b>"+fireinc

layer.on({
	mouseover: highlightFeature,
	mouseout: resetfireincboHighlight,
	click: selectfireincFeature
});

layer.bindTooltip(onpopup);


}

var boroughfireincarray = [];
var boroughfireinc = [];
var KingstonuponThamesCO=[];
var CroydonCO=[];
var BromleyCO =[];
var HounslowCO = [];
var EalingCO= [];
var HaveringCO=[];
var HillingdonCO=[];
var HarrowCO=[];
var BrentCO=[];
var BarnetCO =[];
var LambethCO = [];
var SouthwarkCO =[];
var LewishamCO =[];
var GreenwichCO=[];
var BexleyCO=[];
var EnfieldCO=[];
var WalthamForestCO=[];
var RedbridgeCO=[];
var SuttonCO=[];
var RichmonduponThamesCO=[];
var MertonCO=[];
var WandsworthCO=[];
var HammersmithandFulhamCO=[];
var KensingtonandChelseaCO=[];
var WestminsterCO=[];
var CamdenCO=[];
var TowerHamletsCO=[];
var IslingtonCO=[];
var HackneyCO=[];
var HaringeyCO=[];
var NewhamCO=[];
var BarkingandDagenhamCO=[];
var CityofLondonCO=[];

var boroughfireinclayer;
function getfireincBorough(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/Borough_fire.geojson');
	client.onreadystatechange = boroughfireincResponse;
	client.send();
	
}
// create the code to wait for the response from the data server, and process the response once it is received
function boroughfireincResponse(){
if(client.readyState == 4){
	var boroughfireincdata = client.responseText;
	loadBoroughfireinclayer(boroughfireincdata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadBoroughfireinclayer(boroughfireincdata){
	
if ( firestationlayer) { // check
	mymap.removeLayer( firestationlayer); // remove the marker from the map

	}
	
var boroughfireincjson = JSON.parse(boroughfireincdata);
var features = []; 
features = boroughfireincjson.features; 
var jproperties = boroughfireincjson.features.map(function (el) { return el.properties; });
var i;
for (i = 0; i < jproperties.length; i++) { 
	boroughfireincarray.push(Object.values(jproperties[i]));
}
for (i = 0; i < boroughfireincarray.length; i++) { 
	boroughfireinc.push([boroughfireincarray[i][0],boroughfireincarray[i][3],boroughfireincarray[i][4]]);
}

//lay out child age data
if (KingstonuponThamesCO = []){
KingstonuponThamesCO.push(["Child",boroughfireincarray[0][5]],["Old",boroughfireincarray[0][6]],["Working",boroughfireincarray[0][16]]);}
if (CroydonCO = []){
CroydonCO.push(["Child",boroughfireincarray[1][5]],["Old",boroughfireincarray[1][6]],["Working",boroughfireincarray[1][16]]);}
if (BromleyCO = []){
BromleyCO.push(["Child",boroughfireincarray[2][5]],["Old",boroughfireincarray[2][6]],["Working",boroughfireincarray[2][16]]);}
if (HounslowCO = []){
HounslowCO.push(["Child",boroughfireincarray[3][5]],["Old",boroughfireincarray[3][6]],["Working",boroughfireincarray[3][16]]);}
if (EalingCO = []){
EalingCO.push(["Child",boroughfireincarray[4][5]],["Old",boroughfireincarray[4][6]],["Working",boroughfireincarray[4][16]]);}
if (HaveringCO = []){
HaveringCO.push(["Child",boroughfireincarray[5][5]],["Old",boroughfireincarray[5][6]],["Working",boroughfireincarray[5][16]]);}
if (HillingdonCO = []){
HillingdonCO.push(["Child",boroughfireincarray[6][5]],["Old",boroughfireincarray[6][6]],["Working",boroughfireincarray[6][16]]);}
if (HarrowCO = []){
HarrowCO.push(["Child",boroughfireincarray[7][5]],["Old",boroughfireincarray[7][6]],["Working",boroughfireincarray[7][16]]);}
if (BrentCO = []){
BrentCO.push(["Child",boroughfireincarray[8][5]],["Old",boroughfireincarray[8][6]],["Working",boroughfireincarray[8][16]]);}
if (BarnetCO = []){
BarnetCO.push(["Child",boroughfireincarray[9][5]],["Old",boroughfireincarray[9][6]],["Working",boroughfireincarray[9][16]]);}
if (LambethCO = []){
LambethCO.push(["Child",boroughfireincarray[10][5]],["Old",boroughfireincarray[10][6]],["Working",boroughfireincarray[10][16]]);}
if (SouthwarkCO = []){
SouthwarkCO.push(["Child",boroughfireincarray[11][5]],["Old",boroughfireincarray[11][6]],["Working",boroughfireincarray[11][16]]);}
if (LewishamCO = []){
LewishamCO.push(["Child",boroughfireincarray[12][5]],["Old",boroughfireincarray[12][6]],["Working",boroughfireincarray[12][16]]);}
if (GreenwichCO = []){
GreenwichCO.push(["Child",boroughfireincarray[13][5]],["Old",boroughfireincarray[13][6]],["Working",boroughfireincarray[13][16]]);}
if (BexleyCO = []){
BexleyCO.push(["Child",boroughfireincarray[14][5]],["Old",boroughfireincarray[14][6]],["Working",boroughfireincarray[14][16]]);}
if (EnfieldCO = []){
EnfieldCO.push(["Child",boroughfireincarray[15][5]],["Old",boroughfireincarray[15][6]],["Working",boroughfireincarray[15][16]]);}
if (WalthamForestCO= []){
WalthamForestCO.push(["Child",boroughfireincarray[16][5]],["Old",boroughfireincarray[16][6]],["Working",boroughfireincarray[16][16]]);}
if (RedbridgeCO= []){
RedbridgeCO.push(["Child",boroughfireincarray[17][5]],["Old",boroughfireincarray[17][6]],["Working",boroughfireincarray[17][16]]);}
if (SuttonCO= []){
SuttonCO.push(["Child",boroughfireincarray[18][5]],["Old",boroughfireincarray[18][6]],["Working",boroughfireincarray[18][16]]);}
if (RichmonduponThamesCO= []){
RichmonduponThamesCO.push(["Child",boroughfireincarray[19][5]],["Old",boroughfireincarray[19][6]],["Working",boroughfireincarray[19][16]]);}
if (MertonCO= []){
MertonCO.push(["Child",boroughfireincarray[20][5]],["Old",boroughfireincarray[20][6]],["Working",boroughfireincarray[20][16]]);}
if (WandsworthCO= []){
WandsworthCO.push(["Child",boroughfireincarray[21][5]],["Old",boroughfireincarray[21][6]],["Working",boroughfireincarray[21][16]]);}
if (HammersmithandFulhamCO= []){
HammersmithandFulhamCO.push(["Child",boroughfireincarray[22][5]],["Old",boroughfireincarray[22][6]],["Working",boroughfireincarray[22][16]]);}
if (KensingtonandChelseaCO= []){
KensingtonandChelseaCO.push(["Child",boroughfireincarray[23][5]],["Old",boroughfireincarray[23][6]],["Working",boroughfireincarray[23][16]]);}
if (WestminsterCO= []){
WestminsterCO.push(["Child",boroughfireincarray[24][5]],["Old",boroughfireincarray[24][6]],["Working",boroughfireincarray[24][16]]);}
if (CamdenCO= []){
CamdenCO.push(["Child",boroughfireincarray[25][5]],["Old",boroughfireincarray[25][6]],["Working",boroughfireincarray[25][16]]);}
if (TowerHamletsCO= []){
TowerHamletsCO.push(["Child",boroughfireincarray[26][5]],["Old",boroughfireincarray[26][6]],["Working",boroughfireincarray[26][16]]);}
if (IslingtonCO= []){
IslingtonCO.push(["Child",boroughfireincarray[27][5]],["Old",boroughfireincarray[27][6]],["Working",boroughfireincarray[27][16]]);}
if (HackneyCO= []){
HackneyCO.push(["Child",boroughfireincarray[28][5]],["Old",boroughfireincarray[28][6]],["Working",boroughfireincarray[28][16]]);}
if (HaringeyCO= []){
HaringeyCO.push(["Child",boroughfireincarray[29][5]],["Old",boroughfireincarray[29][6]],["Working",boroughfireincarray[29][16]]);}
if (NewhamCO= []){
NewhamCO.push(["Child",boroughfireincarray[30][5]],["Old",boroughfireincarray[30][6]],["Working",boroughfireincarray[30][16]]);}
if (BarkingandDagenhamCO= []){
BarkingandDagenhamCO.push(["Child",boroughfireincarray[31][5]],["Old",boroughfireincarray[31][6]],["Working",boroughfireincarray[31][16]]);}
if (CityofLondonCO= []){
CityofLondonCO.push(["Child",boroughfireincarray[32][5]],["Old",boroughfireincarray[32][6]],["Working",boroughfireincarray[32][16]]);}
boroughfireinclayer=L.geoJson(boroughfireincjson, {style: FireIncBostyle,onEachFeature: onEachfireincboFeature}).addTo(mymap);
// change the map zoom so that all the data is shown
mymap.fitBounds(boroughfireinclayer.getBounds());

legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = [985,745,671,609,368,79 ],
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + getFireIncBoColor(from + 1) + '"></i> ' +
			from + (to ? '&ndash;' + to : ''));
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

legend.addTo(mymap);
anychart.onDocumentReady(chartfireinc);
}



var clickchartfireinc;
var dataLU;
var dataCO;
var fireincmonth=[];
var barchart;
//chart for (fire station, population and borough)
function chartfireinc() {
	if ( layoutTable != null)  layoutTable.container(null);


// Variables for this dashboard
var totalDataArray, detailCellName;
var detailChart, detailPie;
var selectedX = null;
var totalSeries = null;
var detailSeries_1 = null;
var detailSeries_2 = null;

layoutTable = anychart.standalones.table(2,3 );
layoutTable.cellBorder(null);
layoutTable.getCol(0).width('33%');
layoutTable.getCol(1).width('33%');
layoutTable.getCol(2).width('33%');
layoutTable.getRow(0).height('50%');
layoutTable.getRow(1).height('50%');



layoutTable.getCell(0, 0).colSpan(3).content(mainChart());
layoutTable.getCell(1, 0).content(DetailChartOne());
layoutTable.getCell(1, 1).content(drawDetailtableTwo());	
layoutTable.getCell(1, 2).content(drawDetailPieThree());
layoutTable.container('container1');
layoutTable.draw();
		


}



//barchart
function mainChart() {

var rawData = boroughfireinc;
data = anychart.data.set(rawData);
// map the data
var seriesData_1 = data.mapAs({x: 0, value: 1});
var seriesData_2 = data.mapAs({x: 0, value: 2});
// create a chart
barchart = anychart.column();

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
yTitle.text('Fire Incidents');
yTitle.fontSize(10);

// create the first series, set the data and name
seriesfireinc = barchart.column(seriesData_1);
seriesfireinc.name("Fire Incidents")
.color('#ff0000');

 // create line series and set scale for it
var lineSeries = barchart.spline(seriesData_2);
lineSeries.name('Population Density/per hectare')
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
title.text("Comparing the number of fire incidents with population density");
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
seriesfireinc.tooltip().format("Fire Incident:{%value}");
lineSeries.tooltip().format("Population Density:{%value}");

seriesfireinc.listen('pointclick', chartPointClick);
barchart.xScroller(true);



return barchart

}

//detail chart one
function DetailChartOne(){
	
	var data = anychart.data.set(fireincmonth);
	var seriesData_1 = data.mapAs({x: 0, value: 1});
	// create a chart
	chartone = anychart.bar();
	// create the first series, set the data and name
	seriesmonth = chartone.bar(seriesData_1);
	seriesmonth.name("Fire incident per Months")
	.color('#ff8533');
	
	var title;
	title = chartone.title();
	title.enabled(true);
	title.text("Fire incident per Months");
	title.fontSize(10);
	
	var labelsx = chartone.xAxis().labels();
	labelsx.fontSize(8);
	var labelsy = chartone.yAxis().labels();
	labelsy.fontSize(8);
	
	
	chartone.draw();
	
	return chartone
	}

//draw pie two
function drawDetailtableTwo(){
tabletwo = anychart.standalones.table(11,2 );
tabletwo.cellBorder(null);
tabletwo.getCol(0).width('40%');
tabletwo.getCol(1).width('60%');
tabletwo.getRow(0).height('9%');
tabletwo.getRow(1).height('9%');
tabletwo.getRow(2).height('9%');
tabletwo.getRow(3).height('9%');
tabletwo.getRow(4).height('9%');
tabletwo.getRow(5).height('9%');
tabletwo.getRow(6).height('9%');
tabletwo.getRow(7).height('9%');
tabletwo.getRow(8).height('9%');
tabletwo.getRow(9).height('9%');
tabletwo.getRow(10).height('9%');

tabletwo.getCell(0, 0).colSpan(2).content('Available site')
.fontSize(8);
tabletwo.getCell(1, 0).content('Area of site(A)')
.fontSize(6);
tabletwo.getCell(1, 1).content(Detaillinegaugeone());
tabletwo.getCell(2, 1).content(Detaillinegaugetwo());
tabletwo.getCell(3, 1).content(Detaillinegaugethree());
tabletwo.getCell(4, 1).content(Detaillinegaugefour());
tabletwo.getCell(5, 1).content(Detaillinegaugefive());
tabletwo.getCell(6, 1).content(Detaillinegaugesix());
tabletwo.getCell(7, 1).content(Detaillinegaugeseven());
tabletwo.getCell(8, 1).content(Detaillinegaugeeight());
tabletwo.getCell(9, 1).content(Detaillinegaugenine());
tabletwo.getCell(4, 0).content('Area of site(B)')
.fontSize(6);
tabletwo.getCell(7, 0).content('Area of site(C)')
.fontSize(6);
tabletwo.getCell(2, 0).content('Distance from road(A)')
.fontSize(6);
tabletwo.getCell(5, 0).content('Distance from road(B)')
.fontSize(6);
tabletwo.getCell(8, 0).content('Distance from road(C)')
.fontSize(6);
tabletwo.getCell(3, 0).content('Distance from center(A)')
.fontSize(6);
tabletwo.getCell(6, 0).content('Distance from center(B)')
.fontSize(6);
tabletwo.getCell(9, 0).content('Distance from center(C)')
.fontSize(6);
tabletwo.getCell(10, 1).content(createBulletScale());


tabletwo.draw();

return tabletwo	

}

//create bullet chart scale
function createBulletScale() {
var axis = anychart.standalones.axes.linear();
axis.title(null);

var scale = anychart.scales.linear();
scale.minimum(-100)
		.maximum(100);
scale.ticks().interval(50);
axis.scale(scale);
axis.orientation('bottom')
		.stroke('#CECECE');
axis.ticks()
		.enabled(true)
		.stroke('#CECECE')
		.length(4);
var labels = axis.labels()
.format("{%Value}%");
labels.fontSize(7);

axis.minorTicks(null);

return axis
        }
		
function Detaillinegaugeone(){


	// set the linegauge type
	linegaugeone = anychart.bullet([ {
                    value: sitea_areasite,
                    type: 'bar',
                    gap: 0.7,
                    fill: '#64b5f6',
                    stroke: null
                },
                {
                    value: 0,
                    type: 'line',
                    gap: 0.2,
                    fill: '#545f69',
                    stroke: {
                        thickness: 2,
                        color: '#545f69'
                    }
                }]);
	
	
 // Set chart ranges
  linegaugeone.range().from(-100).to(100);
  linegaugeone.range(1).from(-100).to(-50);
  linegaugeone.range(2).from(-50).to(0);
  linegaugeone.range(3).from(0).to(50);
  linegaugeone.range(4).from(50).to(100);
  
  linegaugeone.rangePalette([
  '#ffffff',  // first range color
  '#ffffff',  // second range color
  '#ffffff',  // third range color
  '#ffffff',  // forth range color
  '#ffffff'   // fifth range color
	]);

  linegaugeone.draw();
  return linegaugeone

}

function Detaillinegaugetwo(){
	// set the linegauge type
	linegaugetwo = anychart.bullet([ {
                    value: sitea_road,
                    type: 'bar',
                    gap: 0.7,
                    fill: '#64b5f6',
                    stroke: null
                },
                {
                    value: 0,
                    type: 'line',
                    gap: 0.2,
                    fill: '#545f69',
                    stroke: {
                        thickness: 2,
                        color: '#545f69'
                    }
                }]);
	
	
 // Set chart ranges
  linegaugetwo.range().from(-100).to(100);
  linegaugetwo.range(1).from(-100).to(-50);
  linegaugetwo.range(2).from(-50).to(0);
  linegaugetwo.range(3).from(0).to(50);
  linegaugetwo.range(4).from(50).to(100);
  
  linegaugetwo.rangePalette([
  '#ffffff',  // first range color
  '#ffffff',  // second range color
  '#ffffff',  // third range color
  '#ffffff',  // forth range color
  '#ffffff'   // fifth range color
	]);

  linegaugetwo.draw();
  return linegaugetwo

}

function Detaillinegaugethree(){
	// set the linegauge type
	linegaugethree = anychart.bullet([ {
                    value: sitea_center,
                    type: 'bar',
                    gap: 0.7,
                    fill: '#64b5f6',
                    stroke: null
                },
                {
                    value: 0,
                    type: 'line',
                    gap: 0.2,
                    fill: '#545f69',
                    stroke: {
                        thickness: 2,
                        color: '#545f69'
                    }
                }]);
	
	
 // Set chart ranges
  linegaugethree.range().from(-100).to(100);
  linegaugethree.range(1).from(-100).to(-50);
  linegaugethree.range(2).from(-50).to(0);
  linegaugethree.range(3).from(0).to(50);
  linegaugethree.range(4).from(50).to(100);
  
  linegaugethree.rangePalette([
  '#ffffff',  // first range color
  '#ffffff',  // second range color
  '#ffffff',  // third range color
  '#ffffff',  // forth range color
  '#ffffff'   // fifth range color
	]);

  linegaugethree.draw();
  return linegaugethree

}

function Detaillinegaugefour(){
	// set the linegauge type
	linegaugefour = anychart.bullet([ {
                    value: siteb_areasite,
                    type: 'bar',
                    gap: 0.7,
                    fill: '#64b5f6',
                    stroke: null
                },
                {
                    value: 0,
                    type: 'line',
                    gap: 0.2,
                    fill: '#545f69',
                    stroke: {
                        thickness: 2,
                        color: '#545f69'
                    }
                }]);
	
	
 // Set chart ranges
  linegaugefour.range().from(-100).to(100);
  linegaugefour.range(1).from(-100).to(-50);
  linegaugefour.range(2).from(-50).to(0);
  linegaugefour.range(3).from(0).to(50);
  linegaugefour.range(4).from(50).to(100);
  
  linegaugefour.rangePalette([
  '#ffffff',  // first range color
  '#ffffff',  // second range color
  '#ffffff',  // third range color
  '#ffffff',  // forth range color
  '#ffffff'   // fifth range color
	]);

  linegaugefour.draw();
  return linegaugefour

}

function Detaillinegaugefive(){
	// set the linegauge type
	linegaugefive = anychart.bullet([ {
                    value: siteb_road,
                    type: 'bar',
                    gap: 0.7,
                    fill: '#64b5f6',
                    stroke: null
                },
                {
                    value: 0,
                    type: 'line',
                    gap: 0.2,
                    fill: '#545f69',
                    stroke: {
                        thickness: 2,
                        color: '#545f69'
                    }
                }]);
	
	
 // Set chart ranges
  linegaugefive.range().from(-100).to(100);
  linegaugefive.range(1).from(-100).to(-50);
  linegaugefive.range(2).from(-50).to(0);
  linegaugefive.range(3).from(0).to(50);
  linegaugefive.range(4).from(50).to(100);
  
  linegaugefive.rangePalette([
  '#ffffff',  // first range color
  '#ffffff',  // second range color
  '#ffffff',  // third range color
  '#ffffff',  // forth range color
  '#ffffff'   // fifth range color
	]);

  linegaugefive.draw();
  return linegaugefive

}

function Detaillinegaugesix(){
	// set the linegauge type
	linegaugesix = anychart.bullet([ {
                    value: siteb_center,
                    type: 'bar',
                    gap: 0.7,
                    fill: '#64b5f6',
                    stroke: null
                },
                {
                    value: 0,
                    type: 'line',
                    gap: 0.2,
                    fill: '#545f69',
                    stroke: {
                        thickness: 2,
                        color: '#545f69'
                    }
                }]);
	
	
 // Set chart ranges
  linegaugesix.range().from(-100).to(100);
  linegaugesix.range(1).from(-100).to(-50);
  linegaugesix.range(2).from(-50).to(0);
  linegaugesix.range(3).from(0).to(50);
  linegaugesix.range(4).from(50).to(100);
  
  linegaugesix.rangePalette([
  '#ffffff',  // first range color
  '#ffffff',  // second range color
  '#ffffff',  // third range color
  '#ffffff',  // forth range color
  '#ffffff'   // fifth range color
	]);

  linegaugesix.draw();
  return linegaugesix

}

function Detaillinegaugeseven(){
	// set the linegauge type
	linegaugeseven = anychart.bullet([ {
                    value: sitec_areasite,
                    type: 'bar',
                    gap: 0.7,
                    fill: '#64b5f6',
                    stroke: null
                },
                {
                    value: 0,
                    type: 'line',
                    gap: 0.2,
                    fill: '#545f69',
                    stroke: {
                        thickness: 2,
                        color: '#545f69'
                    }
                }]);
	
	
 // Set chart ranges
  linegaugeseven.range().from(-100).to(100);
  linegaugeseven.range(1).from(-100).to(-50);
  linegaugeseven.range(2).from(-50).to(0);
  linegaugeseven.range(3).from(0).to(50);
  linegaugeseven.range(4).from(50).to(100);
  
  linegaugeseven.rangePalette([
  '#ffffff',  // first range color
  '#ffffff',  // second range color
  '#ffffff',  // third range color
  '#ffffff',  // forth range color
  '#ffffff'   // fifth range color
	]);

  linegaugeseven.draw();
  return linegaugeseven

}

function Detaillinegaugeeight(){
	// set the linegauge type
	linegaugeeight = anychart.bullet([ {
                    value: sitec_road,
                    type: 'bar',
                    gap: 0.7,
                    fill: '#64b5f6',
                    stroke: null
                },
                {
                    value: 0,
                    type: 'line',
                    gap: 0.2,
                    fill: '#545f69',
                    stroke: {
                        thickness: 2,
                        color: '#545f69'
                    }
                }]);
	
	
 // Set chart ranges
  linegaugeeight.range().from(-100).to(100);
  linegaugeeight.range(1).from(-100).to(-50);
  linegaugeeight.range(2).from(-50).to(0);
  linegaugeeight.range(3).from(0).to(50);
  linegaugeeight.range(4).from(50).to(100);
  
  linegaugeeight.rangePalette([
  '#ffffff',  // first range color
  '#ffffff',  // second range color
  '#ffffff',  // third range color
  '#ffffff',  // forth range color
  '#ffffff'   // fifth range color
	]);

  linegaugeeight.draw();
  return linegaugeeight

}

function Detaillinegaugenine(){
	// set the linegauge type
	linegaugenine = anychart.bullet([ {
                    value: sitec_center,
                    type: 'bar',
                    gap: 0.7,
                    fill: '#64b5f6',
                    stroke: null
                },
                {
                    value: 0,
                    type: 'line',
                    gap: 0.2,
                    fill: '#545f69',
                    stroke: {
                        thickness: 2,
                        color: '#545f69'
                    }
                }]);
	
	
 // Set chart ranges
  linegaugenine.range().from(-100).to(100);
  linegaugenine.range(1).from(-100).to(-50);
  linegaugenine.range(2).from(-50).to(0);
  linegaugenine.range(3).from(0).to(50);
  linegaugenine.range(4).from(50).to(100);
  
  linegaugenine.rangePalette([
  '#ffffff',  // first range color
  '#ffffff',  // second range color
  '#ffffff',  // third range color
  '#ffffff',  // forth range color
  '#ffffff'   // fifth range color
	]);

  linegaugenine.draw();
  return linegaugenine

}



//draw chart three
function drawDetailPieThree(){

	piethree = anychart.pie(dataCO);
	var title;
	title = piethree.title();
	title.enabled(true);
	title.text("Children,Old, Working Age per Borough");
	title.fontSize(10);
	
	return piethree
	}

//click on chart
function chartPointClick(e) {
    var index = e.point.getIndex();
	var row = data.row(index);
	clickchartfireinc = row[0];
	console.log(clickchartfireinc);
	selectfireincMap();}

//function when select on chart
function selectfireincMap() {
	
	boroughfireinclayer.setStyle(function (feature){
	
	//select on map
	if (clickchartfireinc === feature.properties.NAME ){
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
		 return FireIncBostyle(feature);
		}
	});
	
	mymap.fitBounds(boroughfireinclayer.getBounds());
	
	
	for (i = 0; i < fireincarray.length; i++) { 
	
	if (clickchartfireinc === fireincarray[i][2] ){
	
	if (fireincarray[i][1] === '1'){
	fireincmonth.push(['Jan',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '2'){
	fireincmonth.push(['Feb',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '3'){
	fireincmonth.push(['Mar',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '4'){
	fireincmonth.push(['Apr',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '5'){
	fireincmonth.push(['May',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '6'){
	fireincmonth.push(['Jun',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '7'){
	fireincmonth.push(['Jul',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '8'){
	fireincmonth.push(['Aug',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '9'){
	fireincmonth.push(['Sep',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '91'){
	fireincmonth.push(['Oct',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '92'){
	fireincmonth.push(['Nov',fireincarray[i][3]]);}
	if (fireincarray[i][1] === '93'){
	fireincmonth.push(['Dec',fireincarray[i][3]]);}
		}
	}
	
	
	for (i = 0; i < sitearray.length; i++) { 
	
	if (clickchartfireinc === sitearray[i][2] ){
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Area of Site"){
			sitea_areasite = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Distance from A Road"){
			sitea_road = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Distance from center of borough"){
			sitea_center = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Area of Site"){
			siteb_areasite = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Distance from A Road"){
			siteb_road = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Distance from center of borough"){
			siteb_center = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Area of Site"){
			sitec_areasite = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Distance from A Road"){
			sitec_road = sitearray[i][3];
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Distance from center of borough"){
			sitec_center = sitearray[i][3];
		}
	}
	}
	
	
	//arrange data for chart two and three
	if (clickchartfireinc === 'Kingston upon Thames'){
		dataCO = KingstonuponThamesCO;
	}
	
	if (clickchartfireinc === 'Croydon'){
		dataCO = CroydonCO;
	}
	
	if (clickchartfireinc === 'Bromley'){
		dataCO = BromleyCO;
	}
	if (clickchartfireinc === 'Hounslow'){
		dataCO = HounslowCO;
	}
	
	if (clickchartfireinc === 'Ealing'){
		dataCO = EalingCO;
	}
	
	if (clickchartfireinc === 'Havering'){
		dataCO = HaveringCO;
	}
	
	if (clickchartfireinc === 'Hillingdon'){
		dataCO = HillingdonCO;
	}
	if (clickchartfireinc === 'Harrow'){
		dataCO = HarrowCO;
	}
	if (clickchartfireinc === 'Brent'){
		dataCO = BrentCO;
	}
	if (clickchartfireinc === 'Barnet'){
		dataCO = BarnetCO;
	}
	if (clickchartfireinc === 'Lambeth'){
		dataCO = LambethCO;
	}
	if (clickchartfireinc === 'Southwark'){
		dataCO = SouthwarkCO;
	}
	if (clickchartfireinc === 'Southwark'){
		dataCO = SouthwarkCO;
	}
	if (clickchartfireinc === 'Lewisham'){
		dataCO = LewishamCO;
	}
	if (clickchartfireinc === 'Greenwich'){
		dataCO = GreenwichCO;
	}
	if (clickchartfireinc === 'Bexley'){
		dataCO = BexleyCO;
	}
	if (clickchartfireinc === 'Enfield'){
		dataCO = EnfieldCO;
	}
	if (clickchartfireinc === 'Waltham Forest'){
		dataCO = WalthamForestCO;
	}
	if (clickchartfireinc === 'Redbridge'){
		dataCO = RedbridgeCO;
	}
	if (clickchartfireinc === 'Sutton'){
		dataCO = SuttonCO;
	}
	if (clickchartfireinc === 'Richmond upon Thames'){
		dataCO = RichmonduponThamesCO;
	}
	if (clickchartfireinc === 'Merton'){
		dataCO = MertonCO;
	}
	if (clickchartfireinc === 'Wandsworth'){
		dataCO = WandsworthCO;
	}
	if (clickchartfireinc === 'Hammersmith and Fulham'){
		dataCO = HammersmithandFulhamCO;
	}
	if (clickchartfireinc === 'Kensington and Chelsea'){
		dataCO = KensingtonandChelseaCO;
	}
	if (clickchartfireinc === 'Westminster'){
		dataCO = WestminsterCO;
	}
	if (clickchartfireinc === 'Camden'){
		dataCO = CamdenCO;
	}
	if (clickchartfireinc === 'Tower Hamlets'){
		dataCO = TowerHamletsCO;
	}
	if (clickchartfireinc === 'Islington'){
		dataCO = IslingtonCO;
	}
	if (clickchartfireinc === 'Hackney'){
		dataCO = HackneyCO;
	}
	if (clickchartfireinc === 'Haringey'){
		dataCO = HaringeyCO;
	}
	if (clickchartfireinc === 'Newham'){
		dataCO = NewhamCO;
	}
	if (clickchartfireinc === 'Barking and Dagenham'){
		dataCO = BarkingandDagenhamCO;
	}
	if (clickchartfireinc === 'City of London'){
		dataCO = CityofLondonCO;
	}

layoutTable.getCell(1, 0).content(DetailChartOne());
layoutTable.getCell(1, 1).content(drawDetailtableTwo());	
layoutTable.getCell(1, 2).content(drawDetailPieThree());

}

var fireStyle = {
        radius: 2,
        fillColor: "#ffffff",
        color: "#ffffff",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };

//get fire incident per month
var fireincidentlayer;
var fireincidentjson ;
var fireincarray=[];
var bofireinc;
var fireinccoords;
var cluster;
function getFireIncident(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/fire_incident_month.geojson');
	client.onreadystatechange = fireincidentResponse;
	client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function fireincidentResponse(){
if(client.readyState == 4){
	var fireincidentdata = client.responseText;
	loadFireIncidentlayer(fireincidentdata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadFireIncidentlayer(fireincidentdata){
fireincidentjson = JSON.parse(fireincidentdata);

if ( firestationlayer) { // check
	mymap.removeLayer( firestationlayer); // remove the marker from the map

	}

var features = []; 
features = fireincidentjson.features; 
var jproperties = fireincidentjson.features.map(function (el) { return el.properties; });
console.log(jproperties);
var i;
for (i = 0; i < jproperties.length; i++) { 
	fireincarray.push(Object.values(jproperties[i]));
}
}


var sitearray = [];
var sitea_areasite; 
var siteb_areasite; 
var sitec_areasite; 
var sitea_road; 
var siteb_road; 
var sitec_road; 
var sitea_center; 
var siteb_center; 
var sitec_center; 
function getSite(){
	clientone = new XMLHttpRequest();
	clientone.open('GET','GeoJSON/Site_Fire.geojson');
	clientone.onreadystatechange = siteResponse;
	clientone.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function siteResponse(){
if(clientone.readyState == 4){
	var sitedata = clientone.responseText;
	loadsitelayer(sitedata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadsitelayer(sitedata){
sitejson = JSON.parse(sitedata);

var features = []; 
features = sitejson.features; 
var jproperties = sitejson.features.map(function (el) { return el.properties; });
var i;
for (i = 0; i < jproperties.length; i++) { 
	sitearray.push(Object.values(jproperties[i]));
}

}

getFireIncident();
getSite();
