// Get the URL read in
const belly = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//select reference to the dropdown menu
var selData = d3.select('#selDataset');

// Fetch the JSON data and console log it
d3.json(belly).then(function(data) {
    console.log(data)
        data.names.forEach(function(name) {
            //select reference to the menu
            selData.append('option')
            //set the text of the option
            .text(name)
            //now set the value of .property('value');
        });
        //assign the firt item from the names array/list in python
    var namesID = data.names[0]
        //use the first sample from the list to build the initial plot
        //taking optionChanged func name from indexPractice.html
    optionChanged(namesID);
    }); 

//D3 Change option event handler
function optionChanged(namesID){
    //fetch new data each time a new sample is clicked
    d3.json(belly).then(function(data) {
        //console.log to check file read
        console.log(metadata);
        var metadata= data.metadata;
        //add filter for id's
        var filteredData = metadata.filter(md => md.id == namesID);
        //fetch the first element
        var results = filteredData[0];
        //add code for dropdown menu to populate the demographic info
        var metadataPanel = d3.select('#sample-metadata');
        //clear list everytime you click on a new id
        metadataPanel.html("");
        //loop through the dictionary/objec to get the demographic key-value
        Object.entries(results).forEach(([key,value]) => {
            //verify the code is working
            //append the demographic info section
            var appendDemoInfo = metadataPanel.append("p")
            appendDemoInfo.text(`${key}: ${value}`);
        }); 

        //Fetch the data for the plotting
        var sampledata = data.samples;

        sampledata.forEach(function(sample){
            if (sample.id === namesID){
                //these map the required info to variables
                var values = sample.sample_values.map (x => x)
                var labels = sample.otu_ids.map(x => `OTU ${x}`)
                var ids = sample.otu_ids.map(x => x)
                var hovers = sample.otu_labels.map(x => x)
                //print data from variables to the console
                console.log(values);
                console.log(labels);
                console.log(ids);
    //Create Trace for bar chart data

    var trace1= {
        x: values.slice(0,10).reverse(),
        y: labels.slice(0,10).reverse(),
        text: hovers.slice(0,10).reverse(),
        name: "OTU",
        type: "bar",
        orientation: "h"
    };

    //Bar chart
    var barData = [trace1];

    //apply the group bar mode to layout
    var layout = {
        title: "<b>Top 10 Units</b>",
        xaxis: {title: "Sample_Values"},
        autosize: false,
        width: 400,
        height: 500,
        margin: {
            r: -40,
            b: -100,
            t: -100,
        }
    };

    //Render the bar plot in the bar div tag
    Plotly.newPlot("bar", barData, layout);

    //Bubble Chart
    //create trace2 for bubble chart

    var trace2= {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sampledata.otu_labels,
        mode: "markers",
        marker: {
            color: sample.otu_ids,
            size: sample.sample_values
        }
    };
    //layout
    var layout_bubble = {
        title: "<b>Belly Button Data In Bubble Form</b>",
        xaxis: {title: "OTU_Ids"},
        yaxis: {title: "Sample_Values"},
        width: 800,
        height: 500,
        margin: {
            l: -50,
            r: -1,
            b: -40,
            t: 40
        }};

        //capture and create the bubble plt
        var bubble_data = [trace2];

        Plotly.newPlot("bubble", bubble_data, layout_bubble);

    //Gauge Chart
    var trace3 = {
       value: sample.wfreq,
       mode: "gauge+number",
       domain: {x:[0,5], y: [0,1]},
       marker: {
            size: 48, 
            color: "black"},
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs/week"},
        type: 'indicator',
        // text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
        // direction: "clockwise",
        // textinfo: "text",
        // textposition: "inside",
        gauge: {
            axis: {
                range: [null, 9], 
                tickcolor: "black"},
            bgcolor: "black",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                {range: [0,1], color: "red"},
                {range: [1,2], color: "yellow"},
                {range: [2,3], color: "yellow"},
                {range: [3,4], color: "yellow"},
                {range: [4,5], color: "lime"},
                {range: [5,6], color: "lime"},
                {range: [6,7], color: "lime"},
                {range: [7,8], color: "green"},
                {range: [8,9], color: "green"}],
            }};
    // var degrees = 115, radius = .6;
    // var radians = degrees * Math.PI / 180;
    // var x = radius * Math.cos(radians);
    // var y = radius * Math.sin(radians);

    //layout
    var gauge_layout = {
        width: 500,
        height: 500,
        margin: {
            t: 0,
            b:0}
        };

        //capture to print and plot
        var gauge_data = [trace3];

        Plotly.newPlot("gauge", gauge_data, gauge_layout);
    

        }})
    }
    
)};
//Module 14, Day 3, Actiity 10 for good example