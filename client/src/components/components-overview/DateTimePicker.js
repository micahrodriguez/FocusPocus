import React from "react";
import $ from "jquery";


class DateTimePicker extends React.Component {

  constructor(props) {
    super(props);

    $(function () {
       $('#datetimepicker6').datetimepicker();
       $('#datetimepicker7').datetimepicker({
    useCurrent: false //Important! See issue #1075
    });
       $("#datetimepicker6").on("dp.change", function (e) {
           $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
       });
       $("#datetimepicker7").on("dp.change", function (e) {
           $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
       });
    });
    // $(function() {
    //   $('#datetimepicker2').datetimepicker({
    //     language: 'en',
    //     pick12HourFormat: true
    //   });
    // });
  }

  render() {
    return (
      <div class="container">
         <div class='col-md-5'>
            <div class="form-group">
               <div class='input-group date' id='datetimepicker6'>
                  <input type='text' class="form-control" />
                  <span class="input-group-addon">
                  <span class="glyphicon glyphicon-calendar"></span>
                  </span>
               </div>
            </div>
         </div>
         <div class='col-md-5'>
            <div class="form-group">
               <div class='input-group date' id='datetimepicker7'>
                  <input type='text' class="form-control" />
                  <span class="input-group-addon">
                  <span class="glyphicon glyphicon-calendar"></span>
                  </span>
               </div>
            </div>
         </div>
      </div>
      // <div class="well">
      //   <div id="datetimepicker2" class="input-append">
      //     <input data-format="MM/dd/yyyy HH:mm:ss PP" type="text"></input>
      //     <span class="add-on">
      //       <i data-time-icon="icon-time" data-date-icon="icon-calendar">
      //       </i>
      //     </span>
      //   </div>
      // </div>
    );
  }
}

export default DateTimePicker;
