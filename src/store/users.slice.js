import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import UsersRepository from "../repository/users/UsersRepository";

const UsersRepositoryInstance = UsersRepository.getInstance(); 
// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        list: null,
        item: null
    }
}

function createExtraActions() {

    return {
        addUser: addUser(),
        getUsers: getUsers(),
        //Feel free to add more...
    };

    function addUser() {
        return createAsyncThunk(
            `${name}/addUser`,
            async (user) => await UsersRepositoryInstance.addUser(user)
        );
    }

    function getUsers() {
        return createAsyncThunk(
            `${name}/getUsers`,
            async () => await UsersRepositoryInstance.getUsers()
        );
    }

}

function createExtraReducers() {
    return (builder) => {
        getUsers();

        function getUsers() {
            var { pending, fulfilled, rejected } = extraActions.getUsers;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                });
        }
    }
}
