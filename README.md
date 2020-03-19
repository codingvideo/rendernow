# Render Now

a command-line utility tool to render HTML with a template and JavaScript code.

## Install

```bash
npm install -g codingvideo/rendernow
```

## Getting Started

After installing the npm package, the `rendernow` command will be available to use inside the console.

```bash
rendernow -i template.html -o output.html -js code-file.js
```

The `rendernow` command accepts three parameters:
1) -i is the name of the template file
2) -o is the name of the HTML output file
3) -js is the name of JavaScript file that you want to use inside the template

Inside the template, you can call the functions from the JavaScript file using the following syntax:

```html
<p><!-- {{ getValue() }}  --></p>
```
(double curly braces within an HTML comment)

This template will get rendered with the value from a JavaScript function called `getValue`:

```js
// code.js
function getValue(){
  return 'Hello world';
}
```

The output will be:

```html
<p>Hello world</p>
```
