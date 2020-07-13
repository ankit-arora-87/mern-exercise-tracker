import React, { Component } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then(response => {
        if (response.data.length > 0) {
          let users = response.data.map(user => user.username);
          this.setState({
            users: users,
            username: users[0]
          });
        }
      })
      .catch(err => console.log(err));
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  onChangeDuration = e => {
    this.setState({
      duration: e.target.value
    });
  };

  onChangeDate = date => {
    this.setState({
      date: date
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };
    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then(response => console.log(response.data))
      .catch(err => console.log(err));

    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Create Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <select
              //   ref="userInput"
              required
              name="username"
              className="form-control"
              onChange={this.onChangeUsername}
              value={this.state.username}
            >
              {this.state.users.map(user => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              required
              name="description"
              className="form-control"
              onChange={this.onChangeDescription}
              value={this.state.description}
            ></input>
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              required
              name="duration"
              className="form-control"
              onChange={this.onChangeDuration}
              value={this.state.duration}
            ></input>
          </div>
          <div className="form-group">
            <label>Date</label>
            <Datepicker
              onChange={this.onChangeDate}
              selected={this.state.date}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Create Exercise Log"
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
