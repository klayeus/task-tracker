
// html elements
projects = document.getElementById('projects-window')
projectsTbody = document.getElementById('projects-table-tbody')

// init storage
projectStorage = JSON.parse(localStorage.getItem('tt-projects')) || []

// insert dummy data
if (projectStorage.length === 0) {
  const initProjects = [
    {
    'id':'project-1',
    'name': 'Projekt 1'
    },
    {
      'id':'project-2',
      'name': 'Projekt 2'
    },
    {
      'id':'project-3',
      'name': 'Projekt 3'
    }
  ]
  initProjects.forEach(project => {
    projectStorage.push(project)
    localStorage.setItem('tt-projects', JSON.stringify(projectStorage))
  })
}

// render projects
function renderProject(project){
  let rowNode = document.createElement('tr')
  let idColNode = document.createElement('td')
  let nameColNode = document.createElement('td')
  idColNode.innerText = project.id
  nameColNode.innerText = project.name
  rowNode.appendChild(idColNode)
  rowNode.appendChild(nameColNode)
  projectsTbody.appendChild(rowNode)
}

function renderAllProjects() {
  projectStorage.forEach(project => {
    renderProject(project)
  })
}
renderAllProjects()


document.getElementById('add-project').addEventListener('click', e => {
  const newProject = {'id': document.getElementById('project-id').value,'name': document.getElementById('project-name').value}
  renderProject(newProject)
  projectStorage.push(newProject)
  localStorage.setItem('tt-projects', JSON.stringify(projectStorage))
})