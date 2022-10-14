"use strict";

window.onload = (event) => {
    console.clear();
    // console.log('evento onload');
    // console.log(console);

    exibe_oculta_imagem()

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

function imgUpload_change() {
    let imgUpload = document.getElementById("imgUpload");
    let imgPreview = document.getElementById("imgPreview");
    let arquivo_json = imgUpload.files[0];
    if (arquivo_json === undefined) {
        imgPreview.src = ""
    } else {
        imgPreview.src = URL.createObjectURL(arquivo_json)
    }
    exibe_oculta_imagem();
}

function btnGravar_click() {
    let imgUpload = document.getElementById("imgUpload");
    let imgPreview = document.getElementById("imgPreview");
    let arquivo_json = imgUpload.files[0];
    if (arquivo_json === undefined) {
        imgPreview.src = ""
        alert("Selecione um arquivo primeiro.");
        return;
    }
    console.log(arquivo_json);
    for (let arquivo in arquivo_json) {
        console.log(arquivo, ":", arquivo_json[arquivo]);
    }
}

function exibe_oculta_imagem() {
    let divPreview = document.getElementById("divPreview");
    let imgUpload = document.getElementById("imgUpload");
    let arquivo_json = imgUpload.files[0];
    if (arquivo_json === undefined) {
        divPreview.style.display = 'none';
    } else {
        divPreview.style.display = 'flex';
    }
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function btnEnviaArquivo() {
    let edtUrl_envio = document.getElementById("edtUrl_envio");
    let imgUpload = document.getElementById("imgUpload");
    let arquivo_json = imgUpload.files[0];
    if (arquivo_json !== undefined) {
        let arquivo_b64 = await toBase64(arquivo_json);
        console.log(arquivo_b64);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            url: edtUrl_envio.value,
            data: JSON.stringify({
                "imagem": arquivo_b64
            }),
            success: function (endpoint_json) {
                console.log("Retornou...");
                console.log(endpoint_json);
            }
        });
    }
}