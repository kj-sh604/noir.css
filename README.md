# noir.css

<img width="2562" height="800" alt="combined" src="https://github.com/user-attachments/assets/e9ba9482-dc60-49a7-b7b7-ced5627d2e35" />

&nbsp;

A drop-in collection of monochrome CSS styles to make simple websites look clean and elegant.

Forked from [water.css](https://github.com/kognise/water.css) — redesigned with a refined black, grey, and white palette. No classes needed. Just include it and go.

## goals

- responsive
- monochrome — blacks, greys, whites with subtle accent tones
- accessible (as wcag-friendly as possible)
- tiny size
- beautiful
- no classes

## usage

Stick this in your `<head>`:

### automatic theme (respects system preference):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kj-sh604/noir.css/out/noir.min.css">
```

### dark theme:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kj-sh604/noir.css/out/dark.min.css">
```

### light theme:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kj-sh604/noir.css/out/light.min.css">
```

Unminified versions are also available — just remove `.min` from the filename.

### how the automatic theme works

The main `noir.css` file switches between light and dark mode based on the user's system preferences via the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query. In browsers where this can't be detected, it defaults to the light theme.

## theming

noir.css is built with CSS custom properties, so overriding the palette is trivial. Available variables:

- `--background-body`
- `--background`
- `--background-alt`
- `--selection`
- `--text-main`
- `--text-bright`
- `--text-muted`
- `--links`
- `--focus`
- `--border`
- `--code`
- `--animation-duration`
- `--button-hover`
- `--scrollbar-thumb`
- `--scrollbar-thumb-hover`
- `--form-placeholder`
- `--form-text`
- `--variable`
- `--highlight`
- `--select-arrow`

Example — override link color:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kj-sh604/noir.css/out/noir.min.css">
<style>
  :root {
    --links: #a0a6b2;
  }
</style>
```

## building from source

```sh
git clone https://github.com/kj-sh604/noir.css.git
cd noir.css
yarn install
yarn build
```

Compiled files end up in `out/`.

## license

[MIT](LICENSE.md)

## credits

Based on [water.css](https://github.com/kognise/water.css) by Kognise.
