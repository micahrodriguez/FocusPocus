import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart";

class RecordButton extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  // FIXME: Button alignment issues
  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <Button theme="primary" className="mb-2 mr-1">
                Primary
              </Button>
            </Col>
            <Col>
              <Button theme="danger" className="mb-2 mr-1">
                Danger
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default RecordButton;
