import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card } from "@material-ui/core";
import CardBody from "react-bootstrap/esm/CardBody";

export default function Lay() {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <Card className="card-md-5">
                        <CardBody>
                            <div className="card-body">
                                <h5 className="card-title">Participant registration</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Participants register here</h6>
                                {/* <button>Choose</button> */}
                                <button class="btn btn-primary" onClick={() => window.location.href = '/api/users'}>Register</button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-5">
                    <Card className="card-md-5">
                        <CardBody>
                            <div className="card-body">
                                <h5 className="card-title">Mentor registration</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Mentors register here</h6>
                                {/* <button>Choose</button> */}
                                <button class="btn btn-primary" onClick={() => window.location.href = '/api/users'}>Register</button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}