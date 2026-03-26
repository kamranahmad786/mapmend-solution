module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: '#0A2A5A',
        brandOrange: '#F26122',
        darkBg: '#050505',
        darkCard: '#111116',
        neonBlue: '#3b82f6',
        neonCyan: '#06b6d4',
        neonPurple: '#8b5cf6',
        neonPink: '#ec4899',
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
