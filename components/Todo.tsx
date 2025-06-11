"use client";

import React, { useState } from "react";
type TypeTodoSent = {
  id: number;
  label: string;
  completed: boolean;
};

type Props = {
  todo: TypeTodoSent;
  handleUpdateTodo: (todo: TypeTodoSent) => void;
  handleDeleteTodo: (id: number) => void;
};

const Todo = ({ todo, handleUpdateTodo, handleDeleteTodo }: Props) => {
  const [editing, setEditing] = useState(false);

  const handleCheckboxClick = () => {
    handleUpdateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };
  const handleEditClick = () => setEditing(!editing);
  const handleEditTodo = (e) => {
    handleUpdateTodo({
      ...todo,
      label: e.target.value,
    });
  };

  const handleDeleteClick = (id: number) => {
    handleDeleteTodo(id);
  };
  return (
    <div className="flex p-2">
      <label htmlFor={`${todo.id}`} className="flex p-2">
        <div className="px-2">
          <input
            type="checkbox"
            id={`${todo.id}`}
            checked={todo.completed}
            onChange={handleCheckboxClick}
          />
          <span />
        </div>
        {editing ? (
          <input value={todo.label} onChange={handleEditTodo} />
        ) : (
          <span className={`${todo.completed && "line-through"}`}>
            {" "}
            {todo.label}
          </span>
        )}
      </label>

      <button onClick={handleEditClick}>{editing ? "Save" : "Edit"}</button>
      <button onClick={() => handleDeleteClick(todo.id)}> Delete </button>
    </div>
  );
};

export default Todo;
