const numero="5562992819373";

const categoriasDiv=document.getElementById("categorias");
const produtosDiv=document.getElementById("produtos");
const itensDiv=document.getElementById("itens");
const totalDiv=document.getElementById("total");
const bairro=document.getElementById("bairro");

let carrinho={};
let categoriaAtual="";

/* ================= ICONES ================= */

function icone(cat){
if(cat.includes("Bovinos")) return "🐄";
if(cat.includes("Frango")) return "🐔";
if(cat.includes("Outros")) return "🐖";
if(cat.includes("Kit Churrasco")) return "🔥";
if(cat.includes("Kit Semanal")) return "📅";
return "🥩";
}

/* ================= PRODUTOS ================= */
const produtos=[

{cat:"Espetinhos > Bovinos",nome:"Contra Filé",preco:60,img:"img/contra file.jpeg"},
{cat:"Espetinhos > Bovinos",nome:"Picanha",preco:90},
{cat:"Espetinhos > Bovinos",nome:"Bovinos1",preco:90},
{cat:"Espetinhos > Bovinos",nome:"Bovinos2",preco:90},
{cat:"Espetinhos > Bovinos",nome:"Bovinos3",preco:90},
{cat:"Espetinhos > Bovinos",nome:"Bovinos4",preco:90},
{cat:"Espetinhos > Bovinos",nome:"Bovinos5",preco:90},
{cat:"Espetinhos > Bovinos",nome:"Bovinos6",preco:90},
{cat:"Espetinhos > Bovinos",nome:"Bovinos7",preco:90},
{cat:"Espetinhos > Bovinos",nome:"Bovinos8",preco:90},
{cat:"Espetinhos > Bovinos",nome:"Bovinos9",preco:90},
{cat:"Espetinhos > Bovinos",nome:"1Bovinos0",preco:90},


{cat:"Espetinhos > Frango",nome:"Frango Bacon",preco:50},
{cat:"Espetinhos > Frango",nome:"Frango1",preco:50},
{cat:"Espetinhos > Frango",nome:"Frango2",preco:50},
{cat:"Espetinhos > Frango",nome:"Frango3",preco:50},
{cat:"Espetinhos > Frango",nome:"Frango4",preco:50},
{cat:"Espetinhos > Frango",nome:"Frango5",preco:50},
{cat:"Espetinhos > Frango",nome:"Frango6",preco:50},
{cat:"Espetinhos > Frango",nome:"Frango7",preco:50},


{cat:"Espetinhos > Especiais",nome:"Especial",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial1",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial2",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial3",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial4",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial5",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial6",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial7",preco:95},

  
{cat:"Espetinhos > Outros",nome:"Linguiça",preco:60},
{cat:"Espetinhos > Outros",nome:"Queijo Coalho",preco:30},
{cat:"Espetinhos > Outros",nome:"Outros=1",preco:30},
{cat:"Espetinhos > Outros",nome:"Outros=2",preco:30},
{cat:"Espetinhos > Outros",nome:"Outros=3",preco:30},
{cat:"Espetinhos > Outros",nome:"Outros=4",preco:30},
{cat:"Espetinhos > Outros",nome:"Outros=5",preco:30},


{cat:"Kit Semanal",nome:"Kit 1",preco:120},
{cat:"Kit Semanal",nome:"Kit 2",preco:150},
{cat:"Kit Semanal",nome:"Kit 3",preco:170},

  
{cat:"Kit Churrasco",nome:"Kit 129.90",preco:129.9},
{cat:"Kit Churrasco",nome:"Kit 159.90",preco:159.9},
{cat:"Kit Churrasco",nome:"Kit 189.90",preco:189.9},  

{cat:"Insumos",nome:"Carvão",preco:35},
{cat:"Insumos",nome:"Pão de Alho",preco:18},
{cat:"Insumos",nome:"Pão de Alho2",preco:18},
{cat:"Insumos",nome:"Pão de Alho3",preco:18},
{cat:"Insumos",nome:"Mandioca",preco:18},
];

/* ================= CATEGORIAS ================= */

const categorias=[...new Set(produtos.map(p=>p.cat))];

categorias.forEach(cat=>{
categoriasDiv.innerHTML+=
`<button onclick="mostrar('${cat}')">
${icone(cat)} ${cat}
</button>`;
});

/* ================= BANNERS ================= */

const banners=["banner1.jpg","banner2.jpg"];
const bannerDiv=document.getElementById("banners");

banners.forEach(img=>{
let i=document.createElement("img");
i.src="img/"+img;
i.onerror=()=>i.remove();
bannerDiv.appendChild(i);
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

</div>
`;
});

}

/* ================= ALTERAR ================= */

function alterar(i,v){
carrinho[i]=(carrinho[i]||0)+v;
if(carrinho[i]<0)carrinho[i]=0;

render();
mostrar(categoriaAtual);
}

/* ================= TOTAL ================= */

function render(){

let total=0;
let html="";

for(let i in carrinho){

if(carrinho[i]>0){

let p=produtos[i];
let sub=p.preco*carrinho[i];

html+=`${p.nome} x${carrinho[i]} = R$${sub.toFixed(2)}<br>`;
total+=sub;
}
}

const frete=Number(bairro.value||0);
total+=frete;

totalDiv.innerText=`🚚 Total: R$${total.toFixed(2)}`;
itensDiv.innerHTML=html;
}

bairro.addEventListener("change",render);

/* ================= WHATSAPP ================= */

function enviarPedido(){

let msg="🔥 Pedido Botique da Carne\n\n";
let total=0;

for(let i in carrinho){

if(carrinho[i]>0){

let p=produtos[i];

msg+=`${icone(p.cat)} ${p.nome} x${carrinho[i]}\n`;
total+=p.preco*carrinho[i];
}
}

const frete=Number(bairro.value);
total+=frete;

msg+=`\n🚚 Frete: R$${frete}`;
msg+=`\n💰 Total: R$${total.toFixed(2)}\n\n`;

msg+=`👤 ${nome.value}\n`;
msg+=`📞 ${telefone.value}\n`;
msg+=`📍 ${endereco.value}`;

const url=
"https://wa.me/"+numero+
"?text="+encodeURIComponent(msg);

window.open(url,"_blank");
}

/* ================= ZOOM ================= */

function zoomImg(src){

const zoom=document.getElementById("zoom");
const img=document.getElementById("zoomImg");

img.src=src;

zoom.style.display="flex";

document.body.style.overflow="hidden";
}

function fecharZoom(){
document.getElementById("zoom").style.display="none";
}

/* ================= INPUT ================= */

nome.addEventListener("input",()=>{
nome.value=nome.value.replace(/[^A-Za-zÀ-ÿ ]/g,"");
});

telefone.addEventListener("input",()=>{
telefone.value=telefone.value.replace(/[^0-9]/g,"");
});

/* ================= INIT ================= */

mostrar(categorias[0]);
render();
