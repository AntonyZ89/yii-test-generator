$('form').submit(function () {

    let serialize = $(this).serializeArray();

    let gerar = serialize[0].name.replace(/\[.+]/g, "");

    let resultado = {};

    resultado[gerar] = {};

    for (let i of serialize) {
        let name = i.name.replace(gerar, "");
        let keys = obterAgrupados(name);

        let k_anterior = resultado[gerar];

        for (let k = 0; k < keys.length; k++) {
            let v = keys[k];

            if (k === keys.length - 1) {
                k_anterior[v] = i.value;
            } else {
                if(!k_anterior[v])
                    k_anterior[v] = {};
                k_anterior = k_anterior[v];
            }
        }
    }

    console.log(resultado);

    resultado = JSON.stringify(resultado);
    $.ajax({
        type: "post",
        url: "/gerar"+location.pathname,
        data: {resultado},
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });

    return false;
});

function obterAgrupados(txt) {
    const a = [], r = [];
    for (let i = 0; i < txt.length; i++) {
        if (txt.charAt(i) === '[') {
            a.push(i);
        }
        if (txt.charAt(i) === ']') {
            r.push(txt.substring(a.pop() + 1, i));
        }
    }
    return r;
}
