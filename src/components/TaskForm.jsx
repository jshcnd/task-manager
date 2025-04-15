import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAddTask, onEditTask, editingTask }) => {
  const [task, setTask] = useState(editingTask || {
    text: '',
    dueDate: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.text.trim()) {
      if (editingTask) {
        onEditTask({ ...task, id: editingTask.id });
      } else {
        onAddTask({ ...task, id: Date.now(), completed: false });
      }
      setTask({ text: '', dueDate: '', priority: 'medium' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={task.text}
        onChange={(e) => setTask({ ...task, text: e.target.value })}
        placeholder="Add a new task..."
        className="task-input"
      />
      <input
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        className="date-input"
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        className="priority-select"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button type="submit" className="add-button">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
