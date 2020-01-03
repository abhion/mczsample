const gaugeSpeedSvg = document.querySelector('#gaugeSpeedSvg');
const guageSpeedPaths = document.querySelectorAll('#svgContainer  path');
const guageLabel = document.querySelector('#guage-label');
const suppChartCtx = document.querySelector('#supplyChart').getContext('2d');
const retChartCtx = document.querySelector('#retChart').getContext('2d');
const homeIconContainer =  document.querySelector('#homeIconContainer');
const chwLabel = document.querySelector('#chwLabel');
const guageHeader = document.querySelector('.guageHeader');

const chwSvgPaths = document.querySelectorAll('#chwSvgContainer path');
const fillColors = ['#28ED99','#4BF7FF','#2C90D5','#6618CD','#1537AC','#EE1ADC','#F732BF','#FF4BA8','#FF0000','#FF0000','#E31212'];

const ahuTypeFromUrl = new URL(location.href).searchParams.get('ahuType');
let selectedAhuType;

if(ahuTypeFromUrl){
  debugger
  guageHeader.innerText = 'AHU' + ahuTypeFromUrl;
  selectedAhuType = ahuTypeFromUrl;
}

let suppChartObj = new Chart(suppChartCtx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "2019",
          data: [10,8,6,5,12,8,1,11,6,7,6,10],
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
  let retChartObj = new Chart(retChartCtx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "2019",
          data: [10,81,6,5,112,18,1,17,6,7,6,10],
          fill : 'green',
          borderColor: "yellow",
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
setInterval(function(){
   let randomNo = randomIntFromInterval(49, 50);
  //  let randomNo = 50;
    let limitNo = (randomNo/5);
    
    guageLabel.innerText = randomNo + 'Hz';
   for (let i = 0; i < guageSpeedPaths.length; i++) {
       if(i <= limitNo){
           setTimeout(() => {
            guageSpeedPaths[i].style.display = 'block';    
            guageSpeedPaths[i].style.fill = fillColors[i];    
            // guageSpeedPaths[i].style.fill = 'block';    
           }, 50);
           
       }
       else{
        guageSpeedPaths[i].style.display = 'none';
       }
       
   }

}, 3000);
setInterval(function(){
   let randomNo = randomIntFromInterval(99, 100);
  //  let randomNo = 50;
    let limitNo = (randomNo/10);
    
    chwLabel.innerText = randomNo + '%';
   for (let i = 0; i < chwSvgPaths.length; i++) {
       if(i <= limitNo){
           setTimeout(() => {
             
            chwSvgPaths[i].style.display = 'block';    
            chwSvgPaths[i].style.fill = fillColors[i];    
            // guageSpeedPaths[i].style.fill = 'block';    
           }, 50);
           
       }
       else{
        chwSvgPaths[i].style.display = 'none';
       }
       
   }

}, 3000);




function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


//redirect to home page after click on Home icon in header
homeIconContainer.addEventListener('click', function(){
  location.href = '/index.html'
})
