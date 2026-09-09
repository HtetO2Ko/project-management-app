import { useContext } from "react";
import NewTask from "./NewTask.jsx";
import { ProjectContext } from "../store/project-context.jsx";

export default function Tasks({ projectid }) {
  const { tasks, onAddTask, onDeleteTask } = useContext(ProjectContext);

  const updatedTasks = tasks.filter((task) => task.projectId === projectid);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {updatedTasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This Project doesn't have any tasks yet!
        </p>
      )}
      {updatedTasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {updatedTasks.map((task) => {
            return (
              <li key={task.id} className="flex justify-between my-4">
                <span>{task.text}</span>
                <button
                  className="text-stone-700 hover:text-red-500"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Clear
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
