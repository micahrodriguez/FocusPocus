import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";

const Analyze = ({ smallStats }) => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Productivity Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
    </Row>

    {/* Small Stats Blocks */}
    <Row>
      {smallStats.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
    </Row>

    <Row>
      <Col lg="12" md="12" sm="12" className="mb-4">
        <UsersOverview />
      </Col>
    </Row>
  </Container>
);

Analyze.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

Analyze.defaultProps = {
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

export default Analyze;
