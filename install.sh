#!/bin/bash
# Install dependencies for the whole monorepo (root, backend and frontend).
set -e

echo "Installing root dependencies..."
yarn install

echo "Installing backend dependencies..."
(cd backend && yarn install)

echo "Installing frontend dependencies..."
(cd frontend && yarn install)

echo "All dependencies installed."
