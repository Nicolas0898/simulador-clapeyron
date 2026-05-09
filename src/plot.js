
import { Clayperon } from './clayperon'

function generateLayout(){
    var layout = {
        title:{
            text:"Formula de claypeyron",
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


    var data = [{
            x:pressao,
            y:volume,
            z:temperatura,
            type: 'mesh3d',

            intensity:temperatura,
            colorscale:'Hot',
            showscale:true,

            opacity:0.75,


            }];


    const config = {
        responsive:true
    }

    Plotly.react('plot', data, layout,config);

}



export {printPlot,generateLayout}