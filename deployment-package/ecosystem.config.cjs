module.exports = {
  apps: [
    {
      name: "browse-safe",
      script: "node dist/index.js",
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