class CalcController{
    constructor(){
        this._locale = 'pt_BR';
        this._operacao = [];
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
    //Função criada para adicionar em massa mais de um tipo de evento 
    addEventListenerAll(elemento, eventos, funcao){
        eventos.split(' ').forEach(umEvento =>{
            elemento.addEventListener(umEvento, funcao, false);
        });
    }
    apagarTudo(){
        this._operacao = [];
    }
    apagarEntrada(){
        this._operacao.pop();
    }
    getUltimaOperacao(){
        return this._operacao[this._operacao.length -1];
    }
    adicionarNaUltimaPosicao(numero){
        this._operacao[this._operacao.length -1] = numero;
    }
    isOperator(operador){
        return ['+', '-', '*', '/', '%'].indexOf(operador) > -1;
    }
    pushOperador(operador){
        this._operacao.push(operador);
        if(this._operacao.length > 3){
            this.calcular();
        }
    }
    calcular(){
        let ultimoOperador = this._operacao.pop();
        let resultadoDoPar = eval(this._operacao.join(''));
        console.log(resultadoDoPar);

        this._operacao = [resultadoDoPar, ultimoOperador];

        this.exibirUltimoValorNoDisplay();

    }

    exibirUltimoValorNoDisplay(){
        let ultimoNumero
        for(let i = this._operacao.length-1; i>=0; i--){
            if(!this.isOperator(this._operacao[i])){
                ultimoNumero = this._operacao[i];
                break;
            }
        }
        this.displayCalc = ultimoNumero;
    }

    adicionarOperacao(operacao){

        if(isNaN(this.getUltimaOperacao())){
            if(this.isOperator(operacao)){
                //Caso o último e o novo valor sejam Operadores de fato, substituiremos o anterior pelo novo
                this.adicionarNaUltimaPosicao(operacao);
            } else if(isNaN(operacao)){
                //Tratar as codções para o Ponto e o Igual
                console.log(operacao);  
            } else{
                this.pushOperador(operacao);
                this.exibirUltimoValorNoDisplay();
            }
        } else if(this.isOperator(operacao)){
            this.pushOperador(operacao);

        } else{
            let novaOperacao = this.getUltimaOperacao().toString() + operacao.toString();
            this.adicionarNaUltimaPosicao(parseInt(novaOperacao));
            this.exibirUltimoValorNoDisplay();
        }

        console.log(this._operacao);
    }

    //Função que irá identificar as operações realizadas 
    executarBotao(botao){
        switch (botao){
            case 'ce' : this.apagarEntrada();
            botao = this._operacao;
                break;
            case 'ac' : this.apagarTudo();
                break;
            case 'igual' : botao = '=';
            this.adicionarOperacao(botao);
                break;
            case 'soma' : botao = '+';
            this.adicionarOperacao(botao);
                break;
            case 'subtracao' : botao = '-';
            this.adicionarOperacao(botao);
                break;
            case 'multiplicacao' : botao = '*';
            this.adicionarOperacao(botao);
                break;
            case 'divisao' : botao = '/';
            this.adicionarOperacao(botao);
                break;
            case 'porcento' : botao = '%';
            this.adicionarOperacao(botao);
                break;
            case 'ponto' : botao = '.';
            this.adicionarOperacao(botao);
                break;
            case '9':
            case '8':
            case '7':
            case '6':
            case '5':
            case '4':
            case '3':
            case '2':
            case '1':
            case '0':
                this.adicionarOperacao(parseInt(botao));
                break;
        }
        //brincando com o innerHTMl
        //this.displayCalc = parseInt(botao);
    }

    //Função que inicia todas as funcionalidades dos botões
    buttonInitialize(){
        let botoes = document.querySelectorAll('#buttons > g, #parts > g');
        botoes.forEach(botao=>{
            this.addEventListenerAll(botao, 'click drag', e=>{
                let operador = botao.className.baseVal.replace('btn-','');
                this.executarBotao(operador);
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