const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.0.240:1883');
const gpio = require('gpio');
const LED = 22;
const PWR = 10;

var power = gpio.export(PWR, { direction: 'out', ready:function() {
  console.log('led ready power gpio.');
}});


var led = gpio.export(LED, { direction: 'out', ready:function() {
  console.log('led ready control gpio.');
}});


power.reset(function(){});


function ON () {
  led.set(function() {
    console.log('set', led.value);
  });
}

function OFF () {
  led.reset(function() {
    console.log('reset', led.value);
  });
}


client.subscribe('/led/' + 1);

client.on('connect', function() {
    console.log('Client connected!');
});

client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(topic+'  ' + message.toString());
  if (topic === '/led/1') {
    switch(message.toString()) {
      case 'on':
        ON();
        break;
      case 'off':
        OFF();
        break;
      default:
        console.log('unknown!');
    }
  }
});

