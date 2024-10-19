// 3 steps:
// 1. creating the context
// 2. providing the context
// 3. consuming the context

import React, {ReactNode, useContext, useState} from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

// const someContext = createContext(defaultValue)
export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
ThemeContext.displayName = 'ThemeContext';

// ======================================= ContextProvider here ====================================
interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

// ============================================ custom hook ====================================
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('Component must be used within a Context Provider');
    }
    return context;
}