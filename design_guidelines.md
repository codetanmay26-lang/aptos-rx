# AptosRx Design Guidelines

## Design Approach: Professional Healthcare System

**Rationale:** Medical/blockchain applications demand trust, clarity, and efficiency over visual flair. Using a clean, professional design system approach emphasizing security indicators and streamlined workflows.

**Core Principles:**
- Trust through clarity: Professional, medical-grade interface
- Blockchain transparency: Clear transaction states and confirmations
- Role-based simplicity: Distinct doctor vs. pharmacy workflows
- Security-first: Prominent wallet connection and transaction status

---

## Typography System

**Font Families:**
- Primary: Inter (via Google Fonts) - clean, professional, excellent readability
- Monospace: JetBrains Mono - for blockchain addresses, hashes, transaction IDs

**Hierarchy:**
- Page Titles: text-3xl font-bold (Doctor Dashboard, Pharmacy Verification)
- Section Headers: text-xl font-semibold
- Form Labels: text-sm font-medium uppercase tracking-wide
- Body Text: text-base font-normal
- Helper Text: text-sm text-gray-600
- Blockchain Data (addresses/hashes): text-xs font-mono

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6, p-8
- Section spacing: space-y-6, space-y-8
- Form field gaps: gap-4, gap-6
- Page margins: px-4 md:px-8

**Grid Structure:**
- Max container width: max-w-4xl mx-auto (professional, focused)
- Single-column forms (medical data requires careful attention)
- Card-based containers for distinct functional areas

---

## Component Library

### Navigation/Header
- Fixed header with site title "AptosRx" 
- Network badge: "Aptos Testnet" with green indicator dot
- Wallet connection button (right-aligned)
  - Connected: Show truncated address (0x1234...5678) with green dot
  - Disconnected: "Connect Wallet" with wallet icon
- Simple horizontal nav below header: "Home | Doctor | Pharmacy"

### Landing Page (/)
- Centered content, max-w-2xl
- Clear heading: "AptosRx - Blockchain Prescription Verification"
- Subheading explaining the system in 1-2 sentences
- Two prominent role-selection cards in grid (md:grid-cols-2):
  - Doctor card: Icon, "Issue Prescriptions", brief description, "Go to Doctor Dashboard" button
  - Pharmacy card: Icon, "Verify Prescriptions", brief description, "Go to Pharmacy Portal" button
- Footer: Brief "How it works" section with 3-step process

### Doctor Dashboard (/doctor)
- Page header: "Issue New Prescription"
- Main card container (border, rounded, shadow-sm)
- Form with clear sections:
  1. Patient Information (patientId input)
  2. Prescription Details (drugName, dosage, notes textarea)
  3. Prescription ID (auto-generated display or manual input)
- Submit button: "Issue Prescription to Blockchain" (full-width, prominent)
- Status area below form:
  - Loading spinner during transaction
  - Success state: Green alert with transaction hash (monospace), explorer link
  - Error state: Red alert with error message

### Pharmacy Portal (/pharmacy)
- Page header: "Verify Prescription Authenticity"
- Main card container
- Form sections:
  1. Prescription ID input (large, prominent)
  2. Prescription Details inputs (patientId, drugName, dosage, notes)
- Verify button: "Verify on Blockchain"
- Verification result area (distinct from form):
  - Success: Large green check icon, "✓ Authentic & Unused", prescription details in grid
  - Invalid: Large red X icon, "✗ Invalid or Already Used"
  - Include blockchain timestamp and doctor address (truncated)

### Forms
- Labels above inputs (not placeholders)
- Input styling: border-2, rounded-lg, py-3 px-4, focus:border-blue-500
- Textarea: min-h-[120px] for notes fields
- Required field indicators: asterisk in label
- Validation errors: text-sm text-red-600 below input

### Buttons
- Primary (Submit/Verify): py-3 px-6, rounded-lg, font-semibold, full shadow
- Secondary (Cancel/Reset): py-3 px-6, rounded-lg, border-2
- Disabled state: opacity-50, cursor-not-allowed
- No hover blur effects needed (standard hover states sufficient)

### Status Indicators
- Transaction pending: Animated pulse border on card
- Success alerts: Green left-border accent, rounded, p-4
- Error alerts: Red left-border accent, rounded, p-4
- Wallet connection status: Small colored dot indicator

### Cards
- White background, border, rounded-lg, shadow-sm
- Padding: p-6 or p-8
- Hover state: subtle shadow increase for interactive cards

---

## Animations

**Minimal, Purposeful Only:**
- Loading spinner during blockchain transactions (single rotating circle)
- Fade-in for success/error alerts
- Smooth transitions on wallet connection status
- NO scroll animations, NO parallax, NO decorative motion

---

## Images

**No Hero Image Required** - This is a functional application, not marketing

**Icons:**
- Use Heroicons (outline style) via CDN
- Doctor icon: user-group or clipboard-document
- Pharmacy icon: building-storefront or beaker
- Wallet icon: wallet
- Success: check-circle
- Error: x-circle
- Blockchain/link: link or cube

---

## Blockchain-Specific Elements

**Address Display Format:**
- Always use monospace font
- Truncate middle: 0x1234...5678
- Include copy-to-clipboard icon button
- Subtle background (gray-100) to distinguish from regular text

**Transaction Status:**
- Three clear states with distinct visual treatments:
  1. Pending: Blue accent, animated indicator
  2. Success: Green accent, static checkmark
  3. Failed: Red accent, error icon
- Always include: timestamp, transaction hash, explorer link

**Network Indicator:**
- Persistent "Testnet" badge in header
- Green dot = connected to correct network
- Red dot = network mismatch or disconnected

---

## Professional Healthcare Touches

- Clean, spacious layouts (not cramped medical forms)
- High contrast for readability (WCAG AA minimum)
- Clear labeling for all medical data fields
- Prominent required field indicators
- Confirmation step before blockchain submission
- Clear distinction between off-chain data and on-chain verification