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
	
	//arrange data for chart two and three
	if (highchart === 'Kingston upon Thames'){
		dataLU = KingstonuponThamesLU;
		dataCO = KingstonuponThamesCO;
	}
	
	if (highchart === 'Croydon'){
		dataLU = CroydonLU;
		dataCO = CroydonCO;
	}
	
	if (highchart === 'Bromley'){
		dataLU = BromleyLU;
		dataCO = BromleyCO;
	}
	
	if (highchart === 'Hounslow'){
		dataLU = HounslowLU;
		dataCO = HounslowCO;
	}
	
	if (highchart === 'Ealing'){
		dataLU = EalingLU;
		dataCO = EalingCO;
	}
	
	if (highchart === 'Havering'){
		dataLU = HaveringLU;
		dataCO = HaveringCO;
	}
	if (highchart === 'Hillingdon'){
		dataLU = HillingdonLU;
		dataCO = HillingdonCO;
	}
	if (highchart === 'Harrow'){
		dataLU = HarrowLU;
		dataCO = HarrowCO;
	}
	if (highchart === 'Brent'){
		dataLU = BrentLU;
		dataCO = BrentCO;
	}
	if (highchart === 'Barnet'){
		dataLU = BarnetLU;
		dataCO = BarnetCO;
	}
	if (highchart === 'Lambeth'){
		dataLU = LambethLU;
		dataCO = LambethCO;
	}
	if (highchart === 'Southwark'){
		dataLU = SouthwarkLU;
		dataCO = SouthwarkCO;
	}
	if (highchart === 'Lewisham'){
		dataLU = LewishamLU;
		dataCO = LewishamCO;
	}
	if (highchart === 'Greenwich'){
		dataLU = GreenwichLU;
		dataCO = GreenwichCO;
	}
	if (highchart === 'Bexley'){
		dataLU = BexleyLU;
		dataCO = BexleyCO;
	}
	if (highchart === 'Enfield'){
		dataLU = EnfieldLU;
		dataCO = EnfieldCO;
	}
	if (highchart === 'Waltham Forest'){
		dataLU = WalthamForestLU;
		dataCO = WalthamForestCO;
	}
	if (highchart === 'Redbridge'){
		dataLU = RedbridgeLU;
		dataCO = RedbridgeCO;
	}
	if (highchart === 'Sutton'){
		dataLU = SuttonLU;
		dataCO = SuttonCO;
	}
	if (highchart === 'Richmond upon Thames'){
		dataLU = RichmonduponThamesLU;
		dataCO = RichmonduponThamesCO;
	}
	if (highchart === 'Merton'){
		dataLU = MertonLU;
		dataCO = MertonCO;
	}
	if (highchart === 'Wandsworth'){
		dataLU = WandsworthLU;
		dataCO = WandsworthCO;
	}
	if (highchart === 'Hammersmith and Fulham'){
		dataLU = HammersmithandFulhamLU;
		dataCO = HammersmithandFulhamCO;
	}
	if (highchart === 'Kensington and Chelsea'){
		dataLU = KensingtonandChelseaLU;
		dataCO = KensingtonandChelseaCO;
	}
	if (highchart === 'Westminster'){
		dataLU = WestminsterLU;
		dataCO = WestminsterCO;
	}
	if (highchart === 'Camden'){
		dataLU = CamdenLU;
		dataCO = CamdenCO;
	}
	if (highchart === 'Tower Hamlets'){
		dataLU = TowerHamletsLU;
		dataCO = TowerHamletsCO;
	}
	if (highchart === 'Islington'){
		dataLU = IslingtonLU;
		dataCO = IslingtonCO;
	}
	if (highchart === 'Hackney'){
		dataLU = HackneyLU;
		dataCO = HackneyCO;
	}
	if (highchart === 'Haringey'){
		dataLU = HaringeyLU;
		dataCO = HaringeyCO;
	}
	if (highchart === 'Newham'){
		dataLU = NewhamLU;
		dataCO = NewhamCO;
	}
	if (highchart === 'Barking and Dagenham'){
		dataLU = BarkingandDagenhamLU;
		dataCO = BarkingandDagenhamCO;
	}
	if (highchart === 'City of London'){
		dataLU = CityofLondonLU;
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
var KingstonuponThamesLU = [];
var CroydonLU = [];
var BromleyLU = [];
var HounslowLU = [];
var EalingLU = [];
var HaveringLU=[];
var HillingdonLU=[];
var HarrowLU=[];
var BrentLU=[];
var BarnetLU =[];
var LambethLU = [];
var SouthwarkLU =[];
var LewishamLU=[];
var GreenwichLU=[];
var BexleyLU=[];
var EnfieldLU=[];
var WalthamForestLU=[];
var RedbridgeLU=[];
var SuttonLU=[];
var RichmonduponThamesLU=[];
var MertonLU=[];
var WandsworthLU=[];
var HammersmithandFulhamLU=[];
var KensingtonandChelseaLU=[];
var WestminsterLU=[];
var CamdenLU=[];
var TowerHamletsLU=[];
var IslingtonLU=[];
var HackneyLU=[];
var HaringeyLU=[];
var NewhamLU=[];
var BarkingandDagenhamLU=[];
var CityofLondonLU=[];
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
	
if ( firestacoords) { // check
	mymap.removeLayer( firestacoords); // remove the marker from the map

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



//layout landuse data
KingstonuponThamesLU.push(["Domestic Buildings",boroughfireincarray[0][7]],["Domestic Gardens",boroughfireincarray[0][8]],["Non Domestic Buildings",boroughfireincarray[0][9]],["Road",boroughfireincarray[0][10]],["Rail",boroughfireincarray[0][11]],["Path",boroughfireincarray[0][12]],["Greenspace",boroughfireincarray[0][13]],["Water",boroughfireincarray[0][14]],["Other Land Uses",boroughfireincarray[0][15]]);
CroydonLU.push(["Domestic Buildings",boroughfireincarray[1][7]],["Domestic Gardens",boroughfireincarray[1][8]],["Non Domestic Buildings",boroughfireincarray[1][9]],["Road",boroughfireincarray[1][10]],["Rail",boroughfireincarray[1][11]],["Path",boroughfireincarray[1][12]],["Greenspace",boroughfireincarray[1][13]],["Water",boroughfireincarray[1][14]],["Other Land Uses",boroughfireincarray[1][15]]);
BromleyLU.push(["Domestic Buildings",boroughfireincarray[2][7]],["Domestic Gardens",boroughfireincarray[2][8]],["Non Domestic Buildings",boroughfireincarray[2][9]],["Road",boroughfireincarray[2][10]],["Rail",boroughfireincarray[2][11]],["Path",boroughfireincarray[2][12]],["Greenspace",boroughfireincarray[2][13]],["Water",boroughfireincarray[2][14]],["Other Land Uses",boroughfireincarray[2][15]]);
HounslowLU.push(["Domestic Buildings",boroughfireincarray[3][7]],["Domestic Gardens",boroughfireincarray[3][8]],["Non Domestic Buildings",boroughfireincarray[3][9]],["Road",boroughfireincarray[3][10]],["Rail",boroughfireincarray[3][11]],["Path",boroughfireincarray[3][12]],["Greenspace",boroughfireincarray[3][13]],["Water",boroughfireincarray[3][14]],["Other Land Uses",boroughfireincarray[3][15]]);
EalingLU.push(["Domestic Buildings",boroughfireincarray[4][7]],["Domestic Gardens",boroughfireincarray[4][8]],["Non Domestic Buildings",boroughfireincarray[4][9]],["Road",boroughfireincarray[4][10]],["Rail",boroughfireincarray[4][11]],["Path",boroughfireincarray[4][12]],["Greenspace",boroughfireincarray[4][13]],["Water",boroughfireincarray[4][14]],["Other Land Uses",boroughfireincarray[4][15]]);
HaveringLU.push(["Domestic Buildings",boroughfireincarray[5][7]],["Domestic Gardens",boroughfireincarray[5][8]],["Non Domestic Buildings",boroughfireincarray[5][9]],["Road",boroughfireincarray[5][10]],["Rail",boroughfireincarray[5][11]],["Path",boroughfireincarray[5][12]],["Greenspace",boroughfireincarray[5][13]],["Water",boroughfireincarray[5][14]],["Other Land Uses",boroughfireincarray[5][15]]);
HillingdonLU.push(["Domestic Buildings",boroughfireincarray[6][7]],["Domestic Gardens",boroughfireincarray[6][8]],["Non Domestic Buildings",boroughfireincarray[6][9]],["Road",boroughfireincarray[6][10]],["Rail",boroughfireincarray[6][11]],["Path",boroughfireincarray[6][12]],["Greenspace",boroughfireincarray[6][13]],["Water",boroughfireincarray[6][14]],["Other Land Uses",boroughfireincarray[6][15]]);
HarrowLU.push(["Domestic Buildings",boroughfireincarray[7][7]],["Domestic Gardens",boroughfireincarray[7][8]],["Non Domestic Buildings",boroughfireincarray[7][9]],["Road",boroughfireincarray[7][10]],["Rail",boroughfireincarray[7][11]],["Path",boroughfireincarray[7][12]],["Greenspace",boroughfireincarray[7][13]],["Water",boroughfireincarray[7][14]],["Other Land Uses",boroughfireincarray[7][15]]);
BrentLU.push(["Domestic Buildings",boroughfireincarray[8][7]],["Domestic Gardens",boroughfireincarray[8][8]],["Non Domestic Buildings",boroughfireincarray[8][9]],["Road",boroughfireincarray[8][10]],["Rail",boroughfireincarray[8][11]],["Path",boroughfireincarray[8][12]],["Greenspace",boroughfireincarray[8][13]],["Water",boroughfireincarray[8][14]],["Other Land Uses",boroughfireincarray[8][15]]);
BarnetLU.push(["Domestic Buildings",boroughfireincarray[9][7]],["Domestic Gardens",boroughfireincarray[9][8]],["Non Domestic Buildings",boroughfireincarray[9][9]],["Road",boroughfireincarray[9][10]],["Rail",boroughfireincarray[9][11]],["Path",boroughfireincarray[9][12]],["Greenspace",boroughfireincarray[9][13]],["Water",boroughfireincarray[9][14]],["Other Land Uses",boroughfireincarray[9][15]]);
LambethLU.push(["Domestic Buildings",boroughfireincarray[10][7]],["Domestic Gardens",boroughfireincarray[10][8]],["Non Domestic Buildings",boroughfireincarray[10][9]],["Road",boroughfireincarray[10][10]],["Rail",boroughfireincarray[10][11]],["Path",boroughfireincarray[10][12]],["Greenspace",boroughfireincarray[10][13]],["Water",boroughfireincarray[10][14]],["Other Land Uses",boroughfireincarray[10][15]]);
SouthwarkLU.push(["Domestic Buildings",boroughfireincarray[11][7]],["Domestic Gardens",boroughfireincarray[11][8]],["Non Domestic Buildings",boroughfireincarray[11][9]],["Road",boroughfireincarray[11][10]],["Rail",boroughfireincarray[11][11]],["Path",boroughfireincarray[11][12]],["Greenspace",boroughfireincarray[11][13]],["Water",boroughfireincarray[11][14]],["Other Land Uses",boroughfireincarray[11][15]]);
LewishamLU.push(["Domestic Buildings",boroughfireincarray[12][7]],["Domestic Gardens",boroughfireincarray[12][8]],["Non Domestic Buildings",boroughfireincarray[12][9]],["Road",boroughfireincarray[12][10]],["Rail",boroughfireincarray[12][11]],["Path",boroughfireincarray[12][12]],["Greenspace",boroughfireincarray[12][13]],["Water",boroughfireincarray[12][14]],["Other Land Uses",boroughfireincarray[12][15]]);
GreenwichLU.push(["Domestic Buildings",boroughfireincarray[13][7]],["Domestic Gardens",boroughfireincarray[13][8]],["Non Domestic Buildings",boroughfireincarray[13][9]],["Road",boroughfireincarray[13][10]],["Rail",boroughfireincarray[13][11]],["Path",boroughfireincarray[13][12]],["Greenspace",boroughfireincarray[12][13]],["Water",boroughfireincarray[13][14]],["Other Land Uses",boroughfireincarray[13][15]]);
BexleyLU.push(["Domestic Buildings",boroughfireincarray[14][7]],["Domestic Gardens",boroughfireincarray[14][8]],["Non Domestic Buildings",boroughfireincarray[14][9]],["Road",boroughfireincarray[14][10]],["Rail",boroughfireincarray[14][11]],["Path",boroughfireincarray[14][12]],["Greenspace",boroughfireincarray[14][13]],["Water",boroughfireincarray[14][14]],["Other Land Uses",boroughfireincarray[14][15]]);
EnfieldLU.push(["Domestic Buildings",boroughfireincarray[15][7]],["Domestic Gardens",boroughfireincarray[15][8]],["Non Domestic Buildings",boroughfireincarray[15][9]],["Road",boroughfireincarray[15][10]],["Rail",boroughfireincarray[15][11]],["Path",boroughfireincarray[15][12]],["Greenspace",boroughfireincarray[15][13]],["Water",boroughfireincarray[15][14]],["Other Land Uses",boroughfireincarray[15][15]]);
WalthamForestLU.push(["Domestic Buildings",boroughfireincarray[16][7]],["Domestic Gardens",boroughfireincarray[16][8]],["Non Domestic Buildings",boroughfireincarray[16][9]],["Road",boroughfireincarray[16][10]],["Rail",boroughfireincarray[16][11]],["Path",boroughfireincarray[16][12]],["Greenspace",boroughfireincarray[16][13]],["Water",boroughfireincarray[16][14]],["Other Land Uses",boroughfireincarray[16][15]]);
RedbridgeLU.push(["Domestic Buildings",boroughfireincarray[17][7]],["Domestic Gardens",boroughfireincarray[17][8]],["Non Domestic Buildings",boroughfireincarray[17][9]],["Road",boroughfireincarray[17][10]],["Rail",boroughfireincarray[17][11]],["Path",boroughfireincarray[17][12]],["Greenspace",boroughfireincarray[17][13]],["Water",boroughfireincarray[17][14]],["Other Land Uses",boroughfireincarray[17][15]]);
SuttonLU.push(["Domestic Buildings",boroughfireincarray[18][7]],["Domestic Gardens",boroughfireincarray[18][8]],["Non Domestic Buildings",boroughfireincarray[18][9]],["Road",boroughfireincarray[18][10]],["Rail",boroughfireincarray[18][11]],["Path",boroughfireincarray[18][12]],["Greenspace",boroughfireincarray[18][13]],["Water",boroughfireincarray[18][14]],["Other Land Uses",boroughfireincarray[18][15]]);
RichmonduponThamesLU.push(["Domestic Buildings",boroughfireincarray[19][7]],["Domestic Gardens",boroughfireincarray[19][8]],["Non Domestic Buildings",boroughfireincarray[19][9]],["Road",boroughfireincarray[19][10]],["Rail",boroughfireincarray[19][11]],["Path",boroughfireincarray[19][12]],["Greenspace",boroughfireincarray[19][13]],["Water",boroughfireincarray[19][14]],["Other Land Uses",boroughfireincarray[19][15]]);
MertonLU.push(["Domestic Buildings",boroughfireincarray[20][7]],["Domestic Gardens",boroughfireincarray[20][8]],["Non Domestic Buildings",boroughfireincarray[20][9]],["Road",boroughfireincarray[20][10]],["Rail",boroughfireincarray[20][11]],["Path",boroughfireincarray[20][12]],["Greenspace",boroughfireincarray[20][13]],["Water",boroughfireincarray[20][14]],["Other Land Uses",boroughfireincarray[20][15]]);
WandsworthLU.push(["Domestic Buildings",boroughfireincarray[21][7]],["Domestic Gardens",boroughfireincarray[21][8]],["Non Domestic Buildings",boroughfireincarray[21][9]],["Road",boroughfireincarray[21][10]],["Rail",boroughfireincarray[21][11]],["Path",boroughfireincarray[21][12]],["Greenspace",boroughfireincarray[21][13]],["Water",boroughfireincarray[21][14]],["Other Land Uses",boroughfireincarray[21][15]]);
HammersmithandFulhamLU.push(["Domestic Buildings",boroughfireincarray[22][7]],["Domestic Gardens",boroughfireincarray[22][8]],["Non Domestic Buildings",boroughfireincarray[22][9]],["Road",boroughfireincarray[22][10]],["Rail",boroughfireincarray[22][11]],["Path",boroughfireincarray[22][12]],["Greenspace",boroughfireincarray[22][13]],["Water",boroughfireincarray[22][14]],["Other Land Uses",boroughfireincarray[22][15]]);
KensingtonandChelseaLU.push(["Domestic Buildings",boroughfireincarray[23][7]],["Domestic Gardens",boroughfireincarray[23][8]],["Non Domestic Buildings",boroughfireincarray[23][9]],["Road",boroughfireincarray[23][10]],["Rail",boroughfireincarray[23][11]],["Path",boroughfireincarray[23][12]],["Greenspace",boroughfireincarray[23][13]],["Water",boroughfireincarray[23][14]],["Other Land Uses",boroughfireincarray[23][15]]);
WestminsterLU.push(["Domestic Buildings",boroughfireincarray[24][7]],["Domestic Gardens",boroughfireincarray[24][8]],["Non Domestic Buildings",boroughfireincarray[24][9]],["Road",boroughfireincarray[24][10]],["Rail",boroughfireincarray[24][11]],["Path",boroughfireincarray[24][12]],["Greenspace",boroughfireincarray[24][13]],["Water",boroughfireincarray[24][14]],["Other Land Uses",boroughfireincarray[24][15]]);
CamdenLU.push(["Domestic Buildings",boroughfireincarray[25][7]],["Domestic Gardens",boroughfireincarray[25][8]],["Non Domestic Buildings",boroughfireincarray[25][9]],["Road",boroughfireincarray[25][10]],["Rail",boroughfireincarray[25][11]],["Path",boroughfireincarray[25][12]],["Greenspace",boroughfireincarray[25][13]],["Water",boroughfireincarray[25][14]],["Other Land Uses",boroughfireincarray[25][15]]);
TowerHamletsLU.push(["Domestic Buildings",boroughfireincarray[26][7]],["Domestic Gardens",boroughfireincarray[26][8]],["Non Domestic Buildings",boroughfireincarray[26][9]],["Road",boroughfireincarray[26][10]],["Rail",boroughfireincarray[26][11]],["Path",boroughfireincarray[26][12]],["Greenspace",boroughfireincarray[26][13]],["Water",boroughfireincarray[26][14]],["Other Land Uses",boroughfireincarray[26][15]]);
IslingtonLU.push(["Domestic Buildings",boroughfireincarray[27][7]],["Domestic Gardens",boroughfireincarray[27][8]],["Non Domestic Buildings",boroughfireincarray[27][9]],["Road",boroughfireincarray[27][10]],["Rail",boroughfireincarray[27][11]],["Path",boroughfireincarray[27][12]],["Greenspace",boroughfireincarray[27][13]],["Water",boroughfireincarray[27][14]],["Other Land Uses",boroughfireincarray[27][15]]);
HackneyLU.push(["Domestic Buildings",boroughfireincarray[28][7]],["Domestic Gardens",boroughfireincarray[28][8]],["Non Domestic Buildings",boroughfireincarray[28][9]],["Road",boroughfireincarray[28][10]],["Rail",boroughfireincarray[28][11]],["Path",boroughfireincarray[28][12]],["Greenspace",boroughfireincarray[28][13]],["Water",boroughfireincarray[28][14]],["Other Land Uses",boroughfireincarray[28][15]]);
HaringeyLU.push(["Domestic Buildings",boroughfireincarray[29][7]],["Domestic Gardens",boroughfireincarray[29][8]],["Non Domestic Buildings",boroughfireincarray[29][9]],["Road",boroughfireincarray[29][10]],["Rail",boroughfireincarray[29][11]],["Path",boroughfireincarray[29][12]],["Greenspace",boroughfireincarray[29][13]],["Water",boroughfireincarray[29][14]],["Other Land Uses",boroughfireincarray[29][15]]);
NewhamLU.push(["Domestic Buildings",boroughfireincarray[30][7]],["Domestic Gardens",boroughfireincarray[30][8]],["Non Domestic Buildings",boroughfireincarray[30][9]],["Road",boroughfireincarray[30][10]],["Rail",boroughfireincarray[30][11]],["Path",boroughfireincarray[30][12]],["Greenspace",boroughfireincarray[30][13]],["Water",boroughfireincarray[30][14]],["Other Land Uses",boroughfireincarray[30][15]]);
BarkingandDagenhamLU.push(["Domestic Buildings",boroughfireincarray[31][7]],["Domestic Gardens",boroughfireincarray[31][8]],["Non Domestic Buildings",boroughfireincarray[31][9]],["Road",boroughfireincarray[31][10]],["Rail",boroughfireincarray[31][11]],["Path",boroughfireincarray[31][12]],["Greenspace",boroughfireincarray[31][13]],["Water",boroughfireincarray[31][14]],["Other Land Uses",boroughfireincarray[31][15]]);
CityofLondonLU.push(["Domestic Buildings",boroughfireincarray[32][7]],["Domestic Gardens",boroughfireincarray[32][8]],["Non Domestic Buildings",boroughfireincarray[32][9]],["Road",boroughfireincarray[32][10]],["Rail",boroughfireincarray[32][11]],["Path",boroughfireincarray[32][12]],["Greenspace",boroughfireincarray[32][13]],["Water",boroughfireincarray[32][14]],["Other Land Uses",boroughfireincarray[32][15]]);

//lay out child age data
KingstonuponThamesCO.push(["Child",boroughfireincarray[0][5]],["Old",boroughfireincarray[0][6]],["Working",boroughfireincarray[0][16]]);
CroydonCO.push(["Child",boroughfireincarray[1][5]],["Old",boroughfireincarray[1][6]],["Working",boroughfireincarray[1][16]]);
BromleyCO.push(["Child",boroughfireincarray[2][5]],["Old",boroughfireincarray[2][6]],["Working",boroughfireincarray[2][16]]);
HounslowCO.push(["Child",boroughfireincarray[3][5]],["Old",boroughfireincarray[3][6]],["Working",boroughfireincarray[3][16]]);
EalingCO.push(["Child",boroughfireincarray[4][5]],["Old",boroughfireincarray[4][6]],["Working",boroughfireincarray[4][16]]);
HaveringCO.push(["Child",boroughfireincarray[5][5]],["Old",boroughfireincarray[5][6]],["Working",boroughfireincarray[5][16]]);
HillingdonCO.push(["Child",boroughfireincarray[6][5]],["Old",boroughfireincarray[6][6]],["Working",boroughfireincarray[6][16]]);
HarrowCO.push(["Child",boroughfireincarray[7][5]],["Old",boroughfireincarray[7][6]],["Working",boroughfireincarray[7][16]]);
BrentCO.push(["Child",boroughfireincarray[8][5]],["Old",boroughfireincarray[8][6]],["Working",boroughfireincarray[8][16]]);
BarnetCO.push(["Child",boroughfireincarray[9][5]],["Old",boroughfireincarray[9][6]],["Working",boroughfireincarray[9][16]]);
LambethCO.push(["Child",boroughfireincarray[10][5]],["Old",boroughfireincarray[10][6]],["Working",boroughfireincarray[10][16]]);
SouthwarkCO.push(["Child",boroughfireincarray[11][5]],["Old",boroughfireincarray[11][6]],["Working",boroughfireincarray[11][16]]);
LewishamCO.push(["Child",boroughfireincarray[12][5]],["Old",boroughfireincarray[12][6]],["Working",boroughfireincarray[12][16]]);
GreenwichCO.push(["Child",boroughfireincarray[13][5]],["Old",boroughfireincarray[13][6]],["Working",boroughfireincarray[13][16]]);
BexleyCO.push(["Child",boroughfireincarray[14][5]],["Old",boroughfireincarray[14][6]],["Working",boroughfireincarray[14][16]]);
EnfieldCO.push(["Child",boroughfireincarray[15][5]],["Old",boroughfireincarray[15][6]],["Working",boroughfireincarray[15][16]]);
WalthamForestCO.push(["Child",boroughfireincarray[16][5]],["Old",boroughfireincarray[16][6]],["Working",boroughfireincarray[16][16]]);
RedbridgeCO.push(["Child",boroughfireincarray[17][5]],["Old",boroughfireincarray[17][6]],["Working",boroughfireincarray[17][16]]);
SuttonCO.push(["Child",boroughfireincarray[18][5]],["Old",boroughfireincarray[18][6]],["Working",boroughfireincarray[18][16]]);
RichmonduponThamesCO.push(["Child",boroughfireincarray[19][5]],["Old",boroughfireincarray[19][6]],["Working",boroughfireincarray[19][16]]);
MertonCO.push(["Child",boroughfireincarray[20][5]],["Old",boroughfireincarray[20][6]],["Working",boroughfireincarray[20][16]]);
WandsworthCO.push(["Child",boroughfireincarray[21][5]],["Old",boroughfireincarray[21][6]],["Working",boroughfireincarray[21][16]]);
HammersmithandFulhamCO.push(["Child",boroughfireincarray[22][5]],["Old",boroughfireincarray[22][6]],["Working",boroughfireincarray[22][16]]);
KensingtonandChelseaCO.push(["Child",boroughfireincarray[23][5]],["Old",boroughfireincarray[23][6]],["Working",boroughfireincarray[23][16]]);
WestminsterCO.push(["Child",boroughfireincarray[24][5]],["Old",boroughfireincarray[24][6]],["Working",boroughfireincarray[24][16]]);
CamdenCO.push(["Child",boroughfireincarray[25][5]],["Old",boroughfireincarray[25][6]],["Working",boroughfireincarray[25][16]]);
TowerHamletsCO.push(["Child",boroughfireincarray[26][5]],["Old",boroughfireincarray[26][6]],["Working",boroughfireincarray[26][16]]);
IslingtonCO.push(["Child",boroughfireincarray[27][5]],["Old",boroughfireincarray[27][6]],["Working",boroughfireincarray[27][16]]);
HackneyCO.push(["Child",boroughfireincarray[28][5]],["Old",boroughfireincarray[28][6]],["Working",boroughfireincarray[28][16]]);
HaringeyCO.push(["Child",boroughfireincarray[29][5]],["Old",boroughfireincarray[29][6]],["Working",boroughfireincarray[29][16]]);
NewhamCO.push(["Child",boroughfireincarray[30][5]],["Old",boroughfireincarray[30][6]],["Working",boroughfireincarray[30][16]]);
BarkingandDagenhamCO.push(["Child",boroughfireincarray[31][5]],["Old",boroughfireincarray[31][6]],["Working",boroughfireincarray[31][16]]);
CityofLondonCO.push(["Child",boroughfireincarray[32][5]],["Old",boroughfireincarray[32][6]],["Working",boroughfireincarray[32][16]]);
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
	getFireIncident();


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
layoutTable.getCell(1, 1).content(drawDetailchartTwo());	
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
function drawDetailchartTwo(){
	
// create a chart
areacharttwo = anychart.area();

// create an area series and set the data
var series = areacharttwo.area(dataLU);

series.name("Land Use")
.color('#c68c53');

var title;
title = areacharttwo.title();
title.enabled(true);
title.text("Land Use Per Borough");
title.fontSize(10);

// create extra axis on the right side of chart
var yTitle = areacharttwo.yAxis().title();
yTitle.enabled(true);
yTitle.text('Land Use Area (%)');
yTitle.fontSize(10);

var labelsx = areacharttwo.xAxis().labels();
labelsx.fontSize(8);
var labelsy = areacharttwo.yAxis().labels();
labelsy.fontSize(8);


areacharttwo.draw();

return areacharttwo
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
	getFireIncident();
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
	
	//arrange data for chart two and three
	if (clickchartfireinc === 'Kingston upon Thames'){
		dataLU = KingstonuponThamesLU;
		dataCO = KingstonuponThamesCO;
	}
	
	if (clickchartfireinc === 'Croydon'){
		dataLU = CroydonLU;
		dataCO = CroydonCO;
	}
	
	if (clickchartfireinc === 'Bromley'){
		dataLU = BromleyLU;
		dataCO = BromleyCO;
	}
	if (clickchartfireinc === 'Hounslow'){
		dataLU = HounslowLU;
		dataCO = HounslowCO;
	}
	
	if (clickchartfireinc === 'Ealing'){
		dataLU = EalingLU;
		dataCO = EalingCO;
	}
	
	if (clickchartfireinc === 'Havering'){
		dataLU = HaveringLU;
		dataCO = HaveringCO;
	}
	
	if (clickchartfireinc === 'Hillingdon'){
		dataLU = HillingdonLU;
		dataCO = HillingdonCO;
	}
	if (clickchartfireinc === 'Harrow'){
		dataLU = HarrowLU;
		dataCO = HarrowCO;
	}
	if (clickchartfireinc === 'Brent'){
		dataLU = BrentLU;
		dataCO = BrentCO;
	}
	if (clickchartfireinc === 'Barnet'){
		dataLU = BarnetLU;
		dataCO = BarnetCO;
	}
	if (clickchartfireinc === 'Lambeth'){
		dataLU = LambethLU;
		dataCO = LambethCO;
	}
	if (clickchartfireinc === 'Southwark'){
		dataLU = SouthwarkLU;
		dataCO = SouthwarkCO;
	}
	if (clickchartfireinc === 'Southwark'){
		dataLU = SouthwarkLU;
		dataCO = SouthwarkCO;
	}
	if (clickchartfireinc === 'Lewisham'){
		dataLU = LewishamLU;
		dataCO = LewishamCO;
	}
	if (clickchartfireinc === 'Greenwich'){
		dataLU = GreenwichLU;
		dataCO = GreenwichCO;
	}
	if (clickchartfireinc === 'Bexley'){
		dataLU = BexleyLU;
		dataCO = BexleyCO;
	}
	if (clickchartfireinc === 'Enfield'){
		dataLU = EnfieldLU;
		dataCO = EnfieldCO;
	}
	if (clickchartfireinc === 'Waltham Forest'){
		dataLU = WalthamForestLU;
		dataCO = WalthamForestCO;
	}
	if (clickchartfireinc === 'Redbridge'){
		dataLU = RedbridgeLU;
		dataCO = RedbridgeCO;
	}
	if (clickchartfireinc === 'Sutton'){
		dataLU = SuttonLU;
		dataCO = SuttonCO;
	}
	if (clickchartfireinc === 'Richmond upon Thames'){
		dataLU = RichmonduponThamesLU;
		dataCO = RichmonduponThamesCO;
	}
	if (clickchartfireinc === 'Merton'){
		dataLU = MertonLU;
		dataCO = MertonCO;
	}
	if (clickchartfireinc === 'Wandsworth'){
		dataLU = WandsworthLU;
		dataCO = WandsworthCO;
	}
	if (clickchartfireinc === 'Hammersmith and Fulham'){
		dataLU = HammersmithandFulhamLU;
		dataCO = HammersmithandFulhamCO;
	}
	if (clickchartfireinc === 'Kensington and Chelsea'){
		dataLU = KensingtonandChelseaLU;
		dataCO = KensingtonandChelseaCO;
	}
	if (clickchartfireinc === 'Westminster'){
		dataLU = WestminsterLU;
		dataCO = WestminsterCO;
	}
	if (clickchartfireinc === 'Camden'){
		dataLU = CamdenLU;
		dataCO = CamdenCO;
	}
	if (clickchartfireinc === 'Tower Hamlets'){
		dataLU = TowerHamletsLU;
		dataCO = TowerHamletsCO;
	}
	if (clickchartfireinc === 'Islington'){
		dataLU = IslingtonLU;
		dataCO = IslingtonCO;
	}
	if (clickchartfireinc === 'Hackney'){
		dataLU = HackneyLU;
		dataCO = HackneyCO;
	}
	if (clickchartfireinc === 'Haringey'){
		dataLU = HaringeyLU;
		dataCO = HaringeyCO;
	}
	if (clickchartfireinc === 'Newham'){
		dataLU = NewhamLU;
		dataCO = NewhamCO;
	}
	if (clickchartfireinc === 'Barking and Dagenham'){
		dataLU = BarkingandDagenhamLU;
		dataCO = BarkingandDagenhamCO;
	}
	if (clickchartfireinc === 'City of London'){
		dataLU = CityofLondonLU;
		dataCO = CityofLondonCO;
	}

layoutTable.getCell(1, 0).content(DetailChartOne());
layoutTable.getCell(1, 1).content(drawDetailchartTwo());	
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
var i;
for (i = 0; i < jproperties.length; i++) { 
	fireincarray.push(Object.values(jproperties[i]));
}



}


