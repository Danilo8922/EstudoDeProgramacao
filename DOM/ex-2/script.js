function multiplicar() {
    let tab = document.getElementById("tabuada").value
    const ul = document.getElementById("valor")
    const limpar = document.getElementById("limpar")
    let mult = 1
    while (mult <= 10) {
        mult1 = tab * mult
        const li = document.createElement("li")
        li.classList.add("lista")
        li.innerText = `${tab}x${mult}=${mult1}`
        ul.appendChild(li)
        mult = mult + 1
        limpar.addEventListener("click", function(){
        li.remove()
    })
    }

    
}
