# TruthLens Enterprise Platform Launcher
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "           TRUTHLENS ENTERPRISE FORENSICS PLATFORM         " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Starting TruthLens Python AI Microservice (Port 8001)..." -ForegroundColor Yellow
Start-Process -FilePath "python" -ArgumentList "app.py" -WorkingDirectory "$PSScriptRoot\ai-service"

Start-Sleep -Seconds 2

Write-Host "[2/3] Starting TruthLens Node.js API Gateway (Port 5000)..." -ForegroundColor Yellow
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "$PSScriptRoot\backend"

Start-Sleep -Seconds 2

Write-Host "[3/3] Starting TruthLens React Frontend (Port 5173)..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory "$PSScriptRoot\frontend"

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   All TruthLens Enterprise Services Successfully Launched!" -ForegroundColor Green
Write-Host "   - Frontend UI:     http://localhost:5173" -ForegroundColor Green
Write-Host "   - API Gateway:     http://localhost:5000/api/health" -ForegroundColor Green
Write-Host "   - AI Forensics:    http://localhost:8001/health" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
