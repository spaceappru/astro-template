/**
 * Tailwind Typography can only be configured via JavaScript, using a legacy
 * configuration file like this one.
 */

// Copied from Tailwind Typography.
const hexToRgb = (hex) => {
  if (typeof hex !== "string" || hex.length === 0) {
    return hex;
  }

  hex = hex.replace("#", "");
  hex = hex.length === 3 ? hex.replace(/./g, "$&$&") : hex;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
};

module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        /**
         * Tailwind Typography’s default styles are opinionated, and
         * you may need to override them if you have mockups to
         * replicate. You can view the default modifiers here:
         *
         * https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
         */

        DEFAULT: {
          css: [
            {
              /**
               * By default, max-width is set to 65 characters.
               * This is a good default for readability, but
               * often in conflict with client-supplied designs.
               * A value of false removes the max-width property.
               */
              maxWidth: false,

              /**
               * Tailwind Typography uses the font weights 400
               * through 900. If you’re not using a variable font,
               * you may need to limit the number of supported
               * weights. Below are all of the default weights,
               * ready to be overridden.
               */
              // a: {
              // 	fontWeight: '500',
              // },
              // strong: {
              // 	fontWeight: '600',
              // },
              // 'ol > li::marker': {
              // 	fontWeight: '400',
              // },
              // dt: {
              // 	fontWeight: '600',
              // },
              // blockquote: {
              // 	fontWeight: '500',
              // },
              // h1: {
              // 	fontWeight: '800',
              // },
              // 'h1 strong': {
              // 	fontWeight: '900',
              // },
              // h2: {
              // 	fontWeight: '700',
              // },
              // 'h2 strong': {
              // 	fontWeight: '800',
              // },
              // h3: {
              // 	fontWeight: '600',
              // },
              // 'h3 strong': {
              // 	fontWeight: '700',
              // },
              // h4: {
              // 	fontWeight: '600',
              // },
              // 'h4 strong': {
              // 	fontWeight: '700',
              // },
              // kbd: {
              // 	fontWeight: '500',
              // },
              // code: {
              // 	fontWeight: '600',
              // },
              // pre: {
              // 	fontWeight: '400',
              // },
              // 'thead th': {
              // 	fontWeight: '600',
              // },

              "--tw-prose-body": "var(--prose-text)",
              "--tw-prose-headings": "var(--prose-title)",
              "--tw-prose-lead": "var(--prose-text)",
              "--tw-prose-links": "var(--prose-link)",
              "--tw-prose-bold": "var(--prose-text)",
              "--tw-prose-counters": "var(--prose-counter)",
              "--tw-prose-bullets": "var(--prose-bullet)",
              "--tw-prose-hr": "var(--prose-text)",
              "--tw-prose-quotes": "var(--prose-text)",
              "--tw-prose-quote-borders": theme("colors.primary"),
              "--tw-prose-captions": "var(--prose-text)",
              "--tw-prose-kbd": "var(--prose-text)",
              "--tw-prose-kbd-shadows": hexToRgb("var(--prose-text)"),
              "--tw-prose-code": "var(--prose-text)",
              "--tw-prose-pre-code": theme("colors.background"),
              "--tw-prose-pre-bg": "var(--prose-text)",
              "--tw-prose-th-borders": "var(--prose-text)",
              "--tw-prose-td-borders": "var(--prose-text)",
            },
          ],
        },
      }),
    },
  },
};
