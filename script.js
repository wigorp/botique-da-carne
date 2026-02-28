const numero="5562992819373";

const categoriasDiv=document.getElementById("categorias");
const produtosDiv=document.getElementById("produtos");
const itensDiv=document.getElementById("itens");
const totalDiv=document.getElementById("total");
const bairro=document.getElementById("bairro");

const nome=document.getElementById("nome");
const telefone=document.getElementById("telefone");
const endereco=document.getElementById("endereco");

let carrinho={};
let categoriaAtual="";

/* PRODUTOS */

const produtos=[
{cat:"Bovinos",nome:"Contra Filé",preco:60,img:"img/logo.png"},
{cat:"Bovinos",nome:"Picanha",preco:90,img:"img/logo.png"},
{cat:"Frango",nome:"Frango Bacon",preco:50,img:"img/logo.png"}
];

/* CATEGORIAS */

const categorias=[...new Set(produtos.map(p=>p.cat))];

categorias.forEach(cat=>{
categoriasDiv.innerHTML+=`
<button onclick="mostrar('${cat}')">
${cat}
</button>
`;
});

/* MOSTRAR */

function mostrar(cat){

categoriaAtual=cat;
produtosDiv.innerHTML="";

produtos.forEach((p,i)=>{

if(p.cat!==cat)return;

produtosDiv.innerHTML+=`
<div class="card"
style="background-image:url('${p.img}')"
onclick="zoomImg('${p.img}')">

<h3>${p.nome}</h3>

<p class="preco">
R$ ${p.preco.toFixed(2)}
</p>

<div class="qtd">

<button onclick="event.stopPropagation();alterar(${i},-1)">-</button>

<span>${carrinho[i]||0}</span>

<button onclick="event.stopPropagation();alterar(${i},1)">+</button>

</div>

</div>
`;
});
}

/* ALTERAR */

function alterar(i,v){

carrinho[i]=(carrinho[i]||0)+v;

if(carrinho[i]<0)
carrinho[i]=0;

render();
mostrar(categoriaAtual);
}

/* TOTAL */

function render(){

let total=0;
let html="";

for(let i in carrinho){

if(carrinho[i]>0){

let p=produtos[i];
let sub=p.preco*carrinho[i];

html+=`
${p.nome} x${carrinho[i]} = R$${sub.toFixed(2)}<br>
`;

total+=sub;
}
}

const frete=Number(bairro.value||0);
total+=frete;

totalDiv.innerText=`Total: R$${total.toFixed(2)}`;
itensDiv.innerHTML=html;
}

bairro.addEventListener("change",render);

/* WHATSAPP */

function enviarPedido(){

let msg="Pedido Botique da Carne\n\n";
let total=0;

for(let i in carrinho){

if(carrinho[i]>0){

let p=produtos[i];

msg+=`${p.nome} x${carrinho[i]}\n`;

total+=p.preco*carrinho[i];
}
}

msg+=`\nCliente: ${nome.value}`;
msg+=`\nTel: ${telefone.value}`;
msg+=`\nEnd: ${endereco.value}`;

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
);
}

/* ===== IMPRESSÃO SUNMI ===== */

function imprimirPedido(){

let pedido={
nome:nome.value,
telefone:telefone.value,
endereco:endereco.value,
itens:carrinho
};

localStorage.setItem(
"pedidoPrint",
JSON.stringify(pedido)
);

window.open("print.html","_blank");
}

/* ZOOM */

function zoomImg(src){
zoom.style.display="flex";
zoomImg.src=src;
}

function fecharZoom(){
zoom.style.display="none";
}

/* INIT */

mostrar(categorias[0]);
render();
