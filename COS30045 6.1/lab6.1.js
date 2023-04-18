function init () 
{
    var w = 600;
    var h = 400;
    
    var padding = 100;
    var barPadding = 10;
    
    var dataset = [14,20,17,10,4,19,8,5,25,23];
    
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0,w])
        .paddingInner(0.05);
        
    var yScale = d3.scaleBand()
        .domain(d3.range(d3.max(dataset)) + 1)
        .rangeRound([h,0]);

    function removeValue(){
        dataset.shift();
        var bars = svg.selectAll("rect")
            .data(dataset)
    
        bars.exit()
        .transition()
        .duration(500)
        .attr("x", function(d, i){return xScale(i);})
        .attr("y", function(d){return h - (h * yScale(d));})
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){return yScale(d);})
        .remove();
    }
        

    function addValue(type){
        var numValues = dataset.length;
        dataset = [];
        var maxValue = 25;

        xScale.domain(d3.range(dataset.length))
        var bars = svg.selectAll("rect")
            .data(dataset)

        bars.enter()
            .append("rect")
            .merge(bars)
            .transition()
            .duration(500)
            .attr("x", function(d, i){return xScale(i);})
            .attr("y", function(d){return h - (h * yScale(d));})
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){return yScale(d);})
            .style("fill", d3.color("cyan"));

        for(var i = 0; i < numValues; i++){
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset)

            //change colour of bar when mouse over
            .on("mouseover", function(event, d){
                var offset = xScale.bandwidth()/3
                var xPosition = parseFloat(d3.select(this).attr("x"))
                var yPosition = parseFloat(d3.select(this).attr("y"))

                svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition + offset)
                .attr("y", yPosition + offset)
                .text(d)

                d3.select(this)
                    .transition()
                    .delay(function(d, i){
                        return i/dataset.length * 1000;
                    })
                    .style("fill", d3.color("red"));
            })
            .on("mouseout", function(){
                d3.selectAll("#tooltip")
                    .remove()
                d3.select(this)
                    .transition()
                    .delay(function(d, i){
                        return i/dataset.length * 1000;
                    })
                    .style("fill", d3.color("cyan"));
            })
            .transition()
            .delay(function(d, i){
                return i/dataset.length * 1000;
            })
            .duration(function(){
                switch(type){
                    case "default":
                        console.log(type);
                        return 3500;
                    case "slow":
                        return 10000;
                    case "fast":
                        return 1000;
                }
            })
            .ease(d3.easeElasticOut)
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
        .style("fill", d3.color("cyan"))

        //mouse interactivity text overlay
        .on("mouseover", function(event, d){
            var offset = xScale.bandwidth() / 3
            var xPosition = parseFloat(d3.select(this).attr("x"))
            var yPosition = parseFloat(d3.select(this).attr("y"))
    
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition + offset)
                .attr("y", yPosition + offset)
                .text(d);
            d3.select(this)
                .style("fill", d3.color("red"));
        })
        .on("mouseout", function(){
            svg.selectAll("#tooltip")
                .remove()
            d3.select(this)
                .transition()
                .delay(function(d, i){
                    return i/dataset.length * 1000;
                })
                .style("fill", d3.color("cyan"))
        });
};

window.onload = init;