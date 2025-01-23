import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctor Appointment",
      category: "health",
      completed: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      category: "work",
      completed: false,
    },
  ]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}:${month}:${year}`;
  }

  function addTask() {
    if (text.trim() === "" || category.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text,
      category: category.toLowerCase(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setText("");
    setCategory("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function editTask(id, newText) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.category === filter.toLowerCase());

  const categories = [
    "all",
    ...new Set(tasks.map((task) => task.category.toLowerCase())),
  ];

  return (
    <div className="todo-list">
      <h1 className="todo-list-title">TODO LIST</h1>
      <div className="date-time">
        <p>Today's Date: {formatDate(currentTime)}</p>
        <p>Current Time: {currentTime.toLocaleTimeString()}</p>
      </div>
      <div className="todo-input-container">
        <input
          type="text"
          placeholder="Add a task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filter-section">
        <label htmlFor="filter">Filter by category:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {filteredTasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default TodoList;
