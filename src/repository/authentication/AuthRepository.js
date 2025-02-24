import MockAuthRepository from "./MockAuthRepository";
//import APIAuthRepository from "./APIAuthRepository"; To be implemented in the future..

const ENV = "mock"; //Let's use the dummy for now..

class AuthRepository {
    static instance = null; // Holds the Singleton instance

    static getInstance() {
        if (!AuthRepository.instance) {
            if (ENV === "api") {
                //UserRepository.instance = new APIAuthRepository();   //To be implemented in the future..
            } else {
                AuthRepository.instance = new MockAuthRepository();
            }
        }
        console.log('Returning an instance.....');
        return AuthRepository.instance;
    } 
}

export default AuthRepository;