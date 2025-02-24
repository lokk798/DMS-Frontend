import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { history } from '../utils';
import AuthRepository from "../repository/authentication/AuthRepository";

const AuthRepositoryInstance = AuthRepository.getInstance(); 

// create slice
const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

// exports
export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation
function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        value: JSON.parse(localStorage.getItem('auth'))
    }
}

function createReducers() {
    return {
        setLoginAuth
    };

    function setLoginAuth(state, action) {
        state.value = action.payload;
    }
}

function createExtraActions() {
    return {
        login: login(),
        logout: logout()
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async function ({ username, password }, { dispatch }) {
                //dispatch(alertActions.clear());
                console.log('Testing login....')
                const result = await AuthRepositoryInstance.login(username, password);
                if (result.success){
                    localStorage.setItem('auth', JSON.stringify(result.user));
                    dispatch(authActions.setLoginAuth(result.user));
                    history.navigate("/dashboard");     
                } else {
                    alert('Invalid username or password,,,( use admin for login ) ');  
                }
            }
        );
    }

    function logout() {
        return createAsyncThunk(
            `${name}/logout`,
            function (arg, { dispatch }) {
                dispatch(authActions.setLoginAuth(null));
                localStorage.removeItem('auth');
                console.log('Logout ............... 1');
                history.navigate("/login");   
            }
        );
    }
}