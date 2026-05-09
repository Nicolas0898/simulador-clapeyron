class Clapeyron{
    static ATM=0.082
    static PA =8.314
    r=Clapeyron.ATM
    runity = "atm"
    n=100

    getTemperature(pressure,volume){
        pressure = parseFloat(pressure)
        volume = parseFloat(volume)
        // pV=nrt
        // T = pV/nr
        return (pressure*volume)/(this.n*this.r)
    }

    getPressure(volume,temperature){
        temperature = parseFloat(temperature)
        volume = parseFloat(volume)
        // pV=nrt
        // p = nrt/V
        return (this.n*this.r*temperature)/volume
    }

    getVolume(pressure,temperature){
        temperature = parseFloat(temperature)
        pressure = parseFloat(pressure)
        // pV=nrt
        // v = nrt/p
        return (this.r*this.n*temperature)/pressure
    }

    getN(pressure,volume,temperature){
        temperature = parseFloat(temperature)
        pressure = parseFloat(pressure)
        volume = parseFloat(volume)
        // pV=nrt
        // n = pV/rt
        this.n = (pressure*volume)/(temperature*this.r)
        return this.n
    }

    setR(to){
        if(to.toLowerCase()=="atm"){
            this.r = Clapeyron.ATM
            this.runity = "atm"
        }else{
            this.r = Clapeyron.PA
            this.runity = "pa"
        }
    }

}

export {Clapeyron};