const fs = require('fs');
var exports = module.exports = {};

// PRIORIDADE 0
/**
 * @param {Object} _
 * 
 * @param {String} _.fixture
 * 
 * @param {String} _.fixture.classe
 * @param {Object}  _.fixture.dependence
 */
exports.createFixture = function (_) {
    console.log(_);

    let dependencias = "";

    if (_.fixture.dependence) {
        dependencias = `
        $this->depends = [
            ${Object.keys(_.fixture.dependence).map((v, i) => {
                let d = _.fixture.dependence[v];
                return `${d}Fixture::class`
            }).join(',\n\t\t\t')}
        ];
        `
    }

    if (!fs.existsSync("fixture"))
        fs.mkdirSync('fixture');
    fs.writeFile(`fixture/${_.fixture.classe}Fixture.php`, `
<?php
namespace common\\fixtures;
use common\\models\\${_.fixture.classe};
use yii\\test\\ActiveFixture;

class ${_.fixture.classe}Fixture extends ActiveFixture
{
    public function init()
    {
        $this->modelClass = ${_.fixture.classe}::class;
        $this->dataFile = __DIR__ . '/../tests/_data/${_.fixture.classe.toLowerCase()}.php';
        ${dependencias}
        parent::init();
    }
}`, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log(`${_.fixture.classe}Fixture criado!`);
        });
}



