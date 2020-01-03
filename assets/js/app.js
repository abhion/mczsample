

const dateTime = document.querySelector('#dateTime');

const avgRetCarb = document.querySelector('#avgRetCarb');
const avgSupCarb = document.querySelector('#avgSupCarb');
const avgAmp = document.querySelector('#avgAmp');
const avgVolt = document.querySelector('#avgVolt');
var ctx = document.getElementById('myChart');
// var ctx = document.getElementById('myChart').getContext('2d');
const ebChartCtx = document.getElementById('ebChart').getContext('2d');
const dgChartCtx = document.getElementById('dgChart').getContext('2d');
const serverSourceEnergyChartCtx = document.getElementById('serverSourceEnergyChart').getContext('2d');
const doughnutCtx = document.getElementById('doughnutCanvas').getContext('2d');

const dashboardLeftContent = document.querySelector('#dash-content-1-left');
const pacBoxId =  document.querySelector('#pacBoxId');
const homeIconContainer =  document.querySelector('#homeIconContainer');
const ahuBoxes = document.querySelectorAll('.ahu-box');
const toggleCheckBox = document.querySelectorAll('.toggle-check');

const supplyTempCont = document.querySelector('#supplyTempCont');
const serverRoomCont = document.querySelector('#serverRoomCont');
const electricRoomCont = document.querySelector('#electricRoomCont');
const pacRoomCont = document.querySelector('#pacRoomCont');

const ahuBox1 = document.querySelector('#ahuBox1');
const ahuBox2 = document.querySelector('#ahuBox2');


let ebChartObj = new Chart(ebChartCtx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "2019",
          data: [10,8,6,5,12,8,16,17,6,7,6,10],
          fill : 'green',
          borderColor: "#3e95cd",
        }
      ]
    },
    options: {
        title: {
          display: true,
          text: 'kWh',
          fontColor: 'white'
        },
        legend: {
          display:true,
          labels: {
            fontColor:'white'
          }
      },
      scales:{
        yAxes: [{ticks: {fontColor: 'white'}}], 
        xAxes: [{ticks:{fontColor: 'white'}}]
      },
        responsive: true
      }
  });
let dgChartObj = new Chart(dgChartCtx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "2019",
          data: [100,80,6,35,12,8,16,417,46,7,46,102],
          fill : 'green',
          borderColor: "orange",
        }
      ]
    },
    options: {
        title: {
          display: true,
          text: 'kWh',
          fontColor: 'white'
        },
        legend: {
            display:true,
            labels: {
              fontColor:'white'
            }
        },
        scales:{
          yAxes: [{ticks: {fontColor: 'white'}}], 
          xAxes: [{ticks:{fontColor: 'white'}}]
        },
        responsive: true
      }
  });
let serverSourceEnergyChartObj = new Chart(serverSourceEnergyChartCtx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "2019",
          data: [10,50,63,325,102,18,16,417,46,7,46,102],
          fill : 'green',
          borderColor: "#d84141",
        }
      ]
    },
    options: {
        title: {
          display: true,
          text: 'kWh',
          fontColor : 'white'
        },
        scales:{
          yAxes: [{ticks: {fontColor: 'white'}}], 
          xAxes: [{ticks:{fontColor: 'white'}}]
        },
        responsive: true,
        legend:{
          labels: {
            fontColor: 'white'
          }
        }
      }
  });

  let doughnutObj = new Chart(doughnutCtx, {
    type: 'doughnut',
    data: {
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "kWh",
          backgroundColor: ["yellow", "#00f3ff","#ff6d86"],
          data: [150,220,250]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'kWh',
        fontColor: 'white'
      },
      responsive: true,
      legend:{
        labels: {
          fontColor: 'white'
        }
      }
    }
  })

  ahuBox1.addEventListener('click', function(){
    location.href = 'pages/ahu.html?ahuType=1'
  })
  ahuBox2.addEventListener('click', function(){
    location.href = 'pages/ahu.html?ahuType=2'
  })

supplyTempCont.addEventListener('click', function(){
  debugger
  location.href = '/pages/criticalrooms.html?roomType=Supply Room';
})
serverRoomCont.addEventListener('click', function(){
  debugger
  location.href = '/pages/criticalrooms.html?roomType=Server Room';
})
electricRoomCont.addEventListener('click', function(){
  debugger
  location.href = '/pages/criticalrooms.html?roomType=Electric Room';
})
pacRoomCont.addEventListener('click', function(){
  debugger
  location.href = '/pages/criticalrooms.html?roomType=PAC Room';
})



function updateTime() {
    dateTime.innerText = new Date().toLocaleString();
}

setInterval(updateTime, 1000);


function refreshChart() {
    chart.update();
}
//redirect to home page after click on Home icon in header

homeIconContainer.addEventListener('click', function(){
  location.href = '/index.html'
})

//redirect to PAC page after click on container
pacBoxId.addEventListener('click', function(){
  // location.href = '/pages/criticalrooms.html';
})


toggleCheckBox.forEach(function(checkbox){
  checkbox.addEventListener('change', function(event){
    
    checkbox.checked = !checkbox.checked;
  })
})

// {
//     "payloadString": "1.1188553039612654",
//     "payloadBytes":{"0":49,"1":46,"2":49,"3":49,"4":56,"5":56,"6":53,"7":53,"8":51,"9":48,"10":51,"11":57,"12":54,"13":49,"14":50,"15":54,"16":53,"17":52},
//     "destinationName":"real/watt",
//     "qos":0,
//     "retained":true,
//     "topic":"real/watt",
//     "duplicate":false
//     }