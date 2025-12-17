# AptosRx - Complete Project Explanation

## What Is Your Project?

**AptosRx** is a blockchain-based prescription management system that prevents prescription fraud and tampering.

### The Problem It Solves:
- ❌ Paper prescriptions can be forged
- ❌ Prescriptions can be altered (change drug name, dosage)
- ❌ Prescriptions can be reused multiple times
- ❌ No way to verify if a prescription is authentic

### Your Solution:
- ✅ Doctor issues prescription → Recorded on blockchain (permanent, cannot be changed)
- ✅ Prescription data is hashed → Any tampering changes the hash
- ✅ Pharmacy verifies prescription → Checks blockchain record
- ✅ Prescription marked as used → Cannot be reused

---

## What Is Aptos?

**Aptos** is a blockchain platform (like Ethereum or Bitcoin, but newer and faster).

Think of it like:
- **Traditional database**: Company owns it, can change/delete data
- **Blockchain**: No single owner, data is permanent, everyone can verify

### Why Aptos for This Project?
- **Fast**: Transactions complete in 1-2 seconds
- **Cheap**: Costs ~$0.001 per transaction
- **Secure**: Uses advanced cryptography
- **Programmable**: You can write smart contracts (code that runs on blockchain)

---

## What Is a Smart Contract?

The file `smart-contract/sources/prescription.move` contains your smart contract.

### What It Does:
```
1. issue_prescription(id, hash)
   - Doctor calls this
   - Stores: prescription ID + data hash
   - Blockchain saves it permanently

2. verify_prescription(doctor_addr, id, hash)
   - Pharmacy calls this
   - Checks: Does this prescription exist?
   - Returns: true if valid and unused

3. mark_used(id)
   - Pharmacy calls this after dispensing
   - Marks prescription as used
   - Cannot be used again
```

### Your Contract Address:
`0xf9f98850f8c4cdc9face74dade09e4a4e5334a96ad02ff5b1ec1292f40bcb4bb`

This is like a street address, but for your smart contract on the blockchain.

---

## What Is Petra Wallet?

**Petra** is a browser extension (like MetaMask for Ethereum) that:
- Stores your blockchain wallet
- Holds your APT tokens (Aptos cryptocurrency)
- Signs transactions (proves you own the wallet)
- Connects to blockchain apps

### Why You Need It:
Without a wallet, you can't interact with the blockchain. It's like:
- Blockchain = Bank
- Wallet = Your bank account
- Private key = Your PIN code

---

## What Is APT (Aptos Token)?

**APT** is the cryptocurrency of the Aptos blockchain.

### Why You Need APT:
Every blockchain transaction costs a small "gas fee" (pays for computing power).
- Your transaction cost: ~0.001433 APT (~$0.007)
- You have: 2.9986 APT (~$14)
- Can do: ~2,092 transactions

### Real Money vs Test Money:

#### Testnet APT (What You Have):
- **FREE** test money
- Used for development/testing
- Has NO real value
- Get it from faucet (free dispenser)
- Cannot buy anything in real world

#### Mainnet APT (Real):
- Actual cryptocurrency
- Has real value (~$4.69 per APT currently)
- Costs real money to buy
- Used for production apps

---

## How Funding Works (Why It's Free)

### Aptos Testnet Faucet:
A **faucet** is like a free ATM for test cryptocurrency.

**How it works:**
1. You give it your wallet address
2. It sends free test APT to your wallet
3. You use this APT to test your app
4. It's FREE because it's not real money

**Why Aptos provides this:**
- Developers need to test their apps
- Can't charge real money for testing
- So they give free test tokens
- Encourages building on Aptos

**Analogy:**
- Like getting free credits in a demo game
- Or play money in Monopoly
- Looks real, behaves real, but has no actual value

---

## Your Project Architecture

### Frontend (React + TypeScript):
```
client/src/
├── pages/
│   ├── Home.tsx          → Landing page with info
│   ├── Doctor.tsx        → Issue prescription form
│   └── Pharmacy.tsx      → Verify prescription form
├── lib/
│   ├── aptosClient.ts    → Blockchain connection
│   └── hash.ts           → Prescription hashing (SHA-256)
└── components/           → UI components (buttons, cards, etc.)
```

### Backend (Express.js):
```
server/
├── index.ts              → Web server
├── routes.ts             → API endpoints
└── vite.ts               → Development setup
```

### Smart Contract (Move Language):
```
smart-contract/
└── sources/
    └── prescription.move → Blockchain logic
```

---

## How Everything Works Together

### 1. Doctor Issues Prescription:

```
[Doctor] → Fills form:
           - Patient ID: 12345
           - Drug: Aspirin
           - Dosage: 500mg
           ↓
[Frontend] → Calculates hash:
             SHA-256("12345|Aspirin|500mg|...") 
             = "0x8d3e4f..."
             ↓
[Petra Wallet] → Doctor signs transaction
                 (proves it's really them)
                 ↓
[Blockchain] → Smart contract stores:
               Prescription ID → Hash
               Doctor Address → Timestamp
```

### 2. Pharmacy Verifies Prescription:

```
[Patient] → Brings prescription to pharmacy

[Pharmacy] → Enters prescription details:
             - Prescription ID
             - Doctor address
             - Patient ID: 12345
             - Drug: Aspirin
             - Dosage: 500mg
             ↓
[Frontend] → Recalculates hash:
             SHA-256("12345|Aspirin|500mg|...")
             = "0x8d3e4f..." (same as before)
             ↓
[Blockchain] → Smart contract checks:
               1. Does this prescription ID exist?
               2. Is the hash correct?
               3. Is it unused?
               ↓
[Result] → ✅ Valid & Unused
           OR
           ❌ Invalid / Already Used
```

### 3. Why It Prevents Fraud:

**Scenario: Patient changes "500mg" to "5000mg"**
```
Original: SHA-256("...500mg...") = 0x8d3e4f...
Tampered: SHA-256("...5000mg...") = 0x2a1b9c... ← DIFFERENT!

Blockchain has: 0x8d3e4f...
Pharmacy calculates: 0x2a1b9c...
Result: ❌ MISMATCH → Prescription rejected
```

**Scenario: Patient tries to reuse prescription**
```
First time: Pharmacy marks as "used" on blockchain
Second time: Smart contract checks → Already marked used
Result: ❌ REJECTED
```

---

## Key Files in Your Project

| File | Purpose |
|------|---------|
| `client/src/pages/Doctor.tsx` | Form to issue prescriptions |
| `client/src/pages/Pharmacy.tsx` | Form to verify prescriptions |
| `client/src/lib/aptosClient.ts` | Connects to Aptos blockchain |
| `client/src/lib/hash.ts` | SHA-256 hashing for prescriptions |
| `smart-contract/sources/prescription.move` | Blockchain smart contract |
| `.env.local` | Configuration (contract address, network) |
| `server/index.ts` | Web server that serves the app |

---

## Environment Configuration

### `.env.local` File:
```
VITE_APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
VITE_APTOS_CONTRACT_ADDRESS=0xf9f98850f8c4cdc9face74dade09e4a4e5334a96ad02ff5b1ec1292f40bcb4bb
PORT=5005
NODE_ENV=development
```

**What these mean:**
- `VITE_APTOS_NODE_URL`: Which blockchain network to connect to (testnet)
- `VITE_APTOS_CONTRACT_ADDRESS`: Where your smart contract lives on blockchain
- `PORT`: Web server port (5005 or 5000)
- `NODE_ENV`: Development mode

---

## Current Status

✅ **Smart contract deployed** to Aptos Testnet  
✅ **Petra wallet connected** (on Testnet)  
✅ **Wallet funded** with 2.9986 APT (free test tokens)  
✅ **Frontend working** (React app with beautiful UI)  
✅ **Backend running** (Express server on port 5000)  
✅ **Real blockchain transactions** working  

**Transaction cost:** ~0.001433 APT per prescription (~$0.007)  
**You can do:** ~2,092 transactions with current balance

---

## What's Next?

### For Testing/Demo:
- ✅ Issue prescriptions as doctor
- ✅ Verify prescriptions as pharmacy
- ✅ Show to others
- ✅ Test fraud scenarios
- ✅ Everything works on testnet (free)

### For Production (When Ready):
1. Deploy contract to **Mainnet** (real Aptos network)
2. Update `.env.local` with mainnet contract address
3. Users need **real APT** (costs real money)
4. Now it's a real product

---

## Common Questions

### Q: Is this real money?
**A:** No. Testnet APT is free play money. Only mainnet APT is real.

### Q: Why does Aptos give free tokens?
**A:** To help developers test their apps without spending real money.

### Q: Can I use this in production now?
**A:** It works, but it's on testnet. For real use, deploy to mainnet.

### Q: What if I run out of testnet APT?
**A:** Go to the faucet again and get more for free.

### Q: How is this different from a regular database?
**A:** Database: Company controls it, can change/delete data  
Blockchain: Decentralized, permanent, no single controller

### Q: Why is the transaction cost in APT?
**A:** Blockchain computers need to be paid for processing transactions. APT is how you pay them.

---

## Summary

**Your project** is a prescription fraud prevention system using blockchain technology.

**Aptos** is the blockchain platform that stores your prescription records permanently.

**Petra wallet** is how you interact with the blockchain (stores APT, signs transactions).

**APT tokens** pay for blockchain transactions (like paying for stamps to mail a letter).

**Testnet** is free testing environment (play money, no real value).

**Your app** is fully working on testnet with free APT, ready for testing and demos!

---

## Repository

- **GitHub**: https://github.com/codetanmay26-lang/aptos-rx
- **Branch**: main
- **Local**: c:\Users\Dell\Downloads\Feature-Builder\Feature-Builder
