import { Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { authActions } from '../store';


export { Login };

function Login() {

    const dispatch = useDispatch();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required') 
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
 
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;
     
    function onSubmit({ username, password }) {
        console.log('________________Hello 1 '); 
        return dispatch(authActions.login({ username, password }));
    } 

    return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              {...register("username")}
              className={`w-full mt-1 px-4 py-2 text-gray-700 bg-gray-50 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 outline-none`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full mt-1 px-4 py-2 text-gray-700 bg-gray-50 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 outline-none`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200 ease-in-out disabled:bg-blue-300"
          >
            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
            Login
          </button>

          {/* Help Link */}
          <div className="text-center mt-4">
            <Link to="../help" className="text-blue-500 hover:underline">
              Need help?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
