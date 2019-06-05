class CalcController{
    constructor(){
        this._locale = 'pt_BR';
        this._ultimaOperacao = '';
        this._ultimoValor = '';
        this._operacao = [];
        this._displayCalcEl = document.querySelector('#display');
        this._dataEl = document.querySelector('#data');
        this._horaEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.buttonInitialize();
        this.iniciarTeclado();
    }

    initialize(){
        this.exibirDataHora();
        setInterval(()=>{
            this.exibirDataHora();
        }, 1000);
        this.exibirUltimoValorNoDisplay();
        this.colarAreaDeTransferencia();
                
    }
    copiarParaAreaDeTransferencia(){
        let input = document.createElement('input');
        console.log(this.displayCalc);
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        input.remove();
    }
    colarAreaDeTransferencia(){
        document.addEventListener('paste',e =>{
            let texto = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(texto);
            this.pushOperador(texto);
        });
    }
    //Função criada para adicionar em massa mais de um tipo de evento 
    addEventListenerAll(elemento, eventos, funcao){
        eventos.split(' ').forEach(umEvento =>{
            elemento.addEventListener(umEvento, funcao, false);
        });
    }
    iniciarTeclado(){
        addEventListener('keyup',evento =>{
            switch (evento.key){
                case 'Backspace' : 
                    this.apagarEntrada();
                    break;
                case 'Escape' : 
                    this.apagarTudo();
                    break;
                case 'Enter' :
                case '=' :
                    this.calcular();
                    break;
                case '+' :
                    this.adicionarOperacao(evento.key);
                    break;
                case '-' :
                    this.adicionarOperacao(evento.key);
                    break;
                case '*' :
                    this.adicionarOperacao(evento.key);
                    break;
                case '/' :
                    this.adicionarOperacao(evento.key);
                    break;
                case '%' :
                    this.adicionarOperacao(evento.key);
                    break;
                case ',' :
                case '.' :
                    this.incluirPonto();
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
                    this.adicionarOperacao(parseInt(evento.key));
                    break;
                case 'c':
                    if(evento.ctrlKey) this.copiarParaAreaDeTransferencia();
                    break;
            }
        });
    }
    apagarTudo(){
        this._operacao = [];
        this._ultimoValor = '';
        this._ultimaOperacao = '';
        this.exibirUltimoValorNoDisplay();
    }
    apagarEntrada(){
        this._operacao.pop();
        this.exibirUltimoValorNoDisplay();
    }
    obterUltimaOperacao(){
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
    obterResultado(){
        return eval(this._operacao.join(''));
    }
    calcular(){
        
        let ultimoOperador = '';
        this._ultimaOperacao = this.obterUltimoItem();

        if(this._operacao.length <3){
            /*Ao clicar em igual com menos de três itens na array iremos usar a ultima operação e o último
            *  valor da array (sendo o último digitado ou o último resultado) para realizar operaçõesem serie*/
            let primeiroValor = this._operacao[0];
            if(!this._ultimoValor) this._ultimoValor = this.obterUltimoItem(false);
            this._operacao = [primeiroValor, this._ultimaOperacao, this._ultimoValor];

        }
        if(this._operacao.length >3){

            ultimoOperador = this._operacao.pop();
            this._ultimoValor = this.obterResultado();

        } else if(this._operacao.length == 3){
            this._ultimoValor = this.obterUltimoItem(false);

        }
        console.log('ultimo valor ' + this._ultimoValor);
        console.log('ultima operacao ' + this._ultimaOperacao);

        let resultadoDoPar = this.obterResultado();

        if(ultimoOperador == '%'){
            resultadoDoPar /= 100;
            this._operacao = [resultadoDoPar];
        } else{
            this._operacao = [resultadoDoPar];
            if(ultimoOperador){
                this._operacao.push(ultimoOperador);
            }
        }

        this.exibirUltimoValorNoDisplay();

    }

    obterUltimoItem(operador = true){
        let ultimoItem;
        for(let i = this._operacao.length-1; i>=0; i--){
            if(this.isOperator(this._operacao[i]) == operador){
                ultimoItem = this._operacao[i];
                break;
            }
        }
        if(!ultimoItem){
            ultimoItem = (operador) ? this._ultimaOperacao : this._ultimoValor;
        }
        return ultimoItem;
    }

    exibirUltimoValorNoDisplay(){
        let ultimoNumero = this.obterUltimoItem(false);
        if(!ultimoNumero) ultimoNumero = 0;
        this.displayCalc = ultimoNumero;
    }

    adicionarOperacao(operacao){

        if(isNaN(this.obterUltimaOperacao())){
            if(this.isOperator(operacao)){
                //Caso o último e o novo valor sejam Operadores de fato, substituiremos o anterior pelo novo
                this.adicionarNaUltimaPosicao(operacao);
            } else{
                //Primeiro número digitado entra nessa condição
                if(operacao != 0) this.pushOperador(operacao);
                this.exibirUltimoValorNoDisplay();
            }
        } else if(this.isOperator(operacao)){
            this.pushOperador(operacao);

        } else{
            //Todos os Números digitados normalmente exeto o primeiro
            let novaOperacao = this.obterUltimaOperacao().toString() + operacao.toString();
            this.adicionarNaUltimaPosicao(novaOperacao);
            this.exibirUltimoValorNoDisplay();
        }

    }

    incluirPonto(){
        let ultimoItem = this.obterUltimaOperacao();
        if(typeof ultimoItem === "string" && ultimoItem.split('').indexOf('.') > -1) return;

        if(!ultimoItem || this.isOperator(ultimoItem)){
            this.pushOperador('0.');
        } else{
            this.adicionarNaUltimaPosicao(ultimoItem.toString() + '.');
        }
        this.exibirUltimoValorNoDisplay();
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
                this.calcular();
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
                this.incluirPonto();
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
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor;
    }
    get hora(){
        return this._horaEl.innerHTML;
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