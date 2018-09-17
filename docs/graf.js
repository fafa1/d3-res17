var margin = {
    top: 90,
    right: 50,
    bottom: 80,
    left: 50
  };
  var width = 350 - margin.left - margin.right;
  var height = 350 - margin.top - margin.bottom;
  var labelMargin = 7;
  
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
  
        //.title(d => d.Mes)// responsavel pelo título
        .margin(margin)
        .labelMargin(labelMargin)
  
        rows.forEach(function (d, i) {
        star.includeLabels(i % 3 === 0 ? true : false);
  
        var wrapper = d3.select('#target3').append('span')
          .attr('class', "wrapper" /* + d.Mes */)
        
        d3.selectAll("span")
          .attr('class', function (d, i) {
            return (i % 2 === 0 ? "pt" + i : "pt" + i)
          }) 
  
        /* Responsavel por cada modulo do grafico ; janeiro,   fevereiro  */
        /* d3.selectAll("p").style("color", function (d, i) {
          return i % 2 ? "#fff" : "#eee";
        }); */
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
  
    // style display é diferente de block (é none)
    function myFunction(c) {
    let x = document.getElementsByClassName("chart")
    x[c].style.display = (x[c].style.display === 'block') ? 'none' : 'block' 
      
  }
  