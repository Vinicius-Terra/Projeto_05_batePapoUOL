

let UltimaMensagem = {}
let nick = ""


function Menu() {

    document.querySelector(".overlay").classList.remove("Invisivel");
    document.querySelector(".Menu").classList.remove("Invisivel");

}

function SairMenu() {

    document.querySelector(".overlay").classList.add("Invisivel");
    document.querySelector(".Menu").classList.add("Invisivel");

}

function SelecionarPessoas (Escolhido)  {

    const pessoa = document.querySelector(".Pessoa > .Selecionado");
        if (pessoa === null) {
            Escolhido.nextElementSibling.classList.add("Selecionado");
            Escolhido.nextElementSibling.classList.remove("Invisivel");
            console.log("Escolhido")
        }
        else {
            pessoa.classList.remove("Selecionado");
            pessoa.classList.add("Invisivel");

           Escolhido.nextElementSibling.classList.add("Selecionado");
           Escolhido.nextElementSibling.classList.remove("Invisivel");
            console.log(Escolhido.nextElementSibling)
        }
}

function SelecionarVisibilidade (Escolhido)  {

    const pessoa = document.querySelector(".Visibilidade > .Selecionado");
        if (pessoa === null) {
            Escolhido.nextElementSibling.classList.add("Selecionado");
            Escolhido.nextElementSibling.classList.remove("Invisivel");
        }
        else {
            pessoa.classList.remove("Selecionado");
            pessoa.classList.add("Invisivel");

           Escolhido.nextElementSibling.classList.add("Selecionado");
           Escolhido.nextElementSibling.classList.remove("Invisivel");
        }
}

QuemEhVoce ();
CarregarMensagens ();

function CarregarMensagens () {

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(processarMensagens);
}

function processarMensagens (response) {
    console.log(response.data);

    let conteudo = document.querySelector(".Conteudo")
    console.log(response.data.length);
    conteudo.innerHTML = ""



    for ( let i = 0; i < response.data.length; i++){
        
        let Mensagem = response.data [i]
        let Para = ""

        if (Mensagem.type === "status") {
            Mensagem.to = ""
        }
        else {
           Para = "Para"
        }

        conteudo.innerHTML += `             <div class="Mensagem ${Mensagem.type}">
        <p> (${Mensagem.time}) <strong>${Mensagem.from}</strong> ${Para}  <strong> ${Mensagem.to} </strong> ${Mensagem.text}</p>
    </div>`


    }

    let descer = conteudo.lastChild
    descer.scrollIntoView(false);
    UltimaMensagem = response.data [response.data.length-1]
}

setInterval( function CarregarAxios() {
    const  promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(Atualizar);
}, 2000);

function Atualizar (response) {
    
    let UltimaNaAPI = response.data [response.data.length-1]

    console.log(UltimaMensagem)
    console.log(UltimaNaAPI)

    if (UltimaMensagem.message !== UltimaNaAPI.message || UltimaMensagem.time !== UltimaNaAPI.time ) {
        CarregarMensagens ()
    }

}



function EnviarMensagem() {

    let Textoensagem = document.querySelector("input").innerHTML

    let Mensagem = {
        from: ` ${nick}` ,
        text: ` ${Textoensagem}` ,
        to: ` Todos` ,
        type: ` message` 

    }

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', Mensagem);

}

function QuemEhVoce () {

     nick = prompt("Quem é você ?")
     LogarEManter ();

}

function LogarEManter () {

    const nickname = {name: ` ${nick}`};
    console.log(nickname)
    const response = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nickname);
    console.log(response)
}

setInterval(LogarEManter () , 3000);  
