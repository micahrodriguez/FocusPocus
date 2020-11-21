import React, { useState } from "react";
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
  Alert,
  CardTitle
} from "shards-react";

import { Line, Bar} from "react-chartjs-2";
import PageTitle from "../components/common/PageTitle";
import SessionUpload from "../components/components-overview/SessionUpload";
import { emptyBandData, barOptions } from "../utils/mockData";
import { SessionTable } from "../components/components-overview/SessionsTable";

function Sessions() {

  const [sessData, setSessData] = useState(emptyBandData);

  return (
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
          <Col className="col-lg mb-4">
            <Card small>
              {/* Files & Dropdowns */}
              <CardBody>
                <CardTitle className="mb-4">Session Upload</CardTitle>
                <SessionUpload/>
              </CardBody>
            </Card>
          </Col>
          {/** Session Details Display */}
          <Col className="col-lg mb-4">
            <Card small>
              <CardBody>
                <CardTitle>Session Overview</CardTitle>
                <Bar data={{
                      xLabels: ["Beta", "Alpha"],
                      datasets: [
                        {
                          data: sessData.ch0.data,
                          backgroundColor: ['rgba(255, 0, 0, 0.9)', 
                            'rgba(0, 0, 255, 0.9)'],
                          }
                      ]
                    }} 
                  options={barOptions}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/** Session List */}
        <Row>
          <Col className="col-lg mb-4">
            <SessionTable/>
          </Col>
          <Col className="col-lg mb-4">
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Sessions;
