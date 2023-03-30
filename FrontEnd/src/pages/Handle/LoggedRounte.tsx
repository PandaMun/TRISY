import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';

// 로그인 시 접근할 수 없는 페이지
export const LoggedRounte = ({ children }: { children: ReactNode }) => {
  const { useUser } = useAuth();
  const { data: user } = useUser;

  if (user) return <Navigate to='/' replace />;
  return children;
};
