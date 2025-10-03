const express = require("express")
const sqlite3 = require("sqlite3")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname))

const db = new sqlite3.Database("aula2.db")

db.run(`CREATE TABLE IF NOT EXISTS alunos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    portugues INT,
    matematica INT,
    ingles INT,
    historia INT,
    media INT,
    status TEXT)`)

app.get("/", (req, res) => {
    res.send("Servidor rodando")
})  

app.post("/alunos", (req, res) =>{
    const {nome, portugues, matematica, ingles, historia, media, status} = req.body
    db.run(`
        INSERT INTO alunos (nome, portugues, matematica, ingles, historia, media, status) VALUES (?, ?, ?, ?, ?, ?, ?)`, [nome, portugues, matematica, ingles, historia, media, status], function(err){
            if(err){
                res.send({id: this.lastID, nome, portugues, matematica, ingles, historia, media, status})
            }
        })
})

app.get("/alunos", (req, res) => {
    db.all(`SELECT * FROM alunos`, [], function(err, row){
        if(err) return res.status(500).send(err.message)
        res.send(row) 
    })
})

app.delete("/alunos/:id", (req, res) => {
    db.run(`DELETE FROM alunos WHERE id = ?`, [req.params.id], function(err){
        if (err) return res.status(500).send(err.message)
        res.send({message: "Aluno deletado com sucesso!"})    
    })
})

app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})