//Capiturando o primeiro elemento 'body'
const tela = document.getElementsByTagName('body')[0];
//Instacia uma função chamada game na varia game
const game = new Game();
//Instancia da variável da nave jogador
let nave;
const velocMovimento = 10;
//Instancia das variável da nave inimigo
const maxInimigos = 10;
const inimigos = [];
let intervalo;

//adicionando um evento á variavel “tela” com ‘keyup’ que recebe o valor do Enter quando clicado pelo usuario
tela.addEventListener('keyup', function (event){
	if(event.key == 'Enter'){
	//Chama o método isPause(), que retorna true/false, indicando se o jogo tá pausado ou não. Se for false, ele chama o método .start(), Se retornar true, chama o método pause()	
    (game.isPause()) ? game.start() : game.pause('Pause');	
	}else if(event.key == 'p'){
	game.pause('Pause');
    }
});

//Adicionando evento de tecla pressionada para movimentação da nave do jogador
tela.addEventListener('keydown', function(event){
    //Condição para saber se o jogo ta pausado, se não tiver, o jogador pode mexer a nave
    if(!game.isPause()){
        //Movimento da nave esquerdo e direito
        if(event.key == 'ArrowLeft'){
            //Variável "velocMovimento" será usada para mover a nave para esquerda(-) e direita(+)
            //Chama o objeto nave e acessa seu método setXY, lançando os valores da nave como parâmetro, passando o valor nave.X() para posição horizontal, e nave.Y() para vertical(valor fixo)
            nave.setXY(nave.x() - velocMovimento, nave.y());
        }else if(event.key == 'ArrowRight'){
            nave.setXY(nave.x() + velocMovimento, nave.y())
        }
    }
})

//Função game que pega elementos do body e configura elementos da pontuação, contem as funções de “pausar” e “iniciar” e outras ações envolvendo a nave do jogador e inimigo
function Game(){
	const painel = document.getElementById("painel");
	const placar = document.getElementById("placar");
	const placarMsg = painel.querySelector(".msg");
	let pause = true;
	
	//Verifica se está “pausado”
	this.isPause = () => pause;
	
    //Método que captura a a largura e a altura da tela do jogo
    this.w = () => tela.getBoundingClientRect().width;
    this.h = () => tela.getBoundingClientRect().height;

	//Oculta o painel “Nome do jogo + Msg” e mostra o “placar”
	this.start = () => {
        painel.style.display = "none";
        placar.style.display = "flex";
        pause = false;
        //Verifica se a nave ja foi criada, se não, ela instancia e cria uma.
        if(nave == undefined){
            nave = new Nave();
            for(let cont = 0; cont < maxInimigos; cont++){
                let imagem = 'cp1';
                switch(Math.round(Math.random() * 2)){
                case 1: imagem = 'iba';
                    break;
                case 2: imagem = 'iy';
                    break;
                }
                inimigos.push(new Inimigos(imagem));
            }
        };
        //Função que opera uma chamada de método, nesse caso, .animation() a cada 100segundos. Essa função percorrerá o array inimigos, ou seja, cada objeto inimigo criado e para cada objeto ele cama a função .animation()
        intervalo = setInterval(() => {
            inimigos.forEach(inimigo => {
                inimigo.animation();
            })
        }, 500);
    };

	//Método que pausa e mostra mensagem
	this.pause = (mgs) =>{
	  painel.style.display = "block";
	  placarMsg.textContent = mgs;
	  pause = true;
    };	
}

//Objeto que cria a nave
function Nave(imgNave = "wt"){
    //Cria uma div para alocar a nave criada
    let div = document.createElement('div');
    //Adiciona a classe .nave na div criada acima
    div.classList.add('nave');

    //Cria uma tag img
    let iNave = document.createElement("img");
    
    //Adiciona a propriedade "src" passando o caminho da imagem a ser criada
    iNave.src = `assets/images/${imgNave}.png`;
    
    //Adiciona a tag img criada acima dentro da div criada anteriormente
    div.appendChild(iNave);

    //Adiciona a div na tela
    tela.appendChild(div);
    
    //Método que captura a a largura e a altura da div da nav
    this.w = () => div.getBoundingClientRect().width;
    this.h = () => div.getBoundingClientRect().height;
    
    //Método que captura a posição da nave
    this.x = () => div.getBoundingClientRect().x;
    this.y = () => div.getBoundingClientRect().y;

    //Método que seta a posição inicial da nave
    this.setXY = (x, y) =>{
        if(x<0){
            x = 0;
        }else if(x > game.w() - this.w()){
            x = game.w() - this.w();
        }
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;  
    }

    //Método que calcula o posicionamento da nave referente a tela
    let posicaoInicial = () =>{
        this.setXY(
            game.w()/2 - this.w()/2, //valor de X
            game.h() - this.h() - 10
        );
    }

    //Carrega a imagem com a posição setada
    iNave.onload = posicaoInicial;
    //Toda vez que chamar a função onload, esta, receberá uma nova função que será a “fn”, que recebe o i.onload;
    this.onload = (fn) => iNave.onload = fn;
}

//Instancia o objeto Nave(), herdando todas as características para criar o Inimigo
function Inimigos(imagem = 'cp1'){
    //Chama o objeto Nave, herdando todas as propriedades dela
    Nave.call(this, imagem);

    //Seta a posição do Inimigo
    this.setPosicaoInicial = () => {
        //Sorteia (a posição inicial do inimigo no X, Y
        let x = Math.round(Math.random() * (game.w() - this.w()));
        let y = Math.round(-this.h() - 10 - (Math.random()*1000));
        this.setXY(x, y);
    }

    //Função que chama o método setXY, passando o valor fixo do eixo X(ja que ela não se move nesse eixo) e o valor do eixo Y multiplicado pelo variável velocMovimento
    this.animation = () => {
        this.setXY(this.x(), this.y() + velocMovimento);
        //Condição que verifica se o objeto saiu da tela, que reseta a sua posição mandando para um valor inicial e resetando a posição desta
        if(this.y() > game.h() + 20){
            this.setPosicaoInicial();
        };
    }

    //Função(herdada), acionada quando inicia o game
    this.onload(this.setPosicaoInicial);
}