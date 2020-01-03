

const dateTime = document.querySelector('#dateTime');

const roomDropDownBtn = document.querySelector('#room-dropdown-btn');
const dropdownTxtContent = document.querySelector('#dropdownTxtContent');
const roomTypeDrop = document.querySelector('#roomTypeDrop');
const roomTypeLi = document.querySelectorAll('.roomTypeLi');
const bodyVal = document.querySelector('body');
const dashboardLeftContent = document.querySelector('#dash-content-1-left');
const subRoomTypeTxt = document.querySelector('#subRoomTypeTxt');
const homeIconContainer =  document.querySelector('#homeIconContainer');
const rhGraphCtx = document.querySelector('#rhGraph').getContext('2d');
const tempGraphCtx = document.querySelector('#tempGraph').getContext('2d');

let returnCarbonArray = [], supplyCarbArray = [], ampArray = [], voltArray = [], averageArray = [];
let roomTypes = ['Critical Room', 'Meeting Room', 'Zone_1', 'Zone_2'];
let criticalRoomTypes = ['Hub Room', 'Battery Room', 'Server Room', 'Electrical Room'];
let selectedRoomType = null, roomIndex = 0, criticalRoomIndex = 0;

let slideRooms = true;

let tempChartObj = new Chart(tempGraphCtx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "2019",
          data: [10,8,6,5,12,8,16,17,6,7,6,10],
          fill : 'green',
          borderColor: "#d84141",
        }
      ]
    },
    options: {
        title: {
          display: true,
          text: '°C',
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
let rhChartObj = new Chart(rhGraphCtx, {
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
          text: '%',
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

function animateCSS(element, animationName, callback) {
    const node = element;
    node.classList.add(animationName)

    function handleAnimationEnd() {
        
        node.classList.remove(animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

//show different critical rooms

function changeCriticalRoom(toChangeRoom) {
    

    if(!slideRooms){
        return;
    }
    
    subRoomTypeTxt.innerText = toChangeRoom;
    animateCSS(dashboardLeftContent, 'bounceInLeft');
    setTimeout(function () {
        
        // animateCSS(dashboardLeftContent,'bounceOutLeft');
        
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

//redirect to home page after click on Home icon in header

homeIconContainer.addEventListener('click', function(){
  location.href = '/index.html'
})


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

bodyVal.addEventListener('mousemove', function(){
    slideRooms = false;
    setTimeout(() => {
        slideRooms = true;
    }, 20000);
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