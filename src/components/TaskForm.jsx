import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export default function TaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/tasks/create", {
        ...form,
        userId: auth?.user?.user?._id,
      });

      toast.success("Task created successfully");

      // reset form
      setForm({ title: "", description: "", dueDate: "", completed: false });
    } catch (err) {
      console.error("Error creating task:", err.response?.data || err.message);
      toast.error("Something wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-xl"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl resize-none"
          rows={4}
        />

        {/* Due Date */}
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-xl"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
