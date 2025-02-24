import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '../../utils';
import { userActions} from '../../store';

export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(x => x.users?.item);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;


    async function onSubmit(data) {
            console.log('Sending Data to state...')
            await dispatch(userActions.addUser(data)).unwrap();            
            console.log('Navigating....')
            history.navigate('/users');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{id ? 'Edit User' : 'Add User'}</h2>
                
                {user?.error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                        Error loading user: {user.error}
                    </div>
                )}

                {!user?.loading && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input 
                                    {...register('firstName')}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input 
                                    {...register('lastName')}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input 
                                {...register('username')}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                type="password"
                                {...register('password')}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
                            >
                                {isSubmitting && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>}
                                Save
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={() => reset()} 
                                disabled={isSubmitting} 
                                className="text-gray-600 hover:text-gray-800 transition"
                            >
                                Reset
                            </button>
                            
                            <Link to="/users" className="text-gray-600 hover:text-gray-800 transition">Cancel</Link>
                        </div>
                    </form>
                )}

                {user?.loading && (
                    <div className="text-center py-6">
                        <span className="animate-spin h-6 w-6 border-4 border-gray-300 border-t-blue-600 rounded-full"></span>
                    </div>
                )}
            </div>
        </div>
    );
}
