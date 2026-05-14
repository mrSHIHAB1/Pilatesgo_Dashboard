
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxioSecure";
import useAuth from "./useAuth";


const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {

            const res = await axiosSecure.get(`/users/admin/${user!.email}`);
          
            return res.data?.admin;
        }
    })
    return [isAdmin ?? false, isAdminLoading] as const;
};

export default useAdmin;
