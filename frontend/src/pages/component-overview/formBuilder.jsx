import { Fragment } from 'react';
import Nestable from 'react-nestable';
import { useSelector, useDispatch } from 'react-redux';
//Material UI Components
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
//Icons
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
//Form Elements
import {
  TextFieldInput,
  TextArea,
  NumberInput,
  RadioInput,
  CheckBoxInput,
  DateInput,
  TimeInput,
  Header
} from 'components/FormBuilder/index';
// Reducers
import {
  setTitle,
  setDescription,
  addElement,
  deleteElement,
  duplicateElement as duplicateElementAction,
  handleOnChangeSort as handleSort,
  handleValue as updateValue,
  handleRequired as toggleRequired,
  handleElType as updateElType,
  addOption as addOptionAction,
  handleDate as updateDate,
  handleTime as updateTime,
  handleOptionValues as updateOptionValues,
  deleteOption as deleteOptionAction
} from 'app/slices/FormSlice';

const FormBuilder = () => {
  const dispatch = useDispatch();

  const title = useSelector((state) => state.form.title);
  const description = useSelector((state) => state.form.description);
  const data = useSelector((state) => state.form.data);

  const items = data;

  // Function to add new element
  const addNewElement = () => {
    dispatch(addElement());
  };

  // Function to delete element
  const removeElement = (id) => {
    dispatch(deleteElement(id));
  };

  // Function to duplicate element
  const duplicateElement = (elId, elType) => {
    dispatch(duplicateElementAction({ elId, elType }));
  };

  // Function to handle sorting of elements
  const handleOnChangeSort = ({ items }) => {
    dispatch(handleSort(items));
  };

  // Function to handle input values
  const handleValue = (id, e) => {
    dispatch(updateValue({ id, value: e.target.value }));
  };

  // Function to handle required
  const handleRequired = (id) => {
    dispatch(toggleRequired(id));
  };

  // Function to handle element type
  const handleElType = (id, type) => {
    dispatch(updateElType({ id, type }));
  };

  // Function to handle options
  const addOption = (id, newOption) => {
    dispatch(addOptionAction({ id, newOption }));
  };

  // Function to handle date
  const handleDate = (id, dateVal) => {
    dispatch(updateDate({ id, date: dateVal }));
  };

  // Function to handle time
  const handleTime = (id, timeVal) => {
    dispatch(updateTime({ id, time: timeVal }));
  };

  // Function to change option values
  const handleOptionValues = (elId, optionId, optionVal) => {
    dispatch(updateOptionValues({ elId, optionId, optionVal }));
  };

  // Function to delete option
  const deleteOption = (elId, optionId) => {
    dispatch(deleteOptionAction({ elId, optionId }));
  };

  // Render items
  const renderElements = ({ item }) => {
    switch (item.type) {
      case 'text':
        return (
          <TextFieldInput
            item={item}
            handleValue={handleValue}
            deleteEl={removeElement}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case 'textarea':
        return (
          <TextArea
            item={item}
            handleValue={handleValue}
            deleteEl={removeElement}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case 'number':
        return (
          <NumberInput
            item={item}
            handleValue={handleValue}
            deleteEl={removeElement}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case 'radio':
        return (
          <RadioInput
            item={item}
            handleValue={handleValue}
            deleteEl={removeElement}
            handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );
      case 'checkBox':
        return (
          <CheckBoxInput
            item={item}
            handleValue={handleValue}
            deleteEl={removeElement}
            handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );
      case 'date':
        return (
          <DateInput
            item={item}
            handleValue={handleValue}
            deleteEl={removeElement}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleDate={handleDate}
            duplicateElement={duplicateElement}
          />
        );
      case 'time':
        return (
          <TimeInput
            item={item}
            handleValue={handleValue}
            deleteEl={removeElement}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleTime={handleTime}
            duplicateElement={duplicateElement}
          />
        );
      default:
        return <Fragment></Fragment>;
    }
  };

  return (
    <Fragment>
      <Grid container spacing={1} direction="row" justifyContent="center">
        <Grid item xs={11}>
          <Header
            title={title}
            setTitle={(newTitle) => dispatch(setTitle(newTitle))}
            description={description}
            setDescription={(newDescription) => dispatch(setDescription(newDescription))}
          />
          <Nestable items={items} renderItem={renderElements} maxDepth={1} onChange={handleOnChangeSort} />
        </Grid>
        <Grid item sm={1}>
          <Tooltip title="Add Element" aria-label="add-element">
            <IconButton aria-label="add-element" onClick={addNewElement} sx={{ position: 'sticky', top: 30 }}>
              <AddCircleOutlineOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default FormBuilder;
