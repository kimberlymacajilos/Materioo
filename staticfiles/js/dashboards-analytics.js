/**
 * Dashboard Analytics
 */

'use strict';

(function () {
  let cardColor, labelColor, borderColor, chartBgColor, bodyColor;

  cardColor = config.colors.cardColor;
  labelColor = config.colors.textMuted;
  borderColor = config.colors.borderColor;
  chartBgColor = config.colors.chartBgColor;
  bodyColor = config.colors.bodyColor;

  // Albums Released Over Time
fetch('/api/albums-over-time/')
  .then(res => res.json())
  .then(data => {
    new ApexCharts(document.querySelector("#albumsOverTimeChart"), {
      chart: { type: 'line', height: 300 },
      series: [{ name: 'Albums', data: data.counts }],
      xaxis: { categories: data.years },
    }).render();
  });

  // Album Type Distribution
fetch('/api/album-type-distribution/')
  .then(res => res.json())
  .then(data => {
    new ApexCharts(document.querySelector("#albumTypeDistributionChart"), {
      chart: { type: 'donut', height: 300 },
      series: data.counts,
      labels: data.labels,
    }).render();
  });

  // Awards by Album
fetch('/api/awards-by-album/')
  .then(res => res.json())
  .then(data => {
    new ApexCharts(document.querySelector("#awardsByAlbumChart"), {
      chart: { type: 'bar', height: 300 },
      series: [{ name: 'Awards', data: data.counts }],
      xaxis: { categories: data.titles },
    }).render();
  });

// Albums by Artist (Horizontal Bar Chart)
fetch('/api/albums-by-artist/')
  .then(res => res.json())
  .then(data => {
    new ApexCharts(document.querySelector("#albumsByArtistChart"), {
      chart: {
        type: 'bar',
        height: 300
      },
      series: [{
        name: 'Albums',
        data: data.counts
      }],
      xaxis: {
        categories: data.artists
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 5,
          barHeight: '60%'
        }
      },
      colors: ['#00cfe8'],
      dataLabels: {
        enabled: true
      },
      tooltip: {
        y: {
          formatter: val => `${val} albums`
        }
      }
    }).render();
  });

  // Awards by Artist - Radial Bar
fetch('/api/awards-by-artist/')
  .then(res => res.json())
  .then(data => {
    new ApexCharts(document.querySelector("#awardsByArtistRadialChart"), {
      chart: {
        height: 315,
        type: "radialBar"
      },
      series: data.counts,
      labels: data.artists,
      colors: ["#8e44ad", "#f39c12", "#00cfe8", "#28c76f", "#7367f0"],  // you can add more colors
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px'
            },
            value: {
              fontSize: '16px'
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function () {
                return data.counts.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      },
      legend: {
        show: true,
        position: 'right',
        offsetY: 10,
        formatter: function(seriesName, opts) {
          return seriesName + ": " + data.counts[opts.seriesIndex]
        }
      }
    }).render();
  });

  
})();
