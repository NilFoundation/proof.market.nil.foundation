<h1 align="center">=nil; Foundation Proof market interface</h1>

<br />

This is web interface for proof-market built on Reactjs.

## Table of contents
  - [Dev](#dev)
  - [Build](#build)

## Dev
To run the project in development mode:
```bash
npm ci
npm start
```

## Build
To build the project:
```bash
./scripts/build.sh
```
This command will install required dependencies and build static project version into the `build` directory.

To build the project in docker environment with Node.js, add `--docker` argument:
```bash
./scripts/build.sh --docker
```
