import index from "./index.html";
import { summarizer } from "./api/gemini";
import { serve } from "bun";
import type { IMessage } from "./App";

interface IAsk {
	message: string;
}

const server = serve({
	routes: {
		"/*": index,
		"/ask": async (req): Promise<Response> => {
			const body = await req.json();
			const { message } = body as IAsk;

			try {
				const response = await summarizer(message);

				if (!response)
					return Response.json({
						error: "Error ao obter a mensagem",
						status: 500,
					});

				return Response.json(
					{
						id: Bun.randomUUIDv7(),
						role: "assistant",
						content: response,
						timestamp: new Date(),
					},
					{ status: 200 },
				);
			} catch (error) {
				return Response.json({
					error: error,
					messageError: "Erro interno no servidor",
					status: 500,
				});
			}
		},
	},

	development: process.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
});

console.log(`🚀 Server running at ${server.url}`);
