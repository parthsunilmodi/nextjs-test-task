import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../../redux/slice/users/usersApi";
import { useAppDispatch } from "../../redux/hooks";

const WithAuth = ({children} : any) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const tokens = localStorage.getItem('authToken');

	useEffect(() => {
		if (!tokens) {
		  router.push("/login")
		}
	}, [tokens]);
  
  useEffect(() => {
    dispatch(getUser())
  },[]);

	if (!tokens) {
		return null;
	}
	
	return children
};

export default WithAuth
