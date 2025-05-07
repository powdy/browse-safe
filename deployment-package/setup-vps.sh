#!/bin/bash

# BrowseSafe VPS Setup Script
# This script sets up the BrowseSafe application on a fresh Ubuntu VPS

# Exit on errors
set -e

# Set variables
APP_DIR="/var/www/browsesafe"
BACKUP_DIR="/var/www/browsesafe/backup"

echo "==== BrowseSafe VPS Setup Script ===="
echo "This script will install and configure BrowseSafe on your VPS."

# Check if script is run as root
if [ "$(id -u)" -ne 0 ]; then
    echo "Error: This script must be run as root"
    exit 1
fi

# Update system packages
echo "Updating system packages..."
apt update
apt upgrade -y

# Install required packages
echo "Installing required packages..."
apt install -y nodejs npm postgresql postgresql-contrib nginx certbot python3-certbot-nginx

# Install PM2 globally
echo "Installing PM2..."
npm install -g pm2

# Create application directory
echo "Creating application directory..."
mkdir -p $APP_DIR
mkdir -p $BACKUP_DIR

# Check if the deployment tarball exists
if [ -f "browsesafe-deployment.tar.gz" ]; then
    echo "Extracting deployment package..."
    tar -xzvf browsesafe-deployment.tar.gz -C $APP_DIR
    chown -R root:root $APP_DIR
else
    echo "Error: Deployment package not found"
    exit 1
fi

# Navigate to application directory
cd $APP_DIR

# Setup PostgreSQL database
echo "Setting up PostgreSQL database..."
sudo -u postgres psql -c "CREATE USER browsesafe_user1 WITH PASSWORD 'Vauxhall0102011982';"
sudo -u postgres psql -c "CREATE DATABASE browsesafe OWNER browsesafe_user1;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE browsesafe TO browsesafe_user1;"

# Create database tables
echo "Creating database tables..."
cat > /tmp/create-tables.sql << 'EOL'
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "scans" (
    "id" SERIAL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "trust_score" INTEGER NOT NULL,
    "domain_age" TEXT,
    "registration_date" TEXT,
    "expiration_date" TEXT,
    "registrar" TEXT,
    "registrant_country" TEXT,
    "ip_address" TEXT,
    "ip_location" TEXT,
    "name_servers" TEXT,
    "has_valid_ssl" BOOLEAN DEFAULT false,
    "has_dnssec" BOOLEAN DEFAULT false,
    "has_security_headers" BOOLEAN DEFAULT false,
    "has_malware" BOOLEAN DEFAULT false,
    "has_phishing" BOOLEAN DEFAULT false,
    "blacklist_status" TEXT,
    "suspicious_patterns" TEXT,
    "user_reports" INTEGER DEFAULT 0,
    "related_sites" INTEGER DEFAULT 0,
    "last_scanned" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "details" TEXT
);

CREATE TABLE IF NOT EXISTS "reports" (
    "id" SERIAL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "details" TEXT,
    "status" TEXT DEFAULT 'pending',
    "reported_by" TEXT,
    "reported_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
EOL

PGPASSWORD=Vauxhall0102011982 psql -h localhost -U browsesafe_user1 -d browsesafe -f /tmp/create-tables.sql

# Install dependencies
echo "Installing application dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Import sample data
echo "Importing sample data..."
PGPASSWORD=Vauxhall0102011982 psql -h localhost -U browsesafe_user1 -d browsesafe -f $APP_DIR/backups/data-only-backup.sql

# Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/browsesafe << 'EOL'
server {
    listen 80;
    server_name browse-safe.com www.browse-safe.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

# Enable site configuration
ln -sf /etc/nginx/sites-available/browsesafe /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Setup SSL certificate
echo "Setting up SSL certificate..."
certbot --nginx -d browse-safe.com -d www.browse-safe.com --non-interactive --agree-tos --email webmaster@browse-safe.com

# Start the application with PM2
echo "Starting application with PM2..."
pm2 delete browse-safe 2>/dev/null || true
cd $APP_DIR
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup

echo "==== Setup Complete ===="
echo "BrowseSafe is now running at https://browse-safe.com"
echo "You can monitor the application using: pm2 monit"