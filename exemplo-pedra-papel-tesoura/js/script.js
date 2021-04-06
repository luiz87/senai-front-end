var escolhaJogador = "";
var qtVitoriasJogador = 0;
var qtVitoriasCP = 0;

function escolher(escolhida) {
    document.getElementById("pedra").style.filter = "grayscale(100%)";
    document.getElementById("papel").style.filter = "grayscale(100%)";
    document.getElementById("tesoura").style.filter = "grayscale(100%)";
    console.log(escolhida.id);
    document.getElementById(escolhida.id).style.filter = "none";
    escolhaJogador = escolhida.id;
}

function jogar() {

    if (escolhaJogador == "") {
        alert("Antes de jogar, é necessário escolher um opção.");
        return false;
    }
    // 2 informações necessário
    // 1 - qual foi a opção que o jogador escolheu
    // 2 - qual vai ser o valor pro computador
    var escolhaCP = ""
    console.log("Jogador marcou > " + escolhaJogador);
    var aleatorio = Math.floor(Math.random() * 3);
    // vai converter o número para o texto
    switch (aleatorio) {
        case 0:
            escolhaCP = "pedra";
            break;
        case 1:
            escolhaCP = "papel";
            break;
        case 2:
            escolhaCP = "tesoura";
            break;
        default:
            break;
    }

    console.log("PC marcou > " + escolhaCP);
    document.getElementById("img-pc").src = "pc-" + escolhaCP + ".jpg";
    document.getElementById("img-pc").style.filter = "none";
    // pedra .. ??
    // papel .. ??
    // tesoura .. ??
    var resultado = "";
    var corResultado = "";

    if (
        (escolhaJogador == "pedra" && escolhaCP == "tesoura") ||
        (escolhaJogador == "papel" && escolhaCP == "pedra") ||
        (escolhaJogador == "tesoura" && escolhaCP == "papel")) {
        qtVitoriasJogador++;
        resultado = "Vitória";
        corResultado = "blue";
    } else if (escolhaJogador == escolhaCP) {
        resultado = "Empate";
        corResultado = "black";
        corResultado = "yellow";
    } else {
        resultado = "Derrota";
        qtVitoriasCP++;
        corResultado = "red";
    }
    var terminou = false;

    if (qtVitoriasJogador == 5) {
        alert("Parabens você ganhou!");
        terminou = true;
    }
    if (qtVitoriasCP == 5) {
        alert("Que pena não foi agora!");
        terminou = true;
    }

    console.log(resultado);
    document.getElementById("placar-jogar").innerText = qtVitoriasJogador;
    document.getElementById("placar-resultado").innerText = resultado;
    document.getElementById("placar-resultado").style.color = corResultado
    document.getElementById("placar-pc").innerText = qtVitoriasCP;

    if (terminou) {
        var continuar = confirm("Deseja continuar?");
        if (continuar) {
            location.replace("index.html");
        } else {
            document.getElementById("bt-play").onclick = "";
        }

    }


}