import axios from "axios";
import { createContext, useState } from "react";

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);

	const getTodos = async () => {
		try {
			const { data: todos } = await axios.get("/api/todos");
			setTodos(todos);
		} catch (error) {
			console.log(error);
		}
	};

	const addTodo = async description => {
		try {
			const { data: createdTodo } = await axios.post("/api/todos", {
				description,
			});
			setTodos(prev => [...prev, createdTodo]);
		} catch (error) {
			console.log(error);
		}
	};
	const updateTodo = async (id, updates) => {
		try {
			await axios.put(`/api/todos/${id}`, {
				...updates,
			});
			setTodos(prev => {
				const newTodos = prev.map(todo => {
					if (todo.id !== id) return todo;
					return { ...todo, ...updates };
				});
				return newTodos;
			});
		} catch (error) {
			console.log(error);
		}
	};
	const deleteTodo = async id => {
		try {
			await axios.delete(`/api/todos/${id}`);
			setTodos(todos.filter(todo => todo.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TodosContext.Provider
			value={{
				todos,
				setTodos,
				getTodos,
				updateTodo,
				deleteTodo,
				addTodo,
			}}>
			{children}
		</TodosContext.Provider>
	);
};
