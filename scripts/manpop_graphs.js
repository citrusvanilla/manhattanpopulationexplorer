// VARIABLES
var data = [];
var offsetX = 30;
var offsetY = 15;
var height = 80;
var step = 10;
var bottomY = 2000000;
var topY = 4000000;

var x = d3.time.scale.utc()
          .range([0, 230])
          .domain([new Date('2015-01-01T00:00:00.000Z'),
                   new Date('2015-01-02T00:00:00.000Z')]);
var xAxis = d3.svg.axis()
              .scale(x)
              .ticks(d3.time.hour, 6);
var yAvailability;
var yAxisAvailabilityR;
var yAxisAvailabilityL;
var line = d3.svg.line()
             .x(function(d,i) { return i*10; })
             .y(function(d,i) { return (height - d*height); })
             .interpolate("basis");

var infoHeader = d3.select("#info-header");
var infoContentGraph = d3.select("#info-content-graphs");



// HELPER FUNCTION: Adds commas for thousands place.
const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

function ntaFormatter(nta) {
  var nta_long;
  if (nta == "MN") nta_long = "New York County (Manhattan)";
  if (nta == "MN01") nta_long = "Marble Hill / Inwood";
  if (nta == "MN03") nta_long = "Central Harlem North";
  if (nta == "MN04") nta_long = "Hamilton Heights";
  if (nta == "MN06") nta_long = "Manhattanville";
  if (nta == "MN09") nta_long = "Morningside Heights";
  if (nta == "MN11") nta_long = "Central Harlem South";
  if (nta == "MN12") nta_long = "Upper West Side";
  if (nta == "MN13") nta_long = "Chelsea / Flatiron / Union Square";
  if (nta == "MN14") nta_long = "Lincoln Square";
  if (nta == "MN15") nta_long = "Clinton";
  if (nta == "MN17") nta_long = "Midtown / Midtown South";
  if (nta == "MN19") nta_long = "Turtle Bay / East Midtown";
  if (nta == "MN20") nta_long = "Murray Hill / Kips Bay";
  if (nta == "MN21") nta_long = "Gramercy";
  if (nta == "MN22") nta_long = "East Village";
  if (nta == "MN23") nta_long = "West Village";
  if (nta == "MN24") nta_long = "SoHo / TriBeCa / Little Italy";
  if (nta == "MN25") nta_long = "Battery Park City / Lower Manhattan";
  if (nta == "MN27") nta_long = "Chinatown";
  if (nta == "MN28") nta_long = "Lower East Side";
  if (nta == "MN31") nta_long = "Lenox Hill";
  if (nta == "MN32") nta_long = "Yorkville";
  if (nta == "MN33") nta_long = "East Harlem South";
  if (nta == "MN34") nta_long = "East Harlem North";
  if (nta == "MN35") nta_long = "Washington Heights North";
  if (nta == "MN36") nta_long = "Washington Heights South";
  if (nta == "MN40") nta_long = "Upper East Side / Carnegie Hill";
  if (nta == "MN50") nta_long = "Stuyvesant Town / Cooper Village";
  if (nta == "MN99") nta_long = "park / cemetery / other";
  return nta_long;
}

function dayFormatterLong(d) {
  var dt;
  if(d == 0) dt = 'Monday';
  if(d == 1) dt = 'Tuesday';
  if(d == 2) dt = 'Wednesday';
  if(d == 3) dt = 'Thursday';
  if(d == 4) dt = 'Friday';
  if(d == 5) dt = 'Saturday';
  if(d == 6) dt = 'Sunday';
  return dt;
}


// Bring in Manhattan data.
d3.csv('data/man.csv', function(file) {
  file.forEach(function(row) {
    var monday = [];
    var tuesday = [];
    var wednesday = [];
    var thursday = [];
    var friday = [];
    var saturday = [];
    var sunday = [];

    // Loop through the columns (datetimes).
    for (i = 0; i < 168; i++) {
      if (Math.floor(i/24) == 0) monday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 1) tuesday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 2) wednesday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 3) thursday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 4) friday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 5) saturday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 6) sunday.push(parseInt(row[i]));
    }

    // Push onto data.
    data['MN'] = {
      0: monday,
      1: tuesday,
      2: wednesday,
      3: thursday,
      4: friday,
      5: saturday,
      6: sunday,
      id: 'manhattan',
      min: row.min,
      max: row.max,
      type: row.type

    };
  });
});

// Bring in Neighborhood data.
d3.csv('data/nta.csv', function(file) {
  file.forEach(function(row) {
    var monday = [];
    var tuesday = [];
    var wednesday = [];
    var thursday = [];
    var friday = [];
    var saturday = [];
    var sunday = [];

    // Loop through the columns (datetimes).
    for (i = 0; i < 168; i++) {
      if (Math.floor(i/24) == 0) monday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 1) tuesday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 2) wednesday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 3) thursday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 4) friday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 5) saturday.push(parseInt(row[i]));
      if (Math.floor(i/24) == 6) sunday.push(parseInt(row[i]));
    }

    // Push onto data.
    data[row.nid] = {
      0: monday,
      1: tuesday,
      2: wednesday,
      3: thursday,
      4: friday,
      5: saturday,
      6: sunday,
      id: row.nid,
      max: row.max,
      min: row.min,
      type: row.type
    };
  });
});

// Update the Info panel graph.
function getPopulationGraph(container, ntaid, day) {

  // Format the day.
  var day_long = dayFormatterLong(day);

  // Set the graph's title.
  container.text('');
  container.append("div")
           .text("This Area's Est. Population for " + day_long + "s")
           .style("text-align", "center");

  // Init SVG container for the graph.
  var svg = container.append("svg").attr("width", offsetX*2 + step*23 + 10)
                                   .attr("height", height + offsetY*2 + 10);

  // Take the min and max for the whole week and make it the Y-axis range.
  var max = data[ntaid]["max"];
  var min = data[ntaid]["min"];
  var dayData = data[ntaid][day].slice(0);

  for (i = 0; i < dayData.length; i++) {
    dayData[i] = (dayData[i] - min) / (max - min);
  }

  // Set the D3 Y axis objects with the new range.
  yAvailability = d3.scale.linear()
                    .range([height, 0])
                    .domain([min, max]);

  yAxisAvailabilityR = d3.svg.axis()
                         .scale(yAvailability)
                         .ticks(3)
                         .tickFormat(d3.format("s"))
                         .orient("right");

  yAxisAvailabilityL = d3.svg.axis()
                         .scale(yAvailability)
                         .ticks(3)
                         .tickFormat(d3.format("s"))
                         .orient("left");

  if(data[ntaid]) {

    // Build the line and assign to div.
    svg.append("g")
       .append("svg:path")
       .attr("fill", "none")
       .style("stroke", "#fff")
       .style("opacity", 0.7)
       .style("stroke-width", 2)
       .attr("id", "p" + ntaid)
       .attr("transform", "translate(" + offsetX + "," + offsetY + ")")
       .attr("d", function() { return line(dayData); });

    // Build the X axis.
    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(" + offsetX + ", " + (offsetY + height) + ")")
       .call(xAxis);

    // Build the Y axis (left).
    svg.append("g")
       .attr("class", "y axis")
       .attr("transform", "translate("+ offsetX + "," + offsetY + ")")
       .call(yAxisAvailabilityL);

    // Build the Y axis (right).
    svg.append("g")
       .attr("class", "y axis")
       .attr("transform", "translate("+ (offsetX + step*23) + "," + offsetY + ")")
       .call(yAxisAvailabilityR);
  }
}

// Update the Info panel.
function updateInfo(div, region, day, time) {

  // Get the population for the region and day.
  var dayData = data[region][day];

  // Store the day's max and min.
  var dayMax = Math.max(dayData);
  var dayMin = Math.max(dayData);

  // Store the daytime flux as a percent.
  var percFlux = Math.round((dayData[15]-dayData[3])*100/dayData[3]);
  var nomFlux = Math.round((dayData[15]-dayData[3])/1000)*1000;

  // Get the type by comparing daytime vs nighttime populations.
  if (percFlux>=7) {
    var type = "Importer";
  } else if (percFlux<=-7) {
    var type = "Exporter";
  } else {
    var type = "Balanced";
  };

  // Change Region name.
  infoHeader.text(ntaFormatter(region));

  // Update Population graph.
  getPopulationGraph(div, region, day);

  // Change Import/Export type.
  d3.select("#info-ntatype-caption")
    .text("Import/Export Type for " + dayFormatterLong(day) + "s:");
  d3.select("#info-ntatype-value").text(type);

  // Change Flux data.
  d3.select("#info-ntaflux-caption")
    .text(dayFormatterLong(day) + " Peak Pop. Change:");
  d3.select("#info-ntaflux-value")
    .text(numberWithCommas(nomFlux) + " (" + numberWithCommas(percFlux) + "%)");
  
  if (type == "Importer") d3.select("#info-ntaflux-value").style("color", "#66bd63");
  if (type == "Exporter") d3.select("#info-ntaflux-value").style("color", "#f46d43");
  if (type == "Balanced") d3.select("#info-ntaflux-value").style("color", "#ffffbf");

  // Change Current population.
  d3.select("#info-ntapopcurr-caption")
    .text("Estimated Pop. for " + dayFormatterLong(day) + ", " + timeFormatter(time) + ":");
  d3.select("#info-ntapopcurr-value")
    .text(numberWithCommas(dayData[time]));
}

