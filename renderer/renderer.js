// require modules
const { contextBridge, ipcRenderer } = require('electron')
require('materialize-css')
require('./js/tasks')
require('./js/projects')
require('./js/types')

// afer everything loaded, execute
document.addEventListener('DOMContentLoaded', function () {
  // initialize materialze select fields
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
});

// Open tasks window
ipcRenderer.on('menu-show-tasks', () => {
  document.getElementById('tasks-window').style.display = 'block'
  document.getElementById('projects-window').style.display = 'none'
  document.getElementById('types-window').style.display = 'none'
})

// Open projects window
ipcRenderer.on('menu-show-projects', () => {
  document.getElementById('tasks-window').style.display = 'none'
  document.getElementById('projects-window').style.display = 'block'
  document.getElementById('types-window').style.display = 'none'
})

// Open types window
ipcRenderer.on('menu-show-types', () => {
  document.getElementById('tasks-window').style.display = 'none'
  document.getElementById('projects-window').style.display = 'none' 
  document.getElementById('types-window').style.display = 'block'
})