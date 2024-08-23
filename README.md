# counter-wc

<div align="center">

[![npm version](https://badge.fury.io/js/counter-wc.svg)](https://badge.fury.io/js/counter-wc)
![npm](https://img.shields.io/npm/dw/counter-wc)
[![size](https://img.shields.io/bundlephobia/minzip/counter-wc)](https://bundlephobia.com/package/counter-wc)
[![PRs Welcome][badge-prwelcome]][prwelcome]
<img src="https://github.com/aralroca/counter-wc/workflows/Test/badge.svg" /></a>
<a href="https://twitter.com/intent/follow?screen_name=aralroca">
<img src="https://img.shields.io/twitter/follow/aralroca?style=social&logo=x"
            alt="follow on Twitter"></a>

</div>

It is a very silly example of a **Counter** Web Component. 

```sh
> bun install counter-wc
```

The idea of this library is to show how you can use the [Brisa](https://brisa.build) Web Component compiler to transform JSX with Signals into two files; one to load the web component on the client, and another to load the web component on the server to make the SSR of the Web Component easy.

## How to use this Counter Web Component

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brisa Web Component Example</title>
  <script type="importmap">
    {
      "imports": {
        "brisa/client": "https://unpkg.com/brisa@latest/client-simplified/index.js"
      }
    }
  </script>
  <script type="module" src="https://unpkg.com/counter-wc@latest"></script>
</head>
<body>
  <counter-wc start="15"></counter-wc>
</body>
</html>
```

> [!NOTE]
>
> The importmap is necessary because all the compiled web components are only the rendering function so that they take up little space, but they need the Brisa wrapper to work correctly.


## How to use this Counter Web Component with SSR

For this, you need Bun.js or Node.js. You can integrate it with any framework without the need to have JSX. What you will need is to have the Brisa library installed to use its `renderToString`.

```sh
> bun install brisa
> bun install counter-wc
```

And then you can use the `renderToString` function to render the web component on the server.

**ssr.js**

```jsx
import { renderToString } from 'brisa/server';
import { jsx } from 'brisa/jsx-runtime';
import CustomCounter from 'counter-wc/server';

const html = `
	<!DOCTYPE html>
	<html lang="en">
		<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Brisa Web Component Example</title>
		<script type="importmap">
			{
				"imports": {
					"brisa/client": "https://unpkg.com/brisa@latest/client-simplified/index.js"
				}
			}
		</script>
		<script type="module" src="https://unpkg.com/counter-wc@latest"></script>
		</head>
		<body>
			${await renderToString(jsx(CustomCounter, { start: 10 }))}
		</body>
	</html>
`;

console.log(html);
```

Then run `bun run ssr.js` and you will see the HTML with the rendered web component using the [Declarative Shadow DOM](https://web.dev/articles/declarative-shadow-dom).

## Using the Web Component in Brisa

Brisa uses a special integration file located at `web-components/_integrations.(tsx|ts|js|jsx)`. This file maps Web Component selectors to their respective libraries, ensuring they are correctly loaded when needed.

```tsx
import type { WebComponentIntegrations } from "brisa";

export default {
  "counter-wc": {
    client: "counter-wc",
    server: "counter-wc/server",
    types: "counter-wc/types",
  },
} satisfies WebComponentIntegrations;
```

> [!NOTE]
>
> After this integration, you can use the Web Component in your Brisa application directly by typing `<counter-wc></counter-wc>` in your JSX code (pages, components, web components, elements). SSR and TypeScript support are automatically handled by Brisa.

## Building the Web Component

You just need to clone the repository, install the dependencies with:

```sh
> bun install
```

After that, you can build the Web Component with:

```sh
> bun run build
```

Below the build script runs the `brisa build -w src/counter-wc.tsx` command that does the magic of transforming the JSX with Signals into two files, one for the client and one for the server.

Feel free to use this reference library to create your own Web Components with Brisa and share them with the community.

## License

MIT
