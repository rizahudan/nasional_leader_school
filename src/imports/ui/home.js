import React from 'react';
import Header from './components/Header';
import TaskTable from './components/Tasktable';

export default class Home extends React.Component {
  render() {
    this.data = (
      <div>
        <Header />
        <TaskTable />
      </div>
    );
    return this.data;
  }
}
