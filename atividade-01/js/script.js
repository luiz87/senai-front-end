function semEstilo() {
    document.styleSheets[0].disabled = true;
    document.styleSheets[1].disabled = true;
    document.styleSheets[2].disabled = true;
    document.styleSheets[3].disabled = true;
}

// unica função que muda a folha de estilo
function estilo(folha) {
    var mudarLayout;
    // alert(ultimoEstilo != folha);
    if (ultimoEstilo != folha) {
        mudarLayout = confirm("Você deseja mudar de layout?");
        if (mudarLayout) {
            ultimoEstilo = folha;
            semEstilo();
            document.styleSheets[folha].disabled = false;
        }
    }
    // usando perador condicional (ternário) 
    // mudarLayout ? (
    //     semEstilo(),
    //     document.styleSheets[folha].disabled = false
    // ) : ("");
}
semEstilo();
var ultimoEstilo = 0;
document.styleSheets[ultimoEstilo].disabled = false;
