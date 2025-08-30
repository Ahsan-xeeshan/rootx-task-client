const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* Task Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{task?.title}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            task?.completed
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {task?.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Task Description */}
      <p className="text-gray-600">{task?.description}</p>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task)}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          onClick={() => onStatusChange(task)}
          className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          {task?.completed ? "Mark Pending" : "Mark Complete"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
