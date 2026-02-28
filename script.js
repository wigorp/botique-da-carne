const numero="5562992819373";

const categoriasDiv=document.getElementById("categorias");
const produtosDiv=document.getElementById("produtos");
const itensDiv=document.getElementById("itens");
const totalDiv=document.getElementById("total");

const bairro=document.getElementById("bairro");
const pagamento=document.getElementById("pagamento");

const nome=document.getElementById("nome");
const telefone=document.getElementById("telefone");
const endereco=document.getElementById("endereco");

let carrinho={};
let categoriaAtual="";

/* PRODUTOS */

const produtos=[
{cat:"Bovinos",nome:"Contra Filé",preco:60,img:"img/logo.png"},
{cat:"Bovinos",nome:"Picanha",preco:95,img:"img/logo.png"},
{cat:"Frango",nome:"Frango Bacon",preco:50,img:"img/logo.png"}
];

/* CATEGORIAS */

const categorias=[...new Set(produtos.map(p=>p.cat))];

categorias.forEach(cat=>{
categoriasDiv.innerHTML+=`
<button onclick="mostrar('${cat}')">
${cat}
</button>`;
});

/* MOSTRAR */

function mostrar(cat){

categoriaAtual=cat;
produtosDiv.innerHTML="";

produtos.forEach((p,i)=>{

if(p.cat!==cat)return;

produtosDiv.innerHTML+=`
<div class="card"
style="background-image:url('${p.img}')">

<h3>${p.nome}</h3>
<p class="preco">R$ ${p.preco.toFixed(2)}</p>

<button onclick="alterar(${i},-1)">-</button>
${carrinho[i]||0}
<button onclick="alterar(${i},1)">+</button>

</div>
`;
});
}

/* ALTERAR */

function alterar(i,v){

carrinho[i]=(carrinho[i]||0)+v;

if(carrinho[i]<=0)
delete carrinho[i];

render();
mostrar(categoriaAtual);
}

/* RENDER */

function render(){

let totalProdutos=0;
let html="";

Object.keys(carrinho).forEach(i=>{

const p=produtos[i];
const qtd=carrinho[i];
const sub=p.preco*qtd;

totalProdutos+=sub;

html+=`
${p.nome} x${qtd}
<br>
R$ ${sub.toFixed(2)}
<hr>
`;
});

const frete=Number(bairro.value||0);
const totalFinal=totalProdutos+frete;

itensDiv.innerHTML=html || "Nenhum item";

totalDiv.innerHTML=`
Produtos: R$ ${totalProdutos.toFixed(2)}<br>
Frete: R$ ${frete.toFixed(2)}<br>
<b>Total: R$ ${totalFinal.toFixed(2)}</b>
`;
}

bairro.addEventListener("change",render);

/* WHATSAPP */

function enviarPedido(){

let msg="Pedido Botique da Carne\n\n";

let totalProdutos=0;

Object.keys(carrinho).forEach(i=>{

const p=produtos[i];
const qtd=carrinho[i];
const sub=p.preco*qtd;

msg+=`${p.nome} x${qtd} - R$${sub.toFixed(2)}\n`;
totalProdutos+=sub;
});

const frete=Number(bairro.value||0);
const totalFinal=totalProdutos+frete;

msg+=`\nFrete: R$${frete.toFixed(2)}`;
msg+=`\nTotal: R$${totalFinal.toFixed(2)}\n\n`;

msg+=`Cliente: ${nome.value}`;
msg+=`\nTelefone: ${telefone.value}`;
msg+=`\nEndereço: ${endereco.value}`;
msg+=`\nPagamento: ${pagamento.value}`;

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
);
}

/* IMPRESSÃO SEM CRASH */

function imprimirPedido(){

let html=`
<center>
<img src="img/logo.png" width="120"><br>
<b>Botique da Carne</b>
<hr>
</center>
`;

let totalProdutos=0;

Object.keys(carrinho).forEach(i=>{

const p=produtos[i];
const qtd=carrinho[i];
const sub=p.preco*qtd;

totalProdutos+=sub;

html+=`
${p.nome}<br>
${qtd} x ${p.preco.toFixed(2)}<br><br>
`;
});

const frete=Number(bairro.value||0);
const totalFinal=totalProdutos+frete;

html+=`
<hr>
Produtos: R$ ${totalProdutos.toFixed(2)}<br>
Frete: R$ ${frete.toFixed(2)}<br>
<b>Total: R$ ${totalFinal.toFixed(2)}</b>
<hr>

Cliente: ${nome.value}<br>
Tel: ${telefone.value}<br>
End: ${endereco.value}<br>
Pag: ${pagamento.value}

<br><br><br>
<center>Obrigado!</center>
`;

const area=document.getElementById("printArea");

area.innerHTML=html;
area.style.display="block";

setTimeout(()=>{
window.print();
area.style.display="none";
},300);
}

/* TELEFONE 11 DÍGITOS */

telefone.addEventListener("input",()=>{
telefone.value=
telefone.value.replace(/\D/g,"").slice(0,11);
});

/* INIT */

mostrar(categorias[0]);
render();
