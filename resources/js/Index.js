import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const client=new QueryClient();

function Index() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default Index;
ReactDOM.render(<Index />, document.getElementById("root"));
