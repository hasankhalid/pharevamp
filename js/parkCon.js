function processParkConData(parkConSum, type){
  var parseDate = d3.timeParse('%d-%b-%y')
  //var parkConParsed =
  // parsing date and some preprocessing
  parkConSum.forEach(d => {
    d.DateP = parseDate(d.Date);
    d.n_locations = +d.n_locations;
    d.mean_score = +d.mean_score;
  })

  // defining chart dimensions

  parkConSum.sort(function(a,b){
    return a.DateP - b.DateP;
  })

  parkConSum = parkConSum.filter(d => (type == "Other") ? d.Zone == "Other" : d.Zone != "Other");

  parkConSum = parkConSum.filter(d => d.DateP > parseDate("1-Oct-17"));

  return parkConSum;
}


function drawParkConChart(data, container){
  var svg_width = 900;
  var svg_height = 400;
  var margins = {
    top: 50,
    bottom: 40,
    right: 110,
    left: 70
  }

  var height = svg_height - margins.top - margins.bottom;
  var width = svg_width - margins.left - margins.right;

  var svg_g = d3.select("body")
                  .select(container)
                  .append("svg")
                  .attr("width", svg_width)
                  .attr("height", svg_height)
                  .style('background', 'beige')
                  .append("g")
                  .attr("transform", "translate("+ margins.left + ", "+ margins.top +")");

  var zones =  data.map(d => d.ZoneAct)
                          .sort(function(a, b){
                            if(a < b) return -1;
                            else if(a > b) return 1;
                            else return 0;
                          });

  var x = d3.scaleTime()
            .domain(d3.extent(data, d => d.DateP))
            .range([0, width]);

  var y = d3.scaleOrdinal()
            //.domain(data.map(d => d.Zone))
            .domain(zones)
  var interval = height/ y.domain().length;
  y.range(d3.range(0, height + 1, interval))

  const formatMonth = d3.timeFormat("%b-%y");

  var xAxis = d3.axisBottom()
               .scale(x)
               .tickFormat(formatMonth);


  var yAxisLeft = d3.axisLeft()
               .scale(y)

  var yGridlines = d3.axisLeft()
                      .scale(y)
                      .tickSize(-width)
                      .tickFormat("")

  var radScale = d3.scaleSqrt()
                  .domain([0, d3.max(data, d => d.n_locations)])
                  .range([0, 20]);

  var scaleColor =  d3.scalePow()
                      .exponent(Math.E)
                      .domain([0, 100])
                      .range(["Red", "Blue"]);

  console.log(data);

  svg_g.append('g')
      .attr('class', 'y axis grid parkCon')
      .call(yGridlines)



  svg_g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr('cx', d => x(d.DateP))
      .attr('cy', d => y(d.ZoneAct))
      .style('fill', d => scaleColor(d.mean_score))
      .style('fill-opacity', 0.5)
      .attr('r', 0)
      .transition('startCircTrans')
      .duration(750)
      .attr('r', d => radScale(d.n_locations))
      .attr('class', d => d.ZoneAct + " T" + d.Date);
      //.style('fill', 'grey')


  svg_g.append('g')
      .attr('class', 'x axis parkCon')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)


  svg_g.append('g')
      .attr('class', 'y axis left parkCon')
      .style('transform', 'translateX(-44px)')
      .call(yAxisLeft)

  console.log(data);

  var voronoi = d3.voronoi()
                .x(d => x(d.DateP))
                .y(d => y(d.ZoneAct))
                .extent([[0, -30], [width, height]])

  console.log(voronoi.polygons(data));

  var polygon = svg_g.append("g")
                    .attr("class", "polygons")
                    .selectAll("path")
                    .data(voronoi.polygons(data))
                    .enter().append("path")
                    .attr("date", d => "T" + d.data.Date)
                    .attr("zone", d => d.data.ZoneAct)
                    .classed("voronoiPath", true)
                    .call(redrawPolygon);


  function redrawPolygon(polygon) {
    polygon.attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });
    polygon.style('fill-opacity', 0)
          .style('stroke', 'black')
          .style('stroke-width', 0.5)
          .style('stroke-opacity', 0.0)
  }

  var radTranScale = 1.25;
  var radTranDur = 750;
  const easeFun = d3.easeElastic;
  d3.selectAll(".voronoiPath").on("mouseover", function(d, i){
    let voroPathSel = d3.select(this)
    let selData = voroPathSel.data()[0]
    //console.log(voroPathSel);
    console.log(selData.data.mean_score);
    console.log(selData.data.n_locations);
    let zone = voroPathSel.attr('zone');
    let date = voroPathSel.attr('date');



    let selCircle = d3.select('circle.' + zone+ '.' + date);
    let selCircleR = selCircle.attr('r')
    selCircle.style('stroke', 'black')
              .style('stroke-width', 1 + (1 * selCircleR/ 20))
              .transition('MoTrans')
              .duration(radTranDur)
              .ease(easeFun)
              .attr('r', selCircleR * radTranScale);

  })

  d3.selectAll(".voronoiPath").on("mouseout", function(d, i){
    let voroPathSel = d3.select(this)
    let zone = voroPathSel.attr('zone')
    let date = voroPathSel.attr('date')

    let selCircle = d3.select('circle.' + zone+ '.' + date);
    let selCircleR = selCircle.attr('r')
    selCircle.style('stroke', 'none')
            .transition('MoTrans')
            .duration(radTranDur/2)
            .ease(easeFun)
            .attr('r', selCircleR / radTranScale);
  })

  // var linearSize = d3.scaleLinear().domain([0,10]).range([10, 30]);
  var maxDom = Math.round(d3.max(radScale.domain()));
  var minDom = Math.round(d3.min(radScale.domain()));
  var interval = Math.floor((maxDom - minDom)/5);

  console.log(maxDom, minDom, interval);

  var radScaleLegendDom = d3.range(minDom, maxDom, interval)//.map(d => Math.round(d));

  console.log(radScaleLegendDom);

  var radScaleLegend = d3.scaleOrdinal()
                        .domain(radScaleLegendDom)

  var radScaleLegendRan = radScaleLegendDom.map(function (d) {
    return radScale(d);
  });

  radScaleLegend.range(radScaleLegendRan);

  var svg = d3.select(container)
              .select("svg");

  svg.append("g")
    .attr("class", "legendSize parkCon")
    .attr("transform", "translate(845, 90)");

  svg.append("text")
    .attr('class', 'legendTitle')
    .attr('x', 825)
    .attr('y', 75)
    .text("# Surveys")
    .style('font-size', '12px')
    .style('font-family', 'Montserrat')
    //.style('transform', 'translateX(-5px)')

  var legendSize = d3.legendSize()
                    .scale(radScaleLegend)
                    .shape('circle')
                    .shapePadding(10)
                    .labelOffset(5);
                    // .orient('horizontal');

  svg.select(".legendSize")
    .call(legendSize);

}

var parkConSumMain = processParkConData(parkConSum);
drawParkConChart(parkConSumMain, ".main_contain");

var parkConSumOther = processParkConData(parkConSum, "Other");
drawParkConChart(parkConSumOther, ".other_contain");
