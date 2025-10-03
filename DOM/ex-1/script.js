let titulo = document.getElementById("trocaTexto")
let trocaTexto = document.getElementById("btnTrocaTexto")

let fundoAzul = document.getElementById("btnFundoAzul")
let fundoBranco = document.getElementById("btnFundoBranco")

let pegarTexto = document.getElementById("btnPegarTexto")
let h2 = document.getElementById("textoEscrito")

trocaTexto.addEventListener("click", function(){
    titulo.innerText = "Olá Mundo!!!"
})

fundoAzul.addEventListener("click", function(){
    document.body.style.backgroundColor = "blue"
    document.body.style.color = "white"
})

fundoBranco.addEventListener("click", function(){
    document.body.style.backgroundColor = "white"
    document.body.style.color = "black"
})

pegarTexto.addEventListener("click", function(){
    let input = document.getElementById("texto").value
    h2.innerText = `Olá ${input} Seja Bem vindo!!`
})
