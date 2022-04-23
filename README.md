# z3-wasm

A simple Z3 SMT2 analyzer, ran entirely in your browser using WebAssembly.

## Using

Grab the pre-built artifacts from the releases. For how to use them, check out the official binding [notes](https://github.com/Z3Prover/z3/blob/master/src/api/js/PUBLISHED_README.md). The included test cases are a great starting point.

## Building

The [official guide](https://github.com/Z3Prover/z3/tree/master/src/api/js) explains this well. You can also check the GitHub workflow.

For Docker Ubuntu 22.04, you will need the following pre-setup:

```bash
apt update
apt install build-essential git python3
ln /usr/bin/python3 /usr/bin/python
```

