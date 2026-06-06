import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "out-v5");
const port = 3461;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
};

http
  .createServer((req, res) => {
    let urlPath = req.url.split("?")[0];
    // Clean URL → .html mapping
    let filePath;
    if (urlPath === "/" || urlPath === "") {
      filePath = path.join(outDir, "index.html");
    } else if (!path.extname(urlPath)) {
      // No extension → try .html
      const htmlPath = path.join(outDir, urlPath + ".html");
      if (fs.existsSync(htmlPath)) {
        filePath = htmlPath;
      } else {
        filePath = path.join(outDir, urlPath);
      }
    } else {
      filePath = path.join(outDir, urlPath);
    }

    // Security: prevent directory traversal
    if (!filePath.startsWith(outDir)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mime[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Fallback: serve index.html for SPA-like behavior on 404
        fs.readFile(path.join(outDir, "index.html"), (err2, fallback) => {
          if (err2) {
            res.writeHead(404);
            res.end("404 Not Found");
          } else {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(fallback);
          }
        });
        return;
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
