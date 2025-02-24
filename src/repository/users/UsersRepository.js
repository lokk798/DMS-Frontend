import MockUsersRepository from "./MockUsersRepository";
//import APIUsersRepository from "./APIUsersRepository"; To be implemented in the future..

const ENV = "mock"; //Let's use the dummy for now..

class UsersRepository {
    static instance = null; // Holds the Singleton instance

    static getInstance() {
        if (!UsersRepository.instance) {
            if (ENV === "api") {
                //UserRepository.instance = new APIAuthRepository();   //To be implemented in the future..
            } else {
                UsersRepository.instance = new MockUsersRepository();
            }
        }
        console.log('Returning an instance.....');
        return UsersRepository.instance;
    } 
}

export default UsersRepository;