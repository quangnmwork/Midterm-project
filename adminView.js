var options = {
    series: [{
    name: 'Profit',
    data: [31, 60, 48, 51, 42, 109, 100,50,40]
  }, {
    name: 'investment ',
    data: [11, 32, 45, 22, 55, 52, 70,90,100]
  }],
    chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: 
    ["2021-09-17","2021-09-18","2021-09-19","2021-09-20","2021-09-21","2021-09-22","2021-09-23","2021-09-24","2021-09-25","2021-09-26"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy'
    },
  },
  };
  
  var chart = new ApexCharts(document.querySelector("#apex1"), options);
  chart.render();