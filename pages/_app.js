import { UserProvider } from "@auth0/nextjs-auth0";
import { TodosProvider } from "../contexts/TodosContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<TodosProvider>
				<div className="w-full mx-auto my-6 max-w-xl">
					<Component {...pageProps} />
				</div>
			</TodosProvider>
		</UserProvider>
	);
}

export default MyApp;
