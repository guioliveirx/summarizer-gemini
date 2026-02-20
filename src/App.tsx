import axios from "axios";
import { type SubmitEvent, useEffect, useState } from "react";
import "./index.css";
import { CircleNotchIcon } from "@phosphor-icons/react";

export interface IMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

export function App() {
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Array<IMessage>>([]);
	const StorageKey = "gemini_responses";

	const handleSubmitForm = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!input.trim()) return;

		const userMessage: IMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content: input,
			timestamp: new Date(),
		};

		setMessages((prev) => {
			const updated = [...prev, userMessage];
			localStorage.setItem(StorageKey, JSON.stringify(updated));
			return updated;
		});

		setIsLoading(true);
		setInput("");

		try {
			const response = await axios.post("http://localhost:3000/ask", {
				message: input,
			});

			const assistantMessage: IMessage = response.data;

			setMessages((prev) => {
				const updated = [...prev, assistantMessage];
				localStorage.setItem(StorageKey, JSON.stringify(updated));
				return updated;
			});
		} catch (error) {
			console.error("Erro ao enviar mensagem:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const responses = localStorage.getItem(StorageKey);

		if (!responses) return;

		setMessages(JSON.parse(responses));
	}, []);

	return (
		<main className="flex flex-col items-center justify-center h-svh p-8">
			<form
				onSubmit={(e) => handleSubmitForm(e)}
				className="flex flex-col justify-end border rounded-md xl:w-7xl min-h-100 h-full gap-3 p-8 text-center relative z-10"
			>
				<div className="flex flex-col flex-1 gap-5 rounded-sm p-5 overflow-y-auto shadow-inner shadow-zinc-700">
					{messages.length > 0 ? (
						messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[75%] p-3 rounded-md ${
										message.role === "user"
											? "bg-blue-600 text-white"
											: "bg-zinc-700 text-zinc-100"
									}`}
								>
									<p>{message.content}</p>
								</div>
							</div>
						))
					) : (
						<p className="text-start text-inherit">Have no messages</p>
					)}
				</div>
				<div className="flex gap-5">
					<input
						className="border px-5 py-2 rounded-sm flex-1"
						type="text"
						name="iText"
						id="iText"
						value={input}
						placeholder="Input your text"
						onChange={(e) => setInput(e.target.value)}
					/>
					<button
						className="flex items-center justify-center border w-17.5 py-2 rounded-sm cursor-pointer hover:bg-zinc-200 hover:text-zinc-900 transition-all ease-in-out duration-300"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? (
							<CircleNotchIcon
								className="animate-spin"
								size="22"
								color="#d9d9d9"
							/>
						) : (
							"Send"
						)}
					</button>
				</div>
			</form>
		</main>
	);
}
