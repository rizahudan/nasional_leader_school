import React from 'react';
import {
  Dropdown,
  Modal,
  Menu,
  Button,
  Form,
  Input,
  TextArea,
  Card,
  Label,
  Icon,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import api from '../../apis/api';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      currentData: {},
      startDate: new Date(),
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
      estimate: parseInt(event.target.estimate.value, 10),
      detail: event.target.detail.value,
      by: event.target.detail.value,
    };

    (async () => {
      const response = await api.post('api/task', data);
      if (response !== false
          && typeof response.status !== 'undefined'
          && response.status === 'success'
      ) {
        console.log('saveTask sukses');
      }
    })();
  }

  render() {
    this.data = (
      <div>
        <Menu pointing inverted>
          <Label className="item">
            <Icon name="server" />
          </Label>
          <Dropdown className="active item" text='New'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onClick} text='Add Task' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu>

        <Modal open={this.state.open} onClose={this.close}>
          <Modal.Header>New Task</Modal.Header>
          <Modal.Content>
            <Card fluid={true}>
              <Card.Content>
                <Form onSubmit={this.handleForm}>
                  <Form.Field required control={Input} label='Task' id='task'/>
                  <Form.Group widths='equal'>
                    <Form.Field required control={Input} label='Date' id='date'>
                      <DatePicker className='react-datepicker-manager' selected={this.state.startDate} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field required control={Input} type='number' label='Estimate Hours' id='estimate' />
                  </Form.Group>
                  <Form.Field required control={TextArea} label='Detail' id='detail' />
                  <Form.Field required control={Input} label='By' id='by' />
                  <Form.Field floated='right' primary control={Button}>Save</Form.Field>
                </Form>
              </Card.Content>
            </Card>
          </Modal.Content>
        </Modal>

        <h1 align="center">NATIONAL LEADER SCHOOL</h1>
      </div>
    );
    return this.data;
  }
}
