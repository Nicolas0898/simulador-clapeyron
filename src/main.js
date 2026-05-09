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

const clapeyron = new Clapeyron()

let data = new PlotData()

function build_plot(){
  clapeyron.n = parseFloat(n_input.value)
  data.pressure_min = parseFloat(pressure_min.value)
  data.pressure_max = parseFloat(pressure_max.value)
  data.volume_min = parseFloat(volume_min.value)
  data.volume_max = parseFloat(volume_max.value)
  
  data.point_x = parseFloat(pressure_input.value)
  data.point_y = parseFloat(volume_input.value)
  
  printPlot(data,clapeyron)
}
build_plot()

volume_max.addEventListener("change",()=>{volume_input.value = Math.min(volume_input.value,volume_max.value)})
pressure_max.addEventListener("change",()=>{pressure_input.value = Math.min(pressure_input.value,pressure_max.value)})
volume_min.addEventListener("change",()=>{volume_input.value = Math.max(volume_input.value,volume_min.value)})
pressure_min.addEventListener("change",()=>{pressure_input.value = Math.max(pressure_input.value,pressure_min.value)})


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
  
}

unity.addEventListener("change",updateUnity)
calc_target.addEventListener("change",updateTarget)

form.addEventListener("change",()=>{
  var rebuildPlot = false

  if(parseFloat(pressure_max.value)!=data.pressure_max){rebuildPlot = true}
  if(parseFloat(volume_max.value)!=data.volume_max){rebuildPlot = true}
  if(parseFloat(pressure_min.value)!=data.pressure_min){rebuildPlot = true}
  if(parseFloat(volume_min.value)!=data.volume_min){rebuildPlot = true}
  if(parseFloat(n_input.value)!=clapeyron.n){rebuildPlot = true}

  if(parseFloat(volume_input.value)>parseFloat(volume_max.value) || parseFloat(pressure_input.value)>parseFloat(pressure_max.value)){
    volume_max.value = Math.max(pressure_input.value,volume_input.value)
    pressure_max.value = Math.max(pressure_input.value,volume_input.value)
    rebuildPlot = true
  }
  
  if(parseFloat(pressure_input.value)<parseFloat(pressure_min.value) || parseFloat(volume_input.value)<parseFloat(volume_min.value)){
    pressure_min.value = Math.min(pressure_input.value,volume_input.value)
    volume_min = Math.min(pressure_input.value,volume_input.value)
    rebuildPlot = true
  }

  // CALCULOS
  changePointPos(pressure_input.value,volume_input.value,clapeyron)

  temperature_input.value = clapeyron.getTemperature(pressure_input.value,volume_input.value).toFixed(2)

  if(rebuildPlot){
    console.log("REBUILDING!")
    build_plot()
  }
})

