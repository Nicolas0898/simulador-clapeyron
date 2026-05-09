
import { Clapeyron } from './clapeyron'

function generateLayout(){
    var layout = {
        title:{
            text:"Formula de Clapeyron",
            font:{
            size:32
            }
        },
        autosize: true,
        scene:{
            camera: {
                center: {
                        x: 0, y: 0, z: 0}, 
                eye: { 
                        x:-1.1, y:-2.5, z:2.1}, 
                up: {
                        x: 0, y: 0, z: 1}
                },

            xaxis:{
            title:{
                text:"Pressão"
            },
            tickfont:{
                color:'blue'
            },
            ticksuffix:"atm",
            nticks:5
            },
            yaxis:{
            title:{
                text:"Volume"
            },
            tickfont:{
                color:'green'
            },
            ticksuffix:"L",
            nticks:5
            },
            
            zaxis:{
            title:{
                text:"Temperatura"
            },
            tickfont:{
                color:'red'
            },
            tickwidth:4,
            ticksuffix:"K",
            nticks:8,
            tick0:0,
            }
        
        },

        colorway:["#ff8989","#ffd9a7"],

        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 60,
        }
    };
    return layout
}

function printPlot(layout){
    let pressao      = []
    let volume      = []
    let temperatura = []

    function clayperon(p,v,n,r){
    return (p*v)/(n*r)
    }

    for(let x=1;x<=100;x++){
    for(let y=1;y<=100;y++){
        pressao.push(x)
        volume.push(y)
        temperatura.push(clayperon(x,y,100,0.082))
    }
    }


    var data1 = {
            x:pressao,
            y:volume,
            z:temperatura,
            type: 'mesh3d',

            intensity:temperatura,
            colorscale:'Hot',
            showscale:true,

            opacity:0.5,

            name:"Clapeyron",
            showlegend: false


            };
    
    var data2 = {
        x:[50],
        y:[50],
        z:[clayperon(50,50,100,0.082) + 0.011],
        zorder:1,
        type:"scatter3d",
        mode: 'markers',
	    marker: {
            size: 12,
            line: {
            color: 'rgb(217, 217, 217)',
            width: 0.5},
            opacity: 1
        },
        name:"Resultado",
        showlegend: false

    }

    const config = {
        responsive:true
    }

    Plotly.react('plot', [data1,data2], layout,config);

}



export {printPlot,generateLayout}