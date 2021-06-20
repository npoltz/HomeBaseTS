// import Chart from "chart.js";
// import { DataLog, PeriodInterval } from "./types";

// const ctx = new CanvasRenderingContext2D();

// const chart: Chart = new Chart(ctx, {
//     type: 'line',
//     options: {
//         legend: {
//             display: false,
//             position: 'top',
//             labels: {
//                 boxWidth: 80,
//                 fontColor: 'black'
//             }
//         },
//         scales: {
//             xAxes: [{
//                 type: "time",
//                 time: {
//                     unit: 'hour',
//                     unitStepSize: 10,
//                     round: 'minute',
//                     tooltipFormat: "YYYY-MM-DD hh:mm:ss a",
//                     displayFormats: {
//                         hour: 'MM-DD HH:mm'
//                     }
//                 }
//             }],
//             yAxes: [{
//                 id: 'temperatureAxis',
//                 position: 'left',
//                 ticks: {
//                     suggestedMin: 0,
//                     suggestedMax: 40
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: "Temperature (°C)"
//                 }
//             },
//             {
//                 id: 'humidityAxis',
//                 position: 'right',
//                 ticks: {
//                     suggestedMin: 0,
//                     suggestedMax: 100
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: "Relative Humidity (%)"
//                 }
//             }]
//         }
//     }
// });

// function updateSensorData(dataLogs: DataLog[], chart: Chart) {
//     console.log(dataLogs);

//     if (dataLogs == null) {
//         chart.data.datasets?.pop();
//         chart.data.datasets?.pop();
//         chart.update();
//         return;
//     }

//     var timeStampLabels = dataLogs.map(function (e) {
//         return e.Timestamp;
//     });
//     var temperatureData = dataLogs.map(function (e) {
//         return e.Temperature;
//     });
//     var humidityData = dataLogs.map(function (e) {
//         return e.RelativeHumidity;
//     });

//     var sensorData = {
//         labels: timeStampLabels,
//         datasets: [{
//             borderColor: 'tomato',
//             label: "Temperature",
//             yAxisID: 'temperatureAxis',
//             data: temperatureData,
//             fill: false,
//             pointRadius: 2
//         },
//         {
//             borderColor: 'paleturquoise',
//             label: "Humidity",
//             yAxisID: 'humidityAxis',
//             data: humidityData,
//             fill: false,
//             pointRadius: 2
//         }]
//     };

//     chart.data = sensorData;
//     chart.update();
// }


// const fetchDataLogs = async (url: string): Promise<DataLog[]> => {
//     const response = await fetch(url)
//     const { data } = await response.json()
//     return data
// }

// const fetchDataLogsAsync = async (sensorId: string, periodInterval: PeriodInterval) => {
//     try {
//         const dataLogs = await fetchDataLogs(`/v1/sensors/${sensorId}/dataLogs?periodInterval=${periodInterval}`);
//         updateSensorData(dataLogs, chart);
//         Promise.all(dataLogs);
//     } catch (error) {
//         console.log(error);
//         chart.data.datasets?.pop();
//         chart.data.datasets?.pop();
//         chart.update();
//     }
// }