# BrowseSafe Deployment Guide

This guide will help you deploy the BrowseSafe application to your VPS.

## Prerequisites

- Ubuntu VPS with at least 2GB RAM
- Node.js 18+ and npm installed
- PostgreSQL database
- Git

## Step 1: Clone the Repository

```bash
# Create application directory
mkdir -p /var/www/browsesafe

# Clone the repository to your server
git clone https://github.com/your-username/browsesafe.git /var/www/browsesafe
```

If you don't have a Git repository, you can transfer all files directly with tools like `rsync`:

```bash
# From your local machine
rsync -avz --exclude 'node_modules' --exclude '.git' /path/to/local/project/* user@your-server:/var/www/browsesafe/
```

## Step 2: Install Dependencies

```bash
# Navigate to the project directory
cd /var/www/browsesafe

# Install dependencies
npm install
```

## Step 3: Set Environment Variables

Create a `.env` file in the project root:

```bash
touch /var/www/browsesafe/.env
```

Add the following environment variables:

```
# Database Configuration
DATABASE_URL=postgres://browsesafe_user1:Vauxhall0102011982@localhost:5432/browsesafe
PGUSER=browsesafe_user1
PGPASSWORD=Vauxhall0102011982
PGDATABASE=browsesafe
PGHOST=localhost
PGPORT=5432

# API Keys
VIRUSTOTAL_API_KEY=your_virustotal_api_key
ABUSEIPDB_API_KEY=your_abuseipdb_api_key
WHOISXML_API_KEY=your_whoisxml_api_key
GOOGLE_SAFEBROWSING_API_KEY=your_google_safebrowsing_api_key

# TLS Configuration (only if needed)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Step 4: Build the Application

```bash
# Build the client and server
npm run build
```

## Step 5: Set Up PM2 for Process Management

Install PM2 globally:

```bash
npm install -g pm2
```

Create a PM2 ecosystem file:

```bash
touch /var/www/browsesafe/ecosystem.config.cjs
```

Add the following content:

```js
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
        VIRUSTOTAL_API_KEY: "your_virustotal_api_key",
        ABUSEIPDB_API_KEY: "your_abuseipdb_api_key",
        WHOISXML_API_KEY: "your_whoisxml_api_key",
        GOOGLE_SAFEBROWSING_API_KEY: "your_google_safebrowsing_api_key",
        NODE_TLS_REJECT_UNAUTHORIZED: 0
      }
    }
  ]
};
```

## Step 6: Start the Application

```bash
# Start the application using PM2
pm2 start ecosystem.config.cjs

# Save the PM2 configuration to start on reboot
pm2 save

# Set up PM2 to start on system boot
pm2 startup
```

## Step 7: Set Up Nginx as a Reverse Proxy

Install Nginx:

```bash
sudo apt update
sudo apt install nginx
```

Create a new Nginx server block:

```bash
sudo nano /etc/nginx/sites-available/browsesafe.conf
```

Add the following configuration:

```nginx
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
```

Enable the configuration and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/browsesafe.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 8: Set Up SSL with Let's Encrypt

Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
```

Obtain an SSL certificate:

```bash
sudo certbot --nginx -d browse-safe.com -d www.browse-safe.com
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues, verify:

1. PostgreSQL is running: `sudo systemctl status postgresql`
2. Database and user exist: `sudo -u postgres psql -c "\l"` and `sudo -u postgres psql -c "\du"`
3. Database URL in env variables is correct

### Application Not Starting

Check the PM2 logs:

```bash
pm2 logs browse-safe
```

### Nginx Not Proxying Correctly

Check Nginx error logs:

```bash
sudo tail -f /var/nginx/error.log
```

### Data Import

To import data directly into your database:

```bash
PGPASSWORD=your_password psql -h localhost -d browsesafe -U browsesafe_user1 -f /var/www/browsesafe/backups/data-only-backup.sql
```