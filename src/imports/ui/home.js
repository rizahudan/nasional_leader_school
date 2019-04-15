import React from 'react';

export default class Home extends React.Component {
  render() {
    this.data = (
      <div>
        <h1 className="header">Test Bro</h1>
        <p>
          Visit my repository at{' '}
          <a href="https://github.com/nsebhastian/my-react-boilerplate">
            GitHub
          </a>
        </p>
      </div>
    );
    return this.data;
  }
}
