import http from "../http-common";

class AuthService {
  login(user) {
    return http
      .post('/auth/signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  signUp(user) {
    return http.post('/auth/signUp', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
