import {createContext, ReactNode, useContext, useState} from "react";

type AppContextType = {
    currentUser: any,
    setCurrentUser: (user: any) => void,
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderProps = {
    children: ReactNode,
}

export const AppContextProvider = (props: AppContextProviderProps) => {
    const {children} = props;
    const [currentUser, setCurrentUser] = useState(null);
    return (
        <AppContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AppContext.Provider>
    );
}

// custom hook
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('The Component must be used within a ContextProvider');
    }
    return context;
}

export default AppContext;