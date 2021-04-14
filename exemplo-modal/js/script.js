var btn = document.getElementById("btn-modal");
var modal = document.getElementById("modal");

btn.onclick = function () {
    modal.style.display = "block";
}

var btnX = document.getElementsByClassName("fechar")[0];
btnX.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    console.log(event.target);
    if (event.target == modal) {
        modal.style.display = "none";
    }
}