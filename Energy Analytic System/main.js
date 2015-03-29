 //---------------------------------------------------Usage Breakdown----------------------------------------------------
 // Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

function drawChartMonth() {
	//Get the data
	mockDataPieChart(PieChartCallback);
}

function PieChartCallback(data) {
	//Get the chart
	//Draw the chart
	
    // Set chart options
	var options = {'title':'How much energy is each appliances consuming over total house usage',
				   'width':700,
				   'height':500};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
	
	chart.draw(data, options);
}

function mockDataPieChart(callback) {
	jsonData = {
			  "cols": [
					{"id":"","label":"Appliances","pattern":"","type":"string"},
					{"id":"","label":"Slices","pattern":"","type":"number"}
				  ],
			  "rows": [
					{"c":[{"v":"Fridge","f":null},{"v":3,"f":null}]},
					{"c":[{"v":"Washer","f":null},{"v":1,"f":null}]},
					{"c":[{"v":"Lamp","f":null},{"v":1,"f":null}]},
					{"c":[{"v":"Toaster","f":null},{"v":1,"f":null}]},
					{"c":[{"v":"Lamp","f":null},{"v":2,"f":null}]}
				  ]
			}
	
	// Create our data table out of JSON data loaded from server.
	//Convert data to google data
	var data = new google.visualization.DataTable(jsonData);
	callback(data);
}
	
/*influxdb = new InfluxDB({
  "host" :"10.10.10.10",
  "port" :"8086",
  "username" :"root",
  "password" :"root",
  "database" :"demo"
});
var field = "laundry_washer"
var fieldPattern = "mean(" + field + ")"
var query = "power_consumption where time > (now()-5s) group by time(3s) order asc"

influxdb.readPoint(fieldPattern, query, PiechartCallback) ; 
*/
	  
//---------------------------------------------------Currentusage----------------------------------------------------
function drawChartCurrent() {
	// Create the data table.
	mockCurrentPieChart(currentPieChart);
	console.log(Math.random() * 200);
}
  
function currentPieChart(data) {
	//Get the chart
	//Draw the chart
	
    // Set chart options
	var options = {'title':'How much energy is each appliances consuming over total house usage',
				   'width':700,
				   'height':500};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
	
	chart.draw(data, options);
}

function mockCurrentPieChart(callback) {
	jsonData = {
			  "cols": [
					{"id":"","label":"Appliances","pattern":"","type":"string"},
					{"id":"","label":"Slices","pattern":"","type":"number"}
				  ],
			  "rows": [
					{"c":[{"v":"Mushrooms","f":null},{"v":3,"f":null}]},
					{"c":[{"v":"Onions","f":null},{"v":1,"f":null}]},
					{"c":[{"v":"Olives","f":null},{"v":1,"f":null}]},
					{"c":[{"v":"Zucchini","f":null},{"v":1,"f":null}]},
					{"c":[{"v":"Pepperoni","f":null},{"v":2,"f":null}]}
				  ]
			}
	
	// Create our data table out of JSON data loaded from server.
	//Convert data to google data
	var data = new google.visualization.DataTable(jsonData);
	callback(data);
}
		
//---------------------------------------------------CostBreakdown----------------------------------------------------
function drawChartCost() {

// Create the data table.
mockCostPieChart(costPieChart);
}

function costPieChart(data) {
	//Get the chart
	//Draw the chart
	
    // Set chart options
	var options = {'title':'How much money is each appliances consuming over total house consumption',
				   'width':700,
				   'height':500};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
	
	chart.draw(data, options);
}

function mockCostPieChart(callback) {
	jsonData = {
			  "cols": [
					{"id":"","label":"Appliances","pattern":"","type":"string"},
					{"id":"","label":"Slices","pattern":"","type":"number"}
				  ],
			  "rows": [
					{"c":[{"v":"Fridge","f":null},{"v":3,"f":null}]},
					{"c":[{"v":"Washer","f":null},{"v":1,"f":null}]},
					{"c":[{"v":"Lamp","f":null},{"v":1,"f":null}]},
					{"c":[{"v":"Toaster","f":null},{"v":1,"f":null}]},
					{"c":[{"v":"Lamp","f":null},{"v":2,"f":null}]}
				  ]
			}
	
	// Create our data table out of JSON data loaded from server.
	//Convert data to google data
	var data = new google.visualization.DataTable(jsonData);
	callback(data);
}
	
//---------------------------------------------------Main page----------------------------------------------------
	
function updateGui(fieldName, value) {
	document.getElementById(fieldName).innerHTML=value;
}

function UsageCallback(data) {
		var instValue;
	if(typeof data[0] === 'undefined') {
	    // does not exist
	    instValue = 0.0;
	}
	else {
	    // does exist
	    instObject = data[0];
		if(typeof instObject.points[0] === 'undefined') {
		    // no points exist
		    instValue = 0.0;
		} else {
			instValue = instObject.points[0].first;
		}
	}

	//Normalize the data
	instValue = instValue/(2.7 * 10000000);

	console.log(parseInt(instValue));
	// Change the values of the pie charts
	updateGui("MonthlyUsage_Number", parseInt(instValue));
}

function CostCallback(data) {
		var instValue;
	if(typeof data[0] === 'undefined') {
	    // does not exist
	    instValue = 0.0;
	}
	else {
	    // does exist
	    instObject = data[0];
		if(typeof instObject.points[0] === 'undefined') {
		    // no points exist
		    instValue = 0.0;
		} else {
			instValue = instObject.points[0].first;
		}
	}
		console.log(parseInt(instValue));
		// Change the values of the pie charts
	updateGui("MonthlyCost_Number", parseInt(instValue));
	}
	
function CurrentCallback(data) {
		var instValue;
	if(typeof data[0] === 'undefined') {
	    // does not exist
	    instValue = 0.0;
	}
	else {
	    // does exist
	    instObject = data[0];
		if(typeof instObject.points[0] === 'undefined') {
		    // no points exist
		    instValue = 0.0;
		} else {
			instValue = instObject.points[0].mean;
		}
	}
		console.log(parseInt(instValue));
		// Change the values of the pie charts
	updateGui("CurrentUsage_Number", parseInt(instValue));
	}

function LampCallback(data) {
		var instValue;
	if(typeof data[0] === 'undefined') {
	    // does not exist
	    instValue = 0.0;
	}
	else {
	    // does exist
	    instObject = data[0];
		if(typeof instObject.points[0] === 'undefined') {
		    // no points exist
		    instValue = 0.0;
		} else {
			instValue = instObject.points[0].mean;
		}
	}
		console.log(parseInt(instValue));
		// Change the values of the pie charts
	updateGui("LampUsage_Number", parseInt(instValue));
	}
	
function ToasterCallback(data) {
		var instValue;
	if(typeof data[0] === 'undefined') {
	    // does not exist
	    instValue = 0.0;
	}
	else {
	    // does exist
	    instObject = data[0];
		if(typeof instObject.points[0] === 'undefined') {
		    // no points exist
		    instValue = 0.0;
		} else {
			instValue = instObject.points[0].mean;
		}
	}
		console.log(parseInt(instValue));
		// Change the values of the pie charts
	updateGui("ToasterUsage_Number", parseInt(instValue));
	}

function KettleCallback(data) {
		var instValue;
	if(typeof data[0] === 'undefined') {
	    // does not exist
	    instValue = 0.0;
	}
	else {
	    // does exist
	    instObject = data[0];
		if(typeof instObject.points[0] === 'undefined') {
		    // no points exist
		    instValue = 0.0;
		} else {
			instValue = instObject.points[0].mean;
		}
	}
		console.log(parseInt(instValue));
		// Change the values of the pie charts
	updateGui("KettleUsage_Number", parseInt(instValue));
	}
	
function HairdryerCallback(data) {
		var instValue;
	if(typeof data[0] === 'undefined') {
	    // does not exist
	    instValue = 0.0;
	}
	else {
	    // does exist
	    instObject = data[0];
		if(typeof instObject.points[0] === 'undefined') {
		    // no points exist
		    instValue = 0.0;
		} else {
			instValue = instObject.points[0].mean;
		}
	}
		console.log(parseInt(instValue));
		// Change the values of the pie charts
	updateGui("HairdryerUsage_Number", parseInt(instValue));
	}

function mockData(callback) {
	randomValue = Math.random() * 200;
	valueObject = {};
	valueObject.mean = randomValue;
	
	object = {};
	object.points = [valueObject];
	data = [object];
	callback(data);
}

	
influxdb = new InfluxDB({
  "host" :"10.10.10.10",
  "port" :"8086",
  "username" :"root",
  "password" :"root",
  "database" :"demo"
});


//Gets the instantaneous current value for any field
function influxDbInst(field_name, instCallback) {
	var fieldPattern = "mean(" + field_name + ")"
	var query = "power_consumption where time > (now()-5s) group by time(3s) order asc"
	influxdb.readPoint(fieldPattern, query, instCallback)
}

function influxDbCurrentUtilityCost(instCallback) {
	var fieldPattern = "first(power_cost)"
	var query = "power_consumption where time > (now() - 10m)"
	influxdb.readPoint(fieldPattern, query, instCallback)
}

function influxDbCurrentEnergy(instCallback) {
	var fieldPattern = "first(total_energy)"
	var query = "power_consumption where time > (now() - 10m)"
	influxdb.readPoint(fieldPattern, query, instCallback)
}
	
/*
var field = "laundry_washer"
var fieldPattern = "mean(" + field + ")"
var query = "power_consumption where time > (now()-5s) group by time(3s) order asc"

setInterval(influxdb.readPoint(fieldPattern, query, instCallback) , 5000); //what to put as "data"?
*/
	
//-----------------------------Recommendation 2--------------------------------------------------------
function recom2() {
	var act = Math.random()*15;
	var save = ((act-8)*6*3600*365/3600000*12).toFixed(2);
	console.log(act)
	//average power of a LED lightbulb = 8W
	if (act > 8) {
		$(".carousel").toggle();
		$("#recommendation2").text($("#recommendation2").text().replace("0", save));
	}
}	
//-----------------------------Recommendation 3--------------------------------------------------------
function recom3() {
	var time = Math.random() * 2000;
	//use the value generated during demo as daily use to calculate yearly saving
	//5w is the average consumption of off devices, time is in second
	var cost = (time*365*5/3600000*12).toFixed(2);
	 $("#recommendation3").text($("#recommendation3").text().replace("0", cost));
}	 
