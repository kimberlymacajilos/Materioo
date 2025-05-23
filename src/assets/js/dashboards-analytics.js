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
      title: { text: 'Albums Released Each Year', align: 'left' }
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
      title: { text: 'Album Types', align: 'left' }
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
      title: { text: 'Awards Per Album', align: 'left' }
    }).render();
  });

  
})();
