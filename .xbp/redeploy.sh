#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
XBP_JSON="$SCRIPT_DIR/xbp.json"

APP_NAME=""
PORT=""
APP_DIR=""
BRANCH=""

# Parse CLI args
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --app-name)
            APP_NAME="$2"
            shift 2
            ;;
        --port)
            PORT="$2"
            shift 2
            ;;
        --app-dir)
            APP_DIR="$2"
            shift 2
            ;;
        --branch)
            BRANCH="$2"
            shift 2
            ;;
        *)
            echo "Unknown argument: $1"
            exit 1
            ;;
    esac
done

# Load fallback values from JSON if needed
if [[ -z "$APP_NAME" || -z "$PORT" || -z "$APP_DIR" || -z "$BRANCH" ]]; then
    if [ ! -f "$XBP_JSON" ]; then
        echo "Missing CLI args and $XBP_JSON not found."
        exit 1
    fi
    echo "Reading config from $XBP_JSON..."
    [[ -z "$APP_NAME" ]] && APP_NAME=$(jq -r '.project_name' "$XBP_JSON")
    [[ -z "$PORT" ]] && PORT=$(jq -r '.port' "$XBP_JSON")
    [[ -z "$APP_DIR" ]] && APP_DIR=$(jq -r '.build_dir' "$XBP_JSON")
    [[ -z "$BRANCH" ]] && BRANCH=$(jq -r '.branch // "main"' "$XBP_JSON")
fi

# Final validations
if [[ -z "$APP_NAME" || -z "$PORT" || -z "$APP_DIR" ]]; then
    echo "Missing required deployment parameters."
    exit 1
fi

APP_DIR=$(realpath "$APP_DIR")
XBP_JSON="$APP_DIR/.xbp/xbp.json"

if [ ! -f "$XBP_JSON" ]; then
    echo "Expected $XBP_JSON not found."
    exit 1
fi

if ! command -v jq &>/dev/null; then
    echo "'jq' not installed."
    exit 1
fi

# Handle port usage
if sudo fuser "${PORT}/tcp" > /dev/null 2>&1; then
    echo "Port $PORT is in use. Trying to kill process..."
    if ! sudo fuser -k "${PORT}/tcp"; then
        echo "Searching for free port..."
        for ((NEW_PORT=1025; NEW_PORT<=65535; NEW_PORT++)); do
            if ! sudo fuser "${NEW_PORT}/tcp" > /dev/null 2>&1; then
                PORT=$NEW_PORT
                echo "Using new port: $PORT"
                break
            fi
        done
        if [[ "$PORT" -gt 65535 ]]; then
            echo "No free ports found."
            exit 1
        fi
        jq ".port = $PORT" "$XBP_JSON" > "$XBP_JSON.tmp" && mv "$XBP_JSON.tmp" "$XBP_JSON"
    fi
fi

echo "🔁 Deploying $APP_NAME on port $PORT from branch '$BRANCH'"

cd "$APP_DIR" || { echo "Could not cd to $APP_DIR"; exit 1; }

# Git checkout if branch ≠ main
echo "Resetting repo..."
git reset --hard || { echo "Git reset failed"; exit 1; }

if [ "$BRANCH" != "main" ]; then
    echo "Checking out branch $BRANCH..."
    git fetch origin "$BRANCH" || { echo "Failed to fetch $BRANCH"; exit 1; }
    git checkout "$BRANCH" || git checkout -b "$BRANCH" origin/"$BRANCH" || { echo "Checkout failed"; exit 1; }
fi

echo "Pulling latest from $BRANCH..."
git pull origin "$BRANCH" || { echo "Git pull failed"; exit 1; }

echo "Installing dependencies..."
pnpm install || { echo "Install failed"; exit 1; }

echo "Building..."
pnpm run build || { echo "Build failed"; exit 1; }

echo "Stopping old PM2 process..."
pm2 stop "$APP_NAME" || echo "No existing PM2 process."

echo "Killing anything on port $PORT..."
sudo fuser -k ${PORT}/tcp || echo "Nothing on port."

echo "Starting app with PM2..."
pm2 start "pnpm run start -p $PORT" --name "$APP_NAME" -- --port $PORT || { echo "Failed to start"; exit 1; }

pm2 save || { echo "PM2 save failed"; exit 1; }

echo "✅ App deployed on port $PORT (branch: $BRANCH)"

# Version bump
PROJECT_NAME=$(jq -r '.project_name' "$XBP_JSON")
VERSION_INFO=$(curl -s -X POST "https://api.suitsbooks.nl/fetch/data" \
    -H "Content-Type: application/json" \
    -H "X-Company-Id: 9fafa769-bbeb-4dd3-a6d7-2ef804b9122f" \
    -H "X-Organization-Id: 655c1024-a0c2-42b0-8520-c73c540372d1" \
    -H "X-User-Id: 0f57d6ed-caae-439a-aa50-70a83997d270" \
    -H "Cache-Control: no-cache" \
    -d '{
        "table_name": "versioning",
        "conditions": [{ "eq_column": "project_name", "eq_value": "'"$PROJECT_NAME"'" }],
        "limit": 1
    }')

CURRENT_VERSION_MINOR=$(echo "$VERSION_INFO" | jq -r '.[0].version_minor // 0')
NEW_VERSION_MINOR=$((CURRENT_VERSION_MINOR + 1))
CURRENT_TIMESTAMP=$(date +%s)

curl -s -X PUT "https://api.suitsbooks.nl/update/data" \
    -H "Content-Type: application/json" \
    -H "X-Company-Id: 9fafa769-bbeb-4dd3-a6d7-2ef804b9122f" \
    -H "X-Organization-Id: 655c1024-a0c2-42b0-8520-c73c540372d1" \
    -H "X-User-Id: 0f57d6ed-caae-439a-aa50-70a83997d270" \
    -H "Cache-Control: no-cache" \
    -d '{
        "table_name": "versioning",
        "x_column": "project_name",
        "x_id": "'"$PROJECT_NAME"'",
        "update_body": {
            "last_deployment": '"$CURRENT_TIMESTAMP"',
            "version_minor": '"$NEW_VERSION_MINOR"'
        }
    }' || {
        echo "Failed to update version info."
        exit 1
    }

echo "📦 Version bumped to minor $NEW_VERSION_MINOR"

