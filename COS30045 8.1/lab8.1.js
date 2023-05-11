function init () 
{
    var w = 500;
    var h = 300;
    var padding = 25;

        //set up path projcetion
    var projection = d3.geoMercator()
        .center([145,-36])
        .translate([w / 2, h / 2])
        .scale(2450);

    var path = d3.geoPath()
        .projection(projection);

        //adds svg to main html
    var svg = d3.select("p")
        .append("svg")
        .attr("width", w + padding)
        .attr("height", h + padding)
        .attr("fill", d3.color("grey"));


        //reads in data file with LGA coordinates
    d3.json("LGA_VIC.json").then(function(json){
        
        svg.selectAll("path")  //visualises data from json file appending to path
            .data(json.features)
            .enter()
            .append("path")
            .attr("stroke", "dimgray")
            .attr("fill", d3.color("cyan"))
            .attr("d", path);
    });
};

window.onload = init;