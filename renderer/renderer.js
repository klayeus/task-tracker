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
storage = JSON.parse(localStorage.getItem('tt-tasks')) || []

// set current date
let curDateObj = new Date()
curDate = curDateObj.getDate() + '.' + (curDateObj.getMonth() + 1)
input.date.value = curDate

// save task to tasks
function save(){
  let task = {
    'date': input.date.value,
    'from': input.from.value,
    'to': input.to.value,
    'project': input.project.value,
    'type': input.type.value,
    'task': input.task.value
  }
  storage.push(task)

  // render
  render(task)

  // persist
  localStorage.setItem('tt-tasks', JSON.stringify(storage))
}

// render task
function render(task){
  // Create a new DOM node
  let taskNode = document.createElement('div')
  // Assign classes
  taskNode.setAttribute('class', 'task row ')

  let dateNode = document.createElement('div')
  dateNode.setAttribute('class', 'col s1')
  dateNode.innerHTML = task.date
  taskNode.appendChild(dateNode)

  let fromNode = document.createElement('div')
  fromNode.setAttribute('class', 'col s1')
  fromNode.innerHTML = task.from
  taskNode.appendChild(fromNode)

  let toNode = document.createElement('div')
  toNode.setAttribute('class', 'col s1')
  toNode.innerHTML = task.to
  taskNode.appendChild(toNode)

  let projectNode = document.createElement('div')
  projectNode.setAttribute('class', 'col s2')
  projectNode.innerHTML = task.project
  taskNode.appendChild(projectNode)

  let typeNode = document.createElement('div')
  typeNode.setAttribute('class', 'col s2')
  typeNode.innerHTML = task.type
  taskNode.appendChild(typeNode)

  let textNode = document.createElement('div')
  textNode.setAttribute('class', 'col s4')
  textNode.innerHTML = task.task
  taskNode.appendChild(textNode)

  // Append new node to "items"
  output.tasks.appendChild(taskNode)
} 

function addBreak(){
  let breakNode = document.createElement('div')
  breakNode.setAttribute('class', 'task row ')
  breakNode.innerHTML = '<b>- Pause -</b>'
  output.tasks.appendChild(breakNode)
}

function renderAll(){
  storage.forEach(task => {
    render(task)
  })
}
renderAll()