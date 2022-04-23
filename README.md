# z3-wasm

A simple Z3 SMT2 analyzer, ran entirely in your browser using WebAssembly. Front end taken from https://github.com/cpitclaudel/z3.wasm.

## Using

Hop to the website at https://virb3.github.io/z3-wasm/ and type in the textbox. When you click the run button, Z3 will be invoked, and the result will be printed on your screen.

## Building

Place all Z3 assets into the directory `static/`. If you want pre-built binaries, check the `z3` branch on this repo. Then, run:

```bash
npm i
npm run build
```

The built website will be in `dist/`.
