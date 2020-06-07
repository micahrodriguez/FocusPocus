import React from "react";
import PropTypes from "prop-types";
import {Container, Row, Col, Progress, ListGroupItem, Button} from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import NewDraft from "./../components/blog/NewDraft";
import Discussions from "./../components/blog/Discussions";
import TopReferrals from "./../components/common/TopReferrals";
import ProgressBars from "../components/components-overview/ProgressBars";
import RecordButton from "../components/record/RecordButtons";

const Record = ({ smallStats }) => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Record" subtitle="Live Recording with Muse" className="text-sm-left mb-3" />
    </Row>

    <Row>
      {/* Statistic Bars */}
      <Col lg="6" md="6" sm="12" className="mb-4">
        <ProgressBars />
      </Col>

      {/* Users by Device */}
      <Col lg="6" md="6" sm="12" className="mb-4">
        <UsersByDevice />
      </Col>
    </Row>

    {/* Control Buttons */}
    <Row>
      <Col lg="12" md="6" sm="12" className="mb-4">
        <RecordButton />
      </Col>
    </Row>


  </Container>
);

Record.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

Record.defaultProps = {
  smallStats: [
    {
      label: "Average Productivity",
      value: "1,337",
      percentage: "-100.0%",
      increase: false,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0,184,216,0.1)",
          borderColor: "rgb(0,184,216)",
          data: [1, 2, 1, 3, 1, 4, 1]
        }
      ]
    },
    {
      label: "Session Count",
      value: "9001",
      percentage: "9001.0%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 2, 1, 2, 3]
        }
      ]
    }
  ]
};

export default Record;
