const cest = require("./scripts/cest/cest");
const data = require("./scripts/data/data");
const fixture = require("./scripts/fixture/fixture");

const express = require('express');
const app = express();
const port = 3000

app.get('/', (req, res) => res.sendFile(__dirname+"/index.html"));
app.get('/cest', (req, res) => res.sendFile(__dirname+"/cest.html"));
app.get('/data', (req, res) => res.sendFile(__dirname+"/data.html"));
app.get('/fixture', (req, res) => res.sendFile(__dirname+"/fixture.html"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.static(__dirname + "/node_modules/bootstrap/dist/"));
app.use(express.static(__dirname));
app.use('/jquery', express.static(__dirname + "/node_modules/jquery/dist/jquery.min.js"));

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

for (let d of DADOS) {
    return;
    cest.createCest(d);
    data.createData(d);
    fixture.createFixture(d);
}