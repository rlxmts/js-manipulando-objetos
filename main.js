let listaDeItens = JSON.parse( localStorage.getItem("ListaDeCompra")) || [];
let itemParaEditar

const form = document.querySelector('#form-itens');
const itens = document.querySelector('#receber-item');
const lista = document.querySelector('#lista-de-itens');
const listaComprados = document.querySelector('#itens-comprados');


function atualizaLocalStorage(){
    localStorage.setItem("ListaDeCompra", JSON.stringify(listaDeItens)) ;
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    salvarItem();
    criaItemDaLista();
    itens.focus();
})

function salvarItem(){
    const itemNovo = itens.value;
    const verificaDuplicado = listaDeItens.some( (item) => item.nome === itemNovo.toLowerCase());
    
    if(verificaDuplicado){
        alert('Ops, esse produto ja esta na sua lista.');
        return
    }else{
        listaDeItens.push({
            nome: itemNovo.toLowerCase(),
            valor: false
        });     
        atualizaLocalStorage();
    }   
    itens.value = '';
}
criaItemDaLista();

function criaItemDaLista(){
    
    lista.innerHTML = '';
    listaComprados.innerHTML = '';
    
    listaDeItens.forEach( (item, index) =>{      
        
        if(item.valor){
            listaComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
            <input type="checkbox" checked class="is-clickable" />
            <span class="itens-comprados is-size-5">${item.nome}</span>
            </div>
            <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
            </li>
            `
        }else{
            lista.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${item.nome}"></input>
            </div>
            <div>
            <button onclick="salvarItem()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>
            <i class="fa-regular is-clickable fa-pen-to-square editar"></i>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
            </li>
            `
        }
    });

    const listaBtCheck = document.querySelectorAll('input[type="checkbox"]');    
    listaBtCheck.forEach( (input) =>{
        input.addEventListener('click', (e)=>{
            const indice = e.target.parentElement.parentElement.getAttribute('data-value');
            listaDeItens[indice].valor = e.target.checked;
            console.log(listaDeItens);          
            criaItemDaLista();
        });
    
    });

    const listaBtLixo = document.querySelectorAll('.deletar');    
    listaBtLixo.forEach( (item) => {
        item.addEventListener('click', (e)=>{
            const indice = e.target.parentElement.parentElement.getAttribute('data-value');
            listaDeItens.splice(indice, 1);
            criaItemDaLista();
            atualizaLocalStorage();
        });
    })

    const iconeEditar = document.querySelectorAll('.editar');
    iconeEditar.forEach( icone => {
        icone.addEventListener('click', (e)=>{
            itemParaEditar = e.target.parentElement.parentElement.getAttribute('data-value');
            criaItemDaLista();
        });
    })
    atualizaLocalStorage();
}

function salvarItem(){
    const itemEditado = document.querySelector(`[data-value="${itemParaEditar}"] input[type='text']`);
    listaDeItens[itemParaEditar].nome = itemEditado.value;
    itemParaEditar = -1;
    atualizaLocalStorage();
    console.log(listaDeItens)
}
