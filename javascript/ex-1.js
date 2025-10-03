// variaveis
let nome = "Danilo"
let idade = 17

let nota1 = 3
let nota2 = 4

const media = (nota1 + nota2) / 2


//inicio da lógica

console.log(`olá ${nome} Seja bem vindo!! Sua idade é ${idade} então você é:`)

if(idade >= 18){
    console.log("maior de idade")
} else {
    console.log("menor de idade")
}

console.log(`sua nota de portugues é ${nota1} e sua nota de matemática é ${nota2} a média entre as duas notas é ${media} então você está:`)

if(media > 6){
    console.log("Aprovado")
} else {
    console.log(`reprovado você precisa tirar ${6 - media} para ser aprovado`)
}



// fim da lógica