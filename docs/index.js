var default_width = 460;
var default_height = 460;
var default_ratio = default_width / default_height;
// Current (non-responsive) width and height are calcuated from the default, minus the margins
var margin = {top: 90, right: 50, bottom: 80, left: 50},
    width = default_width - margin.left - margin.right,
    height = default_height - margin.top - margin.bottom;
var labelMargin = 7;

function set_vars() {
  //alert('setting vars')
  current_width = window.innerWidth;
  current_height = window.innerHeight;
  current_ratio = current_width / current_height;
  // Check if height is limiting factor
  if ( current_ratio > default_ratio ){
    h = current_height;
    w = h * default_ratio;
  // Else width is limiting
  } else {
    w = current_width;
    h = w / default_ratio;
  }
  // Set new width and height based on graph dimensions
  width = w - margin.left - margin.right;
  height = h - margin.top - margin.bottom;
};

set_vars()

function drawGraphic() {
  var scale = d3.scale.linear()
  .domain([0, 1.6])
  .range([0, 100])

d3.csv('saude.csv')
  .row(function (d) {
    d.Behavior = +d.Behavior;
    d.SocialCircumstances = +d.SocialCircumstances;
    d.GeneticsBiology = +d.GeneticsBiology;
    d.MedicalCare = +d.MedicalCare;
    d.HealthLiteracy = +d.HealthLiteracy;
    d.Access = +d.Access;
    d.Environment = +d.Environment;
    return d;
  })
  .get(function (error, rows) {
    var star = d3.starPlot()
      .width(width)
      .properties([
        'Behavior',
        'SocialCircumstances',
        'GeneticsBiology',
        'MedicalCare',
        'HealthLiteracy',
        'Access',
        'Environment'
      ])
      .scales(scale)
      .labels([
        'Behavior',
        'Social Circumstances',
        'Genetics/Biology',
        'Medical Care',
        'Health Literacy',
        'Access',
        'Environment'
      ])

      //.title(d => d.Ano)// responsavel pelo título
      .margin(margin)
      .labelMargin(labelMargin)
      // Responsável pelas labels dos eixos
      rows.forEach(function (d, i) {
      star.includeLabels(i % 12 === 0 ? true : false);

      var wrapper = d3.selectAll('#target').append('span')
        .attr('class', "wrapper" /* + d.Mes */)
      
      d3.selectAll("span")
        .attr('class', function (d, i) {
          return (i % 2 === 0 ? "pt" + i : "pt" + i)
        }) 

      var svg = wrapper.append('svg')
        .attr('class', 'chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', width + margin.top + margin.bottom)

      /* Aqui eu ploto os dados  */
      var starG = svg.append('g')
        .datum(d)
        .call(star)
        .call(star.interaction)

      /* Fazendo a interação */
      var interactionLabel = wrapper.append('div')
        .attr('class', 'interaction label')

      var circle = svg.append('circle')
        .attr('class', 'interaction circle')
        .attr('r', 7)

      /* Responsavel pela interacao valou defaut sem as labels  */
      var interaction = wrapper.selectAll('.interaction')
        .style('display', 'none');

      svg.selectAll('.star-interaction')
        .on('mouseover', function (d) {
          svg.selectAll('.star-label')
            .style('display', 'none')

          interaction
            .style('display', 'block')

          circle
            .attr('cx', d.x)
            .attr('cy', d.y)

          $interactionLabel = $(interactionLabel.node());
          interactionLabel
            .text(d.key + ': ' + d.datum[d.key])
            .style('left', d.xExtent - ($interactionLabel.width() / 2))
            .style('top', d.yExtent - ($interactionLabel.height() / 2))
        })
        .on('mouseout', function (d) {
          interaction
            .style('display', 'none')

          svg.selectAll('.star-label')
            .style('display', 'block')
        })
    });
  });
}

drawGraphic()

var resizeTimer;
window.onresize = function(event) {
 clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function()
  {
    set_vars();
    drawGraphic();
  }, 100);
}

function type(d) {
  d.value = +d.value;
  return d;
}

  // style display é diferente de block (é none)
/*   function myFunction(c) {
    let x = document.getElementsByClassName("chart")
    let y = document.getElementsByClassName("bt1")
    // for (let i = 0; i <= y.length; i ++) {
      if (x[c].style.display === 'block') {
        x[c].style.display = 'none'
        y[0].style.color = '#fff'
        y[0].style.removeProperty("background-color")
      } else {
        x[c].style.display = 'block'
        y[0].style.color = 'black'
        y[0].style.background = '#fff'
      }    
} */
