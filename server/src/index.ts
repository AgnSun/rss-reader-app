import express, { Request, Response } from "express";
import cors from "cors";
import Parser from "rss-parser";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const parser = new Parser();

app.get("/api/parse", async (req: Request, res: Response) => {
	const feedUrl = req.query.url as string;
	if (!feedUrl) return res.status(400).json({ error: "No URL parameter" });

	try {
		const feed = await parser.parseURL(feedUrl);
		res.json(feed);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

app.listen(port, () => {
	console.log(`Backend is working on http://localhost:${port}`);
});
