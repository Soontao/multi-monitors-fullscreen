const { remote } = require('electron')
const { BrowserWindow, dialog } = remote

var button = document.getElementById("b")

button.onclick = async () => {
  var url = document.getElementById("u").value
  if (url) {
    var subWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false
    })
    try {
      await subWindow.loadURL(url)
    } catch (error) {
      // url loading failed
      subWindow.close()
      dialog.showMessageBox({
        type: "error",
        message: error.message
      })
    }
  } else {
    dialog.showMessageBox({
      type: "error",
      message: "Please input a valid url string."
    })
  }


}