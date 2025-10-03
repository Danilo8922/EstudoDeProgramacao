let nome = document.getElementById("nome")
let nota = document.getElementById("nota")
let enviar = document.getElementById("enviar")
let lista = document.getElementById("lista")
let listaAlunos = []


window.onload = function() {
    const savedAlunos = localStorage.getItem("listaAlunos");
    const savedNomes = localStorage.getItem("listaNomes");
    if (savedAlunos && savedNomes) {
        listaAlunos = JSON.parse(savedAlunos);
        listaNomes = JSON.parse(savedNomes);
        listaAlunos.forEach((notaAluno, index) => {
            let li = document.createElement("li");
            li.textContent = `Nome: ${listaNomes[index] || "Aluno"} - Nota: ${notaAluno}`;

            // Cria o botão Remover para cada item carregado
            let remover = document.createElement("button");
            remover.textContent = "Remover";
            remover.style.marginLeft = "10px";
            remover.addEventListener("click", function() {
                const idx = Array.from(lista.children).indexOf(li);
                if (idx > -1) {
                    listaAlunos.splice(idx, 1);
                    listaNomes.splice(idx, 1);
                    lista.removeChild(li);
                    salvarNoLocalStorage();
                    resultado.textContent = `A média da turma é: ${calcularMedia().toFixed(2)}`;
                }
            });

            li.appendChild(remover);
            lista.appendChild(li);
        });
        resultado = document.getElementById("resultado");
        resultado.textContent = `A média da turma é: ${calcularMedia().toFixed(2)}`;
    }
};

let listaNomes = JSON.parse(localStorage.getItem("listaNomes")) || [];

function salvarNoLocalStorage() {
    localStorage.setItem("listaAlunos", JSON.stringify(listaAlunos));
    localStorage.setItem("listaNomes", JSON.stringify(listaNomes));
}

enviar.addEventListener("click", function() {
    let notaAluno = nota.value;
    let nomeAluno = nome.value;

    if(nomeAluno !== "" && notaAluno !== ""){
        adicionarNota(nomeAluno, notaAluno);
        let li = document.createElement("li"); 
        let remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.style.marginLeft = "10px";
        remover.addEventListener("click", function() {
            const index = Array.from(lista.children).indexOf(li);
            if (index > -1) {
                listaAlunos.splice(index, 1);
                listaNomes.splice(index, 1);
                lista.removeChild(li);
                salvarNoLocalStorage();
                resultado.textContent = `A média da turma é: ${calcularMedia().toFixed(2)}`;
            }
        });
        li.textContent = `Nome: ${nomeAluno} - Nota: ${notaAluno}`;
        li.appendChild(remover);
        lista.appendChild(li);

        resultado = document.getElementById("resultado");
        resultado.textContent = `A média da turma é: ${calcularMedia().toFixed(2)}`;

        nome.value = "";
        nota.value = "";

        salvarNoLocalStorage();
    }
    else {
        alert("Por favor, preencha ambos os campos: nome e nota.");
        return
    }   
});

function adicionarNota(nomeAluno, notaAluno) {
    const valorNota = parseFloat(notaAluno);
    if (!isNaN(valorNota)) {
        listaAlunos.push(valorNota);
        listaNomes.push(nomeAluno);
    }
}

function calcularMedia() {
    if (listaAlunos.length === 0) return 0;
    const soma = listaAlunos.reduce((acc, curr) => acc + curr, 0);
    return soma / listaAlunos.length;
}