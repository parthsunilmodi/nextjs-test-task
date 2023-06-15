'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as Yup from 'yup';
import { useFormik, FormikProvider, } from 'formik';
import { loginUser } from '../../redux/slice/users/usersApi';
import { useAppDispatch } from '../../redux/hooks';
import loginBg from '../../assets/img/logo.png';
import WithAuth from '../../components/Auth';

interface IBookFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required!').min(8, 'Password too short! Must be at least 8 characters!'),
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
    onSubmit: async (values: IBookFormValues, { resetForm }) => {
      if (values) {
        const response: any = await dispatch(loginUser(values));
        if (response.type === 'auth/signin/fulfilled') {
          router.push('/');
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
    isSubmitting
  } = formikValidation;

  return (
    <WithAuth isProtected={false}>
      <div className="flex justify-center w-[100%] h-[100vh] flex-col">
        <div className="lg:flex">
          <div className="lg:w-1/2 bg-white xl:max-w-screen-sm">
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        value={values.password}
                      />
                      {errors.password && touched.password && (
                        <div className="m-1 text-red-600">
                          <span role="alert">{errors.password}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-10">
                      <button
                        className={`bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline ${!isSubmitting ? `hover:bg-indigo-600
                                shadow-lg` : `bg-[#808080]`}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting &&
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB" />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor" />
                        </svg>}
                        Log In
                      </button>
                    </div>
                  </form>
                  <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                    Don&apos;t have an account ?
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
    </WithAuth>
  );
};

export default Login;
