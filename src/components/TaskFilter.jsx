import React from 'react';
import './TaskFilter.css';

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button
          className={filter.status === 'all' ? 'active' : ''}
          onClick={() => setFilter({ ...filter, status: 'all' })}
        >
          All
        </button>
        <button
          className={filter.status === 'active' ? 'active' : ''}
          onClick={() => setFilter({ ...filter, status: 'active' })}
        >
          Active
        </button>
        <button
          className={filter.status === 'completed' ? 'active' : ''}
          onClick={() => setFilter({ ...filter, status: 'completed' })}
        >
          Completed
        </button>
      </div>
      
      <div className="priority-filters">
        <button
          className={filter.priority === 'all' ? 'active' : ''}
          onClick={() => setFilter({ ...filter, priority: 'all' })}
        >
          All Priorities
        </button>
        <button
          className={filter.priority === 'high' ? 'active' : ''}
          onClick={() => setFilter({ ...filter, priority: 'high' })}
        >
          High Priority
        </button>
        <button
          className={filter.priority === 'medium' ? 'active' : ''}
          onClick={() => setFilter({ ...filter, priority: 'medium' })}
        >
          Medium Priority
        </button>
        <button
          className={filter.priority === 'low' ? 'active' : ''}
          onClick={() => setFilter({ ...filter, priority: 'low' })}
        >
          Low Priority
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;
