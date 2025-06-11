"use client";

import React, { useState } from "react";
import Todo from "./Todo";
import TodoComposer from "./TodoComposer";

export type TodoType = {
  id: number;
  label: string;
  completed: boolean;
};
const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: 1,
      label: "learn react",
      completed: false,
    },
    {
      id: 2,
      label: "learn react query",
      completed: false,
    },
    {
      id: 3,
      label: "learn nextjs",
      completed: false,
    },
  ]);

  const handleUpdateTodo = (updatedTodo: TodoType) => {
    const newTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    );
    setTodos(newTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleAddTodo = (newTodo: TodoType) => {
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };
  return (
    <ul>
      <TodoComposer handleAddTodo= {handleAddTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
