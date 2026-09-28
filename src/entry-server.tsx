import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

/** Build-time only: scripts/prerender.mjs writes this HTML into dist so crawlers that skip JS still see content. */
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StaticRouter>
  );
}
