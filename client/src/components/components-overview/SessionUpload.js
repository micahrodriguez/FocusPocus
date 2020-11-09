// import React from "react";
// import axios, { post } from 'axios';

// class SessionUpload extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       file: null
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleSubmit(event){
//     event.preventDefault();
//     const url = "/api/upload"



//     // Send login request to server
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', '/upload', true);

//     //Send the proper header information along with the request
//     xhr.setRequestHeader('Content-Type', 'multipart/form-data');
//     xhr.onreadystatechange = function () { // Call a function when the state changes.
//       if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//         // Request finished
//         let jsonResponse = JSON.parse(xhr.responseText);
//         if (jsonResponse['has_error'] === true) {
//           alert(`Error: ${jsonResponse['error']}`);
//         } else {
//           // TODO: Maybe add some sort of confirmation that the login was successful?
//           window.location.href = '/overview';
//         }
//       }
//     }
//     let formData = new FormData();
//     formData.append('file', this.state.file);
//     xhr.send(formData);
//   }

//   handleChange(event) {
//     this.setState({file:event.target.files[0]})
//   }

//   render() {
//     return (
//       <div className="custom-file mb-3">
//         <input type="file" className="custom-file-input" id="customFile2" onChange={this.handleChange}/>
//         <label className="custom-file-label" htmlFor="customFile2">
//           Choose file...
//         </label>
//       </div>
//     );
//   }
// }


// class SimpleReactFileUpload extends React.Component {



//   fileUpload(file){
//     const url = 'http://example.com/file-upload';
//     const formData = new FormData();
//     formData.append('file',file)
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data'
//       }
//     }
//     return  post(url, formData,config)
//   }

//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit}>
//         <h1>File Upload</h1>
//         <input type="file" onChange={this.onChange} />
//         <button type="submit">Upload</button>
//       </form>
//     )
//   }
// }


// import React from "react";

// const SessionUpload = () => (
//   <div className="custom-file mb-3">
//     <div className="input-group-prepend">
//       <span className="input-group-text" id="inputGroupFileAddon01">
//         Upload
//       </span>
//     </div>
//     <div className="custom-file">
//       <input type="file" className="custom-file-input" id="customFile2" aria-describedby="inputGroupFileAddon01"/>
//       <label className="custom-file-label" htmlFor="customFile2">
//         Choose file...
//       </label>
//     </div>
//   </div>
// );

import React from "react";
import path from 'path';
import DateTimePicker from "./DateTimePicker";
import { Button } from "shards-react";

class SessionUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file_name: "Choose File",
      file: null,
      submit: "Submit",
      description: "",
      date_val: "",
      time_val: "",
    };
    this.handle_file_change = this.handle_file_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
    this.handle_change = this.handle_change.bind(this);
    this.handle_date_change = this.handle_date_change.bind(this);
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

  handle_date_change(date, time) {
    this.setState({
      date_val: date,
      time_val: time,
    })
  }

  handle_submit(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('description', this.state.description)
    formData.append('date', this.state.date_val);
    formData.append('time', this.state.time_val);

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
          window.location.href = '/overview';
        }
      }
    }
    xhr.send(formData);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handle_submit} >
          <strong className="text-muted d-block mb-2">
                  Session File Upload
          </strong>
          <div class="custom-file" style={{marginBottom: 10}}>
            <input type="file" class="custom-file-input" id="customFile" onChange={this.handle_file_change}/>
            <label class="custom-file-label" for="customFile">{this.state.file_name}</label>
          </div>
        <div class="form-group">
          <strong className="text-muted d-block mb-2">
                  Session Description
          </strong>
          <textarea class="form-control" rows="3" id="session-description" 
          onChange={this.handle_change}/>
        </div>
        <div class="form-group">
          <strong className="text-muted d-block mb-2">
                  Session Date
          </strong>
          <DateTimePicker onChange={this.handle_date_change}/>
        </div>
        <div class="form-group">
          <Button size="lg">{this.state.submit}</Button>
        </div>
        </form>
      </div>
    )
  }
}

export default SessionUpload;