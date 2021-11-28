const listaPratos = [
    {
        id: 0,
        nome: "Combo hamburguer + batata frita 1",
        descricao: "Hamburguer com batata frita",
        preco: 21.15,
        categoria: "destaques",
        imagem: "./assets/img/produto.png"
    },
    {
        id: 1,
        nome: "Delicioso Açai Tradicional",
        descricao: "Hamburguer com batata frita",
        preco: 13.25,
        categoria: "destaques",
        imagem: "./assets/img/acai.png"
    },
    {
        id: 2,
        nome: "Pizza Mussarela e Calabresa",
        descricao: "Hamburguer com batata frita",
        preco: 37.90,
        categoria: "destaques",
        imagem: "./assets/img/pizza.png"
    },
    {
        id: 3,
        nome: "Brownie de chocolate 1",
        descricao: "O clássico brownie para quem ama um docinho de sobremesa.",
        preco:  15.90,
        categoria: "sobremesas",
        imagem: "./assets/img/sobremesa.png"
    },
    {
        id: 4,
        nome: "Brownie de chocolate 2",
        descricao: "O clássico brownie para quem ama um docinho de sobremesa.",
        preco: 45.90,
        categoria: "sobremesas",
        imagem: "./assets/img/sobremesa.png"
    },
    {
        id: 5,
        nome: "Brownie de chocolate 3",
        descricao: "O clássico brownie para quem ama um docinho de sobremesa.",
        preco: 70.90,
        categoria: "sobremesas",
        imagem: "./assets/img/sobremesa.png"
    }
];


let listaDestaque = document.querySelector(".secaoPratosDestaque_listaPratos")
let listaSobremesas = document.querySelector(".secaoSobremesas_listaSobremesas")
let listaCarrinho = document.querySelector(".secaoCarrinho_listaItens")

const containerTotal = document.querySelector(".secaoCarrinho_total > span")

//FUNÇÃO QUE MONTA OS PRATOS DESTAQUES
function construirLayoutPratos(ulContainer, prato, classePrato){ 
        //RECEBER O PRATO
        //MONTAR AS TAGS HTML
        //ADICIONAR AS INFORMAÇÕES NAS TAGS
        //PRECISO DE UMA REFERÊNCIA DE ONDE VOU COLOCAR ESSE PRATO
        //JOGAR NA TELA O TEMPLATE MONTADO

        // console.log(prato)

        //CRIANDO AS TAGS
        let li = document.createElement("li");
        let a = document.createElement("a");
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        img.src = prato.imagem;
        img.alt = prato.nome
        let figcaption = document.createElement("figcaption");
        figcaption.innerText = prato.nome;
        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        h3.innerText = prato.nome;
        let p = document.createElement("p");
        p.innerText = prato.descricao;
        let span = document.createElement("span");
        span.innerText = prato.preco.toFixed(2);

        li.dataset.id = prato.id;

        //ADICIONANDO CLASS NAS TAGS

        
        div.classList.add("secaoPratoDestaque_descricaoDestaques")
        li.classList.add(classePrato)
        figure.classList.add("secaoPratosDestaque_imagemPrato")
        h3.classList.add("secaoPratoDestaque_nomePrato")
        span.classList.add("secaoPratoDestaque_precoPrato")
        
        
        //MONTANDO A IMAGEM
        li.appendChild(a)
        a.appendChild(figure)
        a.appendChild(div)
        figure.appendChild(img)
        figure.appendChild(figcaption)

        div.appendChild(h3)

        if(prato.categoria === "sobremesas"){
            div.appendChild(p)
        }
        div.appendChild(span)

        ulContainer.appendChild(li)
        li.addEventListener("click", adicionarNoCarrinho)
}

for (let cont = 0; cont < listaPratos.length; cont++){
    let prato = listaPratos[cont]

    if(prato.categoria === "destaques"){
    construirLayoutPratos (listaDestaque, prato, "secaoPratosDestaque_itemPrato")
    }else {
    construirLayoutPratos (listaSobremesas, prato, "secaoSobremesas_itemSobremesas")
    }
}

function construirLayoutCarrinho(prato) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const button = document.createElement("button");


    li.appendChild(div)
    li.appendChild(button)
    div.appendChild(h3)
    div.appendChild(span)
    
    h3.innerText = prato.nome;
    span.innerText = prato.preco.toFixed(2);
    button.innerText = "Remover";

    li.classList.add("secaoCarrinho_item");
    div.classList.add("secaoCarrinho_itemDescricao")
    button.classList.add("secaoCarrinho_botaoRemover")

    listaCarrinho.appendChild(li);
    
    button.addEventListener("click", removerDoCarrinho)
}


function adicionarNoCarrinho(evento) {
    // passo 1 - capturar prato clicado
        // - capturar id do prato clicado
    // passo 2 - adicionar no carrinho
    
    const elementoClicado = evento.currentTarget;
    const idElementoClicado = elementoClicado.dataset.id;

    const pratoSelecionado = listaPratos[idElementoClicado];

    construirLayoutCarrinho(pratoSelecionado);
    atualizarTotal()
}

function removerDoCarrinho(evento) {
    const elementoClicado = evento.currentTarget;
    const elementoPai = elementoClicado.parentElement;

    elementoPai.remove();
    atualizarTotal();
}

function atualizarTotal() {
    const listaPrecos = document.querySelectorAll(".secaoCarrinho_item > div > span");

    let total = 0;

    for(let contador = 0; contador < listaPrecos.length; contador++) {
    const elementoSpan = listaPrecos[contador];
    const precoNumero = Number(elementoSpan.innerText)
    total += precoNumero;
    }
    
    total = total.toFixed(2);
    var valorFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    containerTotal.innerText = total;
}


alert('O valor formatado de ' + valor + ' é ' + valorFormatado);





