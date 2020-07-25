const cest = require("./scripts/cest/cest");
const data = require("./scripts/data/data");
const fixture = require("./scripts/fixture/fixture");

var bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded());
const port = 3000;

app.get('/', (req, res) => res.sendFile(__dirname+"/index.html"));

app.get('/cest', (req, res) => res.sendFile(__dirname+"/cest.html"));
app.post('/gerar/cest', (req, res) => {
    try {
        var resultado = JSON.parse(req.body.resultado);
        cest.createCest(resultado);
    } catch (error) {
        console.log('error', error);
    }
});

app.get('/data', (req, res) => res.sendFile(__dirname+"/data.html"));
app.post('/gerar/data', (req, res) => {
    try {
        var resultado = JSON.parse(req.body.resultado);
        data.createData(resultado);
    } catch (error) {
        console.log('error', error);
    }
});

app.get('/fixture', (req, res) => res.sendFile(__dirname+"/fixture.html"));
app.post('/gerar/fixture', (req, res) => {
    try {
        var resultado = JSON.parse(req.body.resultado);
        fixture.createFixture(resultado);
    } catch (error) {
        console.log('error', error);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.static(__dirname + "/node_modules/bootstrap/dist/"));
app.use(express.static(__dirname));
app.use('/jquery', express.static(__dirname + "/node_modules/jquery/dist/jquery.min.js"));

/*
const DADOS = [
    {
        CLASSE: "VagaCest",

        CEST: {
            NAMESPACE: "namespace backend\\tests\\functional",
            USE: [
                "use backend\\tests\\FunctionalTester;",
                "use common\\fixtures\\AcvFixture;",
                "use common\\fixtures\\UserFixture;"
            ],
            INDEX: {
                URL: "vaga/index",
                TEXT: "APs",
                ELEMENT: "h1"
            },
            CREATE: {
                URL: "vaga/create",
                ID: 1,
                TEXT: "Cadastrar AP",
                ELEMENT: "h1"
            },
            UPDATE: {
                URL: "vaga/update",
                ID: 1,
                TEXT: "cargo",
                ELEMENT: "Vaga[cargo]"
            },
            DELETE: {
                URL: "vaga/delete",
                ID: 1,
            },
        },
        DATA: {
            VALUES: {
                "a" : 1,
                "b" : 2,
                "c" : 3,
                "d" : 4,
            }
        },
        FIXTURE: {
            DEPENDENCIAS: [
                "Vaga",
                "Cargo",
                "Candidato"
            ]
        }
    }
];
*/
