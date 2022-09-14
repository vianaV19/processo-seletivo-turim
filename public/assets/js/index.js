//array dos dados json pessoas
let json = {
    pessoas: []
}

//array de elementos html pessoas
let pessoas = [] 

//get pessoas-list element
let listPessoas = $("#pessoas-list")

$('#json').val(JSON.stringify(json, undefined, 4))

//inclui uma pessoa - evento do botão 
function incluirPessoa() {
    let nome = $("#nome").val();

    json.pessoas.push({
        nome: nome,
        filhos: []
    })

    adicionarPessoa(nome);

    atualizarListPessoas();


    $('#json').val(JSON.stringify(json, undefined, 4))

    $("#nome").val('');
}

//inlcui um filho - evento do botao
function incluirFilho(parent) {

    let pessoa = $(parent).parents('.pessoa');

    let id = $(pessoa).attr('id')

    let nome = prompt('Informe o nome');

    json.pessoas[id].filhos.push(nome)

    adicionaFilho(id, nome)

    $('#json').val(JSON.stringify(json, undefined, 4))
}

//remove um filho
function removerFilho(parent) {
    let filho = $(parent).parents("tr")
    let pessoa = $(parent).parents(".pessoa")
    let idFilho = $(filho).attr('id')
    let idPessoa = $(pessoa).attr('id')

    json.pessoas[idPessoa].filhos.splice(idFilho, 1)

    $('#json').val(JSON.stringify(json, undefined, 4))

    $(filho).remove()
}

//remove uma pessoa
function removerPessoa(parent) {

    let pessoa = $(parent).parents(".pessoa")

    let id = $(pessoa).attr('id')

    pessoas.splice(id, 1);

    json.pessoas.splice(id, 1)

    atualizarListPessoas();

    $('#json').val(JSON.stringify(json, undefined, 4))
}

//grava no BD
function gravar() {
    let xhr = new XMLHttpRequest();
    let url = "/gravar";

    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            alert('Success')

        }
    };

    // Converting JSON data to string
    var data = JSON.stringify(json);

    // Sending data with the request
    xhr.send(data);
}

//Ler as pessoas do BD
function ler() {
    let xhr = new XMLHttpRequest();
    let url = "/ler";

    // open a connection
    xhr.open("GET", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            let jsonResp = JSON.parse(this.responseText);

            json.pessoas = []

            pessoas =  []

            jsonResp.forEach((e, i) => {
                json.pessoas.push({
                    nome: e.nome,
                    filhos: e.filhos
                })

                pessoas.push({
                    pessoa: criarPessoa(e.nome)
                })

                pessoas[i].filhos = []

                if (e.filhos.length > 0) {
                    e.filhos.forEach((f) => {

                        console.log(f)
                        pessoas[i].filhos.push(criarFilho(f))
                    })
                }

            })

            atualizarListPessoas();

            $('#json').val(JSON.stringify(json, undefined, 4))

        }

    };

    // Converting JSON data to string
    var data = JSON.stringify(json);

    // Sending data with the request
    xhr.send(data);
}

//Adiciona uma pessoa
function adicionarPessoa(nome) {
    pessoas.push({
        pessoa: criarPessoa(nome),
        filhos: []
    })

    atualizarListPessoas();
}

//adiciona um filho
function adicionaFilho(id, nome) {

    pessoas[id].filhos.push(criarFilho(nome))

    atualizarListPessoas();
}

//Cria o elemento pessoa
function criarPessoa(nome) {
    let element = document.createElement("div")
    element.classList.add('pessoa')

    //Pessoa html element
    $(element).append(`<table>
    <tr>
    <th>${nome}</th>
    <th>
    <button onclick="removerPessoa(this)">Remover</button>
    </th>
    </tr>
    </table>

    <button class="incluirFilhoBtn" onclick="incluirFilho(this)">Adicionar Filho</button>
   
    `)

    return element;
}

//Cria o elemento filho
function criarFilho(nome) {

    let element = document.createElement('tr');
    element.classList.add('filho');

    $(element).append(`
    <td>-${nome}</td>
    <td>
        <button onclick="removerFilho(this)">Remover filho</button>
    </td>`)

    return element;
}

//atualiza a lista de pessoas e filhos
function atualizarListPessoas() {
    $(listPessoas).empty();

    pessoas.forEach((e, i) => {
        e.pessoa.id = i;
        $(listPessoas).append(e.pessoa);

        if (e.filhos.length > 0) {

            e.filhos.forEach((f, i) => {
                f.id = i
                $(e.pessoa).find('table').append(f)
            })
        }
    })

}
