const fs = require('fs');
var exports = module.exports = {};

// PRIORIDADE 0

/**
 * @param {Object} _
 * 
 * @param {String} _.CLASSE
 * 
 * @param {Object} _.DATA
 * @param {Object} _.DATA.VALUES
 */
exports.createData = function (_) {

    if (!fs.existsSync("_data"))
        fs.mkdirSync('_data');
    fs.writeFile(`_data/${_.CLASSE}Fixture.php`, `
<?php
return[
    [
        ${
        Object.entries(_.DATA.VALUES).map(function (v) {
            return `'${v[0]}' => '${v[1]}'`;
        }).join(",\n\t\t")
        }
    ]
];`, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log(`${_.CLASSE}Fixture criado!`);
        });
}



