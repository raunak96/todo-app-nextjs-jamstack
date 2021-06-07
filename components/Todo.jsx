import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";

const Todo = ({ todo }) => {
	const { updateTodo, deleteTodo } = useContext(TodosContext);

	const toggleTodoDone = () => {
		updateTodo(todo.id, { completed: !todo.completed });
	};
	return (
		<li className="flex items-center shadow-lg my-2 py-2 px-4 bg-white space-x-3">
			<input
				type="checkbox"
				name="completed"
				id="completed"
				checked={todo.completed}
				className="h-5 w-5"
				onChange={toggleTodoDone}
			/>
			<p
				className={`flex-1 text-gray-800 ${
					todo.completed && "line-through"
				}`}>
				{todo.description}
			</p>
			<button
				type="button"
				className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded outline-none"
				onClick={() => deleteTodo(todo.id)}>
				Delete
			</button>
		</li>
	);
};

export default Todo;
