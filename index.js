"use strict";

window.onload = (event) => {
    console.clear();
    // console.log('evento onload');
    // console.log(console);

    var btnAfiliados = document.getElementById("btnAfiliados");
    btnAfiliados.addEventListener("click", btnAfiliados_click.bind(null, '1', '3'), false);
};

async function btnAfiliados_click(codigo1, codigo2) {
    // async function btnAfiliados_click() {
    // async function btnAfiliados_click(...params) {
    // console.log(params);
    console.log(codigo1, codigo2);

    /*
        {
            "afiliados": [
                {
                    "id": "38",
                    "nome": "PRATICO NFE"
                }
            ]
        }
    */
    let afiliados_json = await (await fetch("https://ger.praticonfe.com.br/gerente/retornaafiliados/")).json();
    // let afiliados_fetch = await fetch("https://ger.praticonfe.com.br/gerente/retornaafiliados/");
    // let afiliados_json = await afiliados_fetch.json();
    let afiliados_array = afiliados_json.afiliados;
    // console.log(afiliados_json);
    // console.log(afiliados_array);

    for (let afiliado of afiliados_array) {
        console.log(afiliado.id, afiliado.nome);
    }
}

async function btnCategorias_click() {
    let categorias_json = await (await fetch("http://nat-23683.nuvem-brasil-10.absamcloud.com:51019/webrunstudio/retornacategorias.rule?sys=VAR",
        // let categorias_json = await (await fetch("http://viacep.com.br/ws/44053240/json/",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )).json();
    // console.log(categorias_json);
    // for (let categoria in categorias_json) {
    //     console.log(categoria, ":", categorias_json[categoria]);
    // }

    for (let categoria of categorias_json) {
        console.log(categoria.codigo_categoria, categoria.descricao);
    }
}

function btnCategoriasJQuery_click() {
    // url: 'http://viacep.com.br/ws/44053240/json/',
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://nat-23683.nuvem-brasil-10.absamcloud.com:51019/webrunstudio/retornacategorias.rule?sys=VAR',
        success: function (categorias_json) {
            for (let categoria of categorias_json) {
                console.log(categoria.codigo_categoria, categoria.descricao);
            }
        }
    });
}

async function btnEndpoint_click() {
    let endpoint_json = await (await fetch("http://nat-23683.nuvem-brasil-10.absamcloud.com:44645/webrunstudio/retornaendpointmerccap.rule?sys=GER",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "usuario": "merccap",
                "senha": "merccap@190697br",
                "cnpj_cpf": "24875237000184"
            })
        }
    )).json();
    // console.log(endpoint_json);
    for (let endpoint in endpoint_json) {
        console.log(endpoint, ":", endpoint_json[endpoint]);
    }
}

function btnEndpointJQuery_click() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: 'http://nat-23683.nuvem-brasil-10.absamcloud.com:44645/webrunstudio/retornaendpointmerccap.rule?sys=GER',
        data: JSON.stringify({
            "usuario": "merccap",
            "senha": "merccap@190697br",
            "cnpj_cpf": "24875237000184"
        }),
        success: function (endpoint_json) {
            for (let endpoint in endpoint_json) {
                console.log(endpoint, ":", endpoint_json[endpoint]);
            }
        }
    });
}
