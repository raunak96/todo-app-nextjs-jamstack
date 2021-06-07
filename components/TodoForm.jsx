import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";

const TodoForm = () => {
	const [todo, setTodo] = useState("");
	const { addTodo } = useContext(TodosContext);

	const handleSubmit = e => {
		e.preventDefault();
		addTodo(todo);
		setTodo("");
	};
	return (
		<form className="my-6" onSubmit={handleSubmit}>
			<div className="flex flex-col mb-2 text-sm">
				<label className="font-bold text-gray-700 mb-2" htmlFor="todo">
					Todo
				</label>
				<input
					type="text"
					name="todo"
					id="todo"
					value={todo}
					onChange={e => setTodo(e.target.value)}
					placeholder="ex. Learn Jamstack with Nextjs"
					className="border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
				/>
			</div>
			<button
				className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
				type="submit">
				Add
			</button>
		</form>
	);
};

export default TodoForm;
