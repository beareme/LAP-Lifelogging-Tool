var Chart = (function(window,d3) {

  var svg, data, x, y, xAxis, yAxis, dim, chartWrapper, line, path, margin = {}, width, height, locator;

  var breakPoint = 500;

  d3.csv('static/data/lastMonthSeat.csv', init); //load data, then initialize chart
  
  //called once the data is loaded
  function init(csv) {
    data = csv;

    //initialize scales
    xExtent = d3.extent(data, function(d,i) { return new Date(d.date) });
    yExtent = d3.extent(data, function(d,i) { return d.value });
    x = d3.time.scale().domain(xExtent);
    y = d3.scale.linear().domain(yExtent);

    //initialize axis
    xAxis = d3.svg.axis().orient('bottom');
    yAxis = d3.svg.axis();

    //the path generator for the line chart
    line = d3.svg.line()
      .x(function(d) { return x(new Date(d.date)) })
      .y(function(d) { return y(d.value) });

    //initialize svg
    svg = d3.select('#seat')
      .append('svg')
      .style('pointer-events', 'none');


    svg.append("text")
        .attr("dy", "1em")
        .style("fill", "#30822e")
        .text("hours seated");   

    chartWrapper = svg
      .append('g')
      .style('pointer-events', 'all');

    path = chartWrapper.append('path').datum(data).classed('line', true);

    chartWrapper.append('g').classed('x axis', true);
    chartWrapper.append('g').classed('y axis', true);

    chartWrapper.on('touchmove', onTouchMove);

    //add locator
    locator = chartWrapper.append('circle')
      .style('display', 'none')
      .attr('r', 10)
      .attr('fill', '#f00');

    touchScale = d3.scale.linear();

    //render the chart
    render();
  }

  function render() {

    //get dimensions based on window size
    updateDimensions(document.getElementById("seat").offsetWidth - 16*2);    

    //update x and y scales to new dimensions
    x.range([0, width]);
    y.range([height, 0]);

    touchScale.domain([0,width]).range([0,data.length-1]).clamp(true);

    //update svg elements to new dimensions
    svg
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom);

    chartWrapper
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //update the axis and line
    xAxis.scale(x);
    yAxis.scale(y).orient('left');

    //if(window.innerWidth < breakPoint) {
      xAxis.ticks(d3.time.week, 1)
      console.log(d3.time)
    /*}
    else {
      xAxis.ticks(d3.time.month, 1)
    }*/
    
    svg.select('.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.select('.y.axis')
      .call(yAxis);
 
    path.attr('d', line).attr('style','stroke: #30822e;');
    //renderLabels();
  }
/*
  var labels = [
    {
      x: new Date('03-15-2014'),
      y: .17,
      text: 'Test Label 1',
      orient: 'right'
    },
    {
      x: new Date('11-20-2014'),
      y: .24,
      text: 'Test Label 2',
      orient: 'left'
    }
  ]

  function renderLabels() {

    var _labels = chartWrapper.selectAll('text.label');

    if(_labels[0].length > 0) {
      //labels already exist
      _labels
        .attr('x', function(d) { return x(d.x) })
        .attr('y', function(d) { return y(d.y) })
    }
    else {
      //append labels if function is called for the first time
      _labels
        .data(labels)
        .enter()
        .append('text')
        .classed('label', true)
        .attr('x', function(d) { return x(d.x) })
        .attr('y', function(d) { return y(d.y) })
        .style('text-anchor', function(d) { return d.orient == 'right' ? 'start' : 'end' })
        .text(function(d) { return d.text });
    }
  }
  */

  function updateDimensions(winWidth) {
    margin.top = 25;
    margin.right = 0;
    margin.left = 30;
    margin.bottom = 25;

    width = winWidth - margin.left - margin.right;
    height = .7 * width;
  }

  function onTouchMove() {
    var xPos = d3.touches(this)[0][0];
    var d = data[~~touchScale(xPos)];

    locator.attr({
      cx : x(new Date(d.date)),
      cy : y(d.value)
    })
    .style('display', 'block');
  }

  return {
    render : render
  }

})(window,d3);

window.addEventListener('resize', Chart.render);