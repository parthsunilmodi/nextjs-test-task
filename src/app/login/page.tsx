'use client';
import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik, FormikProvider, } from 'formik';
import * as Yup from 'yup';
import loginBg from '../../assets/img/logo.png';
import {loginUser, signUpUser} from "../../redux/slice/users/usersApi";
import {useAppDispatch} from "../../redux/hooks";
import {useRouter} from "next/navigation";

interface IBookFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  password: Yup.string().required("Password is required!").min(8, "Password too short! Must be at least 8 characters!"),
});

const Login: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const formikValidation = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: IBookFormValues, {resetForm}) => {
      if (values) {
        const response: any = await dispatch(loginUser(values))
        if(response.payload.status === 200 || 201) {
          router.push('/')
        }
      }
    }
  });

  const {
    errors,
    touched,
    values,
    handleBlur,
    handleSubmit,
    handleChange,
  } = formikValidation;


  return (
    <div className="flex justify-center w-[100%] h-[100vh] flex-col">
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
            <div className="cursor-pointer flex items-center">
              <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">bookify store</div>
            </div>
          </div>
          <FormikProvider value={formikValidation}>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
              <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">LogIn</h2>
              <div className="mt-12">
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
                    <input
                      className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    {errors.username && touched.username && (
                      <div className="m-1 text-red-600">
                        <span role="alert">{errors.username}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-8">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                    <input
                      className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <div className="m-1 text-red-600">
                        <span role="alert">{errors.password}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-10">
                    <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg">
                      Log In
                    </button>
                  </div>
                </form>
                <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                  Don't have an account ?
                  <Link
                    className="ml-2 cursor-pointer text-indigo-600 hover:text-indigo-800"
                    href="/sign-up"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </FormikProvider>
        </div>
        <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
          <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
            <Image
              src={loginBg}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
