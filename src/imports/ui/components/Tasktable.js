import React from 'react';
import {
  Button,
  Header,
  Icon,
  Grid,
  Modal,
  Table,
  Card,
  Form,
  Input,
  TextArea,
  Accordion,
  Pagination,
} from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import RowTask from './RowTask';
import api from '../../apis/api';

export default class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        step: false,
        formStep: -1,
        detailStep: -1,
        editStep: false,
        delStep: false,
        startDate: new Date(),
        openStepEdit: false,
        openStepDelete: false,
      },
      currentData: {},
      currentStepData: {},
      activeIndex: 0,
      data: [],
    };

    this.getTask();
    console.log('1: ', this.state.currentData);

    this.close = this.close.bind(this);
    this.closeEditStep = this.closeEditStep.bind(this);
    this.onClick = this.onClick.bind(this);
    this.openFormStep = this.openFormStep.bind(this);
    this.openDetailStep = this.openDetailStep.bind(this);
    this.openStepEdit = this.openStepEdit.bind(this);
    this.openStepDelete = this.openStepDelete.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleStepEdit = this.handleStepEdit.bind(this);
    this.handleStepDelete = this.handleStepDelete.bind(this);
  }

  async getTask() {
    const response = await api.get('api/task');
    if (response !== false
        && typeof response.status !== 'undefined'
        && response.status === 'success'
    ) {
      this.setState({ data: response.data });
    }
  }

  newStep = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  open(data) {
    const updateState = {
      modal: {
        open: false,
        editStep: false,
        delStep: false,
      },
    };
    updateState.modal[data.type] = true;
    updateState.currentData = data.data;
    this.setState(updateState);
  }

  close() {
    const updateState = {
      modal: {
        open: false,
        editStep: false,
        delStep: false,
      },
    };
    this.setState(updateState);
  }

  closeEditStep() {
    this.setState({ openStepEdit: false });
  }

  onClick(data) {
    const updateState = {
      modal: {
        open: false,
        editStep: false,
        delStep: false,
      },
    };
    updateState.modal[data.type] = true;
    updateState.currentData = data.data;
    console.log('update', updateState);
    this.setState(updateState);
  }

  openFormStep = (e, titleProps) => {
    const updateState = this.state.modal;
    const { index } = titleProps;
    updateState.formStep = updateState.formStep === index ? -1 : index;
    // updateState.currentData = this.state.currentData.steps[index - 2];
    console.log('openFormStep: ', this.formStep);
    this.setState(updateState);
  }

  openDetailStep = (e, titleProps) => {
    console.log('sasa');
    const updateState = this.state.modal;
    const { index } = titleProps;
    updateState.formStep = updateState.formStep === index ? -1 : index;
    // updateState.detailStep = updateState.detailStep === index ? -1 : index;
    updateState.currentStepData = this.state.currentData.steps[index - 2];
    console.log('detailStep: ', this.state.currentStepData);
    this.setState(updateState);
  }

  openStepEdit() {
    console.log('openStepEdit current step: ', this.state.currentStepData);
    this.setState({ openStepEdit: true, currentStepData: this.state.currentStepData });
  }

  openStepDelete = () => {
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
              <Button primary onClick={() => { this.handleStepDelete(); onClose(); }}>Yes</Button>
            </div>
          </div>
        );
      },
    });
  }

  handleForm(event) {
    // const header = this;
    event.preventDefault();
    const ev = event.target;
    console.log(ev, ev.task);
    this.setState({});
    const data = {
      taskId: this.state.currentData._id,
      startDate: new Date(),
      hours: event.target.hours.value,
      desc: event.target.detail.value,
      deliverable: event.target.deliverable.value,
      by: event.target.detail.value,
    };

    (async () => {
      const response = await api.post('api/step', data);
      if (response !== false
          && typeof response.status !== 'undefined'
          && response.status === 'success'
      ) {
        console.log('saveNewStep sukses');
      }
    })();
  }

  handleStepEdit(event) {
    // const header = this;
    event.preventDefault();
    // const ev = event.target;
    // this.setState({});
    const data = {
      id: this.state.currentStepData._id,
      taskId: this.state.currentStepData.taskId,
      startDate: new Date(),
      hours: event.target.hours.value,
      desc: event.target.detail.value,
      deliverable: event.target.deliverable.value,
      by: event.target.detail.value,
    };
    console.log('data', data);

    (async () => {
      const response = await api.put('api/step/', data);
      if (response !== false
          && typeof response.status !== 'undefined'
          && response.status === 'success'
      ) {
        console.log('saveEditStep sukses');
      }
    })();
  }

  handleStepDelete() {
    const id = this.state.currentStepData._id;
    console.log('id:', id);
    const apiDel = `api/step/${id}`;
    (async () => {
      const response = await api.del(apiDel);
      if (response !== false
          && typeof response.status !== 'undefined'
          && response.status === 'success'
      ) {
        console.log('saveDelStep sukses');
      }
    })();
  }

  renderStep() {
    let timeLeft = this.state.currentData.estimate;
    const page = [];
    this.state.currentData.steps.map((data, i) => {
      page.push(
        <Accordion key={`step-${i}`}>
          <Accordion.Title
            active={this.state.modal.formStep === i + 2}
            index={i + 2}
            onClick={this.openDetailStep}
          >
            <Card fluid={true}>
              <Card.Content>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <h3> STEP {i + 1}</h3>
                    </Grid.Column>
                    <Grid.Column width={10}><h3><Moment format="dddd, DD MMM YYYY">{data.startDate}</Moment></h3></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          </Accordion.Title>

          <Accordion.Content active={this.state.modal.formStep === i + 2}>
            <Card fluid={true}>
              <Card.Content>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>Hours Left</Grid.Column>
                    <Grid.Column width={1}>:</Grid.Column>
                    <Grid.Column width={10}>{`${timeLeft - data.hours} from ${timeLeft}`}</Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}>Detail</Grid.Column>
                    <Grid.Column width={1}>:</Grid.Column>
                    <Grid.Column width={10}>
                      {data.desc}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}>Deliverable</Grid.Column>
                    <Grid.Column width={1}>:</Grid.Column>
                    <Grid.Column width={10}>{data.deliverable}</Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}>Status</Grid.Column>
                    <Grid.Column width={1}>:</Grid.Column>
                    <Grid.Column width={10}>{data.status}</Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}>Date Finish</Grid.Column>
                    <Grid.Column width={1}>:</Grid.Column>
                    <Grid.Column width={10}><Moment format="dddd, DD MMM YYYY">{data.endDate}</Moment></Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}>Done By</Grid.Column>
                    <Grid.Column width={1}>:</Grid.Column>
                    <Grid.Column width={10}>{data.by}</Grid.Column>
                  </Grid.Row>
                </Grid>
                <div align='right'>
                  <Button icon color='green' onClick={this.openStepEdit}>
                    <Icon name='edit' />
                  </Button>
                  <Button icon color='red' onClick={this.handleStepDelete}>
                    <Icon name='trash' />
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Accordion.Content>
        </Accordion>,
      );
      timeLeft -= data.hours;
      return true;
    });
    return page;
  }

  renderData() {
    return this.state.data.map((data, i) => (
      <RowTask key={i} data={data} click={this.onClick} state={this.state} no={i + 1} />
    ));
  }

  render() {
    const { formStep } = this.state.modal;
    // console.log('currentData: ', this.state.currentData);
    this.page = (
      <div>
        <div className="ui container">
          <Table selectable celled>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>NO</Table.HeaderCell>
                <Table.HeaderCell>TASK</Table.HeaderCell>
                <Table.HeaderCell>ESTIMATED</Table.HeaderCell>
                <Table.HeaderCell>REMAINING</Table.HeaderCell>
                <Table.HeaderCell>STEP</Table.HeaderCell>
                <Table.HeaderCell>START</Table.HeaderCell>
                <Table.HeaderCell>FINISH</Table.HeaderCell>
                <Table.HeaderCell>STATUS</Table.HeaderCell>
                <Table.HeaderCell>BY</Table.HeaderCell>
                <Table.HeaderCell>ACTION</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderData()}
            </Table.Body>
          </Table>
          <Pagination floated="right"
            defaultActivePage={1}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={10}
          />
        </div>

        {(this.state.modal.step
          ? <Modal open={this.state.modal.step} onClose={this.close}>
              <Modal.Header>Step Detail</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Accordion>
                    <Accordion.Title active={formStep === 0} index={0} onClick={this.openFormStep}>
                      <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                          <Grid.Column width='12'>
                            <Header><h1>{this.state.currentData.task}</h1></Header>
                              <p>
                                {`Estimate ${this.state.currentData.estimate} Hours - ${this.state.currentData.estimate - this.state.currentData.hours} Hours Left`}
                              </p>
                          </Grid.Column>
                          <Grid.Column width='3' floated="right">
                            <Button icon primary onClick={this.newStep}>
                              <Icon name='add' /> New Step
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Accordion.Title>
                    <Accordion.Content active={formStep === 0}>
                      <Card fluid={true}>
                        <Card.Content>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column>
                                <h3> STEP {this.state.currentData.steps.length + 1} </h3>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                        <Card.Content>
                        <Form onSubmit={this.handleForm}>
                          <Form.Group widths='equal'>
                          <Form.Field required control={Input} label='Date' id='startDate'>
                            <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
                          </Form.Field>
                            <Form.Field control={Input} required type='number' label='Hours' id='hours' />
                          </Form.Group>
                          <Form.Field control={TextArea} required label='Detail' id='detail'/>
                          <Form.Field control={Input} label='Deliverable' id='deliverable' />
                          <Form.Field control={Input} required label='By' id='by' />
                          <Form.Field floated='right' primary control={Button}>Save</Form.Field>
                        </Form>
                        </Card.Content>
                      </Card>
                    </Accordion.Content>
                  </Accordion>
                </Modal.Description>
                {this.renderStep()}
              </Modal.Content>
            </Modal>
          : '')}

      <Modal open={this.state.openStepEdit} onClose={this.closeEditStep}>
          <Modal.Header>Edit Step</Modal.Header>
          <Modal.Content>
            <Card fluid={true}>
              <Card.Content>
                <Form onSubmit={this.handleStepEdit}>
                  <Form.Group widths='equal'>
                  <Form.Field required control={Input} label='Date' id='startDate'>
                    <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
                  </Form.Field>
                    <Form.Field control={Input} required type='number' label='Hours' id='hours' />
                  </Form.Group>
                  <Form.Field control={TextArea} required label='Detail' id='detail'/>
                  <Form.Field control={Input} label='Deliverable' id='deliverable' />
                  <Form.Field control={Input} required label='By' id='by' />
                  <Form.Field floated='right' primary control={Button}>Save</Form.Field>
                </Form>
              </Card.Content>
            </Card>
          </Modal.Content>
        </Modal>
      </div>
    );
    return this.page;
  }
}
