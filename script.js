

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

    console.log(Escolhido.nextElementSibling)
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
CarregarParticipantesAtivos ()

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
        if (Mensagem.type === "private_message" && Mensagem.to !== nick &&  Mensagem.to !== "Todos" && Mensagem.from !== nick) {
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

    let para = document.querySelector(".Pessoa > .Selecionado").parentElement;
    para = para.firstElementChild.lastElementChild.innerHTML

    let tipo = document.querySelector(".Visibilidade > .Selecionado").parentElement;
    tipo = tipo.firstElementChild.lastElementChild.innerHTML


    if (tipo === "Público") {

        tipo = "message"
    }
    else  {
        tipo = "private_message"
    }
    
    let Mensagem = {
        from: `${nick}` ,
        text: `${Textoensagem}` ,
        to: `${para}` ,
        type: `${tipo}` 

    }

  
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
    promessa.then(setInterval (Manter , 4000));
    promessa.catch(erroAologar)

}

function erroAologar () {

    nick = prompt("Esse nome já esta em uso, tente outro")
     Logar ();
}

function Manter () {

    const nickname = {name: `${nick}`};
    const response = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nickname); 

    CarregarParticipantesAtivos ()
}


function CarregarParticipantesAtivos () {

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(processarParticipantesAtivos);
}

function processarParticipantesAtivos (response) {

    let PessoaS = document.querySelector(".Pessoas")

    PessoaS.innerHTML = `<div class="Pessoa">
    <div onclick="SelecionarPessoas (this)" class="Flex">
        <ion-icon name="people-outline"></ion-icon>
        <h4>Todos</h4>
    </div> 
    <ion-icon class="Green Selecionado" name="checkmark-outline"></ion-icon>
</div> `


    for ( let i = 0; i < 12; i++){   // Carregar muitas pessoas buga meu layout
        
        let Pessoa = response.data [i]

        console.log(Pessoa.name)

        PessoaS.innerHTML += `<div class="Pessoa">
            <div onclick="SelecionarPessoas (this)" class="Flex">
            <ion-icon name="person-circle-outline"></ion-icon>
                <h4>${Pessoa.name}</h4>
            </div><ion-icon class="Green Invisivel" name="checkmark-outline"></ion-icon>
            </div> `
        }

}