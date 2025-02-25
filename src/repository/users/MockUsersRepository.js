import IUsersRepository from "./IUsersRepository";

/**
 * @todo Data Mutation.
 */

class MockUsersRepository extends IUsersRepository {
  static data = [];
  static nextId = 1;

  // add a new user
  addUser(userData) {
    try {
      console.log("Adding a user... " + JSON.stringify(userData));

      // Ensure data is mutable
      if (Object.isFrozen(MockUsersRepository.data)) {
        MockUsersRepository.data = [...MockUsersRepository.data];
      }

      const newUser = { id: MockUsersRepository.nextId++, ...userData };
      MockUsersRepository.data.push(newUser);

      console.log(
        "Updated Users List: ",
        JSON.stringify(MockUsersRepository.data)
      );
      return { success: true, user: newUser };
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Failed to add user");
    }
  }

  // get all users
  getUsers() {
    console.log(
      "Getting all data.... " + JSON.stringify(MockUsersRepository.data)
    );
    return [...MockUsersRepository.data];
  }

  // update user
  updateUser(updatedUser) {
    console.log("Updating user... " + JSON.stringify(updatedUser));

    const index = MockUsersRepository.data.findIndex(
      (u) => u.id === updatedUser.id
    );

    if (index !== -1) {
      console.log(`User found at index ${index}, updating...`);

      // Create a new array with updated values
      MockUsersRepository.data = MockUsersRepository.data.map((user, i) =>
        i === index ? updatedUser : user
      );

      return { success: true, user: updatedUser };
    } else {
      console.error(`User with ID ${updatedUser.id} not found!`);
      throw new Error("User not found ");
    }
  }

  // delete user
  deleteUser(userId) {
    console.log(`Deleting a user with ID ${userId}`);

    const index = MockUsersRepository.data.findIndex(
      (user) => user.id === userId
    );

    if (index !== -1) {
      // Corrected condition
      console.log(`User found at index ${index}, deleting ...`);

      // Correctly update MockUsersRepository.data
      MockUsersRepository.data = MockUsersRepository.data.filter(
        (user) => user.id !== userId
      );

      console.log(
        "Showing all data.... " + JSON.stringify(MockUsersRepository.data)
      );

      return {
        success: true,
        message: `User with ID ${userId} deleted successfully`,
      };
    } else {
      console.error(`User with ID ${userId} not found`);
      throw new Error("User not found");
    }
  }
}

export default MockUsersRepository;
