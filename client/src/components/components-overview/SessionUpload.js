import React from "react";

class SessionUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const url = "/api/upload"



    // Send login request to server
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onreadystatechange = function () { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished
        let jsonResponse = JSON.parse(xhr.responseText);
        if (jsonResponse['has_error'] === true) {
          alert(`Error: ${jsonResponse['error']}`);
        } else {
          // TODO: Maybe add some sort of confirmation that the login was successful?
          window.location.href = '/overview';
        }
      }
    }
    let formData = new FormData();
    formData.append('file', this.state.file);
    xhr.send(formData);
  }

  handleChange(event) {
    this.setState({file:event.target.files[0]})
  }


  render() {
    return (
      <div className="custom-file mb-3">
        <input type="file" className="custom-file-input" id="customFile2"/>
        <label className="custom-file-label" htmlFor="customFile2">
          Choose file...
        </label>
      </div>
    );
  }
}


import axios, { post } from 'axios';

class SimpleReactFileUpload extends React.Component {



  fileUpload(file){
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return  post(url, formData,config)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    )
  }
}

