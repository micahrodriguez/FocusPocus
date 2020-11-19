import React from "react";
import { MuseClient } from 'muse-js'
import {Container, Row, Col, Progress, ListGroupItem, Button} from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import EEGView from "../components/record/EEGView"

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      read: "",
    };
  }
  render() {
    return(
      <Container fluid className="main-content-container px-4">
      {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Record" className="text-sm-left mb-3" />
        </Row>
        <Row>
          <strong className="text-muted d-block mb-2">{this.state.read}</strong>
        </Row>
        {/* Control Buttons */}
        <Row>
          <EEGView/>
        </Row>
      </Container>
    )
  }
}

export default Record;
