const { remote } = require('electron')
const { BrowserWindow, dialog, screen } = remote
const { min, max, } = require("lodash")

var button = document.getElementById("b")

button.onclick = async () => {
  var url = document.getElementById("u").value
  var displays = screen.getAllDisplays();
  var minX = 0;
  var maxX = 0;
  var minY = 0;
  var maxY = 0;

  displays.forEach(display => {
    minX = min([display.bounds.x, minX])
    maxX = max([display.bounds.x + display.bounds.width, maxX])
    minY = min([display.bounds.y, minY])
    maxY = max([display.bounds.y + display.bounds.height, maxY])
  })

  if (url) {
    var subWindow = new BrowserWindow({
      center: true,
      frame: false
    })
    try {
      await subWindow.loadURL(url)
      // only resize could make page cross screens
      subWindow.setBounds({
        x: minX,
        y: minY,
        width: Math.abs(maxX - minX),
        height: Math.abs(maxY - minY),
      })
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