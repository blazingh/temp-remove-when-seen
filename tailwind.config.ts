const { fontFamily } = require("tailwindcss/defaultTheme");

function withOpacity(variableName: any) {
  return ({ opacityValue }: any) => {
    if (opacityValue !== undefined) {
      return `hsl(${variableName}, ${opacityValue})`;
    }
    return `hsl(${variableName})`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
        nunito: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        input: "hsl(var(--input))",
        ring: "transparent",
        background: "hsl(var(--background))",
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          lighter: "hsl(var(--foreground-lighter))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          darker: "hsl(var(--border-darker))",
        },
        gray: {
          default: "hsl(var(--gray))",
          lighter: "hsl(var(--gray-lighter))",
        },
        primary: {
          DEFAULT: withOpacity("var(--primary)"),
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: withOpacity("var(--secondary)"),
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: withOpacity("var(--destructive)"),
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius-sm)",
        sm: "calc(var(--radius-sm) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.2s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
