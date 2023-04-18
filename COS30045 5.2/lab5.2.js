function init () 
{
    var w = 600;
    var h = 400;
    var maxValue = 25;
    var padding = 100;
    var barPadding = 10;
    
    var dataset = [14,20,17,10,4,19,8,5,25,23];
    
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0,w])
        .paddingInner(0.05);
        
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(dataset)])
        .rangeRound([0,h]);

    d3.select("#default")
        .on("click", function(){
            update();
    })
  
    var update = function(){
            var numValues = dataset.length;
            dataset = [];
        var maxValue = 25;

        for(var i = 0; i < numValues; i++){
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d, i){
                return i/dataset.length * 100;
            })
            .duration(2000)
            .ease(d3.easeElasticOut)
            .attr("y", function(d){
                return h - yScale(d);
            })
            .attr("height", function(d){
                return yScale(d);
            })
    }

    d3.select("#slow")
        .on("click", function(){
            slow();
    })

    var slow = function(){
        var numValues = dataset.length;
        dataset = [];
    var maxValue = 25;

    for(var i = 0; i < numValues; i++){
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
    }

    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .delay(function(d, i){
            return i/dataset.length * 100;
        })
        .duration(2000)
        .ease(d3.easeCircleIn)
        .attr("y", function(d){
            return h - yScale(d);
        })
        .attr("height", function(d){
            return yScale(d);
        })
}
    
    var svg = d3.select("p")
        .append("svg")
        .attr("width", w + 100)
        .attr("height", h)
        //.style("background-color", d3.color("skyblue"));
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i){return xScale(i);})
        .attr("y", function(d){return h - yScale(d);})
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){return yScale(d);})
        .style("fill", d3.color("cyan"));
};

window.onload = init;