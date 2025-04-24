import { ReactNode } from 'react';
import { useAuthStore } from '../store/auth.store';
import { Navigate } from 'react-router';

export function AuthGuard({ element }: { element: ReactNode }) {
  const { isLoading, admin } = useAuthStore();

  if (isLoading === true && admin === null) {
    return <div>Loading...</div>;
  } else if (isLoading === false && admin === null) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }
  return element;
}
