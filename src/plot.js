import { Clapeyron } from './clapeyron'

class PlotData {
    volume_min = 1;
    volume_max = 100;
    pressure_min = 1;
    pressure_max = 100;
    n = 100;
    r = 0.082;

    point_x = 50
    point_y = 50

    intensity_min = 100;
    intensity_max= 1100;

    step = 30
}

function generateLayout(clapeyron, pressure_max, volume_max, pressure_min, volume_min) {
    var layout = {
        title: {
            text: "Formula de Clapeyron",
            font: {
                size: 32
            }
        },
        autosize: true,
        scene: {
            aspectratio: { x: (pressure_max - pressure_min) / (volume_max - volume_min), y: (volume_max - volume_min) / (pressure_max - pressure_min), z: 2 },
            camera: {
                center: {
                    x: 0, y: 0, z: 0
                },
                eye: {
                    x: -2.5, y: -2.5, z: 1.5
                },
                up: {
                    x: 0, y: 0, z: 1
                }
            },

            xaxis: {

                title: {
                    text: "Pressão"
                },
                tickfont: {
                    color: 'blue'
                },
                ticksuffix: clapeyron.runity == "atm" ? "atm" : "Pa",
                nticks: 5
            },
            yaxis: {
                title: {
                    text: "Volume"
                },
                tickfont: {
                    color: 'green'
                },
                ticksuffix: clapeyron.runity == "atm" ? "L" : "m³",
                nticks: 5
            },

            zaxis: {
                title: {
                    text: "Temperatura"
                },
                tickfont: {
                    color: 'red'
                },
                tickwidth: 4,
                ticksuffix: "K",
                nticks: 8,
                tick0: 0,
            }

        },

        colorway: ["#ff8989", "#ffd9a7"],

        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 60,
        }
    };
    return layout
}

function createTrace2() {
    return {
        zorder: 1,
        type: "scatter3d",
        mode: 'markers',
        marker: {
            size: 12,
            line: {
                color: 'rgb(255, 128, 128)',
                width: 4.75
            },
            opacity: 0.9
        },
        name: "Resultado",
        showlegend: false
    }
}

function printPlot(data, clapeyron) {
    let pressao = []
    let volume = []
    let temperatura = []
    var layout = generateLayout(clapeyron, data.pressure_max, data.volume_max, data.pressure_min, data.volume_min)

    console.log(data)
    for (let x = data.pressure_min; x <= (data.pressure_max + data.pressure_max / data.step);) {
        for (let y = data.volume_min; y <= (data.volume_max + data.volume_max / data.step);) {
            pressao.push(x)
            volume.push(y)
            temperatura.push(clapeyron.getTemperature(x, y))
            y += data.volume_max / data.step
        }
        x += data.pressure_max / data.step
    }



    var trace1 = {
        x: pressao,
        y: volume,
        z: temperatura,
        type: 'mesh3d',

        intensity: temperatura,
        colorscale: 'Hot',
        showscale: true,

        cauto: false,
        cmin: data.intensity_min,
        cmax: data.intensity_max,

        opacity: 0.65,

        name: "Clapeyron",
        showlegend: false


    };

    var trace2 = createTrace2()
    trace2.x = [data.point_x]
    trace2.y = [data.point_y]
    trace2.z = [clapeyron.getTemperature(data.point_x, data.point_y)]



    const config = {
        responsive: true
    }

    Plotly.react('plot', [trace1, trace2], layout, config);

}

function changePointPos(pressure, volume, clapeyron) {
    var new_data = {}
    new_data.x = [[pressure]]
    new_data.y = [[volume]]
    new_data.z = [[clapeyron.getTemperature(pressure, volume)]]
    Plotly.restyle('plot', new_data, [1])

}



export { printPlot, generateLayout, PlotData, changePointPos }