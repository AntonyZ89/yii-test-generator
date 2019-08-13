$('form').submit(function () {

    let serialize = $(this).serializeArray();

    let gerar = serialize[0].name.replace(/\[.+\]/g, "");

    let resultado = {};

    resultado[gerar] = {};

    for (let i of serialize) {
        console.log(i);
        let externo = i.name.indexOf(gerar) === -1;

        let name = i.name.replace(gerar, "");
        let keys = obterAgrupados(name);

        let k_anterior = resultado[gerar];

        console.log("----------------------------------------");
        console.log("k_anterior = "+k_anterior);

        for (let k = 0; k < keys.length; k++) {
            let v = keys[k];
            console.log("v: "+v);
            console.log("k2: "+k_anterior);

            if (k === keys.length - 1) {
                console.log(k_anterior);
                if(/\d+/.test(v)) {
                    console.log("::: "+k_anterior);
                    k_anterior = [];
                    k_anterior[v] = i.value;
                    break;
                } else {
                    k_anterior[v] = i.value;
                }
            } else if (k_anterior) {
                // k_anterior[v];
                k_anterior[v] = {};
                k_anterior = k_anterior[v];
            } else {
                resultado[v] = {};
                k_anterior = resultado[v];
            }
        }
    }

    console.log(resultado);
    return false;
});

function obterAgrupados(txt) {
    var a = [], r = [];
    for (var i = 0; i < txt.length; i++) {
        if (txt.charAt(i) == '[') {
            a.push(i);
        }
        if (txt.charAt(i) == ']') {
            r.push(txt.substring(a.pop() + 1, i));
        }
    }
    return r;
}