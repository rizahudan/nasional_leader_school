import React from 'react';
import {
  Table,
  Button,
  Icon,
} from 'semantic-ui-react';

export default class RowTask extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      openEdit: false,
      openDelete: false,
    };

    this.lastStep = props.data.steps[props.data.steps.length - 1];

    this.openEdit = this.openEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
  }

  onClick() {
    console.log('child');
    this.props.click({ type: 'step', data: this.props.data });
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
        <Table.Cell textAlign='center'>{this.props.no}</Table.Cell>
        <Table.Cell>{this.props.data.task}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.estimate}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.data.hours}</Table.Cell>
        <Table.Cell selectable textAlign='center' onClick={this.onClick}>{this.props.data.steps.length + 1}</Table.Cell>
        <Table.Cell textAlign='center'>{this.lastStep.startDate}</Table.Cell>
        <Table.Cell textAlign='center'>{this.lastStep.endDate}</Table.Cell>
        <Table.Cell textAlign='center'>{this.lastStep.status}</Table.Cell>
        <Table.Cell textAlign='center'>{this.lastStep.by}</Table.Cell>
        <Table.Cell textAlign='center'>
          <Button icon onClick={this.openEdit}><Icon name='edit'/></Button>
          <Button icon onClick={this.openDelete}><Icon name='trash'/></Button>
        </Table.Cell>
      </Table.Row>
    );

    return this.data;
  }
}
