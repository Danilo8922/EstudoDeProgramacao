async function carregarAlunos() {
    const res = await fetch("/alunos")
    const alunos = await res.json()
    const lista = document.getElementById("lista")
    lista.innerHTML = ""
    alunos.forEach(aluno => {
        const li = document.createElement("li")
        li.textContent = `${aluno.nome} - ${aluno.email}`
        const btn = document.createElement("button")
        btn.textContent = "X"
        btn.style.marginLeft = "10px"
        btn.onclick = async () => {
            await fetch("/alunos/" + aluno.id, {method: "DELETE"})
            carregarAlunos()
        }
        li.appendChild(btn)
        lista.appendChild(li)
    })
}

let cadastrar = document.getElementById("cadastrar")

cadastrar.onclick = async () => {
    const nome = document.getElementById("nome").value.trim()
    const email = document.getElementById("email").value.trim()

    if(nome == "" && email == ""){
        alert("Preencha os campos")
        return
    }

    await fetch("/alunos",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({nome, email})
    })
    document.getElementById("nome").value = ""
    document.getElementById("email").value = ""
    carregarAlunos()
}

carregarAlunos()