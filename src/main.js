import 'bootstrap/dist/css/bootstrap.css'
import 'plotly.js-dist/plotly'
import { printPlot,generateLayout } from "./plot";
import { Clapeyron } from './clapeyron';

var layout = generateLayout()
printPlot(layout)