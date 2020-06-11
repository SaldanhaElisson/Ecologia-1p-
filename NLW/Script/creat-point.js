function populateUFs () {
    const ufSelect = document.querySelector('[name=uf]')
    const stateinput = document.querySelector('[name=state]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( res => res.json())
    .then( ( states) => { // fetch serve para buscar um dado em um site e voltar com ele entretanto não sabemos se  ele vai voltar com algo nessa ocasião estamos pensando positivamente logo o then serve para fazer o proximo no comando que no caso e transorma em json que é um codio parecido com o js depois ele pegar uma função falsa que vai executar o codigo dentro no caso o for 

       for (const state of states) {
        ufSelect.innerHTML +=`<option value="${state.id}">${state.nome} </option>` // o fo...of.. serve para que ele vasculhe os objetos dentro da arrya e faça uma funçao com aquele objeto  
       }
    })
}

populateUFs()

function getCities(event){

    var citySelect =document.querySelector('select[name=city]')
    var stateInput = document.querySelector('[name=state]')

    var ufValue =  event.target.value



    const indexOfSelectedState= event.target.selectedIndex // selectedIndex pegar a posição na opções funcina como array 
    stateInput.value = event.target.options[indexOfSelectedState].text //tex serve para pegar o texto daquela posição

    // event vai pegar o objeto e fazer alguma coisa nesse caso é target é pega onde o evento está acontecendo e pegar o valor 

    var url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch (url).then( res => res.json()).then(cities => {
        for (const city of cities){
            citySelect.innerHTML += `<option value = " ${city.id}"> ${city.nome}</option>`
        }

        citySelect.disabled= false
    } )

}

    

document.querySelector('select[name=uf]')
document .addEventListener("change", getCities)
  
 // esse comando se chama ouvidor de eventos. o 'change' se refere ao evento que no caso é a mundaça, quando ele ver que houve uma mundança ele vai fazer a função depois da virgula que no caso é escrever 'mudei' no sonsole //

 //items de coleta
 //pegar todos os li's

 const itemsToCollect = document.querySelectorAll('.items-grid li')

 for (const item of itemsToCollect){
    item.addEventListener('click', handleSelectedItem)
 }

 const CollectedItems=document.querySelector('input[name = items]') 

 // variável do impunt(escondido) Itens
let selectedItems=[]

function handleSelectedItem(event) {
    const ItemLi = event.target

   // adicionar ou remover uma class no java script 
    ItemLi.classList.toggle('selected')

    const ItemId =ItemLi.dataset.id

    // verificar se exitem itens selecionados, se sim
    //pegar os itens selecionados
    
    const alreadyItems = selectedItems.findIndex( item => {
        const itemFound= item == ItemId // isso será true or false se for verdadeiro ele retorna se for false ele não retorna
        return itemFound

    })


    // se já estiver slecionado, tirar a seleção 
    if( alreadyItems >= 0 ){
        const filterItems = selectedItems.filter( item =>{
            const itemDifferent = item != ItemId
            return itemDifferent
        })

        selectedItems = filterItems
    } else{
         // se não estiver selecionado, adicionar á seleção
        selectedItems.push(ItemId)
    }
    console.log(selectedItems)

    // se não estiver selecionado, adicionar á seleção

    //autalizar o campo escondido com os itens selecionados
    CollectedItems.value = selectedItems
    
 }