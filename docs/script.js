'use strict'

const localBase = './noir.css/'

const themeForm = document.getElementById('theme-form')
const stylesheet = document.getElementById('js-stylesheet')
const startupStylesheet = document.getElementById('js-startup-stylesheet')
const copyButton = document.getElementById('copy-button')
const copyButtonFeedback = document.getElementById('copy-button-feedback')
const linkSnippets = [].slice.call(document.querySelectorAll('#link-snippet-container > pre'))

const table = {
  fileName: document.getElementById('table-file-name'),
  theme: document.getElementById('table-theme')
}

const updateTheme = () => {
  const theme = themeForm.querySelector('input[name="theme"]:checked').value

  const fileName = `${theme === 'auto' ? 'noir' : theme}.min.css`
  const localUrl = `${localBase}${fileName}`

  stylesheet.href = localUrl

  for (const snippet of linkSnippets) {
    snippet.hidden = snippet.id.indexOf(theme) === -1
  }

  table.fileName.innerText = fileName

  if (theme === 'auto') {
    table.theme.innerHTML = `
    Respects user-defined theme settings using <a style="--links: var(--code)" href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme" target="_blank" rel="noopener"><code>prefers-color-scheme</code></a>.<br>
    Light in browsers where the theme settings can't be detected.
    `
  } else {
    table.theme.innerText = `Theme is forced to ${theme}.`
  }
}

themeForm.addEventListener('change', updateTheme)

updateTheme()
startupStylesheet.parentElement.removeChild(startupStylesheet)

copyButton.addEventListener('click', () => {
  const clipboard = navigator.clipboard || window.clipboard
  const theme = themeForm.querySelector('input[name="theme"]:checked').value
  const snippetText = document.querySelector(`#link-snippet-${theme} code`).textContent

  clipboard.writeText(snippetText)
    .then(() => { copyButtonFeedback.textContent = '\u2714' })
    .catch(() => { copyButtonFeedback.textContent = '\u274C' })
    .then(() => setTimeout(() => { copyButtonFeedback.textContent = '' }, 1000))
})

document.getElementById('dialog-trigger').addEventListener('click', () => {
  document.getElementById('dialog-result').innerText = ''
  document.getElementById('dialog').showModal()
})

document.getElementById('dialog').addEventListener('close', (event) => {
  document.getElementById('dialog-result').innerText = `Your answer: ${event.target.returnValue}`
})
