import React from 'react';
import './TodoList.css';
import 'TodoItem.css';
import { useState } from "react";

function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  function handleEdit() {
    if (isEditing && newText.trim() !== "") {
      editTask(task.id, newText);
    }
    setIsEditing(!isEditing);
  }

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompleted(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <p>
          {task.text} <span>[{task.category.charAt(0).toUpperCase() + task.category.slice(1)}]</span>
        </p>
      )}
      <button className="edit-btn" onClick={handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
