'use client';
import React from 'react';
import Image from 'next/image';
import { useFormik, FormikProvider, } from 'formik';
import * as Yup from 'yup';
import Link from "next/link";
import signUpBg from '../../assets/img/sign-up.jpeg';
import {useAppDispatch} from "../../redux/hooks";
import {signUpUser} from "../../redux/slice/users/usersApi";
import { useRouter } from 'next/navigation'

interface IBookFormValues {
  name: string;
  password: string;
  username: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  username: Yup.string().required("Username is required!"),
  password: Yup.string().required("Password is required!").min(8, "Password too short! Must be at least 8 characters!"),
});

const SignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formikValidation = useFormik({
    initialValues: {
      name: '',
      password: '',
      username: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: IBookFormValues, {resetForm}) => {
      if (values) {
        const response: any = await dispatch(signUpUser(values))
        if(response.payload.status === 200 || 201) {
          router.push('/')
        }
      }
      resetForm();
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
                    xl:text-bold">SignUp</h2>
              <div className="mt-12">
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="text-sm font-bold text-gray-700 tracking-wide">Name</div>
                    <input
                      className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && (
                      <div className="m-1 text-red-600">
                        <span role="alert">{errors.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-8">
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
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                  Already have an account ?
                  <Link
                    className="ml-2 cursor-pointer text-indigo-600 hover:text-indigo-800"
                    href="/login"
                  >
                   Login
                  </Link>
                </div>
              </div>
            </div>
          </FormikProvider>
        </div>
        <div className="hidden bg-indigo-100 lg:flex items-center justify-center flex-1 h-screen">
          <div className="max-w-[50%] transform duration-200 hover:scale-110 cursor-pointer">
            <Image
              src={signUpBg}
              className="w-[700px] h-[500px]"
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;
