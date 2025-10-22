/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","instagram":"https://www.instagram.com/"}
const engine = "hhttps://www.google.com/search?q={query}"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"iyGwc4dSsRt9pGY1","label":"reddit","bookmarks":[{"id":"m1nde1uCq7iT9WB5","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"BEFVLyo2nEF8DXAH","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"F1G8aNb2DnZzP0mx","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"zpVbBeLaJ5UTrxr9","label":"design tools","bookmarks":[{"id":"EXia1o8eT88TecAU","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"SK2kWUdgU2uggJ2i","label":"haikei","url":"https://app.haikei.app/"},{"id":"t7Wq6NFQcMAr5yfT","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"67ROIuZFdny1tCKq","label":"worth reading","bookmarks":[{"id":"IvZru2phy6NALDa9","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"0PDARDJF69mieGtA","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"qBZV2AaIZKHY7sIs","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"bPZoxHk9E3XLI4MP","label":"sources","bookmarks":[{"id":"sjyTomEeacT6p1AT","label":"icons","url":"https://feathericons.com/"},{"id":"UbZfVQBqa7WhBOKK","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"8iGHXP9JmxCp9g7A","label":"@startpage","url":"https://prettycoffee.github.io/startpage"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
