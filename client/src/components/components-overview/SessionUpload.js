import React from "react";
import path from 'path';
import DateTimePicker from "./DateTimePicker";
import { Button, Form, FormInput, FormGroup } from "shards-react";

class SessionUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file_name: "Choose File",
      file: null,
      act_type: "",
      submit: "Submit",
      date_val: "",
      time_val: "",
    };
    this.handle_file_change = this.handle_file_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
    this.handle_change = this.handle_change.bind(this);
  }

  handle_file_change(event) {
    const target = event.target;
    this.setState({
      file_name: target.value.substr(12),
      file: target.files[0],
    });
  }

  handle_change(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    })
  }

  handle_submit(event) {
    event.preventDefault();
    console.log(this.state);

    let formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('date', this.state.date_val);
    formData.append('time', this.state.time_val);
    formData.append('act_type', this.state.act_type);

    const url = "/api/file"

    // Send login request to server
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    //Send the proper header information along with the request
    xhr.onreadystatechange = () => { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished
        let jsonResponse = JSON.parse(xhr.responseText);
        if (jsonResponse['has_error'] === true) {
          alert(`Error: ${jsonResponse['error']}`);
          this.setState({
            submit: "Error"
          });
        } else {
          this.setState({
            submit: "Submitted"
          });
        }
      }
    }
    xhr.send(formData);
  }

  render() {
    return (
        <Form onSubmit={this.handle_submit} >
          <FormGroup>
            <strong className="text-muted d-block mb-2">File</strong>
            <FormInput type="file" onChange={this.handle_file_change}/>
          </FormGroup>
          <FormGroup>
            <strong className="text-muted d-block mb-2">Session Type</strong>
            <FormInput name="act_type" onChange={this.handle_change}/>
          </FormGroup>
          <FormGroup>
            <strong className="text-muted d-block mb-2">
                  Session Date
            </strong>
            <FormInput className="mb-2" 
              name="date_val" type="date" onChange={this.handle_change}/>
            <FormInput name="time_val" type="time" onChange={this.handle_change}/>
          </FormGroup>
          <FormGroup>
            <Button className="mb-2">{this.state.submit}</Button>
          </FormGroup>
        </Form>
    )
  }
}

export default SessionUpload;