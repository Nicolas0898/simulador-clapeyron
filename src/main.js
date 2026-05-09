import 'bootstrap/dist/css/bootstrap.css'
import 'plotly.js-dist/plotly'
import { printPlot, generateLayout, PlotData, changePointPos } from "./plot";
import { Clapeyron } from './clapeyron';

const plot = document.getElementById("plot")
const form = document.getElementById("form")
const calc_target = document.getElementById("calc_target")
const volume_unity_display = document.getElementById("volume_unity_display")
const pressure_unity_display = document.getElementById("pressure_unity_display")
const temperature_unity_display = document.getElementById("temperature_unity_display")
const n_unity_display = document.getElementById("n_unity_display")
const unity = document.getElementById("unity")
const graph_type = document.getElementById("graph_type")
const volume_min = document.getElementById("volume_min")
const volume_max = document.getElementById("volume_max")
const pressure_min = document.getElementById("pressure_min")
const pressure_max = document.getElementById("pressure_max")
const volume_input = document.getElementById("volume_input")
const pressure_input = document.getElementById("pressure_input")
const temperature_input = document.getElementById("temperature_input")
const R_input = document.getElementById("R_input")
const n_input = document.getElementById("n_input")
const r_display = document.getElementById("r_display")
const intensity_min = document.getElementById("intensity_min")
const intensity_max = document.getElementById("intensity_max")
const target_table = {"temp":temperature_input,"pressure":pressure_input,"volume":volume_input,"n":n_input}

const clapeyron = new Clapeyron()

let data = new PlotData()

function build_plot(){
  clapeyron.n = parseFloat(n_input.value)
  data.pressure_min = parseFloat(pressure_min.value)
  data.pressure_max = parseFloat(pressure_max.value)
  data.volume_min = parseFloat(volume_min.value)
  data.volume_max = parseFloat(volume_max.value)

  data.intensity_min = parseFloat(intensity_min.value)
  data.intensity_max = parseFloat(intensity_max.value)
  
  data.point_x = parseFloat(pressure_input.value)
  data.point_y = parseFloat(volume_input.value)
  
  printPlot(data,clapeyron)
}
build_plot()

volume_max.addEventListener("change",()=>{volume_input.value = Math.min(volume_input.value,volume_max.value);build_plot()})
pressure_max.addEventListener("change",()=>{pressure_input.value = Math.min(pressure_input.value,pressure_max.value);build_plot()})
volume_min.addEventListener("change",()=>{volume_input.value = Math.max(volume_input.value,volume_min.value);build_plot()})
pressure_min.addEventListener("change",()=>{pressure_input.value = Math.max(pressure_input.value,pressure_min.value);build_plot()})


function updateUnity(){
  if(unity.value == "atm"){
    clapeyron.setR("atm")
    R_input.value = Clapeyron.ATM
    r_display.value = Clapeyron.ATM
    volume_unity_display.innerText = "(L)"
    pressure_unity_display.innerText = "(Atm)"
  }else{
    clapeyron.setR("pa")
    R_input.value = Clapeyron.PA
    r_display.value = Clapeyron.PA
    volume_unity_display.innerText = "(m³)"
    pressure_unity_display.innerText = "(Pa)"
  }
  build_plot()
}

function updateTarget(){
  var resetinputs = [n_input,pressure_input,volume_input,temperature_input]
  for(let i in resetinputs){
    resetinputs[i].classList.remove('border-success')
    resetinputs[i].classList.remove('text-success')
    resetinputs[i].classList.remove('bg-success-subtle')
    resetinputs[i].readOnly = false
  }

   target_table[calc_target.value].readOnly = true
   target_table[calc_target.value].classList.add("border-success")
   target_table[calc_target.value].classList.add("text-success")
   target_table[calc_target.value].classList.add("bg-success-subtle")
  }
updateTarget()

function updateResultPoint(){
  changePointPos(pressure_input.value,volume_input.value,clapeyron)
}

unity.addEventListener("change",updateUnity)
calc_target.addEventListener("change",updateTarget)

form.addEventListener("change",()=>{
  var rebuildPlot = false

  if(volume_input.value=='') volume_input.value=1
  if(pressure_input.value=='') pressure_input.value=1
  if(n_input.value=='') n_input.value=1

  /// REBUILD CHECKS
  if(parseFloat(n_input.value)!=clapeyron.n){rebuildPlot = true}
  clapeyron.n = parseFloat(n_input.value)
  if(parseFloat(pressure_max.value)!=data.pressure_max){rebuildPlot = true}
  if(parseFloat(volume_max.value)!=data.volume_max){rebuildPlot = true}
  if(parseFloat(pressure_min.value)!=data.pressure_min){rebuildPlot = true}
  if(parseFloat(volume_min.value)!=data.volume_min){rebuildPlot = true}
  if(parseFloat(intensity_min.value)!=data.intensity_min){rebuildPlot = true}
  if(parseFloat(intensity_max.value)!=data.intensity_max){rebuildPlot = true}

  // CALCULOS
  switch(calc_target.value){
    case 'temp':
      temperature_input.value = clapeyron.getTemperature(pressure_input.value,volume_input.value).toFixed(2)
      updateResultPoint()
      break;
    case 'volume':
      volume_input.value = clapeyron.getVolume(pressure_input.value,temperature_input.value).toFixed(2)
      updateResultPoint()
      break;
    case 'pressure':
      pressure_input.value = clapeyron.getPressure(volume_input.value,temperature_input.value).toFixed(2)
      updateResultPoint()
      break;
    case 'n':
      n_input.value = clapeyron.getN(pressure_input.value,volume_input.value,temperature_input.value).toFixed(2)
      updateResultPoint()
      rebuildPlot = true
      break;
  }

    if(parseFloat(volume_input.value)>parseFloat(volume_max.value) || parseFloat(pressure_input.value)>parseFloat(pressure_max.value)){
    volume_max.value = Math.max(pressure_input.value,volume_input.value)
    pressure_max.value = Math.max(pressure_input.value,volume_input.value)
    rebuildPlot = true
  }
  
  if(parseFloat(pressure_input.value)<parseFloat(pressure_min.value) || parseFloat(volume_input.value)<parseFloat(volume_min.value)){
    pressure_min.value = Math.min(pressure_input.value,volume_input.value)
    volume_min.value = Math.min(pressure_input.value,volume_input.value)
    rebuildPlot = true
  }

  if(parseFloat(volume_input.value)<(parseFloat(volume_max.value)*0.9) || parseFloat(pressure_input.value)<(parseFloat(pressure_max.value)*0.9)){
    volume_max.value = Math.max(pressure_input.value,volume_input.value,10/1.2)*1.2
    pressure_max.value = Math.max(pressure_input.value,volume_input.value,10/1.2)*1.2
    rebuildPlot = true
  }

  if(rebuildPlot){
    console.log("REBUILDING!")
    build_plot()
  }
})

