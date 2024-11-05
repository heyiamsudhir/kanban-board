import React, { createContext, useContext, useState, useEffect } from "react";

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  // Define the initial state for selected options
  const initialState = {
    grouping: "status",
    ordering: "priority",
  };

  // Attempt to retrieve saved state from localStorage
  const savedState = JSON.parse(localStorage.getItem("appState") || "{}");

  // Check if savedState has the correct structure, otherwise fall back to initialState
  const [selectedOptions, setSelectedOptions] = useState({
    ...initialState,
    ...savedState
  });

  // Update the selected options in the state
  const updateSelectedOptions = (ordering, grouping) => {
    const newSelectedOptions = { grouping, ordering }; // Correct the parameters order
    setSelectedOptions(newSelectedOptions);
  };

  // Store selected options in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  return (
    <AppStateContext.Provider value={{ selectedOptions, updateSelectedOptions }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
