// require modules
const { contextBridge } = require('electron')
require('materialize-css')

// afer everything loaded, execute
document.addEventListener('DOMContentLoaded', function () {

  // set input fields
  global.input = {
    'date': document.getElementById('date'),
    'from': document.getElementById('from'),
    'to': document.getElementById('to'),
    'project': document.getElementById('project'),
    'type': document.getElementById('type'),
    'task': document.getElementById('task')
  }

  // initialize materialze select fields
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});

  // set current date
  let curDateObj = new Date()
  curDate = curDateObj.getDate() + '.' + (curDateObj.getMonth() + 1)
  input.date.value = curDate

  // init storage
  global.storage = JSON.parse(localStorage.getItem('tt-tasks')) || []
});

// inject functions into window, like "window.tasks.save()"
contextBridge.exposeInMainWorld(
  'tasks',
  {
    save: () => {
      let task = {
        'date': input.date.value,
        'from': input.from.value,
        'to': input.to.value,
        'project': input.project.value,
        'type': input.type.value,
        'task': input.task.value
      }
      storage.push(task)
      console.log(task)

      // persist
      localStorage.setItem('tt-tasks', JSON.stringify(storage))
    }
  }
)