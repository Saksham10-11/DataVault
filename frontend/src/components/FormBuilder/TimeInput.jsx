import { Fragment } from 'react';
//Material UI Components
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

//Icons
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileCopyIcon from '@mui/icons-material/FileCopy';

//Form Elements
const formEl = [
  {
    label: 'Text',
    value: 'text'
  },
  {
    label: 'TextArea',
    value: 'textarea'
  },
  {
    label: 'Number',
    value: 'number'
  },
  {
    label: 'Radio',
    value: 'radio'
  },
  {
    label: 'CheckBox',
    value: 'checkBox'
  },
  {
    label: 'Date',
    value: 'date'
  },
  {
    label: 'Time',
    value: 'time'
  }
];

const TimeInput = ({ item, handleValue, deleteEl, handleRequired, handleElType, handleTime, duplicateElement }) => {
  return (
    <Fragment>
      <Paper elevation={1}>
        <Box sx={{ textAlign: 'center' }}>
          <DragIndicatorIcon sx={{ transform: 'rotate(-90deg)', cursor: 'all-scroll' }} />
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <TextField
                defaultValue={item.value}
                variant="outlined"
                onBlur={(e) => handleValue(item.id, e)}
                fullWidth
                required={item.required}
                placeholder="Time Label"
                sx={{ mb: 2 }}
              />
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <TimePicker
                  label="Pick Time"
                  value={item?.time}
                  onChange={(newTime) => handleTime(item.id, newTime)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="el-type-label">Type</InputLabel>
                <Select
                  labelId="el-type-label"
                  id="el-type"
                  label="Type"
                  value={item.type}
                  onChange={(e) => handleElType(item.id, e.target.value)}
                >
                  {formEl &&
                    formEl.map((el, key) => (
                      <MenuItem key={key} value={el.value}>
                        {el.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Divider light />
        <FormGroup row sx={{ alignItems: 'center' }}>
          <Tooltip title="Delete Element" aria-label="delete-element">
            <IconButton aria-label="delete-element" onClick={() => deleteEl(item.id)} sx={{ ml: 2 }}>
              <DeleteOutlineOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Duplicate Element" aria-label="duplicate-element">
            <IconButton aria-label="duplicate-element" onClick={() => duplicateElement(item.id, item.type)} sx={{ ml: 2 }}>
              <FileCopyIcon color="secondary" />
            </IconButton>
          </Tooltip>

          <FormControlLabel
            control={<Switch checked={item.required} onChange={() => handleRequired(item.id)} name="required-field" color="secondary" />}
            label="Required"
            sx={{ ml: 2 }}
          />
        </FormGroup>
      </Paper>
    </Fragment>
  );
};

export default TimeInput;
