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
  if (!themeForm || !stylesheet) {
    console.error('Required elements not found')
    return
  }

  const checkedInput = themeForm.querySelector('input[name="theme"]:checked')
  if (!checkedInput) {
    console.error('No theme selected')
    return
  }

  const theme = checkedInput.value
  const fileName = `${theme === 'auto' ? 'noir' : theme}.min.css`
  const localUrl = `${localBase}${fileName}`

  stylesheet.href = localUrl

  for (const snippet of linkSnippets) {
    snippet.hidden = snippet.id.indexOf(theme) === -1
  }

  if (table.fileName) {
    table.fileName.innerText = fileName
  }

  if (table.theme) {
    if (theme === 'auto') {
      table.theme.innerHTML = `
    Respects user-defined theme settings using <a style="--links: var(--code)" href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme" target="_blank" rel="noopener"><code>prefers-color-scheme</code></a>.<br>
    Light in browsers where the theme settings can't be detected.
    `
    } else {
      table.theme.innerText = `Theme is forced to ${theme}.`
    }
  }
}

if (themeForm) {
  themeForm.addEventListener('change', updateTheme)
}

updateTheme()
startupStylesheet.parentElement.removeChild(startupStylesheet)

if (copyButton) {
  copyButton.addEventListener('click', () => {
    const clipboard = navigator.clipboard || window.clipboard
    const checkedInput = themeForm.querySelector('input[name="theme"]:checked')
    if (!checkedInput) return

    const theme = checkedInput.value
    const snippetElement = document.querySelector(`#link-snippet-${theme} code`)
    if (!snippetElement) return

    const snippetText = snippetElement.textContent

    clipboard.writeText(snippetText)
      .then(() => { copyButtonFeedback.textContent = '\u2714' })
      .catch(() => { copyButtonFeedback.textContent = '\u274C' })
      .then(() => setTimeout(() => { copyButtonFeedback.textContent = '' }, 1000))
  })
}

const dialogTrigger = document.getElementById('dialog-trigger')
const dialog = document.getElementById('dialog')
const dialogResult = document.getElementById('dialog-result')

if (dialogTrigger && dialog) {
  dialogTrigger.addEventListener('click', () => {
    if (dialogResult) {
      dialogResult.innerText = ''
    }
    dialog.showModal()
  })

  dialog.addEventListener('close', (event) => {
    if (dialogResult) {
      dialogResult.innerText = `Your answer: ${event.target.returnValue}`
    }
  })
}
