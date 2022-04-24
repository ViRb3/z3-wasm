# z3-wasm

A simple Z3 SMT2 analyzer, ran entirely in your browser using WebAssembly.

## Website

#### https://virb3.github.io/z3-wasm/

## Building

Place all Z3 assets into the directory `static/`. If you want pre-built binaries, check the `z3` branch on this repo. Then, run:

```bash
npm i
npm run build
```

The built website will be in `dist/`.

## Credits

Front end heavily influenced from [cpitclaudel/z3.wasm](https://github.com/cpitclaudel/z3.wasm).
