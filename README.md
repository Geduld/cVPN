# cVPN - VPN Status Monitor

A compact personal VPN status application designed for monitoring iVPN.net connections. The app detects when your IP location changes from Germany, indicating VPN status.

## Features

- **Real-time VPN Detection**: Monitors your IP location every 10 seconds
- **3-State Status System**:
  - 🟢 **Secure**: VPN is active (IP outside Germany)
  - 🟡 **Connecting**: Checking status or network issues
  - 🔴 **Vulnerable**: VPN inactive (showing German IP)
- **Web3 Aesthetics**: Exodus-inspired color scheme with gradients and glows
- **Multiple IP Services**: Fallback between ipapi.co, ip-api.com, and ipinfo.io

## Electron Compilation

This app is designed to be compiled with Electron into a standalone .exe file.

### Quick Setup:
1. Build the React app: `npm run build`
2. Follow the instructions in `electron-config.md`
3. The final app will have:
   - `autoHideMenuBar: true`
   - Title: "VPN Status"
   - Fixed 420x150 window size
   - Always on top option

## Development

```bash
# Install dependencies
npm install

# Run Electron app (development)
npm start

# Local Server
npm run dev

# Build front-end for production
npm run build

# Package as .exe (optional)
npm run dist

```

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom web3 design system
- **UI Components**: Shadcn/ui with custom variants
- **Icons**: Lucide React
- **State Management**: React hooks with custom VPN status hook

## Configuration

The app automatically detects VPN status by checking if your IP appears to be in Germany. If you're physically in a different location, you can modify the country check in `src/hooks/useVpnStatus.ts`.

## License

This project is created with [Lovable](https://lovable.dev) for personal VPN monitoring.
