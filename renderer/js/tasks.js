// set input fields
input = {
  'date': document.getElementById('date'),
  'from': document.getElementById('from'),
  'to': document.getElementById('to'),
  'project': document.getElementById('project'),
  'type': document.getElementById('type'),
  'task': document.getElementById('task')
}
// set output table
output = {
  'tasks': document.getElementById('tasks')
}

// init storage
taskStorage = JSON.parse(localStorage.getItem('tt-tasks')) || []
projectStorage = JSON.parse(localStorage.getItem('tt-projects')) || []
typeStorage = JSON.parse(localStorage.getItem('tt-types')) || []

// set current date
let curDateObj = new Date()
curDate = curDateObj.getDate() + '.' + (curDateObj.getMonth() + 1)
input.date.value = curDate

// save task to tasks
document.getElementById('add-task').addEventListener('click', e => {

  let date = curDateObj.getFullYear()
    + '-' + input.date.value.split('.')[1].padStart(2, '0')
    + '-' + input.date.value.split('.')[0].padStart(2, '0')

  let task = {
    'from': date + 'T' + input.from.value.split(':')[0].padStart(2, '0') + ':' + input.from.value.split(':')[1].padStart(2, '0') + ':00',
    'to': date + 'T' + input.to.value.split(':')[0].padStart(2, '0') + ':' + input.to.value.split(':')[1].padStart(2, '0') + ':00',
    'project': input.project.value,
    'type': input.type.value,
    'task': input.task.value
  }
  taskStorage.push(task)

  // render
  render(task)

  // persist
  localStorage.setItem('tt-tasks', JSON.stringify(taskStorage))
})

// render task
function render(task) {
  // Create a new DOM node
  let taskNode = document.createElement('div')
  // Assign classes
  taskNode.setAttribute('class', 'task row ')

  taskFrom = new Date(task.from)
  taskTo = new Date(task.to)

  let dateNode = document.createElement('div')
  dateNode.setAttribute('class', 'col s1')
  dateNode.innerHTML = taskFrom.getDate() + '.' + (taskFrom.getMonth() + 1)
  taskNode.appendChild(dateNode)

  let fromNode = document.createElement('div')
  fromNode.setAttribute('class', 'col s1')
  fromNode.innerHTML = taskFrom.getHours() + ':' + taskFrom.getMinutes().toString().padStart(2, '0')
  taskNode.appendChild(fromNode)

  let toNode = document.createElement('div')
  toNode.setAttribute('class', 'col s1')
  toNode.innerHTML = taskTo.getHours() + ':' + taskTo.getMinutes().toString().padStart(2, '0')
  taskNode.appendChild(toNode)

  let projectNode = document.createElement('div')
  projectNode.setAttribute('class', 'col s2')
  projectName = projectStorage.find(e => e.id == task.project)
  projectNode.innerHTML = projectName.name
  taskNode.appendChild(projectNode)

  let typeNode = document.createElement('div')
  typeNode.setAttribute('class', 'col s2')
  typeName = typeStorage.find(e => e.id == task.type)
  typeNode.innerHTML = typeName.name
  taskNode.appendChild(typeNode)

  let textNode = document.createElement('div')
  textNode.setAttribute('class', 'col s4')
  textNode.innerHTML = task.task
  taskNode.appendChild(textNode)

  // Append new node to "items"
  output.tasks.appendChild(taskNode)
}

function renderSelectOption(e,id,value){
  let newOption = document.createElement('option')
  newOption.setAttribute('value',id)
  newOption.innerText = value
  e.appendChild(newOption)
}

function addBreak() {
  let breakNode = document.createElement('div')
  breakNode.setAttribute('class', 'task row ')
  breakNode.innerHTML = '<b>- Pause -</b>'
  output.tasks.appendChild(breakNode)
}

function renderAll() {
  projectStorage.forEach( project => {
    renderSelectOption(input.project,project.id,project.name)
  })

  typeStorage.forEach( type => {
    renderSelectOption(input.type,type.id,type.name)
  })

  taskStorage.forEach((task, i) => {
    if(taskStorage[i-1]){
      const lastTaskTo = new Date(taskStorage[i-1].to)
      const thisTaskFrom = new Date(task.from)

      if(lastTaskTo < thisTaskFrom){
        addBreak()
      }
    }
    render(task)
  })
}
renderAll()