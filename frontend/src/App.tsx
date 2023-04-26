import "./App.css";
import DataTableComponent from "./components/DataTableComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataTableComponent reportName="Sales" />
    </QueryClientProvider>
  );
}

export default App;
