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
import api from '../../apis/api';

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
    this.handleForm = this.handleForm.bind(this);
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  onClick(data) {
    this.setState({ open: true, currentData: data });
  }

  handleForm(event) {
    // const header = this;
    event.preventDefault();
    const ev = event.target;
    console.log(ev, ev.task);
    this.setState({});
    const data = {
      task: event.target.task.value,
      date: new Date(),
      estimate: event.target.estimate.value,
      detail: event.target.detail.value,
      by: event.target.detail.value,
    };

    (async () => {
      const response = await api.post('api/task', data);
      if (response !== false
          && typeof response.flag !== 'undefined'
          && response.flag === true
      ) {
        console.log('saveTask sukses');
      }
    })();
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
            <Form onSubmit={this.handleForm}>
              <Form.Field required control={Input} label='Task' id='task' className='task' />
              <Form.Group widths='equal'>
                <Form.Field required control={Input} label='Date' id='date' className='date' />
                <Form.Field required control={Input} label='Estimate Hours' id='estimate' className='estimate' />
              </Form.Group>
              <Form.Field required control={TextArea} label='Detail' id='detail' className='detail' />
              <Form.Field required control={Input} label='By' id='by' className='by' />
              <Modal.Actions>
                <Button type='submit'>Submit</Button>
              </Modal.Actions>
            </Form>
          </Modal.Content>
        </Modal>

        <h1 align="center">NATIONAL LEADER SCHOOL</h1>
      </div>
    );
    return this.data;
  }
}
