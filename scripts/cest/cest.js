const fs = require('fs');
var exports = module.exports = {};

// PRIORIDADE 1

/**
 * @param {Object} _
 * 
 * @param {String} _.CLASSE
 * 
 * @param {Object} _.CEST
 * 
 * @param {String} _.CEST.NAMESPACE
 * @param {Array}  _.CEST.USE
 * 
 * @param {Object} _.CEST.INDEX
 * @param {Object} _.CEST.INDEX.URL
 * @param {Object} _.CEST.INDEX.TEXT
 * @param {Object} _.CEST.INDEX.ELEMENT
 * 
 * @param {Object} _.CEST.CREATE
 * @param {String} _.CEST.CREATE.URL
 * @param {Number} _.CEST.CREATE.ID
 * @param {String} _.CEST.CREATE.TEXT
 * @param {String} _.CEST.CREATE.ELEMENT
 * 
 * @param {Object} _.CEST.UPDATE
 * @param {String} _.CEST.UPDATE.URL
 * @param {Number} _.CEST.UPDATE.ID
 * @param {String} _.CEST.UPDATE.TEXT
 * @param {String} _.CEST.UPDATE.ELEMENT
 * 
 * @param {Object} _.CEST.DELETE
 * @param {String} _.CEST.DELETE.URL
 * @param {Number} _.CEST.DELETE.ID
 */
exports.createCest = function (_) {

    if(!fs.existsSync("functional"))
        fs.mkdirSync('functional');
    fs.writeFile(`functional/${_.CLASSE}.php`, `

<?php
${_.CEST.NAMESPACE};

${_.CEST.USE.join("\n")}

class ${_.CLASSE}
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
            'acv' => [
                'class' => AcvFixture::class,
            ],
            'user' => [
                'class' => UserFixture::class,
            ],
        ];
    }

    /**
     * @param FunctionalTester $I
     */
    public function visitIndex(FunctionalTester $I)
    {
        $I->amLoggedInAs(1);
        $I->amOnPage(['${_.CEST.INDEX.URL}']);
        $I->see('${_.CEST.INDEX.TEXT}', '${_.CEST.INDEX.ELEMENT}');
    }

    public function visitCreate(FunctionalTester $I)
    {
        $I->amLoggedInAs(1);
        $I->amOnPage(['${_.CEST.CREATE.URL}', 'id' => ${_.CEST.CREATE.ID}]);
        $I->see('${_.CEST.CREATE.TEXT}', '${_.CEST.CREATE.ELEMENT}');
    }

    public function visitUpdate(FunctionalTester $I)
    {
        $I->amLoggedInAs(1);
        $I->amOnPage(['${_.CEST.UPDATE.URL}', 'id' => ${_.CEST.UPDATE.ID}]);
        //$I->see('${_.CEST.UPDATE.TEXT}', '${_.CEST.UPDATE.ELEMENT}');
        $I->seeInField('${_.CEST.UPDATE.ELEMENT}', '${_.CEST.UPDATE.TEXT}');
    }

    public function visitDelete(FunctionalTester $I)
    {
        $I->amLoggedInAs(1);
        $I->sendAjaxPostRequest(['${_.CEST.DELETE.URL}', 'id' => ${_.CEST.DELETE.ID}]);
    }
}

`, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log(`${_.CLASSE}Cest criado!`);
        });
}