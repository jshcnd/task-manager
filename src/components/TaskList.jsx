import React, { useState } from 'react';
import './TaskList.css';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import CalendarView from './CalendarView';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all'
  });
  const [view, setView] = useState('list'); // 'list' or 'calendar'

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter.status === 'active' && task.completed) return false;
    if (filter.status === 'completed' && !task.completed) return false;
    if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
    return true;
  });

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      
      <div className="view-toggle">
        <button
          className={view === 'list' ? 'active' : ''}
          onClick={() => setView('list')}
        >
          List View
        </button>
        <button
          className={view === 'calendar' ? 'active' : ''}
          onClick={() => setView('calendar')}
        >
          Calendar View
        </button>
      </div>

      <TaskForm
        onAddTask={addTask}
        onEditTask={editTask}
        editingTask={editingTask}
      />

      <TaskFilter filter={filter} setFilter={setFilter} />

      {view === 'list' ? (
        <ul className="task-list">
          {filteredTasks.map(task => (
            <li key={task.id} className={`task-item ${task.priority}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <div className="task-content">
                <span className={task.completed ? 'completed' : ''}>
                  {task.text}
                </span>
                {task.dueDate && (
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="task-actions">
                <button
                  onClick={() => setEditingTask(task)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <CalendarView tasks={tasks} />
      )}
    </div>
  );
};

export default TaskList;
