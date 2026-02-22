const numero="5562992819373";

const produtos=[

{cat:"Espetinhos > Bovinos",nome:"Contra Filé",preco:60},
{cat:"Espetinhos > Bovinos",nome:"Picanha",preco:90},
{cat:"Espetinhos > Bovinos",nome:"1",preco:90},
{cat:"Espetinhos > Bovinos",nome:"2",preco:90},
{cat:"Espetinhos > Bovinos",nome:"3",preco:90},
{cat:"Espetinhos > Bovinos",nome:"4",preco:90},
{cat:"Espetinhos > Bovinos",nome:"5",preco:90},
{cat:"Espetinhos > Bovinos",nome:"6",preco:90},
{cat:"Espetinhos > Bovinos",nome:"7",preco:90},
{cat:"Espetinhos > Bovinos",nome:"8",preco:90},
{cat:"Espetinhos > Bovinos",nome:"9",preco:90},
{cat:"Espetinhos > Bovinos",nome:"10",preco:90},


{cat:"Espetinhos > Frango",nome:"Frango Bacon",preco:50},
{cat:"Espetinhos > Frango",nome:"1",preco:50},
{cat:"Espetinhos > Frango",nome:"2",preco:50},
{cat:"Espetinhos > Frango",nome:"3",preco:50},
{cat:"Espetinhos > Frango",nome:"4",preco:50},
{cat:"Espetinhos > Frango",nome:"5",preco:50},
{cat:"Espetinhos > Frango",nome:"6",preco:50},
{cat:"Espetinhos > Frango",nome:"7",preco:50},


{cat:"Espetinhos > Especiais",nome:"Especial",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial1",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial2",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial3",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial4",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial5",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial6",preco:95},
{cat:"Espetinhos > Especiais",nome:"Especial7",preco:95},

  
{cat:"Espetinhos > Outros",nome:"Linguiça",preco:60},
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

{cat:"Insumos",nome:"Carvão",preco:35},
{cat:"Insumos",nome:"Pão de Alho",preco:18},
{cat:"Insumos",nome:"Pão de Alho2",preco:18},
{cat:"Insumos",nome:"Pão de Alho3",preco:18},
{cat:"Insumos",nome:"Mandioca",preco:18},

];

const categoriasDiv =
document.getElementById("categorias");

const produtosDiv =
document.getElementById("produtos");

const itensDiv =
document.getElementById("itens");

let carrinho={};

/* CATEGORIAS */

[...new Set(produtos.map(p=>p.cat))]
.forEach(cat=>{

categoriasDiv.innerHTML+=
`<button onclick="mostrar('${cat}')">${cat}</button>`;
});

function mostrar(cat){

produtosDiv.innerHTML="";

produtos.forEach((p,i)=>{

if(p.cat!==cat)return;

produtosDiv.innerHTML+=`

<div class="card">

<h3>${p.nome}</h3>
<p class="preco">R$${p.preco}</p>

<div class="qtd">
<button onclick="alt(${i},-1)">-</button>
<span>${carrinho[i]||0}</span>
<button onclick="alt(${i},1)">+</button>
</div>

</div>`;
});
}

mostrar(produtos[0].cat);

/* CARRINHO */

function alt(i,v){

carrinho[i]=(carrinho[i]||0)+v;

if(carrinho[i]<0)
carrinho[i]=0;

render();
mostrar(produtos[0].cat);
}

function render(){

let html="";
let total=0;

for(let i in carrinho){

if(carrinho[i]>0){

let p=produtos[i];
let sub=p.preco*carrinho[i];

total+=sub;

html+=
`${p.nome} x${carrinho[i]} = R$${sub}<br>`;
}
}

itensDiv.innerHTML=html;
}

/* WHATSAPP */

function enviarPedido(){

let msg="Pedido Botique da Carne\n\n";

for(let i in carrinho){

if(carrinho[i]>0){

msg+=`${produtos[i].nome} x${carrinho[i]}\n`;
}
}

msg+=`\nCliente: ${nome.value}`;
msg+=`\nEndereço: ${endereco.value}`;
msg+=`\nPagamento: ${pagamento.value}`;

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
);
}
