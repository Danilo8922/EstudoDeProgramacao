let input = document.getElementById("tarefa")
let botao = document.getElementById("adicionar")
let lista = document.getElementById("lista")
let limpar = document.getElementById("limpar")
let todas = document.getElementById("filtro-todas")
let concluidas = document.getElementById("filtro-concluidas")
let pendentes = document.getElementById("filtro-pendente")

function carregarTarefas() {
    let dados = localStorage.getItem("tarefas")

    if (dados) {
        let itens = JSON.parse(dados) //transforma novamente em Arry
        itens.forEach(function (obj) {
            adicionarTarefaNaTela(obj.tarefa, obj.concluida)
        })
        console.log(itens)
    }
}


// executa o botão ao clicar no enter
input.addEventListener("keydown", function () {
    if (event.key == "Enter") {
        botao.click()
    }
})




function adicionarTarefaNaTela(tarefa, concluida = false) {

    let li = document.createElement("li")

    let spanTexto = document.createElement("span")
    spanTexto.textContent = tarefa
    spanTexto.classList.add("tarefa")

    spanTexto.addEventListener("dblclick", function(){
        let novoTexto = prompt("Edite a Tarefa:", spanTexto.innerText)

        if(novoTexto !== null & novoTexto.trim() !== ""){
            spanTexto.innerHTML = novoTexto
            salvarLista()
        }
    })

    let check = document.createElement("input")
    check.classList.add("marcado")
    check.type = "checkbox"
    check.checked = concluida

    if(concluida){
        spanTexto.style.textDecoration = "line-through"
    }

    check.addEventListener("change", function(){
        if (check.checked){
            spanTexto.style.textDecoration = "line-through"
        } else {
            spanTexto.style.textDecoration = "none"
        }
        salvarLista()
    })

    let remover = document.createElement("button")
    remover.textContent = 'X'
    remover.style.marginLeft = "10px"

    remover.addEventListener("click", function () {
        lista.removeChild(li)
        salvarLista();
        
    })


    li.appendChild(spanTexto)
    li.appendChild(check)
    li.appendChild(remover)
    lista.appendChild(li)

    
}

// botão de salvar tarefas
botao.addEventListener("click", function () {
    let tarefa = input.value.trim()

    if (tarefa == "") {
        alert("Por favor, Digite uma tarefa!!")
        return
    }

    adicionarTarefaNaTela(tarefa)

    salvarLista()


    input.value = ""

})

limpar.addEventListener("click", function () {
    lista.innerHTML = ""
    localStorage.removeItem("tarefas")
})

function salvarLista() {
    let itens = []
    let tarefas = document.querySelectorAll("#lista li")

    tarefas.forEach(function (li) {
        let tarefa = li.querySelector(".tarefa").textContent
        let check = li.querySelector("input[type='checkbox']")

        itens.push({tarefa: tarefa, concluida: check.checked})
    })

    localStorage.setItem("tarefas", JSON.stringify(itens)) //trasnforma em JSON
    contador()
}

function renderizarFiltro(filtro = "todas"){
    lista.innerHTML = ""
    let dados = localStorage.getItem("tarefas")

    if(dados){
        let iten = JSON.parse(dados)

        iten.forEach(function(obj){
            if(filtro == "concluidas" && !obj.concluida) return
            if(filtro == "pendentes" && obj.concluida) return
            adicionarTarefaNaTela(obj.tarefa, obj.concluida)
        })
    }
} 

todas.addEventListener("click", function(){
    renderizarFiltro("todas")
    todas.style.backgroundColor = "red"
    concluidas.style.backgroundColor = "white"
    pendentes.style.backgroundColor = "white"
})

concluidas.addEventListener("click", function(){
    renderizarFiltro("concluidas")
    concluidas.style.backgroundColor = "red"
    todas.style.backgroundColor = "white"
    pendentes.style.backgroundColor = "white"
})

pendentes.addEventListener("click", function(){
    renderizarFiltro("pendentes")
        todas.style.backgroundColor = "white"
    concluidas.style.backgroundColor = "white"
    pendentes.style.backgroundColor = "red"
})

function contador(){
    let dados = localStorage.getItem("tarefas")
    let total = 0 
    let concluida = 0
    let pendente = 0

    if(dados){
        let item = JSON.parse(dados)
        total = item.length
        concluida = item.filter(item => item.concluida).length
        pendente = total - concluida 
    }

    let contador = document.getElementById("contador")
    contador.textContent = `total: ${total} | concluidas: ${concluida} | pendentes: ${pendente}`
}

renderizarFiltro("todas")
contador()

