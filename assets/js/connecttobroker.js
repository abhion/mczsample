let clientId = localStorage.getItem('clientId') || 'client-' + randomIntFromInterval(1, 10000);
var client = new Paho.Client('164.52.193.83', 1884, clientId);

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({ onSuccess: onConnect, useSSL: true });



function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


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