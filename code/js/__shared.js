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
//
//    attachInfo: object -> ID of the new window, and index of the tab within it.
//  }
browser.tabs.onAttached.addListener((tabId, attachInfo) => {
    //
    //  browser.windows.update()
    //  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/update
    //  Updates the properties of a window. Use this to move, resize, and (un)focus a window, etc.
    //
    //  windowId: integer -> ID of the window to update.
    //
    //  updateInfo: object -> Object containing the properties to update.
    //  {
    //    focused: boolean -> If true, brings the window to the front. If false, brings the next
    //                        window in the z-order to the front.
    //  }
    //
    //  returns
    //    A Promise that will be fulfilled with a windows.Window object containing the details of
    //    the updated window.
    browser.windows.update(attachInfo.newWindowId, { focused: true })
        .then(_ => {
            //
            //  browser.tabs.get()
            //  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/get
            //  Given a tab ID, get the tab's details as a tabs.Tab object.
            //
            //  tabId: integer -> ID of the tab to get.
            //
            //  returns
            //    A Promise that will be fulfilled with a tabs.Tab object containing information
            //    about the tab.
            browser.tabs.get(tabId)
                .then(tab => {
                    //
                    // true new tabs will have a status of 'complete'
                    // other tabs will be in the 'loading' status
                    if (tab.status === 'complete'
                        && tab.title === 'New Tab'
                        && tab.url === 'about:blank') {
                        //
                        //  browser.tabs.create()
                        //  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/create
                        //  Creates a new tab.
                        //
                        //  createProperties: object -> Properties to give the new tab. To learn more about these
                        //                              properties, see the tabs.Tab documentation.
                        //  {
                        //    active: boolean -> Whether the tab should become the active tab in the window. If
                        //                       false, it has no effect. Does not affect whether the window is
                        //                       focused (see windows.update). Defaults to true.
                        //
                        //    url: string -> The New Tab page (about:newtab) can be opened if no value for URL
                        //                   is provided.
                        //  }
                        //
                        //  returns
                        //    A Promise that will be fulfilled with a tabs.Tab object containing details about
                        //    the created tab.
                        browser.tabs.create({ active: true })
                            .then(_ => browser.tabs.remove(tab.id))
                    }
                })
        })
})
