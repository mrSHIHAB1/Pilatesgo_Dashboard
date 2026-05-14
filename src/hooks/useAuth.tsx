import { useContext } from "react";
import { AuthContext, type AuthContextValue} from "../providers/AuthProvider";


export default function useAuth(): AuthContextValue {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("useAuth must be used within <AuthProvider />");
    }
    return auth;
}