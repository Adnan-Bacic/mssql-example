require('./db');
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const path = require("path");
const mssql = require('mssql');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())


app.listen(3000);

app.use(express.static(path.join(__dirname, 'app')));


app.get("/getAllNotes", async (req, res) => {
    res.json(await getDataNotesDB())
});

async function getDataNotesDB() {
    try {
        const result = (await mssql.query `select * from dbo.note order by id desc`).recordset
        return result
    } catch (err) {
        console.log(err);
    }
}

app.post("/savenote", async (req, res) => {
    let title = req.body.title;
    let text = req.body.text;
    saveNoteDB(title, text)

    res.json(
        {"WhatTheFuck": "I am the reponse of the savenote request"}
    )
});


async function saveNoteDB(title, text) {
    try {
        const result = (await mssql.query `INSERT INTO dbo.note (note_title, note_text)
        VALUES (${title}, ${text});`).recordset
    } catch (err) {
        console.log(err);
    }
}

