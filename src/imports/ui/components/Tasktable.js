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

export default class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentData: {},
      activeIndex: 0,
    };

    this.data = [
      {
        no: 1,
        task: 'testing app',
        estimated: 10,
        remaining: 5,
        step: 3,
        start: '20-5-2019',
        finish: '21-5-2019',
        status: 'Finish',
        doneby: 'HUdan',
      },
      {
        no: 2,
        task: 'testing app',
        estimated: 10,
        remaining: 5,
        step: 3,
        start: '20-5-2019',
        finish: '21-5-2019',
        status: 'Finish',
        doneby: 'HUdan',
      },
      {
        no: 3,
        task: 'testing app',
        estimated: 10,
        remaining: 5,
        step: 3,
        start: '20-5-2019',
        finish: '21-5-2019',
        status: 'Finish',
        doneby: 'HUdan',
      },
    ];

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  newStep = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => console.log('user', user));
    this.result = true;
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

  renderData() {
    return this.data.map((data, i) => (
      <RowTask key={i} data={data} click={this.onClick} />
    ));
  }

  render() {
    const { activeIndex } = this.state;
    const panels = [
      {
        key: `panel-1-${new Date().getTime()}`,
        title: 'tesss',
        content: 'assasasasasas',
      },
      {
        key: `panel-2-${new Date().getTime()}`,
        title: 'tesss',
        content: 'assasasasasas',
      },
      {
        key: `panel-3-${new Date().getTime()}`,
        title: 'tesss',
        content: 'assasasasasas',
      }
    ]

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

        {(this.state.open
          ? <Modal open={this.state.open} onClose={this.close}>
              <Modal.Header>Step Detail</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                      <Grid.Column width='12'>
                        <Header><h1>{this.state.currentData.task}</h1></Header>
                        <p>Estimate {this.state.currentData.estimated} Hours - {this.state.currentData.remaining} Hours Left</p>
                      </Grid.Column>
                      <Grid.Column width='3' floated="right">
                        <Button icon onClick={this.newStep}>
                          <Icon name='add' /> New Step
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Accordion defaultActiveIndex={[0, 2]} panels={panels} exclusive={false} fluid />
                </Modal.Description>

                <Accordion>
                  <Accordion.Title active={activeIndex === 0} index={0}>
                    <Icon name='dropdown' />
                    What is a dog?
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0}>
                    <Card fluid='true'>
                      <Card.Content>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column><h3> STEP ... </h3></Grid.Column>
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

                <Card fluid='true'>
                  <Card.Content>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={3}><h3> STEP {this.state.currentData.no}</h3></Grid.Column>
                        <Grid.Column width={10}><h3> {this.state.currentData.start}</h3></Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                  <Card.Content>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={3}>Hours Left</Grid.Column>
                        <Grid.Column width={1}>:</Grid.Column>
                        <Grid.Column width={10}>{this.state.currentData.remaining}</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={3}>Detail</Grid.Column>
                        <Grid.Column width={1}>:</Grid.Column>
                        <Grid.Column width={10}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={3}>Deliverable</Grid.Column>
                        <Grid.Column width={1}>:</Grid.Column>
                        <Grid.Column width={10}>{this.state.currentData.task}</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={3}>Status</Grid.Column>
                        <Grid.Column width={1}>:</Grid.Column>
                        <Grid.Column width={10}>{this.state.currentData.status}</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={3}>Date Finish</Grid.Column>
                        <Grid.Column width={1}>:</Grid.Column>
                        <Grid.Column width={10}>{this.state.currentData.start}</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={3}>Done By</Grid.Column>
                        <Grid.Column width={1}>:</Grid.Column>
                        <Grid.Column width={10}>{this.state.currentData.doneby}</Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <div align='right'>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </div>
                  </Card.Content>
                </Card>
              </Modal.Content>
            </Modal>
          : '')}
      </div>
    );
    return this.page;
  }
}
