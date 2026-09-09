import { createContext, useState } from "react";

export const ProjectContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  onStartAddProject: () => {},
  onCancelAddProject: () => {},
  onSelectProject: () => {},
  onAddProject: () => {},
  onDeleteProject: () => {},
  tasks: [],
  onAddTask: () => {},
  onDeleteTask: () => {},
});

export default function ProjectContextProvider({ children }) {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId,
        ),
      };
    });
  }

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const ctxValue = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    onStartAddProject: handleStartAddProject,
    onCancelAddProject: handleCancelAddProject,
    onSelectProject: handleSelectProject,
    onAddProject: handleAddProject,
    onDeleteProject: handleDeleteProject,
    tasks: projectsState.tasks,
    onAddTask: handleAddTask,
    onDeleteTask: handleDeleteTask,
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
}
