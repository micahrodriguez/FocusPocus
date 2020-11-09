import React from "react";
import $ from "jquery";


class DateTimePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       date_val: "",
       time_val: "",
    };
    this.handle_change = this.handle_change.bind(this);
  }

  handle_change(event) {
     const target = event.target;
     this.setState({
        [target.name]: target.value,
     });
     this.props.onChange(this.state.date_val, this.state.time_val);
  }

  render() {
    return (
       <form>
         <div class="form-group">
            <input name="date_val" type="date" class="form-control" 
            value={this.state.date} onChange={this.handle_change}/>
         </div>
         <div class="form-group">
            <input name="time_val" type="time" class="form-control" 
            value={this.state.time} onChange={this.handle_change}/>
         </div>
       </form>
    );
  }
}

export default DateTimePicker;
