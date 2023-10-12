import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function DatePicker({handleInputChangeDate,values}) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label="myDATE"
        format="MMM/dd/yyyy"
        name="myDate"
        value={values.myDate}
        onChange={(newDate) => {
          handleInputChangeDate("myDate",newDate)
        }}
        autoOk={true}
      />
    </MuiPickersUtilsProvider>
  );
}
