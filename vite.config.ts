import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { allRoutes } from "./src/data";
export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: "preview-prerendered-routes",
      configurePreviewServer(server) {
        // Vite's SPA fallback otherwise returns the homepage for slashless URLs.
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url || "/", "http://localhost");
          const route = url.pathname.replace(/\/$/, "") || "/";
          if (allRoutes.includes(route))
            req.url =
              (route === "/" ? "/index.html" : `${route}/index.html`) +
              url.search;
          else if (!route.split("/").pop()?.includes(".")) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(readFileSync("dist/404.html", "utf8"));
            return;
          }
          next();
        });
      },
    },
  ],
  ssr: {
    noExternal: ["react-router", "react-router-dom", "react-zoom-pan-pinch"],
  },
  build: { emptyOutDir: false },
});
