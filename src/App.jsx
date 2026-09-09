import { useContext } from "react";
import ProjectContextProvider, {
  ProjectContext,
} from "./store/project-context.jsx";

import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function AppContent() {
  const { selectedProjectId } = useContext(ProjectContext);

  let content = <SelectedProject />;

  if (selectedProjectId === null) {
    content = <NewProject />;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
}

function App() {
  return (
    <ProjectContextProvider>
      <AppContent />
    </ProjectContextProvider>
  );
}

export default App;
