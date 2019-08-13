const fs = require('fs');
var exports = module.exports = {};

// PRIORIDADE 0
/**
 * @param {Object} _
 * 
 * @param {String} _.CLASSE
 * 
 * @param {Object} _.FIXTURE
 * @param {Array}  _.FIXTURE.DEPENDENCIAS
 */
exports.createFixture = function (_) {

    let dependencias = "";

    if (_.FIXTURE.DEPENDENCIAS) {
        dependencias = `
        $this->depends = [
            ${_.FIXTURE.DEPENDENCIAS.map((v, i) => `${(i == 0 ? "" : "\n\t\t\t") + v}Fixture::class`)}
        ];
        `
    }

    if (!fs.existsSync("fixture"))
        fs.mkdirSync('fixture');
    fs.writeFile(`fixture/${_.CLASSE}Fixture.php`, `
<?php
namespace common\\fixtures;
use common\\models\\${_.CLASSE};
use yii\\test\\ActiveFixture;

class ${_.CLASSE}Fixture extends ActiveFixture
{
    public function init()
    {
        $this->modelClass = ${_.CLASSE}::class;
        $this->dataFile = __DIR__ . '/../tests/_data/${_.CLASSE.toLowerCase()}.php';
        ${dependencias}
        parent::init();
    }
}`, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log(`${_.CLASSE}Fixture criado!`);
        });
}



