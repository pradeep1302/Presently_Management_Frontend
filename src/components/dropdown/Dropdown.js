import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


export default function BasicSelect({subjects, setSubjectCode}) {
  
	const [subject, setSubject] = React.useState("");

    const handleChange = (event) => {
        
    setSubject(event.target.value);
    setSubjectCode(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subject}
          label="Subject"
          onChange={handleChange}
        >
          {subjects.map((subject, index) => {
            return (
              <MenuItem key={subject._id} value={subject.subjectCode}>
                {subject.name}, ({subject.subjectCode})
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
