function initSystem(window,d3,v) {

  var svg, data, x, y, dim, chartWrapper, line, path, margin = {}, width, height, locator;

  var breakPoint = 500;

  document.getElementById("monday").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  document.getElementById("tuesday").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  document.getElementById("wednesday").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  document.getElementById("thursday").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  document.getElementById("friday").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  document.getElementById("saturday").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  document.getElementById("sunday").innerHTML='<rect width="100%" height="100%" style="fill:#fff;stroke-width:2;stroke:d6d6d6" />'
  

  d3.csv('static/data/dia0.csv', initMon);
  d3.csv('static/data/dia1.csv', initTue);
  d3.csv('static/data/dia2.csv', initWed);
  d3.csv('static/data/dia3.csv', initThu);
  d3.csv('static/data/dia4.csv', initFri);
  d3.csv('static/data/dia5.csv', initSat);
  d3.csv('static/data/dia6.csv', initSun);
  

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
        console.log(data[i]['time'], Math.floor(bars*(data[i]['time']-6)/hours))
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
    var w;
    var hld;
    switch(which) {
      case 0:
          w = [1, 0.1, 0.1]
          hld = [true, false, false]
          break;
      case 1:
          w = [0.1, 1, 0.1]
          hld = [false, true, false]
          break;
      default:
          w = [0.1, 0.1, 1]
          hld = [false, false, true]
    }

    for (var x = 0; x < bars; x += 1) {
      var pp = x*100/bars;
      var rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'x', pp+'%');
      rect.setAttributeNS(null, 'onclick', "window.location.href = '/details/"+day+"/"+x+"';")
      rect.setAttributeNS(null, 'y', 0);
      rect.setAttributeNS(null, 'height', '50');
      rect.setAttributeNS(null, 'width', 100/bars+'%');
      rect.setAttributeNS(null, 'opacity', w[0]*sumsFood[x]/(60*hours/bars));
      rect.setAttributeNS(null, 'hld', hld[0])
      rect.setAttributeNS(null, 'fill', '#ffb33b');
      document.getElementById(day).appendChild(rect);
      var pp = x*100/bars;
      var rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'x', pp+'%');
      rect.setAttributeNS(null, 'onclick', "window.location.href = '/details/"+day+"/"+x+"';")
      rect.setAttributeNS(null, 'y', 0);
      rect.setAttributeNS(null, 'height', '50');
      rect.setAttributeNS(null, 'width', 100/bars+'%');
      rect.setAttributeNS(null, 'opacity', w[0]*sumsEat[x]/(60*hours/bars));
      rect.setAttributeNS(null, 'hld', hld[0])
      rect.setAttributeNS(null, 'fill', '#b54343');
      document.getElementById(day).appendChild(rect);


      var pp = x*100/bars;
      var rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'x', pp+'%');
      rect.setAttributeNS(null, 'onclick', "window.location.href = '/details/"+day+"/"+x+"';")
      rect.setAttributeNS(null, 'y', 0);
      rect.setAttributeNS(null, 'height', '50');
      rect.setAttributeNS(null, 'width', 100/bars+'%');
      rect.setAttributeNS(null, 'opacity', w[1]*sumsSocial[x]/(2*60*hours/bars));
      rect.setAttributeNS(null, 'hld', hld[1])
      rect.setAttributeNS(null, 'fill', '#2743ba');
      document.getElementById(day).appendChild(rect);

      var pp = x*100/bars;
      var rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'onclick', "window.location.href = '/details/"+day+"/"+x+"';")
      rect.setAttributeNS(null, 'x', pp+'%');
      rect.setAttributeNS(null, 'y', 0);
      rect.setAttributeNS(null, 'height', '50');
      rect.setAttributeNS(null, 'width', 100/bars+'%');
      rect.setAttributeNS(null, 'opacity', w[2]*sumsSeat[x]/(2*60*hours/bars));
      rect.setAttributeNS(null, 'hld', hld[2])
      rect.setAttributeNS(null, 'fill', '#30822e');
      document.getElementById(day).appendChild(rect);
    }
    return;
  }

}

initSystem(window,d3,0);

function myFunction(which) {
  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  switch(which){
    case 0:
      document.getElementById('eating-button').className = "w3-button w3-myred";
      document.getElementById('socializing-button').className = "w3-button w3-myblue-unset";
      document.getElementById('seated-button').className = "w3-button w3-mygreen-unset";
      for(j = 0; j<7; j++){
        var rects = document.getElementById(days[j]).childNodes
        var l = rects.length
        for(i = 1; i<l; i++){
          if(rects[i].getAttribute('fill')!='#b54343' && rects[i].getAttribute('fill')!='#ffb33b' && rects[i].getAttribute('hld')=='true'){
            rects[i].setAttributeNS(null, 'opacity', rects[i].getAttribute('opacity')/10)
            rects[i].setAttributeNS(null, 'hld', 'false')
          }
          if((rects[i].getAttribute('fill')=='#b54343' || rects[i].getAttribute('fill')=='#ffb33b') && rects[i].getAttribute('hld')=='false'){
            rects[i].setAttributeNS(null, 'opacity', 10*rects[i].getAttribute('opacity'))
            rects[i].setAttributeNS(null, 'hld', 'true')
          }
        }
      }
      break;
    case 1:
      document.getElementById('eating-button').className = "w3-button w3-myred-unset";
      document.getElementById('socializing-button').className = "w3-button w3-myblue";
      document.getElementById('seated-button').className = "w3-button w3-mygreen-unset";
      for(j = 0; j<7; j++){
        var rects = document.getElementById(days[j]).childNodes
        var l = rects.length
        for(i = 1; i<l; i++){
          if(rects[i].getAttribute('fill')!='#2743ba' && rects[i].getAttribute('hld')=='true'){
            rects[i].setAttributeNS(null, 'opacity', rects[i].getAttribute('opacity')/10)
            rects[i].setAttributeNS(null, 'hld', 'false')
          }
          if(rects[i].getAttribute('fill')=='#2743ba' && rects[i].getAttribute('hld')=='false'){
            rects[i].setAttributeNS(null, 'opacity', 10*rects[i].getAttribute('opacity'))
            rects[i].setAttributeNS(null, 'hld', 'true')
          }
        }
      }
      break;
    default:
      document.getElementById('eating-button').className = "w3-button w3-myred-unset";
      document.getElementById('socializing-button').className = "w3-button w3-myblue-unset";
      document.getElementById('seated-button').className = "w3-button w3-mygreen";
      for(j = 0; j<7; j++){
        var rects = document.getElementById(days[j]).childNodes
        var l = rects.length
        for(i = 1; i<l; i++){
          if(rects[i].getAttribute('fill')!='#30822e' && rects[i].getAttribute('hld')=='true'){
            rects[i].setAttributeNS(null, 'opacity', rects[i].getAttribute('opacity')/10)
            rects[i].setAttributeNS(null, 'hld', 'false')
          }
          if(rects[i].getAttribute('fill')=='#30822e' && rects[i].getAttribute('hld')=='false'){
            rects[i].setAttributeNS(null, 'opacity', 10*rects[i].getAttribute('opacity'))
            rects[i].setAttributeNS(null, 'hld', 'true')
          }
        }
      }
      break;
  }
//    drawDays(window,d3,1)
}