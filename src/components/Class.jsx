import React, { Component } from "react";
import ReactDOM from "react-dom";
const API = "https://api.wheretheiss.at/v1/satellites/25544";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      name: null,
      latitude: null,
      longitude: null,
      counter: 0,
      cleanup: 0,
      loading: true
    };
  }

  componentWillMount() {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        this.setState({
          name: data.name,
          latitude: data.latitude,
          longitude: data.longitude,
          loading: false
        });
      });
  }

  increment = () => {
    let incrementedCounter = this.state.counter;
    incrementedCounter += 1;
    this.setState({ counter: incrementedCounter });
  };

  decrement = () => {
    let incrementedCounter = this.state.counter;
    incrementedCounter -= 1;
    this.setState({ counter: incrementedCounter });
  };

  triggerCounter = () => {
    const counter = !this.state.hasCounter;
    this.setState({ hasCounter: counter });
  };

  cleanUpFn = () => {
    let cleanup = this.state.cleanup;
    cleanup += 1;
    this.setState({ cleanup });
  };

  render() {
    return (
      <div>
        {!this.state.loading && (
          <div>
            <p>Name: {this.state.name}</p>
            <p>Latitude: {this.state.latitude}</p>
            <p>Longitude: {this.state.longitude}</p>
          </div>
        )}
        <button onClick={() => this.triggerCounter()}>Toggle Counter</button>
        <p>Cleaned up: {this.state.cleanup} time(s)</p>
        {this.state.hasCounter && (
          <>
            <Counter
              counter={this.state.counter}
              cleanup={this.state.cleanup}
              cleanUpFn={this.cleanUpFn}
            />
            <button onClick={() => this.increment()}>Increment Counter</button>
            <button onClick={() => this.decrement()}>Decrement Counter</button>
          </>
        )}
      </div>
    );
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedCounter: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.counter !== prevProps.counter) {
      let incrementedCounter = this.state.updatedCounter;
      incrementedCounter += 1;
      this.setState({ updatedCounter: incrementedCounter });
    }
  }

  componentWillUnmount() {
    this.props.cleanUpFn();
  }

  render() {
    return (
      <div>
        <p>Counter: {this.props.counter}</p>
        <p>Updated counter: {this.state.updatedCounter}</p>
      </div>
    );
  }
}
