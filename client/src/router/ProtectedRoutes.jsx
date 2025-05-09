import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';


const ProtectedRoute = ({ children, redirectTo = "/login", isAdmin, isPublic = false }) => {
    const user = useSelector((state) => state?.auth?.user);
    const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!isPublic && !isAuthenticated) {
            toast.error("Login required: Please log in to view this content.", { duration: 3000 });
            navigate(redirectTo);
        } else if (isPublic && isAuthenticated) {
            navigate("/");
        } else if (isAuthenticated && isAdmin && user?.role !== "admin" && user?.role !== "superAdmin"){
            toast.error("Sorry, you are not authorized to access this section.", { duration: 3000 });
            navigate(redirectTo);
        }
    }, [isAuthenticated, isAdmin, user, navigate, redirectTo, isPublic]);
    if ((isAuthenticated && (user?.role === "user" || user?.role === "admin" || user?.role==="superAdmin")) || isPublic) {
        return children;
    }
    return null;
};
export default ProtectedRoute;