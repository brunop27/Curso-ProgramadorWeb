//Capiturando o primeiro elemento 'body'
const tela = document.getElementsByTagName("body")[0];
//Instacia uma função chamada game na varia game
const game = new Game();
//Instancia da variável que criará a nave
let nave;


//adicionando um evento á variavel “tela” com ‘keyup’ que recebe o valor do Enter quando clicado pelo usuario
tela.addEventListener("keyup", function (event){
	if(event.key == "Enter"){
	//Chama o método isPause(), que retorna true/false, indicando se o jogo tá pausado ou não. Se for false, ele chama o método .start(), Se retornar true, chama o método pause()	
    (game.isPause())? game.start():game.pause("Pause");	
	}else{
	game.pause("Pause");
    }
});

//Função game que pega elementos do body e configura elementos da pontuação, contem as funções de “pausar” e “iniciar”
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
        }
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

    //Método que seta a posição inicial da nave
    this.setXY = (x, y) =>{
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
}