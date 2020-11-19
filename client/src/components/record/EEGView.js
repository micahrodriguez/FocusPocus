import React, { useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardTitle, Container, Row, Col, CardHeader} from "shards-react";
import { Line, Bar} from "react-chartjs-2";
import { emptyData, emptyBandData, chartOptions, barOptions, timeOptions} from "../../utils/mockData";
import { MuseClient, zipSamples } from "muse-js";
import { catchError, multicast } from "rxjs/operators";
import { Subject } from "rxjs";
import { bandpassFilter, epoch, powerByBand, fft } from "@neurosity/pipes";
import { mockMuseEEG } from "../../utils/dataGen";

function EEGView() {

    // Observable Source
    var source$ = null;
    var subject$ = null;

    const labels = Array.from(Array(512).keys());

    // Graph Data
    const [data, setData] = useState(emptyData);
    // FFT Data
    const [bandData, setBandData] = useState(emptyBandData);
    // Continuous Data
    const [timeBandData, setTimeBandData] = useState([]);
    // Source Set
    const [connected, setConnected] = useState(false);

    // Pipeline Settings
    const settings = {
        lowCut: 2,
        highCut: 50,
        spRate: 256,
        channels: 4,
        // Time Between Windowing
        int: 2,
        duration: 512,
    };

    function buildEEGPipe() {
        // Source Subject
        subject$ = zipSamples(source$).pipe(
            multicast(() => new Subject()),
        );

        let builtPipe$ = subject$.pipe(
            bandpassFilter({
                cutoffFrequencies: [settings.lowCut, settings.highCut],
                nbChannels: settings.channels
            }),
            epoch({
                interval: settings.int,
                duration: settings.duration,
                samplingRate: settings.spRate
            }),
            catchError(err => {
                console.log(err);
            })
        );
        // New Subject Multi Observers
        //let multicast$ = builtPipe$.pipe(
            //multicast(() => new Subject()),
        //);
        let subscription = builtPipe$.subscribe(streamData => {
            setData(dataState => {
                Object.values(dataState).forEach((channel, index) => {
                    channel.data = streamData.data[index];
                });
                return {
                    ch0: dataState.ch0,
                    ch1: dataState.ch1,
                    ch2: dataState.ch2,
                    ch3: dataState.ch3,
                };
            });
        });
    }

    function buildFFTPipe() {
        if (!subject$) {
            return "Error"
        }
        let builtPipe$ = subject$.pipe(
            bandpassFilter({
                cutoffFrequencies: [settings.lowCut, settings.highCut],
                nbChannels: settings.channels
            }),
            epoch({
                interval: 100,
                duration: 1024,
                samplingRate: settings.spRate,
            }),
            fft({ bins: 256}),
            powerByBand(),
            catchError(err => {
                console.log(err);
            })
        );
        let subscription = builtPipe$.subscribe(streamData => {
            setBandData(bandState => {
                Object.values(bandState).forEach((channel, index) => {
                    channel.data = [
                        streamData.alpha[index],
                        streamData.beta[index],
                    ]
                });
                return {
                    ch0: bandState.ch0,
                    ch1: bandState.ch1,
                    ch2: bandState.ch2,
                    ch3: bandState.ch3,
                };
            });
            setTimeBandData(timeBand => {
                return [...timeBand, streamData.beta[0]]
            });
        });
    }

    function connSim() {
        source$ = mockMuseEEG(256);
        buildEEGPipe();
        buildFFTPipe();
        subject$.connect();
        setConnected(true);
    }

    async function connMuse() {
        let client = new MuseClient();
        await client.connect();
        await client.start();
        source$ = client.eegReadings
        buildEEGPipe();
        buildFFTPipe();
        subject$.connect();
        setConnected(true);
    }

    function disconnect() {
        window.location.reload();
    }

    /**
     * Chart View
     * Displays the EEG Live View
     * Based on thee current selected channel
     * @param {*} props 
     */
    function ChartView(props) {
        return (
            <Container>
                {renderCharts(props.vals)}
            </Container>
        )
    }
    function renderCharts(dataValues) {
        return Object.values(dataValues).map((channel, index) => {
            if (index === 0) {
                return (
                    <Col className="mb-4">
                    <Card key={index}>
                      <CardBody>
                          <CardTitle>{channel.name}</CardTitle>
                          <Line data={{
                              xLabels: labels,
                              datasets: [{data: channel.data}]}} options={chartOptions}/>
                      </CardBody>
                    </Card>
                    </Col>
                );
            } else {
                return null;
            }
        });
    }

    /**
     * Chart View
     * Displays the EEG Live View
     * Based on thee current selected channel
     * @param {*} props 
     */
    function BarView(props) {
        return (
            <Container>
                {renderBars(props.vals)}
            </Container>
        )
    }
    function renderBars(dataValues) {
        return Object.values(dataValues).map((channel, index) => {
            if (index === 0) {
                console.log(channel.data);
                return (
                    <Col className="mb-4">
                    <Card key={index}>
                      <CardBody>
                          <CardTitle>{channel.name}</CardTitle>
                          <Bar data={{
                              xLabels: ["Beta", "Alpha"],
                              datasets: [
                                  {
                                    data: channel.data,
                                    backgroundColor: ['rgba(255, 0, 0, 0.9)', 
                                    'rgba(0, 0, 255, 0.9)'],
                                  }
                                ]
                                }} 
                                  options={barOptions}/>
                      </CardBody>
                    </Card>
                    </Col>
                );
            } else {
                return null;
            }
        });
    }

    return (
        <Container>
            <Row>
                <Col lg={{ size: 8, order: 2, offset: 3 }} className="col-lg mb-4">
                            <ButtonGroup size="lg">
                                <Button disabled={connected} onClick={connMuse}>
                                    Muse Connect
                                </Button>
                                <Button disabled={connected} onClick={connSim}>
                                    Simulate Data
                                </Button>
                                <Button disabled={!connected} onClick={disconnect}>
                                    Disconnect
                                </Button>
                            </ButtonGroup>
                </Col>
            </Row>
            <Row>
                {/* Live Signal and Control Panel */}
                <Col className="col-lg mb-4">
                    <Row>
                        <ChartView vals={data}/>
                    </Row>
                </Col>

                {/* FFT Charts*/}
                <Col className="col-lg mb-4">
                    <Row>
                        <BarView vals={bandData}/>
                    </Row>
                </Col>
            </Row>
            {/* Accumulation Chart */}
            <Row>
            <Col className="col-lg mb-4">
                    <Card>
                      <CardBody>
                          <CardTitle>Focus</CardTitle>
                          <Line data={{
                              xLabels: Array.from(timeBandData.keys()),
                              datasets: [{data: timeBandData}]}} options={timeOptions}/>
                      </CardBody>
                    </Card>
            </Col>
            <Col className="col-lg mb-4">
            </Col>
            </Row>
        </Container>
    );
}

export default EEGView;
