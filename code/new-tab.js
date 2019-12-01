const container = document.querySelector('#container')
const search = document.querySelector('#search')

document.addEventListener('keydown', function (event) {
  if (document.activeElement !== search) {
    search.value = ''
    search.focus()
  }
})

search.addEventListener('keydown', function (event) {
  // on enter
  if (event.keyCode === 13) {
    go()
  }
  // on escape
  if (event.keyCode === 27) {
    search.value = ''
  }
})

function resizeContainer () {
  let size = 200
  if (window.innerHeight < 400) {
    size = window.innerHeight / 2 - 25
  }
  container.setAttribute('style', `padding-top: ${size}px`)
}

window.onresize = resizeContainer
resizeContainer()

// browser.search.search()
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/search/search
// Perform a search using the search engine specified, or the default search engine if no search engine is specified.
// The results will be displayed in a new tab, or if the tabId argument is given, in the tab identified by this.
// To use this function in your extension you must ask for the "search" manifest permission.
// To get the installed search engines, use search.get().
//
function go () {
  browser.tabs.getCurrent(tab =>
    browser.search.search({
      query: search.value,
      tabId: tab.id
    })
  )
}
