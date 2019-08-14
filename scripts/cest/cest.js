const fs = require('fs');
var exports = module.exports = {};

// PRIORIDADE 1

/**
 * @param {Object} _
 * 
 * @param {Object} _.cest
 * 
 * @param {String} _.cest.classe
 * @param {String} _.cest.namespace
 * @param {Object} _.cest.fixture
 * 
 * @param {Object} _.cest.methods
 * 
 * @param {Object} _.cest.methods
 * 
 */
exports.createCest = function (_) {
    console.log(_);
    console.log('\n\n');
    if(!fs.existsSync("functional"))
        fs.mkdirSync('functional');
    fs.writeFile(`functional/${_.cest.classe}.php`, `

<?php
namespace ${_.cest.namespace};

use frontend\\tests\\FunctionalTester;
${Object.keys(_.cest.fixture).map(function(v, i) {
    let fixture = _.cest.fixture[v];
    return `use common\\fixtures\\${fixture}Fixture;`
}).join("\n")}
use Yii;

class ${_.cest.classe}
{
    /**
     * Load fixtures before db transaction begin
     * Called in _before()
     * @return array
     * @see \\Codeception\\Module\\Yii2::loadFixtures()
     * @see \\Codeception\\Module\\Yii2::_before()
     */
    public function _fixtures()
    {
        return [
            ${Object.keys(_.cest.fixture).map(function(v, i) {
                let fixture = _.cest.fixture[v];
                return `'${fixture.replace(/([A-Z])/g, '_$1').replace('_', '').toLowerCase()}' => ['class' => ${fixture}Fixture::class]`;
            }).join(",\n\t\t\t")}
        ];
    }

    ${Object.keys(_.cest.methods).map(function(key, index) {
        let m = _.cest.methods[key];

        let nome = m.nome;
        delete m.nome;

        return `
    /**
     * @param FunctionalTester $I
     */
    public function ${nome}(FunctionalTester $I)
    {
        ${Object.keys(m).map(function (key, index) {
            return Object.keys(m[key]).map(function (k, i) {
                let valor = m[key][k];
                if(!/\[.+\]/.test(valor)) {
                    valor = `"${valor}"`;
                }
                return `$I->${key}(${valor});`;
            }).join('\n\t\t')
        }).join('\n\t\t')}
    }`;
      }).join('\n')}
}

`, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log(`${_.cest.classe}Cest criado!`);
        });
}