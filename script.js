const numero="5562992819373";

const produtosDiv=document.getElementById("produtos");
const itensDiv=document.getElementById("itens");
const totalDiv=document.getElementById("total");
const bairro=document.getElementById("bairro");

let carrinho={};

/* ================= PRODUTOS ================= */

const produtos=[
{nome:"Contra Filé",preco:60,img:"img/logo.png"},
{nome:"Picanha",preco:90,img:"img/logo.png"}
];

/* ================= MOSTRAR ================= */

produtos.forEach((p,i)=>{

produtosDiv.innerHTML+=`

<div class="card"
style="background-image:url('${p.img}')">

<h3>${p.nome}</h3>

<p class="preco">
R$ ${p.preco.toFixed(2)}
</p>

<div class="qtd">
<button onclick="alterar(${i},-1)">-</button>
<span>${carrinho[i]||0}</span>
<button onclick="alterar(${i},1)">+</button>
</div>

</div>
`;
});

/* ================= ALTERAR ================= */

function alterar(i,v){

carrinho[i]=(carrinho[i]||0)+v;

if(carrinho[i]<0)carrinho[i]=0;

render();
}

/* ================= TOTAL ================= */

function render(){

let total=0;
let html="";

for(let i in carrinho){

if(carrinho[i]>0){

let p=produtos[i];
let sub=p.preco*carrinho[i];

html+=`${p.nome} x${carrinho[i]}<br>`;
total+=sub;

}
}

total+=Number(bairro.value||0);

itensDiv.innerHTML=html;
totalDiv.innerText="Total: R$"+total.toFixed(2);
}

bairro.onchange=render;

/* ================= WHATSAPP ================= */

function enviarPedido(){

let msg="Pedido Botique da Carne\n\n";

for(let i in carrinho){

if(carrinho[i]>0){

let p=produtos[i];
msg+=`${p.nome} x${carrinho[i]}\n`;

}
}

window.open(
"https://wa.me/"+numero+
"?text="+encodeURIComponent(msg)
);
}

/* ================= IMPRESSÃO SUNMI ================= */

function imprimirPedido(){

let itens=[];

for(let i in carrinho){

if(carrinho[i]>0){

let p=produtos[i];

itens.push({
nome:p.nome,
qtd:carrinho[i],
preco:p.preco
});

}
}

if(itens.length===0){
alert("Carrinho vazio");
return;
}

const pedido={
itens,
frete:Number(bairro.value||0),
nome:nome.value,
telefone:telefone.value,
endereco:endereco.value
};

localStorage.setItem(
"pedidoPrint",
JSON.stringify(pedido)
);

window.open("print.html","_blank");

}
