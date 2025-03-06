import IAuthRepository from "./IAuthRepository";

class MockAuthRepository extends IAuthRepository {
  constructor() {
    super();
    this.user = null;
  }

  login(username, password) {
    console.log("Mock Login .... using ");
    if (username === "admin" && password === "admin123") {
      this.user = { username };
      return { success: true, user: this.user };
    }
    return { success: false, message: "Invalid credentials" };
  }

  logout() {
    this.user = null;
  }

  getCurrentUser() {
    return this.user;
  }
}

export default MockAuthRepository;
