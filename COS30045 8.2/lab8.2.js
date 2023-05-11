function init () 
{
    var w = 500;
    var h = 300;
    var padding = 25;

    var color = d3.scaleQuantize()
        .range(['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f']);

    var projection = d3.geoMercator()
        .center([145,-36])
        .translate([w / 2, h / 2])
        .scale(2450);

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w + padding)
        .attr("height", h + padding);

        //reads in data from csv
    d3.csv("VIC_LGA_unemployment.csv").then(function(data){

        color.domain([
                d3.min(data, function(d) {return d.unemployed;}),
                d3.max(data, function(d) {return d.unemployed;})
            ]);
            
            //read in data from json file
        d3.json("LGA_VIC.json").then(function(json){

            //merge unemployment and GeoJSON data
            //loop once for each unemployment value
            for(var i = 0; i < data.length; i++){
                //get LGA name
                var dataState = data[i].LGA;
                //get data value, convert from string to float
                var dataValue = parseFloat(data[i].unemployed);
                //find corresponding LGA in side GeoJSON
                for(var j = 0; j < json.features.length; j++){
                    var jsonState = json.features[j].properties.LGA_name;

                    if(dataState == jsonState){
                        //copy data value into JSON
                        json.features[j].properties.value = dataValue;
                        break; //stop looking in JSON
                    }
                }
            }

        //draws on each LGA with a border
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            //.attr("stroke", "dimgray")
            .attr("d", path)
            .style("fill", function (d) {
                // get data for colour saturation
                var value = d.properties.value;
                if (value) {
                    return color(value);
                } else {
                    return "#ccc";
                }
            });

        //reads in data from csv file
        d3.csv("VIC_city.csv").then(function(data){
                    //prints a circle on places
                svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d){
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("cy", function(d){
                        return projection([d.lon, d.lat])[1];
                    })
                    .attr("r", 3)
                    .style("fill", d3.color("yellow"));
            });
        });
    });
};

window.onload = init;