#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
REPO_ROOT="$SCRIPT_DIR/.."

DOCKER="docker"
DOCKER_OPTS=""

USE_DOCKER=false
OUT_DIR="build"

build() {
  cd "$REPO_ROOT"

  if [ ! -d node_modules ]; then
    npm ci --ignore-scripts
  fi

  npm run lint:ts
  npm run lint:editorconfig
  npm run build -- --outDir "$OUT_DIR"
  cd -
}

run_build() {
  if [ "$USE_DOCKER" = true ]; then
    cd "$REPO_ROOT"

    $DOCKER build -t frontend-env scripts/docker
    $DOCKER run $DOCKER_OPTS --rm \
      --volume ${PWD}:/home:Z -w /home \
      -u $(id -u ${USER}):$(id -g ${USER}) \
      frontend-env ./scripts/build.sh
    cd -
  else
    build
  fi
}

while [[ "$#" -gt 0 ]]; do
  case $1 in
  --docker) USE_DOCKER=true ;;
  *)
    echo "Unknown parameter passed: $1"
    exit 1
    ;;
  esac
  shift
done

run_build
