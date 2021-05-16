
// html elements
types = document.getElementById('types-window')
typesTbody = document.getElementById('types-table-tbody')

// init storage
typeStorage = JSON.parse(localStorage.getItem('tt-types')) || []

// insert dummy data
if (typeStorage.length === 0) {
  const initTypes = [
    {
    'id':'type-1',
    'name': 'Typ 1'
    },
    {
      'id':'type-2',
      'name': 'Typ 2'
    },
    {
      'id':'type-3',
      'name': 'Typ 3'
    }
  ]
  initTypes.forEach(type => {
    typeStorage.push(type)
    localStorage.setItem('tt-types', JSON.stringify(typeStorage))
  })
}

// render projects
function renderType(type){
  let rowNode = document.createElement('tr')
  let idColNode = document.createElement('td')
  let nameColNode = document.createElement('td')
  idColNode.innerText = type.id
  nameColNode.innerText = type.name
  rowNode.appendChild(idColNode)
  rowNode.appendChild(nameColNode)
  typesTbody.appendChild(rowNode)
}

function renderAllTypes() {
  typeStorage.forEach(type => {
    renderType(type)
  })
}
renderAllTypes()


document.getElementById('add-type').addEventListener('click', e => {
  const newType = {'id': document.getElementById('type-id').value,'name': document.getElementById('type-name').value}
  renderType(newType)
  typeStorage.push(newType)
  localStorage.setItem('tt-types', JSON.stringify(typeStorage))
})