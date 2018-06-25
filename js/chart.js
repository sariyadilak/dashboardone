

function chart() {
		
		var data = anychart.data.set(boroughpop);
	
		// create a chart
		chart = anychart.bar();

		// create a bar series and set the data
		var series = chart.bar(data);
		
		// set the chart title
		chart.title("Bar Chart: Borough Population");		

    // set the titles of the axes
    chart.xAxis().title("Borough");
    chart.yAxis().title("Number of Population");

		// set the container id
		chart.container("container");

		// initiate drawing the chart
		chart.draw();
		  }
