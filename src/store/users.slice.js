import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import UsersRepository from "../repository/users/UsersRepository";

/**
 * @todo - Understand this file line by line.
 *       - Mutations, spread operation,
 */

const UsersRepositoryInstance = UsersRepository.getInstance();
// create slice

const name = "users";
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
    item: null,
  };
}

function createExtraActions() {
  return {
    addUser: addUser(),
    getUsers: getUsers(),
    updateUser: updateUser(),
    deleteUser: deleteUser(),
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

  function updateUser() {
    return createAsyncThunk(
      `${name}/updateUser`,
      async (user) => await UsersRepositoryInstance.updateUser(user)
    );
  }

  function deleteUser() {
    return createAsyncThunk(`${name}/deleteUser`, async (userId) => {
      await UsersRepositoryInstance.deleteUser(userId);
      return userId;
    });
  }
}

function createExtraReducers() {
  return (builder) => {
    getUsers();
    updateUser();
    deleteUser();

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

    function updateUser() {
      var { pending, fulfilled, rejected } = extraActions.updateUser;
      builder
        .addCase(pending, (state) => {
          state.item = { loading: true };
        })
        .addCase(fulfilled, (state, action) => {
          state.item = { value: action.payload };
          // Update user list to reflect changes
          if (state.list?.value) {
            state.list.value = state.list.value.map((user) =>
              user.id === action.payload.user.id ? action.payload.user : user
            );
          }
        })
        .addCase(rejected, (state, action) => {
          state.item = { error: action.error };
        });
    }

    function deleteUser() {
      var { pending, fulfilled, rejected } = extraActions.deleteUser;
      builder
        .addCase(pending, (state) => {
          state.item = { deleting: true };
        })
        .addCase(fulfilled, (state, action) => {
          const userId = action.payload; // Get deleted user ID
          if (state.list?.value) {
            state.list.value = state.list.value.filter(
              (user) => user.id !== userId
            );
          }
          state.item = { deleted: true };
        })
        .addCase(rejected, (state, action) => {
          state.item = { error: action.error };
        });
    }
  };
}
