import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
// import { Navigate } from 'react-router';

export function AuthGuard({ element }: { element: ReactNode }) {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  } else if (isAuthenticated === false) {
    // return (
    //   <Navigate
    //     to='/login'
    //     replace
    //   />
    // );
    return element;
  }

  return element;
}
