const pxToRem = (num) => {
  return `${num/16}rem`;
};

module.exports = {
    theme: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        display: "2100px",
      },
      colors: {
        transparent: "transparent",
        black: "#0d0d0d",
        white: "#FFFFFF",
        gray: '#f7fafc',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': [pxToRem(64), 1.2],
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      extend: {
        spacing: {},
        zIndex: {
          '999' : 999,
        }
      }
    },
    variants: {},
    corePlugins: {
      container: false,
    },
    purge: {
      options: {
        whitelistPatterns: [/^is-/,/^is-non/,/^tl-/,/^has-/, /^flickity--/,/^fx-/],
        whitelist: ['opacity-50', 'pointer-events-none'],
      },
      content: [
        './src/**/*.html', 
        './src/**/*.njk',
      ],
    },
    future: {
      removeDeprecatedGapUtilities: true,
    }
  }