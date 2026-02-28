const numero="5562992819373";

const itensDiv=document.getElementById("itens");
const totalDiv=document.getElementById("total");

const bairro=document.getElementById("bairro");
const pagamento=document.getElementById("pagamento");

const nome=document.getElementById("nome");
const telefone=document.getElementById("telefone");
const endereco=document.getElementById("endereco");
const obs=document.getElementById("obs");

const printArea=document.getElementById("printArea");

let carrinho={};

const produtos=[
{nome:"Contra Filé",preco:60,img:"img/logo.png"},
{nome:"Picanha",preco:95,img:"img/logo.png"},
{nome:"Frango Bacon",preco:50,img:"img/logo.png"}
];

/* ================= PRODUTOS ================= */

function mostrar(){

const div=document.getElementById("produtos");
div.innerHTML="";

produtos.forEach((p,i)=>{

div.innerHTML+=`
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

/* ================= ALTERAR ================= */

function alterar(i,v){

carrinho[i]=(carrinho[i]||0)+v;

if(carrinho[i]<=0)
delete carrinho[i];

render();
mostrar();
}

/* ================= TOTAL ================= */

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
(R$ ${sub.toFixed(2)})<br>`;
});

const frete=Number(bairro.value||0);
const totalFinal=totalProdutos+frete;

itensDiv.innerHTML=html||"Nenhum item";

totalDiv.innerHTML=`
Produtos: R$ ${totalProdutos.toFixed(2)}<br>
Frete: R$ ${frete.toFixed(2)}<br>
<b>Total: R$ ${totalFinal.toFixed(2)}</b>
`;
}

/* ================= WHATSAPP CORRETO ================= */

function enviarPedido(){

let msg="🛒 Pedido Botique da Carne\n\n";

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

msg+=`\n🚚 Frete: R$${frete.toFixed(2)}`;
msg+=`\n💰 Total: R$${totalFinal.toFixed(2)}\n\n`;

msg+=`👤 ${nome.value}`;
msg+=`\n📞 ${telefone.value}`;
msg+=`\n📍 ${endereco.value}`;
msg+=`\n💳 ${pagamento.value}`;

if(obs.value)
msg+=`\n📝 ${obs.value}`;

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
);
}

/* ================= IMPRESSÃO SUNMI REAL ================= */

function imprimirPedido(){

let totalProdutos=0;

let html=`
<center>
<img src="img/logo.png" width="110"><br>
<b>BOTIQUE DA CARNE</b>
<hr>
</center>
`;

Object.keys(carrinho).forEach(i=>{

const p=produtos[i];
const qtd=carrinho[i];
const sub=p.preco*qtd;

totalProdutos+=sub;

html+=`
${p.nome}<br>
${qtd} x ${p.preco.toFixed(2)} = ${sub.toFixed(2)}<br><br>
`;
});

const frete=Number(bairro.value||0);
const totalFinal=totalProdutos+frete;

html+=`
<hr>
Produtos: ${totalProdutos.toFixed(2)}<br>
Frete: ${frete.toFixed(2)}<br>
TOTAL: ${totalFinal.toFixed(2)}
<hr>

Cliente: ${nome.value}<br>
Tel: ${telefone.value}<br>
End: ${endereco.value}<br>
Pag: ${pagamento.value}<br>
Obs: ${obs.value||"-"}

<br><br>
<center>Obrigado!</center>
`;

printArea.innerHTML=html;

/* 🔥 SEGREDO SUNMI */
printArea.style.display="block";

setTimeout(()=>{
window.print();

setTimeout(()=>{
printArea.style.display="none";
},800);

},600);
}

/* TELEFONE */

telefone.addEventListener("input",()=>{
telefone.value=
telefone.value.replace(/\D/g,"").slice(0,11);
});

bairro.addEventListener("change",render);

mostrar();
render();
