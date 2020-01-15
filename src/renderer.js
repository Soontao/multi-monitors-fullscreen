const { remote } = require('electron')
const { BrowserWindow, dialog } = remote

var button = document.getElementById("b")

button.onclick = async () => {
  var url = document.getElementById("u").value
  var subWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })
  try {
    await subWindow.loadURL(url)
  } catch (error) {
    // url loading failed
    subWindow.close()
    dialog.showMessageBox({
      message: error.message
    })
  }

}