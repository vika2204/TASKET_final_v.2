import { CLIENT_ROUTES } from '@/app/router';
import { useAppSelector } from '@/shared/hooks/rtkHooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAppSelector(state => state.user)

    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to={CLIENT_ROUTES.AUTH} />
    }

    return children;
}