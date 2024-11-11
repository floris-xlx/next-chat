import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      sm: '640px',
      '2xl': '1536px',
      'mobile-small': '420px'
    },
    extend: {
      keyframes: {
        drawerSlideLeftAndFade: {
          from: {
            opacity: '0',
            transform: 'translateX(100%)'
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        drawerSlideRightAndFade: {
          from: {
            opacity: '1',
            transform: 'translateX(0)'
          },
          to: {
            opacity: '0',
            transform: 'translateX(100%)'
          }
        },
        'caret-blink': {
          '0%,70%,100%': {
            opacity: '1'
          },
          '20%,50%': {
            opacity: '0'
          }
        },
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        accordionOpen: {
          from: {
            height: '0px'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        accordionClose: {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0px'
          }
        }
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        accordionOpen: 'accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)',
        accordionClose: 'accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)',
        drawerSlideLeftAndFade: 'drawerSlideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        drawerSlideRightAndFade: 'drawerSlideRightAndFade 150ms ease-in'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(--accent)',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))'
        },
        'brand-disabled': {
          DEFAULT: '#8d37dd2f',
          foreground: '#8d37dd2f'
        },
        icon: {
          DEFAULT: 'hsl(var(--icon))',
          foreground: 'hsl(var(--icon-foreground))'
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
          foreground: 'hsl(var(--border-foreground))'
        },
        hover: {
          DEFAULT: 'hsl(var(--hover))',
          foreground: 'var(--hover-foreground)'
        },
        amber: {
          DEFAULT: 'hsl(var(--amber))',
          foreground: 'hsl(var(--amber-foreground))'
        },
        yellow: {
          DEFAULT: 'var(--yellow)',
          foreground: 'var(--yellow-foreground)'
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--error-foreground))'
        },
        logo: 'hsl(var(--logo))',
        system: {
          DEFAULT: 'var(--system)',
          foreground: 'hsl(var(--system-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      lineHeight: {
        sm: '0.875rem',
        md: '1.75rem',
        lg: '2rem'
      },
      fontSize: {
        sm: '14px',
        md: '1rem',
        lg: '1.125rem',
        xl: '24px'
      },
      fontWeight: {
        small: '400',
        medium: '500',
        large: '600'
      },
      textColor: {
        DEFAULT: 'hsl(var(--text))',
        foreground: 'hsl(var(--text-foreground))',
        secondary: 'var(--text-secondary)'
      },
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
        foreground: 'var(--border-secondary)'
      }
    }
  },
  plugins: [],
};
export default config;
