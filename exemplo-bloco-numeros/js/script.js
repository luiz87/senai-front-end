opcoes = []
for (let i = 0; i < 15; i++) {
    opcoes[i] = i
}
modal = document.getElementById("modal");
modal.style.display = "none";
mapa = []
cont = 0
corpo = document.getElementById("corpo")
for (i = 0; i <= 3; i++) {
    mapa[i] = []
    for (j = 0; j <= 3; j++) {

        bloco = document.createElement("div")
        bloco.setAttribute("class", "bloco")
        bloco.setAttribute("id", `bl-${i}-${j}`)
        bloco.addEventListener("click", mover)

        bloco.innerHTML = `<span>${++cont}</span>`
        mapa[i][j] = bloco

    }
}

function carregarBlocos() {
    corpo.innerHTML = ""
    for (i = 0; i <= 3; i++) {
        for (j = 0; j <= 3; j++) {
            corpo.appendChild(mapa[i][j])
        }
    }
}

function bloco0() {
    for (i = 0; i <= 3; i++) {
        for (j = 0; j <= 3; j++) {
            if (mapa[i][j].innerHTML == "<span>0</span>") {
                return mapa[i][j]
            }
        }
    }
}

function mover() {
    trocar(this, bloco0())
    if (verificarFim()) {
        modal.style.display = "block";
    }
}

function verificarFim() {
    cont = 0;
    itens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
    for (i = 0; i <= 3; i++) {
        for (j = 0; j <= 3; j++) {
            if (mapa[i][j].innerHTML != `<span>${itens[cont]}</span>`) {
                return false;
            }
            cont++
        }
    }
    return true;
}

function buscaIJ(elemento) {
    elemento = elemento.id.replace("bl-", "")
    return elemento.split("-")
}

function change(c, v) {
    aux = mapa[v[0]][v[1]].innerHTML
    mapa[v[0]][v[1]].innerHTML = mapa[c[0]][c[1]].innerHTML
    mapa[v[0]][v[1]].style.visibility = 'visible'
    mapa[c[0]][c[1]].innerHTML = aux
    mapa[c[0]][c[1]].style.visibility = 'hidden'
}

function trocar(clicado, vazio) {
    if (clicado.id == vazio.id) {
        return;
    }

    c = buscaIJ(clicado)
    v = buscaIJ(vazio)

    if (c[0] == v[0] || c[1] == v[1]) {
        proximo = (c[0] - v[0]) + (c[1] - v[1])
        if (proximo == 1 || proximo == -1) {
            change(c, v)
        } else {
            i = Number(v[0])
            j = Number(v[1])
            if (c[0] == v[0]) {
                if (c[1] > v[1]) {
                    ++j
                } else {
                    --j
                }
            } else {
                if (c[0] > v[0]) {
                    ++i
                } else {
                    --i
                }
            }
            trocar(mapa[i][j], vazio)
            trocar(clicado, bloco0())

        }
    }
}

function embaralhar() {
    try {
        ij = buscaIJ(bloco0())
        i = ij[0]
        j = ij[1]
        if ((Math.random() * 1).toFixed(0) == 1) {
            ((Math.random() * 1).toFixed(0) == 1) ? j++ : j--
        } else {
            ((Math.random() * 1).toFixed(0) == 1) ? i++ : i--
        }
        trocar(mapa[i][j], bloco0())
    } catch (error) {
        embaralhar()
    }
}

carregarBlocos()

bl22 = document.getElementById("bl-3-3")
bl22.innerHTML = "<span>0</span>"
bl22.style.visibility = "hidden"

tamanho = 0
corpo = document.getElementById("corpo")
body = document.getElementById("body")
if (window.innerHeight <= window.innerWidth) {
    tamanho = window.innerHeight
} else {
    tamanho = window.innerWidth
}
corpo.style.height = `${tamanho}px`
corpo.style.width = `${tamanho}px`

body.style.height = `${window.innerHeight}px`

for (let i = 0; i < 200; i++) {
    embaralhar()
}