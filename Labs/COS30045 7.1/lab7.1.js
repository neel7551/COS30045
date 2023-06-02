function init () 
{
    var w = 600;
    var h = 300;
    var padding = 55;

        //read in data from csv file
    d3.csv("Unemployment_78-95.csv", function(d){
        return {
            date: new Date(+d.year, +d.month-1),
            number: +d.number
        };
    }).then(function(data){
        var dataset = data;
        lineChart(dataset);
        console.table(dataset, ["date", "number"]);
    });


    var lineChart = function(dataset) {
        xScale = d3.scaleTime()  //create xScale
            .domain([
                d3.min(dataset, function(d){ return d.date; }),
                d3.max(dataset, function(d){ return d.date; })
            ])
            .range([0, w - padding]);

        yScale = d3.scaleLinear()  //create yScale
            .domain([0, d3.max(dataset, function(d) { return d.number; })
            ])
            .range([h - padding, 0]);

        line = d3.line()  //create line generator
            .x(function(d) {return xScale(d.date);})
            .y(function(d) {return yScale(d.number);});
            
        area = d3.area()  //create area generator
            .x(function(d) { return xScale(d.date) })
            .y0(function() { return yScale.range()[0] })
            .y1(function(d) { return yScale(d.number) });
        
            //add svg to main html
        var svg = d3.select("p")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

            //colour area under the dataset
        svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("transform", "translate(" + padding + ", 0)")
            .attr("d", area)
	        .style("fill", d3.color("cyan"));

    //create and translate axis
        var xAxis = d3.axisBottom()
            .ticks(5)
            .scale(xScale);
        
        var yAxis = d3.axisLeft()
            .ticks(5)
            .scale(yScale);
        
        svg.append("g")
            .attr("transform", "translate(" + padding + ", "+ (h - padding) +")")
            .call(xAxis);
        
        svg.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

    //append line with its label
        svg.append("line")
            .attr("class", "halfMilLine")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w)
            .attr("y2", yScale(500000))
	        .attr("stroke", d3.color("red"));
        
        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million Unemployed");    
    }
};

window.onload = init;