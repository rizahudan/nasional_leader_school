import React from 'react';
import {
  Dropdown,
  Modal,
  Menu,
  Button,
  Form,
  Input,
  TextArea,
} from 'semantic-ui-react';
import axios from '../../apis/api';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      currentData: {},
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onClick = this.onClick.bind(this);
    this.insertTask = this.insertTask.bind(this);
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  onClick(data) {
    console.log('parent');
    this.setState({ open: true, currentData: data });
  }

  async insertTask(event) {
    this.setState();
    event.preventDefault();
    const data = {
      task : event.target.task.value,
      date : event.target.date.value,
      estimate : event.target.estimate.value,
      detail : event.target.detail.value,
      by : event.target.detail.value,
    }
    
    const response = await axios.post('api/task', data);
    console.log('response', response);
  }

  render() {
    this.data = (
      <div>
        <Menu pointing secondary>
          <Dropdown className="active item" text='New'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onClick} text='Add Task' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu>

        <Modal open={this.state.open} onClose={this.close}>
          <Modal.Header>New Task</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.insertTask}>
              <Form.Field control={Input} label='Task' id='task' className='task' />
              <Form.Group widths='equal'>
                <Form.Field control={Input} label='Date' id='date' className='date' />
                <Form.Field control={Input} label='Estimate Hours' id='estimate' className='estimate' />
              </Form.Group>
              <Form.Field control={TextArea} label='Detail' id='detail' className='detail' />
              <Form.Field control={Input} label='By' id='by' className='by' />
              <Button type='submit'>Submit</Button>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            
          </Modal.Actions>
        </Modal>

        <h1 align="center">NATIONAL LEADER SCHOOL</h1>
      </div>
    );
    return this.data;
  }
}
