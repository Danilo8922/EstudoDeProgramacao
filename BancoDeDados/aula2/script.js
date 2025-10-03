let enviar = document.getElementById("enviar")

async function carregarAlunos() {
    const res = await fetch("/alunos")
    const alunos = await res.json()
    
    const lista = document.getElementById("lista")
    lista.innerHTML = ""
    alunos.forEach(aluno => {
        const li = document.createElement("li")
        li.textContent = `Nome: ${aluno.nome} - Portugues: ${aluno.portugues} - Matematica: ${aluno.matematica} - Ingles: ${aluno.ingles} - Historia: ${aluno.historia} - Media: ${aluno.media} Status: ${aluno.status}`
        const btn = document.createElement("button")
        btn.classList.add("deletar")
        btn.textContent = "X"
        btn.style.marginLeft = "10px"
        btn.onclick = async () => {
            await fetch("/alunos/" + aluno.id, { method: "DELETE" })
            carregarAlunos()
        }
        li.appendChild(btn)
        lista.appendChild(li)
    })

}



enviar.onclick = async () => {
    const nome = document.getElementById("nome").value.trim()
    const portugues = document.getElementById("portugues").value.trim()
    const matematica = document.getElementById("matematica").value.trim()
    const ingles = document.getElementById("ingles").value.trim()
    const historia = document.getElementById("historia").value.trim()
    const media = (Number(portugues) + Number(matematica) + Number(ingles) + Number(historia)) / 4
    let status = resultado()

    if (nome == "" && portugues == "" && matematica == "" && ingles == "" && historia == "") {
        alert("Preencha os campos")
        return
    }

    function resultado(status) {
        if (media < 5) {
            return status = "Reprovado"
        } else {
            return status = "Aprovado"
        }
    }

    fetch("/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, portugues, matematica, ingles, historia, media, status })
    })

    document.getElementById("nome").value = ""
    document.getElementById("portugues").value = ""
    document.getElementById("matematica").value = ""
    document.getElementById("ingles").value = ""
    document.getElementById("historia").value = ""

    carregarAlunos()
}

carregarAlunos()
