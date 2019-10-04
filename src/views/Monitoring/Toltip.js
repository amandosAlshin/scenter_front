import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Tooltip, UncontrolledTooltip } from 'reactstrap';

class Tooltips extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: [false, false]
    };
  }

  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      tooltipOpen: newArray,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Tooltip</strong>
            <small> disable autohide</small>
          </CardHeader>
          <CardBody>
            <p>Sometimes you need to allow users to select text within a <a href="#" id="DisabledAutoHideExample">tooltip</a>.</p>
            <Tooltip placement="top" isOpen={this.state.tooltipOpen[1]} autohide={false} target="DisabledAutoHideExample" toggle={() => {this.toggle(1);}}>
              Try to select this text!
            </Tooltip>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Tooltips;
