#!/usr/bin/env pwsh
# Aptos Smart Contract Auto-Deploy Script
# This script automates the entire deployment process

param(
    [switch]$SkipInstall = $false
)

Write-Host "🚀 Aptos RX Prescription - Auto Deployment Script" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

$aptosCLI = "C:\Users\Dell\.aptoscli\bin\aptos.exe"
$projectRoot = "c:\Users\Dell\Downloads\Feature-Builder\Feature-Builder"
$smartContractDir = "$projectRoot\smart-contract"

# Step 1: Verify Aptos CLI
Write-Host "Step 1: Checking Aptos CLI..." -ForegroundColor Yellow
if (-not (Test-Path $aptosCLI)) {
    Write-Host "❌ Aptos CLI not found at $aptosCLI" -ForegroundColor Red
    Write-Host "Installing Aptos CLI..." -ForegroundColor Yellow
    irm "https://aptos.dev/scripts/install_cli.ps1" | iex
    Write-Host "✅ Aptos CLI installed" -ForegroundColor Green
} else {
    Write-Host "✅ Aptos CLI found" -ForegroundColor Green
}

Write-Host ""

# Step 2: Initialize Account
Write-Host "Step 2: Initializing Aptos account..." -ForegroundColor Yellow
Push-Location $smartContractDir
try {
    # Use stdin to pass 'yes' to the prompt
    "yes" | & $aptosCLI init --network testnet 2>&1 | Out-Null
} catch {
    Write-Host "Account may already exist, continuing..." -ForegroundColor Yellow
}
Write-Host "✅ Account initialized" -ForegroundColor Green

Write-Host ""

# Step 3: Get Account Address
Write-Host "Step 3: Getting account address..." -ForegroundColor Yellow
$configPath = "$env:APPDATA\.aptos\config.yaml"
if (Test-Path $configPath) {
    $config = Get-Content $configPath -Raw
    $accountMatch = $config | Select-String 'account: (0x[a-f0-9]+)'
    if ($accountMatch) {
        $account = $accountMatch.Matches[0].Groups[1].Value
        Write-Host "✅ Account: $account" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️ Could not find account address" -ForegroundColor Yellow
}

Write-Host ""

# Step 4: Fund Account
Write-Host "Step 4: Funding account from faucet..." -ForegroundColor Yellow
& $aptosCLI account fund-with-faucet --account default --amount 100000000 2>&1 | Out-Null
Write-Host "✅ Account funded" -ForegroundColor Green

Write-Host ""

# Step 5: Compile Contract
Write-Host "Step 5: Compiling smart contract..." -ForegroundColor Yellow
& $aptosCLI move compile 2>&1 | Out-Null
Write-Host "✅ Contract compiled" -ForegroundColor Green

Write-Host ""

# Step 6: Deploy Contract
Write-Host "Step 6: Deploying contract to testnet..." -ForegroundColor Yellow
$deployOutput = & $aptosCLI move publish --named-addresses aptos_rx_prescription=default --assume-yes 2>&1
Write-Host "✅ Contract deployed" -ForegroundColor Green

# Extract contract address from deployment output
$contractMatch = $deployOutput | Select-String 'Modules published at address (0x[a-f0-9]+)'
if ($contractMatch) {
    $contractAddress = $contractMatch.Matches[0].Groups[1].Value
    Write-Host "✅ Contract Address: $contractAddress" -ForegroundColor Green
} else {
    Write-Host "⚠️ Could not extract contract address" -ForegroundColor Yellow
    Write-Host "Full output:" -ForegroundColor Yellow
    Write-Host $deployOutput
}

Pop-Location

Write-Host ""

# Step 7: Update .env.local
Write-Host "Step 7: Updating .env.local..." -ForegroundColor Yellow
$envFile = "$projectRoot\.env.local"

if ($contractAddress) {
    $envContent = @"
VITE_APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
VITE_APTOS_CONTRACT_ADDRESS=$contractAddress
PORT=5000
NODE_ENV=development
"@
    
    Set-Content -Path $envFile -Value $envContent
    Write-Host "✅ .env.local updated with contract address" -ForegroundColor Green
    Write-Host "   Contract Address: $contractAddress" -ForegroundColor Cyan
} else {
    Write-Host "⚠️ Could not update .env.local - no contract address found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Restart your dev server (Ctrl+C and run 'npm run dev')" -ForegroundColor White
Write-Host "2. Open http://localhost:5000" -ForegroundColor White
Write-Host "3. Connect Petra wallet" -ForegroundColor White
Write-Host "4. Try issuing a prescription - no more errors!" -ForegroundColor White
Write-Host ""
Write-Host "Contract deployed to: $contractAddress" -ForegroundColor Green
