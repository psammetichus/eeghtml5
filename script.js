var EEG = {
  sample: 0,
  canvas: null,
  ppcX: 96,
  ppcY: 96
};


var samprate = 200;
var paperspeed = 3;
var sensitivity = 10;
var windims = window.screen;
var canvas = new fabric.Canvas('c');
canvas.setWidth(windims.availWidth*0.9);
canvas.setHeight(windims.availHeight*0.9);

EEG.canvas = canvas;

//8 Hz signal, 25 mcV half-heigh
var sig1 = Array(samprate*20);
for (i=0; i<sig1.length; i++) {
  sig1[i] = 25*Math.sin(0.79*i);
}

//10 Hz signal, 18 mcV half-height
var sig2 = Array(samprate*20);
for (i=0; i<sig2.length; i++) {
  sig2[i] = 18*Math.sin(0.63*i);
}

//added signal
var sig3 = Array(samprate*20);
for (i=0; i<sig3.length; i++) {
  sig3[i] = sig1[i] + sig2[i];
}

//now plot the signal
function plotsignal(sig, EEG) {
  var w = canvas.getWidth();
  var h = canvas.getHeight();
  var ppsamp = EEG.ppcX*paperspeed/samprate;
  var ppmcv = EEG.ppcY/(10*sensitivity);
  var nsamples = w/ppsamp;
  var pathstring = "M 20 20 ";
  for (i=EEG.sample; i<EEG.sample+nsamples; i++) {
    var linestring = "L " + (20+i*ppsamp) + " " + (sig[i]*ppmcv) + " ";
    pathstring += linestring;
  }
  
  var p = new fabric.Path(pathstring);
  p.set({strokeWidth: 1, stroke: 'black', fill: null});
  
  p.set({left:0,top:0});
  
  canvas.add(p);
}

