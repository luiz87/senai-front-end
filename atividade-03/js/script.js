function acessarAPI(link, executarFuncao) {
    var xhtml = new XMLHttpRequest();
    xhtml.open('GET', link, true);
    xhtml.send();
    xhtml.onreadystatechange = function()  {
        if (this.readyState == 4 &&
            this.status == 200) {
                // console.log(link);
                executarFuncao(this.responseText);
        }
    }
}

function carregarRegiao(valores){
    valores = JSON.parse(valores);
    carregarOpcoes(valores, document.getElementById("regiao"));
}

function carregarUf(valores){
    document.getElementById("uf").innerHTML = "<option>Selecione</option>";
    // console.log(valores);
    valores = JSON.parse(valores);
    carregarOpcoes(valores, document.getElementById("uf"));
}

function carregarIbge(valores){
    document.getElementById("municipio").innerHTML = "<option>Selecione</option>";
    valores = JSON.parse(valores);
    carregarOpcoes(valores, document.getElementById("municipio"));
}

function carregarOpcoes(valores, elemento){
    for(i in valores){
        var option = document.createElement("option");
        option.value = valores[i].id;
        option.innerHTML = valores[i].nome;
        elemento.appendChild(option);
    }
}

function escolherRegiao(objRegiao){
    var coRegiao = objRegiao.value;
    console.log( objRegiao.value)
    if(coRegiao == 'Selecione') {
        acessarAPI('https://servicodados.ibge.gov.br/api/v1/localidades/estados', carregarUf);
    }else{
        acessarAPI(`https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${coRegiao}/estados`, carregarUf);    
    }
    document.getElementById("municipio").innerHTML = "<option>Selecione</option>";
}

function escolherUf(objUf){
    var coUf = objUf.value;
    acessarAPI(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${coUf}/municipios`, carregarIbge);
}

acessarAPI('https://servicodados.ibge.gov.br/api/v1/localidades/regioes', carregarRegiao);

acessarAPI('https://servicodados.ibge.gov.br/api/v1/localidades/estados', carregarUf);
