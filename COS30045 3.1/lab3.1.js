function init () 
{
    var offset = 3;
    var w = 550;
    var h = 350;
    var padding = 60; //initialise padding to use for stopping cut off

    var dataset = [
                    [5,25],
                    [482,200],
                    [50,280],
                    [104,55],
                    [300,126],
                    [385,300],
                    [480,50],
                    [25,67],
                    [91,210],
                    [284,58],
                    [600,400]
                    ];

    var xScale = d3.scaleLinear()
        .domain([d3.min(dataset, function(d) //used to calculate min x value of dataset
        {
            return d[0];  //look at first x no. in array
        }),
        d3.max(dataset, function(d)  //used to calculate max x value of dataset
        { 
            return d[0];  //look at first no. in array
        })])
        .range([padding,w - padding]); //svg width with padding to stop cut-off

    var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) //used to calculate min y value of dataset
    {
        return d[1];  //look at first y no. in array
    }),
    d3.max(dataset, function(d)  //used to calculate max y value of dataset
    { 
        return d[1];  //look at first no. in array
    })])
    .range([padding,h - padding]); //svg height with padding to stop cut off

    var svg = d3.select("p")
        .data(dataset)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("background-color", "lightgreen")
                
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i){return xScale(d[0]);})
        .attr("cy", function(d){return yScale(d[1]);})
        .attr("r", 5)
        .attr("fill", function(d){
            if(d[0] == 300){
                return "red";
            }else{
                return "slategrey";
            }
        });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("x", function(d){return xScale(d[0]) + offset;})
        .attr("y", function(d){return yScale(d[1]) - offset;})
        .style("fill", "black")
        .text(function(d){return d[0] + ", " + d[1];});
};

window.onload = init;