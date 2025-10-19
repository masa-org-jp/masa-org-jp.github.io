import React from "react";
import ReactDOM from "react-dom/client";
import ItemList from "../src/ItemList";
import "../src/index.css";

targetElement(() => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    return;
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ItemList />
    </React.StrictMode>
  );
});

function targetElement(callback: () => void) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
  } else {
    callback();
  }
}
