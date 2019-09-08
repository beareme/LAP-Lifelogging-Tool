function initSystem(window,d3,v,day,nbar) {

  console.log("hola")
  console.log(day);
  console.log("dew")
  var svg, data, x, y, dim, chartWrapper, line, path, margin = {}, width, height, locator;

  var breakPoint = 500;

  document.getElementById("eat").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  document.getElementById("company").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  document.getElementById("table").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  

  switch(day){
    case "monday": 
      d3.csv('../../static/data/dia0.csv', initMon);
      break;
    case "tuesday": 
      d3.csv('../../static/data/dia1.csv', initTue);
      break;
    case "wednesday": 
      d3.csv('../../static/data/dia2.csv', initWed);
      break;
    case "thursday": 
      d3.csv('../../static/data/dia3.csv', initThu);
      break;
    case "friday": 
      d3.csv('../../static/data/dia4.csv', initFri);
      break;
    case "saturday": 
      d3.csv('../../static/data/dia5.csv', initSat);
      break;
    case "sunday": 
      d3.csv('../../static/data/dia6.csv', initSun);
      break;
  }
  

  function initMon(csv,data){
    init(csv,data,"monday", 100, v);
  }
  function initTue(csv,data){
    init(csv,data,"tuesday", 100, v);
  }
  function initWed(csv,data){
    init(csv,data,"wednesday", 100, v);
  }
  function initThu(csv,data){
    init(csv,data,"thursday", 100, v);
  }
  function initFri(csv,data){
    init(csv,data,"friday", 100, v);
  }
  function initSat(csv,data){
    init(csv,data,"saturday", 100, v);
  }
  function initSun(csv,data){
    init(csv,data,"sunday", 100, v);
  }

  //called once the data is loaded
  function init(csv, data, day, bars, which) {
    var svgns = "http://www.w3.org/2000/svg";
    var l = data.length
    var hours = 15;
    var sumsEat = Array.apply(null, Array(bars)).map(Number.prototype.valueOf,0);
    var sumsSocial = Array.apply(null, Array(bars)).map(Number.prototype.valueOf,0);
    var sumsFood = Array.apply(null, Array(bars)).map(Number.prototype.valueOf,0);
    var sumsSeat = Array.apply(null, Array(bars)).map(Number.prototype.valueOf,0);


/*    for(i = 0; i<l; i++){
      console.log(data[i]['E'],data[i]['time']-6, Math.ceil(100*(data[i]['time']-6)), Math.floor(100*(data[i]['time']-6)/15))
    }
*/

    for(i = 0; i<l; i++){
      if(data[i]['E']==2){
        sumsEat[Math.floor(bars*(data[i]['time']-6)/hours)]+=1;
      }
      if(data[i]['E']==1){
        sumsFood[Math.floor(bars*(data[i]['time']-6)/hours)]+=1;
      }
      if(data[i]['C']==1){
        sumsSocial[Math.floor(bars*(data[i]['time']-6)/hours)]+=1;
      }
      if(data[i]['T']==1){
        sumsSeat[Math.floor(bars*(data[i]['time']-6)/hours)]+=1;
      }
    }

    for (var x = 0; x < bars; x += 1) {

      var pp = x*100/bars;
      var rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'x', pp+'%');
      rect.setAttributeNS(null, 'onclick', "window.location.href = '/details/"+day+"/"+x+"';")
      rect.setAttributeNS(null, 'y', 0);
      rect.setAttributeNS(null, 'height', '50');
      rect.setAttributeNS(null, 'width', 100/bars+'%');
      rect.setAttributeNS(null, 'fill', '#ffb33b');
      if(x==nbar){
        rect.setAttribute('style', 'stroke:#000;stroke-width:2;fill-opacity:'+sumsFood[x]/(60*hours/bars));
      }else{
        rect.setAttributeNS(null, 'opacity', sumsFood[x]/(60*hours/bars));
      }
      document.getElementById("eat").appendChild(rect);

      var pp = x*100/bars;
      var rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'x', pp+'%');
      rect.setAttributeNS(null, 'onclick', "window.location.href = '/details/"+day+"/"+x+"';")
      rect.setAttributeNS(null, 'y', 0);
      rect.setAttributeNS(null, 'height', '50');
      rect.setAttributeNS(null, 'width', 100/bars+'%');
      rect.setAttributeNS(null, 'fill', '#b54343');
      if(x==nbar){
        rect.setAttribute('style', 'stroke:#000;stroke-width:2;fill-opacity:'+sumsEat[x]/(60*hours/bars));
      }else{
        rect.setAttributeNS(null, 'opacity', +sumsEat[x]/(60*hours/bars));
      }
      document.getElementById("eat").appendChild(rect);

      var pp = x*100/bars;
      var rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'x', pp+'%');
      rect.setAttributeNS(null, 'onclick', "window.location.href = '/details/"+day+"/"+x+"';")
      rect.setAttributeNS(null, 'y', 0);
      rect.setAttributeNS(null, 'height', '50');
      rect.setAttributeNS(null, 'width', 100/bars+'%');
      rect.setAttributeNS(null, 'fill', '#2743ba');
      if(x==nbar){
        rect.setAttribute('style', 'stroke:#000;stroke-width:2;fill-opacity:'+sumsSocial[x]/(2*60*hours/bars));
      }else{
        rect.setAttributeNS(null, 'opacity', sumsSocial[x]/(2*60*hours/bars));
      }
      document.getElementById("company").appendChild(rect);

      var pp = x*100/bars;
      var rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'onclick', "window.location.href = '/details/"+day+"/"+x+"';")
      rect.setAttributeNS(null, 'x', pp+'%');
      rect.setAttributeNS(null, 'y', 0);
      rect.setAttributeNS(null, 'height', '50');
      rect.setAttributeNS(null, 'width', 100/bars+'%');
      rect.setAttributeNS(null, 'fill', '#30822e');
      if(x==nbar){
        rect.setAttribute('style', 'stroke:#000;stroke-width:2;fill-opacity:'+sumsSeat[x]/(2*60*hours/bars));
      }else{
        rect.setAttributeNS(null, 'opacity', sumsSeat[x]/(2*60*hours/bars));
      }
      document.getElementById("table").appendChild(rect);
    }
    return;
  }

}