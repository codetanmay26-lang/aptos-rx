# AptosRx - Blockchain Prescription Verification

## Overview
AptosRx is a blockchain-powered prescription management dApp built on the Aptos network. It enables doctors to issue tamper-proof prescriptions and pharmacies to verify their authenticity using blockchain technology.

## Current State
- **Status**: MVP Complete
- **Network**: Aptos Testnet
- **Wallet**: Petra Wallet integration

## Features
- **Doctor Dashboard**: Issue prescriptions with patient details, medication info, and dosage
- **Pharmacy Portal**: Verify prescription authenticity against blockchain records
- **Wallet Integration**: Connect with Petra Wallet for transaction signing
- **SHA-256 Hashing**: Prescription data is hashed before storing on-chain

## Project Architecture

### Frontend (client/)
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **Routing**: Wouter for client-side routing
- **State**: React Query for server state management

### Key Files
- `client/src/App.tsx` - Main app with routing and providers
- `client/src/components/Layout.tsx` - Navigation and layout
- `client/src/components/WalletProvider.tsx` - Aptos wallet context
- `client/src/pages/Home.tsx` - Landing page
- `client/src/pages/Doctor.tsx` - Prescription issuance
- `client/src/pages/Pharmacy.tsx` - Prescription verification
- `client/src/lib/aptosClient.ts` - Blockchain interaction utilities
- `client/src/lib/hash.ts` - SHA-256 hashing utilities

### Smart Contract (smart-contract/)
- **Language**: Move
- **Module**: `aptos_rx_prescription`
- **Functions**: `issue_prescription`, `verify_prescription`, `mark_used`

## Environment Variables
- `VITE_APTOS_NODE_URL` - Aptos node URL (default: testnet)
- `VITE_APTOS_CONTRACT_ADDRESS` - Deployed contract address

## Deployment
To deploy the smart contract:
1. Install Aptos CLI
2. Initialize with `aptos init --network testnet`
3. Fund account with `aptos account fund-with-faucet`
4. Update Move.toml with account address
5. Publish with `aptos move publish`

## How It Works
1. **Doctor Issues Prescription**: Enters patient/medication details, data is hashed, hash stored on Aptos
2. **Patient Receives**: Prescription ID and doctor's wallet address
3. **Pharmacy Verifies**: Enters same details + doctor address, hash compared against blockchain
4. **Result**: Prescription verified as authentic or invalid

## Recent Changes
- December 17, 2025: Initial MVP implementation
  - Complete frontend with Doctor/Pharmacy workflows
  - Aptos wallet integration with Petra
  - Smart contract with issue/verify/mark_used functions
  - Fixed hash alignment between issuance and verification
