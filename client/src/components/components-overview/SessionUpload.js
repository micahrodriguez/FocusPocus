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
import $ from "jquery";

class SessionUpload extends React.Component {

  constructor(props) {
    super(props);
    $(".custom-file-input").on("change", function() {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
  }

  render() {
    return (
      <div>
        <form>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile"/>
            <label class="custom-file-label" for="customFile">Choose file</label>
          </div>
        </form>
        <div class="form-group">
          <label for="session-name">Session Name:</label>
          <input type="text" class="form-control" id="session-name"/>
        </div>
        <div class="form-group">
          <label for="session-description">Session Description:</label>
          <textarea class="form-control" rows="3" id="session-description"/>
        </div>
      </div>
    )
  }
}

export default SessionUpload;