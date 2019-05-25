class CalcController{
    constructor(){
        this._locale = 'pt_BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dataEl = document.querySelector('#data');
        this._horaEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
    }
    initialize(){
        this.exibirDataHora();
        setInterval(()=>{
            this.exibirDataHora();
        }, 1000)
                
    }
    exibirDataHora() {
        this.data = this.currentDate.toLocaleDateString(this.locale);
        this.hora = this.currentDate.toLocaleTimeString(this.locale);
    }
    get displayCalc(){
        this._displayCalcEl.innerHTML;
    }
    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor;
    }
    get hora(){
        this._horaEl.innerHTML;
    }
    set hora(novaHora){
        this._horaEl.innerHTML = novaHora;
    }
    get data(){
        this._dataEl.innerHTML;
    }
    set data(novaData){
        this._dataEl.innerHTML = novaData;
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(novaData){
        this._currentDate = novaData;
    }
}