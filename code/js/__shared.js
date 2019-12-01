'use strict'

console.log('loaded: __shared.js')

//
//  runtime.getManifest
//  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/getManifest
//  Get the complete manifest.json file, serialized to a JSON object.
//
const version = browser.runtime.getManifest().version

//  browser.tabs.onAttached.addListener(listener)
//  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onAttached
//  Fired when a tab is attached to a window, for example because it was moved between windows.
//
//  callback: listener -> Function that will be called when this event occurs. The function will
//                        be passed the following arguments:
//  {
//    tabId: integer -> ID of the tab that was attached to a new window.
//    attachInfo: object -> ID of the new window, and index of the tab within it.
//  }
//
browser.tabs.onAttached.addListener((tabId, attachInfo) => {
  //  browser.tabs.onAttached.addListener(listener)
  //  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onAttached
  //  Fired when a tab is attached to a window, for example because it was moved between windows.
  //
  //  callback: listener -> Function that will be called when this event occurs. The function will
  //                        be passed the following arguments:
  //  {
  //    tabId: integer -> ID of the tab that was attached to a new window.
  //    attachInfo: object -> ID of the new window, and index of the tab within it.
  //  }
  //
  browser.windows.update(attachInfo.newWindowId, { focused: true })
    .then(_ => {
      browser.tabs.get(tabId)
        .then(tab => {
          if (tab.title === 'New Tab') {
            browser.tabs.create({ active: true })
              .then(_ => browser.tabs.remove(tab.id))
          }
        })
    })
})
