"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../../redux/slice/users/usersApi";
import { useAppDispatch } from "../../redux/hooks";

const WithAuth = ({children} : any) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	let tokens: string | null = null;

	if (typeof window !== "undefined") {
		tokens = localStorage.getItem('authToken');
	}

	useEffect(() => {
		if (!tokens) {
		  router.push("/login")
		}
	}, [router, tokens]);

  useEffect(() => {
    dispatch(getUser())
  },[dispatch]);

	if (!tokens) {
		return null;
	} else {
	  return children
  }
};

export default WithAuth
