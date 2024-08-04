import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
	tagTypes: ["Todos"],
	endpoints: (builder) => ({
		getTodos: builder.query({
			query: () => "/todos",
			transformResponse: (res) => res.sort((a, b) => b.id - a.id),
			providesTags: ["Todos"],
		}),
		newTodo: builder.mutation({
			query: (todo) => ({
				url: "/todos",
				method: "POST",
				body: { ...todo },
			}),
			invalidatesTags: ["Todos"],
		}),
		updateTodo: builder.mutation({
			query: (todo) => ({
				url: `/todos/${todo.id}`,
				method: "PUT",
				body: { ...todo },
			}),
			invalidatesTags: ["Todos"],
		}),
		deleteTodo: builder.mutation({
			query: (todoId) => ({
				url: `/todos/${todoId}`,
				method: "DELETE",
				body: todoId,
			}),
			invalidatesTags: ["Todos"],
		}),
	}),
});

export const {
	useGetTodosQuery,
	useNewTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = todosApiSlice;
