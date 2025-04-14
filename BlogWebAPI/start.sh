#!/bin/bash

set -e

echo "🔄 Loading environment variables..."

set -a
source ../.env
source .env
set +a

echo "🛑 Stopping existing containers (if any)..."
docker compose down

echo "🚀 Starting containers with version tag: ${VERSION_TAG}"
docker compose up -d

echo "✅ All services are up and running!"
