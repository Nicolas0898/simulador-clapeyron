import 'bootstrap/dist/css/bootstrap.css'
import 'plotly.js-dist/plotly'
import { printPlot,generateLayout } from "./plot";
import { Clayperon } from './clayperon';

var layout = generateLayout()
printPlot(layout)