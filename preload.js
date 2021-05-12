// require modules
const { contextBridge } = require('electron')
require('materialize-css')

// afer everything loaded, execute
document.addEventListener('DOMContentLoaded', function () {

  // initialize materialze select fields
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});

});