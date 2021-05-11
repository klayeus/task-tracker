const { contextBridge } = require('electron')
require('materialize-css')

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});

  let curDateObj = new Date()
  curDate = curDateObj.getDate()+'.'+(curDateObj.getMonth()+1)
  const dateInput = document.getElementById('date')
  dateInput.value = curDate
});

contextBridge.exposeInMainWorld(
  'electron',
  {
    saveTask: () => {
      let task = {
        'date': document.getElementById('date').value,
        'from': document.getElementById('from').value,
        'to': document.getElementById('to').value,
        'project': document.getElementById('project').value,
        'type': document.getElementById('type').value,
        'task': document.getElementById('task').value
      }
    
      console.log(task)
    }
  }
)