import React, { Suspense } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import ErrorBoundary from "./ErrorBoundary"; // New Error Boundary Component
import "./App.css"; // Global Styles

function App() {
  return (
    <div className="app">
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <PlantPage />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
