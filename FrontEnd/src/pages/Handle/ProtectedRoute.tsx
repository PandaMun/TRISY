import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from '~/components/Shared/Spinner';
import { useAuth } from '~/hooks/useAuth';

// 로그인 상태에서만 접근
export const ProtectedRounte = ({ children }: { children: ReactNode }) => {
  const { useUser } = useAuth();
  const { data: user, isLoading } = useUser;

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to='/login' replace />;
  return <div>{children}</div>;
};
