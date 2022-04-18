

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

        }
        else {
            pessoa.classList.remove("Selecionado");
            pessoa.classList.add("Invisivel");

           Escolhido.nextElementSibling.classList.add("Selecionado");
           Escolhido.nextElementSibling.classList.remove("Invisivel");

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


    let conteudo = document.querySelector(".Conteudo")

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
        if (Mensagem.type === "private_message" && Mensagem.to !== nick) {
            console.log(Mensagem.type)
        }
        else {
            conteudo.innerHTML += `             <div class="Mensagem ${Mensagem.type}">
            <p> (${Mensagem.time}) <strong>${Mensagem.from}</strong> ${Para}  <strong> ${Mensagem.to} </strong> ${Mensagem.text}</p>
        </div>`
        }

        


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



    if (UltimaMensagem.message !== UltimaNaAPI.message || UltimaMensagem.time !== UltimaNaAPI.time ) {
        CarregarMensagens ()
    }

}



function EnviarMensagem() {

    let Textoensagem = document.querySelector("input").value;

    console.log(Textoensagem)

    let Mensagem = {
        from: `${nick}` ,
        text: `${Textoensagem}` ,
        to: `Todos` ,
        type: `message` 

    }

    console.log(Mensagem)
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', Mensagem);

    requisicao.then(processarMensagens)
    requisicao.catch(erroAOenviar)
}


function erroAOenviar () {

    window.location.reload()
}

function QuemEhVoce () {

     nick = prompt("Quem é você ?")
     Logar ();

}

function Logar () {

    const nickname = {name: `${nick}`};
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nickname);
    console.log(promessa)
    promessa.then(setInterval (Manter , 4000));
    promessa.catch(erroAologar)

}

function erroAologar () {

    nick = prompt("Esse nome já esta em uso, tente outro")
     Logar ();
}

function Manter () {

    console.log("entrei em manter")
     const nickname = {name: `${nick}`};
    const response = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nickname); 
    console.log(response)
}