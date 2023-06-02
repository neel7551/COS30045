function init () 
{
    var w = 1000;
    var h = 500;
    var padding = 10;


    d3.csv("lab2.4_data.csv").then(function(data){
        console.log(data);
        wombatSightings = data;
        barChart(wombatSightings);
    });

    function barChart(data){
        svg.selectAll("rect")
            .data(wombatSightings)
            .enter()
            .append("rect")
            .attr("x", function(d, i){
                return i * (w / wombatSightings.length);
            })
            .attr("y", function(d){
                return h - (d.wombats * 4);
            })
            .attr("width", (w / wombatSightings.length) - padding)
            .attr("height", function(d){
                return d.wombats * 4;
            })
            .style("fill", function(d){
                if(d.wombats < 10){
                    return "blue";
                }else{
                    return "darkblue";
                }
            });
    };           

    var svg = d3.select("p")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("fill", "lightgrey");
};

window.onload = init;