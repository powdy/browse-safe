#!/bin/bash

# Quick deployment script for BrowseSafe
# This script pulls the latest code from Replit and deploys it to your VPS

# Set variables
APP_DIR="/var/www/browsesafe"
REPLIT_URL="https://workspace.briandoe010201.repl.co"
TEMP_DIR="/tmp/browsesafe-deploy"

# Create directories if they don't exist
mkdir -p $APP_DIR
mkdir -p $TEMP_DIR

echo "==== BrowseSafe Deployment Script ===="
echo "Downloading latest application files..."

# Download essential files
curl -o $TEMP_DIR/package.json $REPLIT_URL/package.json
curl -o $TEMP_DIR/package-lock.json $REPLIT_URL/package-lock.json
curl -o $TEMP_DIR/tsconfig.json $REPLIT_URL/tsconfig.json
curl -o $TEMP_DIR/vite.config.ts $REPLIT_URL/vite.config.ts
curl -o $TEMP_DIR/tailwind.config.ts $REPLIT_URL/tailwind.config.ts
curl -o $TEMP_DIR/postcss.config.js $REPLIT_URL/postcss.config.js
curl -o $TEMP_DIR/drizzle.config.ts $REPLIT_URL/drizzle.config.ts
curl -o $TEMP_DIR/components.json $REPLIT_URL/components.json

# Create core directories
mkdir -p $TEMP_DIR/server
mkdir -p $TEMP_DIR/shared
mkdir -p $TEMP_DIR/client/src
mkdir -p $TEMP_DIR/client/public

# Download server files
echo "Downloading server files..."
curl -o $TEMP_DIR/server/index.ts $REPLIT_URL/server/index.ts
curl -o $TEMP_DIR/server/routes.ts $REPLIT_URL/server/routes.ts
curl -o $TEMP_DIR/server/storage.ts $REPLIT_URL/server/storage.ts
curl -o $TEMP_DIR/server/vite.ts $REPLIT_URL/server/vite.ts
curl -o $TEMP_DIR/server/db.ts $REPLIT_URL/server/db.ts

# Download shared files
echo "Downloading shared files..."
curl -o $TEMP_DIR/shared/schema.ts $REPLIT_URL/shared/schema.ts

# Download client core files
echo "Downloading client files..."
curl -o $TEMP_DIR/client/index.html $REPLIT_URL/client/index.html
curl -o $TEMP_DIR/client/src/main.tsx $REPLIT_URL/client/src/main.tsx
curl -o $TEMP_DIR/client/src/App.tsx $REPLIT_URL/client/src/App.tsx
curl -o $TEMP_DIR/client/src/index.css $REPLIT_URL/client/src/index.css

# Download database backup
echo "Downloading database backup file..."
curl -o $TEMP_DIR/data-only-backup.sql $REPLIT_URL/backups/data-only-backup.sql

# Create ecosystem file
echo "Creating PM2 ecosystem file..."
cat > $TEMP_DIR/ecosystem.config.cjs << 'EOL'
module.exports = {
  apps: [
    {
      name: "browse-safe",
      script: "node dist/server/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        DATABASE_URL: "postgres://browsesafe_user1:Vauxhall0102011982@localhost:5432/browsesafe",
        PGUSER: "browsesafe_user1",
        PGPASSWORD: "Vauxhall0102011982",
        PGDATABASE: "browsesafe",
        PGHOST: "localhost",
        PGPORT: 5432,
        VIRUSTOTAL_API_KEY: "83e790e45168f039c2d195a93e812231e4ede2b0f78b6f2b570f4ed93c91a1c1",
        ABUSEIPDB_API_KEY: "71476be41b4012e5e13dea1f953876fb3fc99c8ed451c6ba28605b0518e4242656c13db6fa1d5acf",
        WHOISXML_API_KEY: "at_uCVE1K9CSVFsw3MJpF8hK89u9GC4y",
        GOOGLE_SAFEBROWSING_API_KEY: "AIzaSyBiSji2Fx1zqs-j2qmKPUthzzpDwhzFY4I",
        NODE_TLS_REJECT_UNAUTHORIZED: 0
      }
    }
  ]
};
EOL

# Create .env file
echo "Creating .env file..."
cat > $TEMP_DIR/.env << 'EOL'
DATABASE_URL="postgres://browsesafe_user1:Vauxhall0102011982@localhost:5432/browsesafe"
PGUSER="browsesafe_user1"
PGPASSWORD="Vauxhall0102011982"
PGDATABASE="browsesafe"
PGHOST="localhost"
PGPORT=5432
VIRUSTOTAL_API_KEY="83e790e45168f039c2d195a93e812231e4ede2b0f78b6f2b570f4ed93c91a1c1"
ABUSEIPDB_API_KEY="71476be41b4012e5e13dea1f953876fb3fc99c8ed451c6ba28605b0518e4242656c13db6fa1d5acf"
WHOISXML_API_KEY="at_uCVE1K9CSVFsw3MJpF8hK89u9GC4y"
GOOGLE_SAFEBROWSING_API_KEY="AIzaSyBiSji2Fx1zqs-j2qmKPUthzzpDwhzFY4I"
NODE_TLS_REJECT_UNAUTHORIZED=0
EOL

# Move files to app directory
echo "Moving files to application directory..."
cp -r $TEMP_DIR/* $APP_DIR/

# Install dependencies
echo "Installing dependencies..."
cd $APP_DIR
npm install

# Build the application
echo "Building the application..."
npm run build

# Import database data
echo "Importing sample data into the database..."
PGPASSWORD=Vauxhall0102011982 psql -h localhost -d browsesafe -U browsesafe_user1 -f $APP_DIR/data-only-backup.sql

# Start the application with PM2
echo "Starting the application with PM2..."
pm2 delete browse-safe 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

echo "==== Deployment Complete ===="
echo "You can access your application at: http://localhost:3000"
echo "Remember to set up Nginx as a reverse proxy for public access"