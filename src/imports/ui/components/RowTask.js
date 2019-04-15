import React from 'react';
import {
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Input,
  Header,
  ModalActions,
} from 'semantic-ui-react';

export default class RowTask extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      openEdit: false,
      openDelete: false,
    };

    this.openEdit = this.openEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
  }

  onClick() {
    console.log('child');
    this.props.click(this.props.data);
  }

  openEdit() {
    console.log('openedit');
    this.setState({ openEdit: true });
  }

  openDelete() {
    console.log('openDele');
    this.setState({ openDelete: true });
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
        <Table.Cell textAlign='center'>{this.props.data.no}</Table.Cell>
        <Table.Cell>{this.props.data.task}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.estimated}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.remaining}</Table.Cell>
        <Table.Cell selectable textAlign='center' onClick={this.onClick}>{this.props.data.step}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.start}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.finish}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.status}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.doneby}</Table.Cell>
        <Table.Cell textAlign='center'>
          <Button icon onClick={this.openEdit}><Icon name='edit'/></Button>
          <Button icon onClick={this.openDelete}><Icon name='trash'/></Button>
        </Table.Cell>

        <Modal open={this.state.openEdit} onClose={this.closeEdit}>
            <Modal.Header>Edit Task</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field control={Input} label='Task' id='task' />
                <Form.Group widths='equal'>
                  <Form.Field control={Input} label='Date' id='date' />
                  <Form.Field control={Input} label='Estimate Hours' id='estimate' />
                </Form.Group>
                <Button floated='right' type='submit' primary>Save</Button>
              </Form>
            </Modal.Content>
            <Modal.Actions>

            </Modal.Actions>
          </Modal>

          <Modal open={this.state.openDelete} onClose={this.closeDelete}>
            <Header icon='archive' content='Are you sure to delete this data?' />
            <Modal.Content>
              <p>
                This task data will remove from database.
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='red'>
                <Icon name='remove' /> No
              </Button>
              <Button basic primary>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>

      </Table.Row>
    );

    return this.data;
  }
}