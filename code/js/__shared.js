'use strict'

console.log('loaded: __shared.js')

//
//  runtime.getManifest
//  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/getManifest
//  Get the complete manifest.json file, serialized to a JSON object.
//
const version = browser.runtime.getManifest().version

//  browser.windows.onCreated.addListener(listener)
//  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/onCreated
//  Fired when a window is created.
//
//  callback: listener -> Function that will be called when this event occurs. The function will
//                        be passed the following arguments:
//  {
//    window -> A windows.Window object containing details of the window that was created.
//  }
//
browser.windows.onCreated.addListener((window) => {
  console.log(window)
  //
  // tabs.query
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query
  // Gets all tabs that have the specified properties, or all tabs if no properties are
  // specified.
  //
  // Return value:
  // A Promise that will be fulfilled with an array of tabs.Tab objects, containing
  // information about each matching tab. If any error occurs, the promise will be rejected
  // with an error message.
  //
  // queryInfo: Object -> The properties that a tab must match to be included in the
  //                      resulting list.
  // {
  //   windowId: integer -> The ID of the parent window, or windows.WINDOW_ID_CURRENT for the
  //                        current window.
  // }
  browser.tabs
    .query({ windowId: window.id })
    .then(tabs => tabs
      .filter(tab => tab.active === true)
      .filter(tab => tab.title === 'New Tab')
      .forEach(tab => {
        browser.tabs.duplicate(tab.id)
        browser.tabs.remove(tab.id)
      })
    )
    .catch(err => {
      console.log('[onCreated@tabs.query] error:', err)
    })
})
