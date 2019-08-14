const fs = require('fs');
var exports = module.exports = {};

// PRIORIDADE 0

/**
 * @param {Object} _
 * 
 * @param {Object} _.data
 * @param {Object} _.data.classe
 * @param {Object} _.data.values
 */
exports.createData = function (_) {
    if (!fs.existsSync("_data"))
        fs.mkdirSync('_data');
    fs.writeFile(`_data/${_.data.classe}_data.php`, `
<?php
return[
    [
        ${
        Object.keys(_.data.values).map(function (v) {
            let val = _.data.values[v];
            return `'${val.key}' => '${val.value}'`;
        }).join(",\n\t\t")
        }
    ]
];`, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log(`${_.data.classe}_data criado!`);
        });
}



