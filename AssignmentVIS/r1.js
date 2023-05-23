var width = 800;
var height = 400;
var padding = 80;


// Set up the SVG container for the main graph
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height + padding);

// Load the data files
d3.csv("female.csv", function(error, femaleData) {
  if (error) throw error;
  
  d3.csv("male.csv", function(error, maleData) {
    if (error) throw error;
    
    // Combine the female and male data into a single array
    var data = femaleData.map(function(d, i) {
      return {
        year: d.year,
        femaleTotal: +d.femaleTotal,
        maleTotal: +maleData[i].maleTotal
      };
    });

    // Define the scales for x and y axes
    var xScale = d3.scaleBand()
      .domain(data.map(function(d) { return d.year; }))
      .range([0, width])
      .padding(0.1);
      
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return Math.max(d.femaleTotal, d.maleTotal); })])
      .range([height, 0]);
      
    // Draw the female line
    svg.append("path")
      .datum(data)
      .attr("class", "female-line")
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.year); })
        .y(function(d) { return yScale(d.femaleTotal); })
      );
      
    // Draw the male line
    svg.append("path")
      .datum(data)
      .attr("class", "male-line")
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.year); })
        .y(function(d) { return yScale(d.maleTotal); })
      );
      
    // Handle click event on the female line
    svg.select(".female-line")
      .on("click", function() {
        // Load the data file for female demographics
        d3.csv("fAll.csv", function(error, femaleDemographics) {
          if (error) throw error;
          
          // Create a new graph with female demographic details
          createDemographicGraph(femaleDemographics);
        });
      });
      
    // Handle click event on the male line
    svg.select(".male-line")
      .on("click", function() {
        // Load the data file for male demographics
        d3.csv("mAll.csv", function(error, maleDemographics) {
          if (error) throw error;
          
          // Create a new graph with male demographic details
          createDemographicGraph(maleDemographics);
        });
      });
  });
});

// Function to create a new graph with demographic details
function createDemographicGraph(data) {
  // Your code to create the new graph using the demographic data
}