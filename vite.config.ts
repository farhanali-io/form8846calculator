import { resolve } from 'path';
import { defineConfig, Plugin } from 'vite';

// Plugin to handle clean URLs in development (e.g. /about -> /about.html)
function cleanUrls(): Plugin {
  return {
    name: 'clean-urls',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && !req.url.includes('.') && req.url !== '/') {
          req.url = req.url + '.html';
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [cleanUrls()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        fica: resolve(__dirname, 'fica-tip-credit-calculator.html'),
        instructions: resolve(__dirname, 'form-8846-instructions.html'),
        rule515: resolve(__dirname, '5-15-minimum-wage-tip-credit-rule.html'),
        restaurant: resolve(__dirname, 'restaurant-tip-credit-calculator.html'),
        salon: resolve(__dirname, 'salon-tip-credit-calculator.html'),
        states: resolve(__dirname, 'tip-credit-rules-by-state.html'),
        payroll: resolve(__dirname, 'tip-credit-vs-payroll-tax-credit.html'),
        about: resolve(__dirname, 'about.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
        disclaimer: resolve(__dirname, 'disclaimer.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
    },
  },
});
