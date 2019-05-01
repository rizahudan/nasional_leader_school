import React from 'react';
import {
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Card,
  Input,
  Header,
} from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import api from '../../apis/api';

export default class RowTask extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      openEdit: false,
      openDelete: false,
      startDate: new Date(),
      data: [],
    };

    this.lastStep = props.data.steps[props.data.steps.length - 1];
    this.openEdit = this.openEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInput(e) {
    console.log(e.target.value);
    this.setState({ data: e.target.value });
  }

  handleEdit(event) {
    // const header = this;
    event.preventDefault();
    const ev = event.target;
    console.log('yaa', ev.task.value);
    this.setState({});
    const data = {
      id: this.props.data._id,
      task: event.target.task.value,
      date: new Date(),
      estimate: parseInt(event.target.estimate.value, 10),
    };
    console.log('data', data);

    (async () => {
      const response = await api.put('api/task/', data);
      if (response !== false
          && typeof response.status !== 'undefined'
          && response.status === 'success'
      ) {
        console.log('saveEditTask sukses');
      }
    })();
  }

  handleDelete() {
    const id = this.props.data._id;
    console.log('id:', id);
    const apiDel = `api/task/${id}`;
    (async () => {
      const response = await api.del(apiDel);
      if (response !== false
          && typeof response.status !== 'undefined'
          && response.status === 'success'
      ) {
        console.log('saveDelTask sukses');
      }
    })();
  }

  onClick() {
    console.log('child');
    this.props.click({ type: 'step', data: this.props.data });
  }

  openEdit() {
    console.log('openedit');
    this.setState({ openEdit: true });
  }

  openDelete = () => {
    console.log('openDele');
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this?',
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <Header icon='archive' content='Are you sure to delete this data?'/>
            <p>Data will remove from database.</p>
            <br></br>
            <div align='right'>
              <Button color='red' onClick={() => onClose()}>No</Button>
              <Button primary onClick={() => { this.handleDelete(); onClose(); }}>Yes</Button>
            </div>
          </div>
        );
      },
    });
  }

  closeEdit() {
    this.setState({ openEdit: false });
  }

  closeDelete() {
    this.setState({ openDelete: false });
  }

  render() {
    this.data = (
      <Table.Row>
        <Table.Cell textAlign='center'>{this.props.no}</Table.Cell>
        <Table.Cell>{this.props.data.task}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.estimate}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.estimate - this.props.data.hours}</Table.Cell>
        <Table.Cell selectable textAlign='center' onClick={this.onClick}>{this.props.data.steps.length + 1}</Table.Cell>
        <Table.Cell textAlign='center'><Moment format="ddd, DD MMM YYYY">{this.lastStep.startDate}</Moment></Table.Cell>
        <Table.Cell textAlign='center'><Moment format="ddd, DD MMM YYYY">{this.lastStep.endDate}</Moment></Table.Cell>
        <Table.Cell textAlign='center'>{this.lastStep.status}</Table.Cell>
        <Table.Cell textAlign='center'>{this.lastStep.by}</Table.Cell>
        <Table.Cell textAlign='center'>
          <Button icon color='green' onClick={this.openEdit}><Icon name='edit'/></Button>
          <Button icon color='red' onClick={this.openDelete}><Icon name='trash'/></Button>
        </Table.Cell>

        <Modal open={this.state.openEdit} onClose={this.closeEdit}>
          <Modal.Header>Edit Task</Modal.Header>
          <Modal.Content>
            <Card fluid={true}>
              <Card.Content>
                <Form onSubmit={this.handleEdit}>
                  <Form.Field control={Input} label='Task' id='task' defaultValue={this.props.data.task} onChange={this.handleInput} />
                  <Form.Group widths='equal'>
                    <Form.Field required control={Input} label='Date'>
                      <DatePicker id='startDate' control={Input} selected={this.state.startDate} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field control={Input} label='Estimate Hours' type='number' id='estimate' defaultValue={this.props.data.estimate} onChange={this.handleInput} />
                  </Form.Group>
                  <Form.Field floated='right' primary control={Button}>Save</Form.Field>
                </Form>
              </Card.Content>
            </Card>
          </Modal.Content>
        </Modal>
      </Table.Row>
    );

    return this.data;
  }
}
