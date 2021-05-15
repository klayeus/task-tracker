projects = document.getElementById('projects-window')

// init storage
projectStorage = JSON.parse(localStorage.getItem('tt-projects')) || []
