let listaDeItens = JSON.parse( localStorage.getItem("ListaDeCompra")) || [];

const form = document.querySelector('#form-itens');
const itens = document.querySelector('#receber-item');
const lista = document.querySelector('#lista-de-itens');
const listaComprados = document.querySelector('#itens-comprados');


criaItemDaLista();

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    salvarItem();
    criaItemDaLista();
    itens.focus();
})

function atualizaLocalStorage(){
    localStorage.setItem("ListaDeCompra", JSON.stringify(listaDeItens)) ;
}

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

function criaItemDaLista(){
    lista.innerHTML = '';
    listaComprados.innerHTML = '';

    listaDeItens.forEach( (item, index) =>{      
        
        if(item.valor){
            listaComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked id="check" class="is-clickable" />
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
                    <input type="checkbox" id="check" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${item.nome}"></input>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        }
    });
}

const listaBtCheck = document.querySelectorAll('#check');

listaBtCheck.forEach( (input)=>{
    input.addEventListener('click', (e)=>{
        const indice = e.target.parentElement.parentElement.getAttribute('data-value');
        listaDeItens[indice].valor = e.target.checked;           
        console.log(listaDeItens)
        //criaItemDaLista();
    });
});
