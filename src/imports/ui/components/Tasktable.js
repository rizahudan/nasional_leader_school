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
} from 'semantic-ui-react';
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
      },
      currentData: {},
      activeIndex: 0,
      data: [],
    };

    this.getTask();

    this.close = this.close.bind(this);
    this.onClick = this.onClick.bind(this);
    this.openFormStep = this.openFormStep.bind(this);
    this.openDetailStep = this.openDetailStep.bind(this);
  }

  async getTask() {
    const response = await api.get('api/task');
    if (response !== false
        && typeof response.flag !== 'undefined'
        && response.flag === true
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

    this.setState(updateState);
  }

  openDetailStep = (e, titleProps) => {
    const updateState = this.state.modal;
    const { index } = titleProps;
    updateState.detailStep = updateState.detailStep === index ? -1 : index;

    this.setState(updateState);
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
            onClick={this.openFormStep}
          >
            <Card fluid={true}>
              <Card.Content>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <h3> STEP {i + 1}</h3>
                    </Grid.Column>
                    <Grid.Column width={10}><h3> {data.startDate}</h3></Grid.Column>
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
                    <Grid.Column width={10}>{data.endDate}</Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}>Done By</Grid.Column>
                    <Grid.Column width={1}>:</Grid.Column>
                    <Grid.Column width={10}>{data.by}</Grid.Column>
                  </Grid.Row>
                </Grid>
                <div align='right'>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
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
    console.log('render', this.state.currentData);
    this.page = (
      <div>
        <div className="ui container">
          <Table selectable>
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
                <Table.HeaderCell>DONE BY</Table.HeaderCell>
                <Table.HeaderCell>ACTION</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderData()}
            </Table.Body>
          </Table>
          <div className="ui pagination right floated menu">
            <a className="icon item"><i aria-hidden="true" className="chevron left icon"></i></a>
            <a className="item">1</a><a className="item">2</a>
            <a className="item">3</a><a className="item">4</a>
            <a className="icon item"><i aria-hidden="true" className="chevron right icon"></i></a>
          </div>
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
                            <Button icon onClick={this.newStep}>
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
                        <Form>
                          <Form.Group widths='equal'>
                            <Form.Field control={Input} label='Date' id='date' />
                            <Form.Field control={Input} label='Hours' id='hours' />
                          </Form.Group>
                          <Form.Field control={TextArea} label='Detail' id='detail'/>
                          <Form.Field control={Input} label='Deliverable' id='deliverable' />
                          <Form.Field control={Input} label='Done by' id='by' />
                          <Form.Field floated='right' control={Button}>Save</Form.Field>
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

        {(this.state.editStep
          ? <Modal open={this.state.openEdit} onClose={this.closeEdit}>
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
          : '')}

          {(this.state.delStep
            ? <Modal open={this.state.openDelete} onClose={this.closeDelete}>
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
            : '')}

      </div>
    );
    return this.page;
  }
}
