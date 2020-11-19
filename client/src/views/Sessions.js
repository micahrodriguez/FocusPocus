import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Form,
  Alert
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import CustomFileUpload from "../components/components-overview/CustomFileUpload";
import DropdownInputGroups from "../components/components-overview/DropdownInputGroups";
import CustomSelect from "../components/components-overview/CustomSelect";
import SessionUpload from "../components/components-overview/SessionUpload";
import DateTimePicker from "../components/components-overview/DateTimePicker";

const Sessions = () => (
  <div>
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Sessions"
          className="text-sm-left"
        />
      </Row>

      <Row>
        <Col lg="12" className="mb-4">
          <Card small>
            {/* Files & Dropdowns */}
            <CardHeader className="border-bottom">
              <h6 className="m-0">Session Upload</h6>
            </CardHeader>
            <Container className="px-3" style={{margin: 10}}>
              <SessionUpload/>
            </Container>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Sessions;
