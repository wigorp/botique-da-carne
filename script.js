const numero="5562992819373";

const produtosDiv=document.getElementById("produtos");
const itensDiv=document.getElementById("itens");
const totalDiv=document.getElementById("total");

const bairro=document.getElementById("bairro");
const pagamento=document.getElementById("pagamento");

const nome=document.getElementById("nome");
const telefone=document.getElementById("telefone");
const endereco=document.getElementById("endereco");

let carrinho={};

const produtos=[
{nome:"Contra Filé",preco:60,img:"img/logo.png"},
{nome:"Picanha",preco:95,img:"img/logo.png"},
{nome:"Frango Bacon",preco:50,img:"img/logo.png"}
];

function mostrar(){

produtosDiv.innerHTML="";

produtos.forEach((p,i)=>{

produtosDiv.innerHTML+=`
<div class="card"
style="background-image:url('${p.img}')">

<h3>${p.nome}</h3>
<p class="preco">R$ ${p.preco.toFixed(2)}</p>

<button onclick="alterar(${i},-1)">-</button>
${carrinho[i]||0}
<button onclick="alterar(${i},1)">+</button>

</div>`;
});
}

function alterar(i,v){

carrinho[i]=(carrinho[i]||0)+v;

if(carrinho[i]<=0)
delete carrinho[i];

render();
mostrar();
}

function render(){

let totalProdutos=0;
let html="";

Object.keys(carrinho).forEach(i=>{

let p=produtos[i];
let qtd=carrinho[i];
let sub=p.preco*qtd;

totalProdutos+=sub;

html+=`${p.nome} x${qtd}<br>`;
});

let frete=Number(bairro.value||0);
let total=totalProdutos+frete;

itensDiv.innerHTML=html||"Nenhum item";

totalDiv.innerHTML=
`Produtos: R$${totalProdutos.toFixed(2)}<br>
Frete: R$${frete.toFixed(2)}<br>
<b>Total: R$${total.toFixed(2)}</b>`;
}

bairro.addEventListener("change",render);

/* WHATSAPP */

function enviarPedido(){

let msg="Pedido Botique da Carne\n\n";

Object.keys(carrinho).forEach(i=>{
msg+=`${produtos[i].nome} x${carrinho[i]}\n`;
});

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
);
}

/* IMPRESSÃO SUNMI SAFE */

function imprimirPedido(){

let html=`<center>
<img src="img/logo.png" width="100"><hr>`;

Object.keys(carrinho).forEach(i=>{
html+=`${produtos[i].nome} x${carrinho[i]}<br>`;
});

html+=`<hr>
Cliente:${nome.value}<br>
Tel:${telefone.value}<br>
End:${endereco.value}
</center>`;

const area=document.getElementById("printArea");

area.innerHTML=html;

setTimeout(()=>{
window.print();
},200);

}

/* TELEFONE 11 DIGITOS */

telefone.addEventListener("input",()=>{
telefone.value=
telefone.value.replace(/\D/g,"").slice(0,11);
});

mostrar();
render();
