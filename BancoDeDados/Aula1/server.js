const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname))

const db = new sqlite3.Database("aula1.db")



db.run(`CREATE TABLE IF NOT EXISTS alunos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE)`)

app.get("/", (req, res) => {
    res.send("Servidor rodando")
})   

app.post("/alunos", (req, res) => {
    const {nome, email} = req.body
    db.run(`INSERT INTO alunos (nome, email) VALUES (?, ?)`, [nome, email], function(err){
        if (err){
            res.send({id: this.lastID, nome, email})
        }
    })
})

app.get("/alunos", (req, res) => {
    db.all(`SELECT * FROM alunos`, [], (err, row) => {
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

