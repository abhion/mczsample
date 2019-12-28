

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

const roomDropDownBtn = document.querySelector('#room-dropdown-btn');
const dropdownTxtContent = document.querySelector('#dropdownTxtContent');
const roomTypeDrop = document.querySelector('#roomTypeDrop');
const roomTypeLi = document.querySelectorAll('.roomTypeLi');
const bodyVal = document.querySelector('body');
const dashboardLeftContent = document.querySelector('#dash-content-1-left');
const subRoomTypeTxt = document.querySelector('#subRoomTypeTxt');

let returnCarbonArray = [], supplyCarbArray = [], ampArray = [], voltArray = [], averageArray = [];
let roomTypes = ['Critical Room', 'Meeting Room', 'Zone_1', 'Zone_2'];
let criticalRoomTypes = ['Hub Room', 'Battery Room', 'Server Room', 'Electrical Room'];
let selectedRoomType = null, roomIndex = 0, criticalRoomIndex = 0;


// let chart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Return CO2', 'Supply CO2', 'Amps', 'Volts'],
//         datasets: [{
//             label: 'Average values',
//             data: averageArray,
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });

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
          text: 'kwh'
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
          text: 'kWh'
        },
        legends: {
            display:true
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
          text: 'kWh'
        },
        responsive: true
      }
  });

  let doughnutObj = new Chart(doughnutCtx, {
    type: 'doughnut',
    data: {
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "kWh",
          backgroundColor: ["yellow", "#65eaff99","pink"],
          data: [150,220,250]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'kWh'
      },
      responsive: true
    }
  })

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var client = new Paho.Client('164.52.193.83', 1884, 'client-' + randomIntFromInterval(1, 10000));

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({ onSuccess: onConnect, useSSL: true });


function onConnect() {
    console.log("onConnect");
    client.subscribe("real/#");

}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}
function onMessageArrived(message) {


}


function updateTime() {
    dateTime.innerText = new Date().toLocaleString();
}

setInterval(updateTime, 1000);


function refreshChart() {
    chart.update();
}

//show different room type

function changeRoomType(roomType){

    roomIndex = roomTypes.indexOf(roomType);
    dropdownTxtContent.innerText = roomType;

    if(roomIndex == 0){
        subRoomTypeTxt.style.display = 'block';
    }
    else{
        subRoomTypeTxt.style.display = 'none';
    }
    const currentRoomType = document.querySelector('.currentRoomType');
   
    currentRoomType.classList.add('hidden');
    currentRoomType.classList.remove('currentRoomType');
    
    const roomTypeToDisplay = document.querySelector('#dash-content-'+ (roomIndex+1) + '-left');
    roomTypeToDisplay.classList.remove('hidden');
    roomTypeToDisplay.classList.add('fadeIn', 'currentRoomType');

    setTimeout(() => {
        roomTypeToDisplay.classList.remove('fadeIn');
    }, 1000);
    
}

//show different critical rooms

function changeCriticalRoom(toChangeRoom) {
    subRoomTypeTxt.innerText = toChangeRoom;
    dashboardLeftContent.classList.add('bounceInLeft');
    setTimeout(function () {
        dashboardLeftContent.classList.remove('bounceInLeft');
        dashboardLeftContent.classList.add('bounceOutLeft');
        setTimeout(function () {
            dashboardLeftContent.classList.remove('bounceOutLeft');
        }, 2000)
    }, 7000)

}

changeCriticalRoom(criticalRoomTypes[0]);
++criticalRoomIndex;


//change Critical room if room type is critical room
setInterval(function () {
    if(roomIndex == 0){
    if (criticalRoomIndex == 3) {
        changeCriticalRoom(criticalRoomTypes[criticalRoomIndex]);
        criticalRoomIndex = 0;
    } else {
        changeCriticalRoom(criticalRoomTypes[criticalRoomIndex]);
        ++criticalRoomIndex;
    }
    }
}, 8000);

//show room type dropdown on click
roomDropDownBtn.addEventListener('click', function () {
    event.stopPropagation();
    roomTypeDrop.classList.toggle('active');
    this.classList.toggle('active');
})
//show room details based on selected Li from dropdown
roomTypeLi.forEach(function (v) {
    v.addEventListener('click', function (event) {
        selectedRoomType = this.innerText;
        changeRoomType(selectedRoomType);
    })
})
bodyVal.addEventListener('click', function () {

    roomTypeDrop.classList.remove('active');
    roomDropDownBtn.classList.remove('active');
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