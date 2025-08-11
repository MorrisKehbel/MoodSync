import { useState, useEffect } from "react";
import { dailyTasksAPI } from "../../data/dailyTasks";
import DailyTaskModal from "./DailyTaskModal";

const DailyTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await dailyTasksAPI.getTasks(today);
      setTasks(response.tasks || []);
    } catch (error) {
      console.error("Error fetching daily tasks:", error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (title) => {
    try {
      setIsAddingTask(true);
      const response = await dailyTasksAPI.addTask({ title, date: today });
      setTasks((prev) => [response.task, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding daily task:", error);
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      setIsUpdatingTask(true);
      await dailyTasksAPI.updateTask(taskId, { completed });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating daily task:", error);
    } finally {
      setIsUpdatingTask(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await dailyTasksAPI.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting daily task:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md h-64">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-md h-64">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Daily Tasks</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
            disabled={isAddingTask}
          >
            {isAddingTask ? "Adding..." : "add daily task"}
          </button>
        </div>

        <div className="space-y-3 max-h-44 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No tasks for today. Add your first task!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <button
                    onClick={() => handleToggleTask(task._id, !task.completed)}
                    disabled={isUpdatingTask}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {task.completed && (
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    className={`text-sm flex-1 ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all ml-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <DailyTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </>
  );
};

export default DailyTasks;
