import React, { createContext, useContext, useState } from 'react';

// Create context for user state
const UserContext = createContext();

// Custom hook to access user context
export const useUser = () => useContext(UserContext);

// Provider component to wrap the app and provide user state
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState("None");

    // Function to update user state
    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
