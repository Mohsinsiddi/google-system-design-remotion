#!/bin/bash
set -e

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║   🎬 Google System Design — Remotion 4.0.445 Setup  ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ── Pre-flight checks ──────────────────────────────────────
command -v node >/dev/null 2>&1 || { echo "❌ Node.js not found. Install v18+: https://nodejs.org"; exit 1; }
command -v npm  >/dev/null 2>&1 || { echo "❌ npm not found."; exit 1; }

NODE_VER=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
if [ "$NODE_VER" -lt 18 ]; then
  echo "❌ Node.js 18+ required (found v$NODE_VER). Please upgrade."
  exit 1
fi

echo "✅ Node $(node -v) detected"
echo ""

# ── Install deps ───────────────────────────────────────────
echo "📦 Installing dependencies (Remotion 4.0.445 + React 18)..."
npm install
echo ""

# ── Create output dir ──────────────────────────────────────
mkdir -p out

echo "╔══════════════════════════════════════════════════════╗"
echo "║                   🚀  READY!                         ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  Preview in browser:                                 ║"
echo "║    npm start                                         ║"
echo "║                                                      ║"
echo "║  Render to MP4:                                      ║"
echo "║    npm run build                                     ║"
echo "║    → out/google-system-design.mp4                   ║"
echo "║                                                      ║"
echo "║  Render (headless / CI):                             ║"
echo "║    npm run render                                    ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
