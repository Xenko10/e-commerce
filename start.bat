@echo off
start cmd /k "npx json-server db.json --port 3001"
start cmd /k "npm run dev"
exit