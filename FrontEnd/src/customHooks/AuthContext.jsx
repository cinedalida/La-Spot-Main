import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken}}>
            {children} { /* all components within this provider has access to accessToken and its function */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
// this hook simplifies the code so you wouldn't constantly type the useContext(AuthContext);