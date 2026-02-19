import axios from "axios";
import { type ChangeEvent, type SubmitEvent, useEffect, useState } from "react";
import "./index.css";
import { CircleNotchIcon } from "@phosphor-icons/react";

export function App() {
	const [input, setInput] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [responsesGemini, setResponsesGemini] = useState<Array<string>>([]);

	const GeminiResponsesStorageKey = "gemini_responses";

	const handleSubmitForm = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(!isLoading);

		if (input.length > 0) {
			const response = await axios.post("http://localhost:3000/ask", {
				message: input,
			});

			const { message } = response.data;

			setResponsesGemini((prev) => {
				const updatedResponses = [...prev, message];
				localStorage.setItem(
					GeminiResponsesStorageKey,
					JSON.stringify(updatedResponses),
				);
				return updatedResponses;
			});
			setInput("");
		}

		setIsLoading(false);
	};

	useEffect(() => {
		const responses = localStorage.getItem(GeminiResponsesStorageKey);

		if (responses) setResponsesGemini(JSON.parse(responses));
	}, []);

	const handleInputValue = (
		e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) => {
		setInput(e.target.value);
	};

	return (
		<main className="flex flex-col items-center justify-center h-svh p-8">
			<form
				onSubmit={(e) => handleSubmitForm(e)}
				className="flex flex-col justify-end border rounded-md xl:w-7xl min-h-100 h-full gap-3 p-8 text-center relative z-10"
			>
				<div className="flex flex-col flex-1 gap-5 rounded-sm p-5 overflow-y-auto shadow-inner shadow-zinc-700">
					{responsesGemini.length > 0 ? (
						responsesGemini.map((response) => (
							<p
								key={response.length}
								className="text-start bg-zinc-700 p-2 rounded-sm"
							>
								{response}
							</p>
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
						onChange={(e) => handleInputValue(e)}
					/>
					<button
						className="flex items-center justify-center border w-17.5 py-2 rounded-sm cursor-pointer hover:bg-zinc-200 hover:text-zinc-900 transition-all ease-in-out duration-300"
						type="submit"
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

export default App;
