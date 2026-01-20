import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'meteor-effect': 'meteor 5s linear infinite',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    addVariablesForColors,
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = theme('colors');
  const newVars = Object.fromEntries(
    Object.entries(allColors).flatMap(([key, val]) => {
      if (typeof val === 'string') {
        return [[`--${key}`, val]];
      }
      return Object.entries(val as Record<string, string>).map(([subKey, subVal]) => [
        `--${key}-${subKey}`,
        subVal,
      ]);
    })
  );

  addBase({
    ':root': newVars,
  });
}

export default config;
