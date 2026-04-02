module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // === MapMend Brand Palette (from logo) ===
        brandBlue:   '#3B8DD4', // Logo blue (the M letter)
        brandOrange: '#F5841F', // Logo orange (the map pin)
        brandNavy:   '#0A1628', // Deep navy from logo background
        brandSlate:  '#7A8DA6', // Muted slate for secondary text
        darkBg:      '#060E1A', // Near-black navy background
        darkCard:    '#0D1B2E', // Slightly lighter card surface

        // Semantic aliases (mapped to brand colors)
        neonCyan:    '#3B8DD4', // → brand blue
        neonBlue:    '#3B8DD4', // → brand blue
        neonPurple:  '#F5841F', // → brand orange
        neonPink:    '#E06D10', // → deeper orange variant
        accentCyan:  '#5BA3E0', // Lighter blue for soft accents
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    }
  },
  plugins: []
}
