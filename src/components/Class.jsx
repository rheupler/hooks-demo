import React, { Component } from "react";
const API = "https://api.wheretheiss.at/v1/satellites/25544";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      name: null,
      latitude: null,
      longitude: null,
      counter: 0,
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
        {this.state.hasCounter && (
          <>
            <Counter counter={this.state.counter} />
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
      updatedCounter: 0,
      render: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.counter !== prevProps.counter) {
      const updatedCounter = this.state.updatedCounter + 1;
      const render = this.state.render + 1;
      this.setState({ updatedCounter, render });
    }
  }

  render() {
    return (
      <div>
        <p>Counter: {this.props.counter}</p>
        <p>Updated counter: {this.state.updatedCounter}</p>
        <p>Render: {this.state.render}</p>
      </div>
    );
  }
}
