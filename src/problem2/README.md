# 🚀 Currency Swap App

A modern web application that allows users to swap (exchange) different cryptocurrencies with a beautiful interface and optimal user experience.

## ✨ Key Features

- **Token Swap**: Exchange between different cryptocurrencies
- **Real-time Exchange Rates**: Display conversion rates updated in real-time
- **User-friendly Interface**: Responsive design with beautiful gradients
- **Validation**: Error checking and clear notifications
- **Loading States**: Display loading states during transactions
- **Token Selector**: Choose tokens from available list
- **Swap Direction**: Reverse swap direction with one click

## 🛠️ Technologies Used

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks
- **API**: Fetch API with external price feed
- **Icons**: Custom icon components

## 📦 Installation and Setup

### System Requirements

- Node.js (version 18 or higher)
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will run at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Icons.tsx       # Icon components
│   ├── NotificationToast.tsx  # Toast notifications
│   ├── SwapForm.tsx    # Main swap form
│   └── TokenSelector.tsx      # Token selection component
├── hooks/              # Custom React hooks
│   └── useTokens.ts    # Hook for fetching token prices
├── services/           # API services
│   └── api.ts         # Swap execution service
├── types/              # TypeScript type definitions
│   └── index.ts       # Interface definitions
├── utils/              # Utility functions
│   └── helpers.ts     # Helper functions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🔧 Core Components

### SwapForm Component

Main component handling token swap logic:

- Form state management
- Exchange rate calculation
- Validation handling
- Swap transaction execution

### TokenSelector Component

Component for token selection:

- Dropdown to select tokens
- Input for amount entry
- Display token information (currency, price)

### useTokens Hook

Custom hook for fetching token data:

- Retrieve token list from API
- Handle loading and error states
- Filter and sort tokens

### ApiService

Service for executing swaps:

- Simulate API calls
- Return transaction results
- Handle timeouts

## 🎨 User Interface

The application uses modern design with:

- Gradient background from purple to blue
- Card layout with shadows and border radius
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Loading spinners and progress indicators

## 📊 API Integration

### Token Price Feed

- **Endpoint**: `https://interview.switcheo.com/prices.json`
- **Method**: GET
- **Response**: Array of tokens with currency, price, and date

### Swap Execution

- **Method**: POST (simulated)
- **Response**: Transaction result with success status and transaction ID

## 🔒 Validation

The application includes validation rules:

- Check for valid token amounts
- Ensure sufficient tokens for swap
- Validate input format
- Display clear error messages

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist folder to Netlify
```

**Note**: This is a demo application. Swap transactions are simulated and do not actually execute on the blockchain.
