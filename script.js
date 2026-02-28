const numero="5562992819373";

const produtosDiv=document.getElementById("produtos");
const itensDiv=document.getElementById("itens");
const totalDiv=document.getElementById("total");

const bairro=document.getElementById("bairro");
const pagamento=document.getElementById("pagamento");

const nome=document.getElementById("nome");
const telefone=document.getElementById("telefone");
const endereco=document.getElementById("endereco");
const obs=document.getElementById("obs");

let carrinho={};

/* ================= PRODUTOS ================= */

const produtos=[
{nome:"Contra Filé",preco:60,img:"img/logo.png"},
{nome:"Picanha",preco:95,img:"img/logo.png"},
{nome:"Frango Bacon",preco:50,img:"img/logo.png"}
];

/* ================= MOSTRAR ================= */

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

/* ================= ALTERAR ================= */

function alterar(i,v){

carrinho[i]=(carrinho[i]||0)+v;

if(carrinho[i]<=0) delete carrinho[i];

render();
mostrar();
}

/* ================= TOTAL ================= */

function calcularTotais(){

let totalProdutos=0;

Object.keys(carrinho).forEach(i=>{
totalProdutos+=produtos[i].preco*carrinho[i];
});

const frete=Number(bairro.value||0);

return{
produtos:totalProdutos,
frete:frete,
total:totalProdutos+frete
};
}

function render(){

const t=calcularTotais();

let html="";

Object.keys(carrinho).forEach(i=>{

const p=produtos[i];
const qtd=carrinho[i];
const sub=p.preco*qtd;

html+=`${p.nome} x${qtd} - R$${sub.toFixed(2)}<br>`;
});

itensDiv.innerHTML=html||"Nenhum item";

totalDiv.innerHTML=`
Produtos: R$ ${t.produtos.toFixed(2)}<br>
Frete: R$ ${t.frete.toFixed(2)}<br>
<b>Total: R$ ${t.total.toFixed(2)}</b>
`;
}

bairro.addEventListener("change",render);

/* ================= WHATSAPP ================= */

function enviarPedido(){

const t=calcularTotais();

let msg="🛒 Pedido Botique da Carne\n\n";

Object.keys(carrinho).forEach(i=>{

const p=produtos[i];
const qtd=carrinho[i];

msg+=`${p.nome} x${qtd}\n`;
});

msg+=`
🚚 Frete: R$${t.frete.toFixed(2)}
💰 Total: R$${t.total.toFixed(2)}

👤 ${nome.value}
📞 ${telefone.value}
📍 ${endereco.value}
💳 ${pagamento.value}
📝 ${obs.value||"-"}
`;

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
);
}

/* ================= IMPRESSÃO REAL SUNMI ================= */

function imprimirPedido(){

const t=calcularTotais();

/* monta cupom */
let cupom=`
<html>
<body style="
width:58mm;
font-family:monospace;
text-align:center;
">

<img id="logo" src="img/logo.png" width="110"><br>
<b>BOTIQUE DA CARNE</b>
<hr>
`;

Object.keys(carrinho).forEach(i=>{

const p=produtos[i];
const qtd=carrinho[i];
const sub=p.preco*qtd;

cupom+=`
${p.nome}<br>
${qtd} x ${p.preco.toFixed(2)}
= ${sub.toFixed(2)}<br><br>
`;
});

cupom+=`
<hr>
Frete: ${t.frete.toFixed(2)}<br>
TOTAL: ${t.total.toFixed(2)}
<hr>

Cliente: ${nome.value}<br>
Telefone: ${telefone.value}<br>
Pagamento: ${pagamento.value}<br>
Endereço: ${endereco.value}<br>
Obs: ${obs.value||"-"}

<br><br>
Obrigado!
</body>
</html>
`;

/* ===== iframe seguro ===== */

const frame=document.createElement("iframe");

frame.style.position="fixed";
frame.style.right="0";
frame.style.bottom="0";
frame.style.width="1px";
frame.style.height="1px";
frame.style.border="0";

document.body.appendChild(frame);

const doc=frame.contentWindow.document;

doc.open();
doc.write(cupom);
doc.close();

/* espera carregar imagem */
frame.onload=()=>{

setTimeout(()=>{

frame.contentWindow.focus();
frame.contentWindow.print();

setTimeout(()=>{
document.body.removeChild(frame);
},4000);

},1200);

};
}

/* ================= TELEFONE ================= */

telefone.addEventListener("input",()=>{
telefone.value=
telefone.value.replace(/\D/g,"").slice(0,11);
});

/* INIT */
mostrar();
render();
