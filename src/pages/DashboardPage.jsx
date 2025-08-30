import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import api from "../api";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false,
  });

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/tasks/tasklist/${auth?.user?.user?._id}`
      );
      setTasks(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // Status change
  const handleStatusChange = async (id) => {
  try {
    const { data } = await api.patch(`/tasks/${id}`);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? data.updatedTask : task))
    );
  } catch (err) {
    console.error(err);
  }
};


  // Open edit modal
  const handleEdit = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      completed: task.completed,
    });
    setIsModalOpen(true);
  };

  // Submit edit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/tasks/${editingTask._id}`, form);
      setTasks((prev) =>
        prev.map((task) => (task._id === editingTask._id ? data.task : task))
      );
      setIsModalOpen(false);
      toast.success("Task updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>

      {/* Task Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => handleEdit(task)}
            onDelete={() => handleDelete(task._id)}
            onStatusChange={(newStatus) =>
              handleStatusChange(task._id, newStatus)
            }
          />
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
