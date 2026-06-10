
import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import axios from "axios";

export type AuthUser = {
    id?: string;
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
};

export type LoginCredentials = {
    email: string;
    password: string;
    [key: string]: unknown;
};

export type AuthContextValue = {
    user: AuthUser | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

const axiosPublic = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
});

// Add a request interceptor
axiosPublic.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const res = await axiosPublic.get("/auth/me");

            setUser(res.data.data);
        
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setLoading(true);
        try {
            const res = await axiosPublic.post("/auth/login", credentials);
          
            const accessToken = res.data?.data?.accessToken;

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }

            // Fetch the user profile and enforce ADMIN-only access
            const meRes = await axiosPublic.get("/auth/me");
            const loggedInUser = meRes.data?.data;
            if (loggedInUser?.role !== "ADMIN") {
                // Not an admin – revoke the token and reject
                localStorage.removeItem("accessToken");
                setUser(null);
                throw new Error("Access denied. Only administrators can log in to this dashboard.");
            }

            setUser(loggedInUser);
        } finally {
            setLoading(false);
        }
    };


    const logOut = async () => {
        setLoading(true);
        try {
            await axiosPublic.post("/auth/logout");
        } catch (error) {
            console.error(error);
        } finally {
            localStorage.removeItem("accessToken");
            setUser(null);
            setLoading(false);
        }
    };

    const authInfo = {
        user,
        loading,
        login,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;