//Capiturando o primeiro elemento 'body'
const tela = document.getElementsByTagName("body")[0];
//Instacia uma função chamada game na varia game
const game = new Game();

//adicionando um evento á variavel “tela” com ‘keyup’
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
	
	//Verifica se estar “pausado”
	this.isPause = () => pause;
	
	//Oculta o painel “Nome do jogo + Msg” e mostra o “placar”
	this.start = () => {
	  painel.style.display = "none";
	  placar.style.display = "flex";
	  pause = false;
    };

	//Método que pausa e mostra mensagem
	this.pause = (mgs) =>{
	  painel.style.display = "block";
	  placarMsg.textContent = mgs;
	  pause = true;
    };	
}