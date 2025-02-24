import IUsersRepository from "./IUsersRepository";

class MockUsersRepository extends IUsersRepository {

  static data = [];
  
  addUser(userData) {
    console.log('adding a user... ' + JSON.stringify(userData))
    MockUsersRepository.data=[...MockUsersRepository.data,userData]
    return { success: true, user: this.user };
  }

  getUsers() {
    console.log('Getting all data.... '+JSON.stringify(MockUsersRepository.data))
    return MockUsersRepository.data;
  }
}

export default MockUsersRepository;
