import React from "react";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Send login request to server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/auth/login', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished
        let jsonResponse = JSON.parse(xhr.responseText);
        if (jsonResponse['has_error'] === true) {
          alert(`Error: ${jsonResponse['error']}`);
        } else {
          // TODO: Maybe add some sort of confirmation that the login was successful?
          window.location.href = '/overview';
        }
      }
    }
    xhr.send(`username=${this.state.username}&password=${this.state.password}`);

  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label><br/>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/><br/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }

}

export default Login;
