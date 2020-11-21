import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Button }  from "shards-react"
import { emptySessions } from "../../utils/mockData"

export function SessionTable(props) {
    const [sessions, setSessions] = useState(emptySessions);

    useEffect(() => {
        fetch("/api/session_list")
            .then(result => result.json())
            .then(
                (result) => {
                    setSessions(result);
                },
                (error) => {
                    console.log("ERROR Loading Sessions");
                    setSessions(emptySessions);
                }
            )
    },[])
    
    function renderTable() {
        return sessions.map((singleSess, index) => {
                return (
                <tr>
                    <td>{singleSess.activity_type}</td>
                    <td>{singleSess.f_name}</td>
                    <td>
                        <Button>View</Button>
                    </td>
                </tr>
            )
        });
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>Past Sessions</CardTitle>
                <table className="table mb-0">
                    <thead className="bg-light">
                    <tr>
                    <th scope="col" className="border-0">
                        Type
                    </th>
                    <th scope="col" className="border-0">
                        Date
                    </th>
                    <th scope="col" className="border-0">
                        Time
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                        {renderTable()}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}