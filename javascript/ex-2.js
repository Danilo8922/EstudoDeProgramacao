//ex 1

for( let i = 1; i <= 10; i++){
    console.log("numero: " + i)
}

//ex2

let tab = 6

let mult = 0

while(mult <= 10){
    mult1 = tab * mult
    console.log(`${tab}x${mult}=${mult1}`)
    mult = mult + 1 
}

//ex3


function dobro(a){
    return a * 2
}

console.log(dobro(50))


function maiorIdade(a){
    if( a >= 18){
        return "você é maior de idade"
    } else {
        return "você é menor de idade"
    }
}

console.log(maiorIdade(17))