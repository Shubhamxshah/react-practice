import React, { useState } from "react";
import { TodoType } from "./TodoList";

type Props = {
  handleAddTodo: (todo: TodoType) => void;
};

const createTodo = (label: string) => {
  return {
    id: Math.floor(Math.random() * 1000),
    label,
    completed: false,
  };
};

const TodoComposer = ({ handleAddTodo }: Props) => {
  const [label, setLabel] = useState("");
  const handleUpdateLabel = (e) => setLabel(e.target.value);

  const handleAddTodoClick = () => {
    const todo = createTodo(label);
    handleAddTodo(todo);
    setLabel("");
  };
  return (
    <li>
      <input
        placeholder="Add a new Todo"
        type="text"
        value={label}
        onChange={handleUpdateLabel}
      />
      <button disabled={label.length === 0} onClick={handleAddTodoClick}>
        Add
      </button>
    </li>
  );
};

export default TodoComposer;
