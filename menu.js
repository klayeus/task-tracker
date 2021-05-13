
// Modules
const {Menu, shell} = require('electron')

// Module function to create main app menu
module.exports = appWin => {

  // Menu template
  let template = [
    {
      label: 'Einstellungen',
      submenu: [
        {
          label: 'Projekte',
          click: () => {
            appWin.send('menu-show-projects')
          }
        },
        {
          label: 'Aufgabentypen',
          click: () => {
            appWin.send('menu-open-types')
          }
        }
      ]
    }
  ]

  // Create Mac app menu
  if ( process.platform === 'darwin' ) template.unshift({ role: 'appMenu' })

  // Build menu
  let menu = Menu.buildFromTemplate(template)

  // Set as main app menu
  Menu.setApplicationMenu(menu)
}
