import React, { Component } from "react";

import axios from "axios";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username
    };
    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then(response => console.log(response.data))
      .catch(err => console.log(err));

    this.setState({
      username: ""
    });
    // window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Create User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              required
              name="username"
              className="form-control"
              onChange={this.onChangeUsername}
              value={this.state.username}
            ></input>
          </div>

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Create User"
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
