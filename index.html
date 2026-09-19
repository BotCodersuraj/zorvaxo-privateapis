import express from "express";
import http from "http";
import crypto from "crypto";
import { WebSocketServer } from "ws";
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sessions = new Map();

async function createBrowser() {
    const browser = await chromium.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage"
        ]
    });

    const context = await browser.newContext({
        viewport: {
            width: 1280,
            height: 720
        }
    });

    const page = await context.newPage();

    return {
        browser,
        context,
        page
    };
}

app.post("/api/browser/create", async (req, res) => {
    try {
        const id = crypto.randomBytes(16).toString("hex");

        const instance = await createBrowser();

        sessions.set(id, {
            id,
            ...instance,
            clients: new Set(),
            createdAt: Date.now()
        });

        await instance.page.goto(
            "https://example.com",
            {
                waitUntil: "domcontentloaded"
            }
        );

        res.json({
            success: true,
            browser_id: id,
            viewer_url: `/viewer/${id}`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/api/browser/:id/status", async (req, res) => {

    const session = sessions.get(req.params.id);

    if (!session) {
        return res.status(404).json({
            success: false,
            message: "Browser session not found"
        });
    }

    res.json({
        success: true,
        browser_id: session.id,
        clients: session.clients.size,
        created_at: session.createdAt
    });
});

app.post("/api/browser/:id/navigate", async (req, res) => {

    const session = sessions.get(req.params.id);

    if (!session) {
        return res.status(404).json({
            success: false,
            message: "Browser not found"
        });
    }

    const url = String(req.body?.url || "");

    if (!/^https?:\/\//i.test(url)) {
        return res.status(400).json({
            success: false,
            message: "Only HTTP/HTTPS URLs are allowed"
        });
    }

    try {

        await session.page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 30000
        });

        broadcast(session, {
            type: "navigation",
            url: session.page.url()
        });

        res.json({
            success: true,
            url: session.page.url()
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post("/api/browser/:id/close", async (req, res) => {

    const session = sessions.get(req.params.id);

    if (!session) {
        return res.status(404).json({
            success: false
        });
    }

    await session.browser.close();

    sessions.delete(req.params.id);

    res.json({
        success: true
    });
});

app.get("/viewer/:id", (req, res) => {

    if (!sessions.has(req.params.id)) {
        return res.status(404).send("Browser session not found");
    }

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});

function broadcast(session, data) {

    const message = JSON.stringify(data);

    for (const ws of session.clients) {

        if (ws.readyState === 1) {
            ws.send(message);
        }
    }
}

wss.on("connection", (ws, req) => {

    const parts = req.url.split("/");

    const id = parts[parts.length - 1];

    const session = sessions.get(id);

    if (!session) {
        ws.close();
        return;
    }

    session.clients.add(ws);

    ws.send(JSON.stringify({
        type: "connected",
        browser_id: id,
        url: session.page.url()
    }));

    ws.on("message", async raw => {

        try {

            const data = JSON.parse(raw.toString());

            if (data.type === "navigate") {

                const url = String(data.url || "");

                if (!/^https?:\/\//i.test(url)) {
                    return;
                }

                await session.page.goto(url, {
                    waitUntil: "domcontentloaded",
                    timeout: 30000
                });

                broadcast(session, {
                    type: "navigation",
                    url: session.page.url()
                });
            }

            if (data.type === "back") {

                await session.page.goBack();

                broadcast(session, {
                    type: "navigation",
                    url: session.page.url()
                });
            }

            if (data.type === "forward") {

                await session.page.goForward();

                broadcast(session, {
                    type: "navigation",
                    url: session.page.url()
                });
            }

        } catch (error) {

            ws.send(JSON.stringify({
                type: "error",
                message: error.message
            }));
        }
    });

    ws.on("close", () => {
        session.clients.delete(ws);
    });
});

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        service: "Remote Browser",
        browsers: sessions.size
    });
});

server.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Remote Browser running on port ${PORT}`
    );
});