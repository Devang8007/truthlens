# TruthLens AI Service — Model & Dependency Installer
# Run this script ONCE before starting the AI service.
# Usage: .\install_models.ps1

$ErrorActionPreference = "Stop"
$aiDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $aiDir

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  TruthLens AI Service — Installing ML Dependencies v4.0" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# ── Check Python ─────────────────────────────────────────────────────────────
$pythonCmd = $null
foreach ($cmd in @("python", "python3", "py")) {
    try {
        $ver = & $cmd --version 2>&1
        if ($ver -match "Python (\d+)\.(\d+)") {
            $major = [int]$Matches[1]; $minor = [int]$Matches[2]
            Write-Host "Found: $ver ($cmd)" -ForegroundColor Green
            $pythonCmd = $cmd
            break
        }
    } catch {}
}

if (-not $pythonCmd) {
    Write-Host "ERROR: Python not found. Install Python 3.10-3.12 from python.org" -ForegroundColor Red
    exit 1
}

# Warn about Python 3.14 (PyTorch not officially supported)
if ($ver -match "Python 3\.1[4-9]") {
    Write-Host ""
    Write-Host "WARNING: Python 3.14+ detected. PyTorch may not have official wheels." -ForegroundColor Yellow
    Write-Host "         Models will attempt to install. If torch fails, analysis will" -ForegroundColor Yellow
    Write-Host "         fall back to heuristic mode (ELA + PRNU only)." -ForegroundColor Yellow
    Write-Host ""
}

# ── Upgrade pip ───────────────────────────────────────────────────────────────
Write-Host "[1/5] Upgrading pip..." -ForegroundColor Cyan
& $pythonCmd -m pip install --upgrade pip --quiet

# ── Install core packages ─────────────────────────────────────────────────────
Write-Host "[2/5] Installing core packages (fastapi, pillow, etc.)..." -ForegroundColor Cyan
& $pythonCmd -m pip install fastapi>=0.110.0 uvicorn>=0.28.0 "pillow>=10.0.0" python-multipart>=0.0.9 "pydantic>=2.0.0" "httpx>=0.27.0" "numpy>=1.26.0" requests>=2.31.0

# ── Install PyTorch CPU ───────────────────────────────────────────────────────
Write-Host "[3/5] Installing PyTorch (CPU-only)..." -ForegroundColor Cyan
Write-Host "      This may take a few minutes (~250MB download)..." -ForegroundColor Gray
try {
    & $pythonCmd -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
    Write-Host "      PyTorch installed successfully." -ForegroundColor Green
} catch {
    Write-Host "      PyTorch install failed: $_" -ForegroundColor Yellow
    Write-Host "      Trying standard PyPI torch (nightly may support Python 3.14)..." -ForegroundColor Yellow
    try {
        & $pythonCmd -m pip install --pre torch torchvision --index-url https://download.pytorch.org/whl/nightly/cpu
        Write-Host "      PyTorch nightly installed." -ForegroundColor Green
    } catch {
        Write-Host "      PyTorch unavailable for this Python version." -ForegroundColor Red
        Write-Host "      Service will run in heuristic-only mode." -ForegroundColor Yellow
    }
}

# ── Install Transformers + OpenCV ─────────────────────────────────────────────
Write-Host "[4/5] Installing transformers, timm, and opencv..." -ForegroundColor Cyan
try {
    & $pythonCmd -m pip install "transformers>=4.40.0" "timm>=0.9.0" accelerate>=0.26.0 "opencv-python-headless>=4.8.0" sentencepiece --quiet
    Write-Host "      All ML packages installed." -ForegroundColor Green
} catch {
    Write-Host "      Some ML packages failed: $_" -ForegroundColor Yellow
}

# ── Pre-warm model cache ──────────────────────────────────────────────────────
Write-Host "[5/5] Pre-downloading model weights from HuggingFace..." -ForegroundColor Cyan
Write-Host "      Models: umm-maybe/AI-image-detector + deberta zero-shot + propaganda" -ForegroundColor Gray
Write-Host "      This downloads ~600MB once; cached in ~/.cache/huggingface" -ForegroundColor Gray
Write-Host ""

$warmupScript = @"
import sys
print('Pre-warming model cache...')
try:
    from transformers import pipeline
    print('  [1/3] Loading image AI detector...')
    p1 = pipeline('image-classification', model='umm-maybe/AI-image-detector')
    print('  [1/3] Done.')
    print('  [2/3] Loading zero-shot news classifier...')
    p2 = pipeline('zero-shot-classification', model='MoritzLaurer/deberta-v3-base-zeroshot-v1.1-all-33')
    print('  [2/3] Done.')
    print('  [3/3] Loading propaganda detector...')
    p3 = pipeline('text-classification', model='valurank/distilroberta-propaganda')
    print('  [3/3] Done.')
    print()
    print('All models cached successfully!')
except ImportError as e:
    print(f'Torch/Transformers not available ({e}). Service will use heuristic fallback.')
except Exception as e:
    print(f'Model download failed ({e}). Check your internet connection.')
    print('Service will lazy-load models on first request.')
"@

& $pythonCmd -c $warmupScript

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  Installation complete!" -ForegroundColor Green
Write-Host "  Start the service with:  python app.py" -ForegroundColor Green
Write-Host "  Or via the main launcher: ..\start-truthlens.ps1" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
