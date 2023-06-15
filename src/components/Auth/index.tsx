'use client';
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { getUser } from '../../redux/slice/users/usersApi';
import { useAppDispatch } from '../../redux/hooks';

interface IWithAuth {
  children: React.ReactNode;
  isProtected: boolean;
}

const WithAuth: NextPage<IWithAuth> = ({ children, isProtected }) => {
  const dispatch = useAppDispatch();
  const token: string | null = localStorage.getItem('authToken');

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch, token]);

  if (typeof window === 'undefined') {
    return <div />;
  }

  if (!token && isProtected) {
    redirect('/login');
    return;
  } else if (token && !isProtected) {
    redirect('/');
    return;
  } else if (token && isProtected) {
    return children;
  } else {
    return children;
  }
};

export default WithAuth;
