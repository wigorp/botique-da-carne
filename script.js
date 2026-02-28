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

/* ================= MOSTRAR PRODUTOS ================= */

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

if(carrinho[i]<=0)
delete carrinho[i];

render();
mostrar();
}

/* ================= RENDER TOTAL ================= */

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

if(obs.value){
msg+=`\n📝 ${obs.value}`;
}

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
);
}

/* ================= IMPRESSÃO SUNMI SAFE ================= */

function imprimirPedido(){

if(Object.keys(carrinho).length===0){
alert("Adicione itens");
return;
}

let totalProdutos=0;

let html=`
<html>
<body style="
width:58mm;
font-family:monospace;
text-align:center;
">

<img src="img/logo.png" width="110"><br>
<b>BOTIQUE DA CARNE</b>
<hr>
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
<b>TOTAL: ${totalFinal.toFixed(2)}</b>
<hr>

Cliente: ${nome.value}<br>
Tel: ${telefone.value}<br>
End: ${endereco.value}<br>
Pag: ${pagamento.value}<br>
Obs: ${obs.value||"-"}

<br><br>
Obrigado!
</body>
</html>
`;

/* ===== IMPRESSÃO VIA IFRAME (MAIS ESTÁVEL NA SUNMI) ===== */

const iframe=document.createElement("iframe");

iframe.style.position="fixed";
iframe.style.width="0";
iframe.style.height="0";
iframe.style.border="0";

document.body.appendChild(iframe);

const doc=iframe.contentWindow.document;

doc.open();
doc.write(html);
doc.close();

/* Delay maior evita crash WebView SUNMI */
setTimeout(()=>{

iframe.contentWindow.focus();
iframe.contentWindow.print();

setTimeout(()=>{
document.body.removeChild(iframe);
},4000);

},1500);
}

/* ================= TELEFONE 11 DIGITOS ================= */

telefone.addEventListener("input",()=>{
telefone.value=
telefone.value.replace(/\D/g,"").slice(0,11);
});

/* ================= INIT ================= */

mostrar();
render();
