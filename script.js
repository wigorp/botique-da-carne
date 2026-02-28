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

/* ================= ICONES ================= */

function icone(cat){
if(cat.includes("Bovinos")) return "🐄";
if(cat.includes("Frango")) return "🐔";
if(cat.includes("Outros")) return "🐖";
return "🥩";
}

/* ================= PRODUTOS ================= */

const produtos=[
{cat:"Espetinhos > Bovinos",nome:"Contra Filé",preco:60,img:"img/contra file.jpeg"},
{cat:"Espetinhos > Bovinos",nome:"Picanha",preco:95,img:"img/logo.png"}
];

/* ================= CATEGORIAS ================= */

const categorias=[...new Set(produtos.map(p=>p.cat))];

categorias.forEach(cat=>{
categoriasDiv.innerHTML+=`
<button onclick="mostrar('${cat}')">
${icone(cat)} ${cat}
</button>`;
});

/* ================= MOSTRAR ================= */

function mostrar(cat){

categoriaAtual=cat;
produtosDiv.innerHTML="";

produtos.forEach((p,i)=>{

if(p.cat!==cat) return;

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

</div>`;
});

}

/* ================= ALTERAR ================= */

function alterar(i,v){

carrinho[i]=(carrinho[i]||0)+v;

if(carrinho[i]<=0)
delete carrinho[i];

render();
mostrar(categoriaAtual);
}

/* ================= RENDER PEDIDO ================= */

function render(){

let totalProdutos=0;
let html="";

Object.keys(carrinho).forEach(i=>{

const qtd=carrinho[i];
const p=produtos[i];

const subtotal=p.preco*qtd;

totalProdutos+=subtotal;

html+=`
${p.nome} x${qtd}
<br>
R$ ${subtotal.toFixed(2)}
<hr>`;
});

const frete=Number(bairro.value||0);
const totalFinal=totalProdutos+frete;

/* MOSTRA ITENS */
itensDiv.innerHTML=html || "Nenhum item";

/* MOSTRA TOTAL CORRETO */
totalDiv.innerHTML=`
🧾 Produtos: R$ ${totalProdutos.toFixed(2)}<br>
🚚 Frete: R$ ${frete.toFixed(2)}<br>
<b>💰 Total: R$ ${totalFinal.toFixed(2)}</b>
`;
}

bairro.addEventListener("change",render);

/* ================= WHATSAPP ================= */

function enviarPedido(){

if(Object.keys(carrinho).length===0){
alert("Adicione itens");
return;
}

let msg="🛒 Pedido Botique da Carne\n\n";

let totalProdutos=0;

Object.keys(carrinho).forEach(i=>{

const qtd=carrinho[i];
const p=produtos[i];

const sub=p.preco*qtd;

msg+=`${p.nome} x${qtd} - R$${sub.toFixed(2)}\n`;

totalProdutos+=sub;
});

const frete=Number(bairro.value||0);
const totalFinal=totalProdutos+frete;

msg+=`\n🚚 Frete: R$${frete.toFixed(2)}`;
msg+=`\n💰 Total: R$${totalFinal.toFixed(2)}\n\n`;

msg+=`👤 ${nome.value}`;
msg+=`\n📞 ${telefone.value}`;
msg+=`\n📍 ${endereco.value}`;
msg+=`\n💳 ${pagamento.value}`;

const url=
"https://wa.me/"+numero+
"?text="+encodeURIComponent(msg);

window.open(url,"_blank");
}

/* ================= IMPRIMIR ================= */

function imprimirPedido(){

localStorage.setItem("pedidoPrint",JSON.stringify({
carrinho,
nome:nome.value,
telefone:telefone.value,
endereco:endereco.value,
pagamento:pagamento.value,
frete:bairro.value
}));

window.open("print.html","_blank");
}

/* ================= ZOOM ================= */

function zoomImg(src){
document.getElementById("zoomImg").src=src;
document.getElementById("zoom").style.display="flex";
}

function fecharZoom(){
document.getElementById("zoom").style.display="none";
}

/* ================= INPUT ================= */

telefone.addEventListener("input",()=>{
telefone.value=
telefone.value.replace(/\D/g,"").slice(0,11);
});

/* INIT */

mostrar(categorias[0]);
render();
