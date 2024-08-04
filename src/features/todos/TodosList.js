import React, { useState, useEffect } from "react";
import {
	useGetTodosQuery,
	useNewTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} from "../api/todosApiSlice";
import { AiFillDelete } from "react-icons/ai";

import { DragDropContext, Draggable } from "react-beautiful-dnd";

import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";

function TodosList() {
	const [value, setValue] = useState("");

	const { data, isLoading, isSuccess, isError, error } = useGetTodosQuery();

	const [newTodo] = useNewTodoMutation();
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();

	const [todos, setTodos] = useState(data || []);

	useEffect(() => {
		setTodos(data);
	}, [data]);

	console.log(todos);

	const handleSubmit = (e) => {
		e.preventDefault();
		newTodo({ title: value, completed: false, userId: 1 });
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;

		const tasks = [...todos];
		const [reOrderedItem] = tasks.splice(result.source.index, 1);

		tasks.splice(result.destination.index, 0, reOrderedItem);

		setTodos(tasks);
	};

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = (
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="todos">
					{(provided) => (
						<section {...provided.droppableProps} ref={provided.innerRef}>
							{todos.map((todo, index) => {
								return (
									<Draggable
										key={todo.id}
										draggableId={todo.id.toString()}
										index={index}
									>
										{(provided) => (
											<div
												className="todo-box"
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												ref={provided.innerRef}
											>
												<div className="todo-title">
													<input
														type="checkbox"
														checked={todo.completed}
														onChange={() =>
															updateTodo({
																id: todo.id,
																completed: !todo.completed,
																title: todo.title,
															})
														}
													/>
													<h2>{todo.title}</h2>
												</div>
												<div className="todo-delete">
													<span onClick={() => deleteTodo(todo.id)}>
														<AiFillDelete />
													</span>
												</div>
											</div>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</section>
					)}
				</Droppable>
			</DragDropContext>
		);
	} else if (isError) {
		content = <p>{error}</p>;
	}

	return (
		<>
			<div className="row">
				<div className="col-lg-4 col-md-4 offset-md-4 col-sm-12 todos-box">
					<div className="add-todo">
						<h5 className="text-center">Please add new task</h5>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								value={value}
								onChange={(e) => setValue(e.target.value)}
								placeholder="Please enter new task..."
							/>
						</form>
					</div>
					{content}
				</div>
			</div>
		</>
	);
}

export default TodosList;
