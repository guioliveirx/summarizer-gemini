import { serve } from "bun";
import index from "./index.html";
import { summarizer } from "./api/gemini";

interface IRequestGemini {
	message: string;
}

const server = serve({
	routes: {
		"/*": index,
		"/ask": async (req) => {
			const { message } = (await req.json()) as IRequestGemini;

			const response = await summarizer(message);

			return Response.json({
				message: response,
				status: 201,
			});
		},
	},

	development: process.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
});

console.log(`🚀 Server running at ${server.url}`);
