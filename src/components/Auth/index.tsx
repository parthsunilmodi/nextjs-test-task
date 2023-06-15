'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '../../redux/slice/users/usersApi';
import { useAppDispatch } from '../../redux/hooks';

interface IWithAuth {
  children: React.ReactNode;
  isProtected: boolean;
}

const WithAuth: React.FC<IWithAuth> = ({ children, isProtected }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token: string | null = localStorage.getItem('authToken');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (token && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn]);

  if (typeof window === 'undefined') {
    return <div />;
  }

  if (!token && isProtected) {
    router.push('/login');
    return null;
  } else if (token && !isProtected) {
    router.push('/');
    return null;
  } else {
    return <>{children}</>;
  }
};

export default WithAuth;
