class CalcController{
    constructor(){
        this._locale = 'pt_BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dataEl = document.querySelector('#data');
        this._horaEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.buttonInitialize();
    }

    initialize(){
        this.exibirDataHora();
        setInterval(()=>{
            this.exibirDataHora();
        }, 1000);
                
    }
    addEventListenerAll(elemento, eventos, funcao){
        eventos.split(' ').forEach(umEvento =>{
            elemento.addEventListener(umEvento, funcao, false);
        });
    }

    buttonInitialize(){
        let botoes = document.querySelectorAll('#buttons > g, #parts > g');
        botoes.forEach(botao=>{
            this.addEventListenerAll(botao, 'click drag ', e=>{
                console.log(botao.className.baseVal.replace('btn-',''));
                //brincando com o innerHTMl
                this.displayCalc = botao.className.baseVal.replace('btn-','')
            });
            this.addEventListenerAll(botao, 'mouseover mouseup mousedown',e=>{
                botao.style.cursor = 'pointer';
            })
        });
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