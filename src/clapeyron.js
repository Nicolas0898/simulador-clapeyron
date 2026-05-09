class Clapeyron{
    static ATM=0.082
    static PA =8.314
    r=Clapeyron.ATM
    runity = "atm"
    n=100

    getTemperature(pressure,volume){
        return (pressure*volume)/(this.n*this.r)
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