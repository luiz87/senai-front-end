
qtProduto = 0;
function addProduto(i, add) {
    p = lsProdutos[i]
    p.qt += add
    if (p.qt < 0) { return; }
    valorAtual = p.qt * p.valor
    document.getElementById(`parcial-${i}`).innerHTML = `R$ ${valorAtual.toFixed(1)} (x${p.qt})`;
}

// var lsProdutos = [
//     { qt: 0, cod: "01", valor: 10, grupo: "Salsicha na Chapa", categoria: "HOTDOG", descricao: "Pão, salsicha, ...." }
//     , { qt: 0, cod: "02", valor: 12.5, grupo: "Salsicha na Chapa", categoria: "HOTDOG", descricao: "Pão, salsicha, ...." }
//     , { qt: 0, cod: "03", valor: 29.5, grupo: "Salsicha na Chapa", categoria: "HOTDOG", descricao: "Pão, salsicha, ...." }
// ];

// if (localStorage.getItem('listaProdutos') == null) {
//     localStorage.setItem('listaProdutos', JSON.stringify(lsProdutos))
// }

// lsProdutos = JSON.parse(localStorage.getItem('listaProdutos'))

lsProdutos = carregarItens()

function carregarProdutos() {
    grupoAtual = ''
    for (i in lsProdutos) {
        p = lsProdutos[i];

        if (grupoAtual != p.grupo) {
            grupoAtual = p.grupo
            h2 = document.createElement("h2")
            h2.innerHTML = `${p.grupo} <span>${p.categoria}<span>`
            document.getElementById("conteudo").appendChild(h2);
        }
        var produto = document.getElementsByClassName("item-produto")[0].cloneNode(true);

        if (p.cod != '') {
            produto.getElementsByClassName("adicionais")[0].remove();
            produto.getElementsByClassName("cod-produto")[0].innerHTML = p.cod;
        }
        else {
            produto.getElementsByClassName("produto")[0].remove();

        }
        produto.getElementsByClassName("valor-produto")[0].innerHTML = `R$ ${p.valor.toFixed(1)}`;
        produto.getElementsByClassName("desc-produto")[0].innerHTML = p.descricao;
        document.getElementById("conteudo").appendChild(produto);

        var btMais = produto.getElementsByClassName("bt-mais")[0];
        btMais.setAttribute("onclick", `addProduto(${i} , 1)`);

        var btMenos = produto.getElementsByClassName("bt-menos")[0];
        btMenos.setAttribute("onclick", `addProduto(${i} , -1)`);

        produto.getElementsByClassName("valor-parcial")[0].setAttribute("id", `parcial-${i}`)
    }
    document.getElementsByClassName("item-produto")[0].setAttribute("style", "display: none;");
}

function carregaEvento(acc) {
    for (i = 0; i < acc.length; i++) {
        itemTemp = acc[i];
        itemTemp.addEventListener("click", function () {
            var panel = this.nextElementSibling;
            if (panel.style.display == "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        })
    }
}

pedido = ''

btEnviar = document.getElementById("enviar")
btEnviar.addEventListener("click", function () {
    msg = ''
    modal = document.getElementById("modal-enviar")    
    total = 0
    for (i in lsProdutos) {
        p = lsProdutos[i]
        if (p.qt > 0) {
            totalP = (p.qt * p.valor).toFixed(1)
            total += Number(totalP)
            msg += (p.cod == '')? `${p.grupo} ${p.descricao}`: `COD ${p.cod}`
            msg += ` (${p.qt}x ${p.valor.toFixed(1)}) = ${totalP}<br>`
        }
    }
    if (total == 0) {
        msg = 'Escolha ao menos um produto.'
        rodape = document.getElementById("rodape-modal")
        rodape.innerHTML = ''
    } else {
        msg += `Total dos Produtos = ${total.toFixed(1)}<br>`
        pedido = msg
        msg += `<div id="complemento-envio">
        <input type="text" id="endereco" placeholder="Digite seu Endereço" >
        <input type="text" id="nome" placeholder="Digite seu Nome">
        <span> Clique em "CONTINUAR" para enviar seu pedido via Whatsapp.</span>
        </div>`
        rodape = document.getElementById("rodape-modal")
        rodape.innerHTML = '<button type="button" onclick="continuar()">CONTINUAR</button>'
    }
    document.getElementsByClassName("corpo-modal")[0].innerHTML = msg
    modal.style.display = "block"

})

function continuar() {
    nome = document.getElementById("nome")
    if (nome.value == '') {
        alert("Digite seu nome")
    }else{
        fone = '5561994370463'
        nome = document.getElementById("nome").value
        endereco = document.getElementById("endereco").value
        pedido = `Olá meu nome é *${nome}* desejo fazer o seguinte pedido<br>` + pedido
        pedido += (endereco != '') ? `Meu endereço é ${endereco}` : ''

        pedido = pedido.replaceAll('<br>','\n')
        pedido = encodeURI(pedido)
        link = `https://api.whatsapp.com/send?phone=${fone}&text=${pedido}`
        console.log(link)
        window.open(link,'_blanck')
    }

}

btFecharModal = document.getElementById("fechar-modal")
btFecharModal.addEventListener("click", function () {
    modal = document.getElementById("modal-enviar")
    modal.style.display = "none"
})

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

carregarProdutos();
acc = document.getElementsByClassName("adicionais");
carregaEvento(acc)
acc = document.getElementsByClassName("produto");
carregaEvento(acc)