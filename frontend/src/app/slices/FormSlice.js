import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  title: 'Untitled Form',
  description: '',
  data: [],
  formData: 'text'
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    updateData: (state, action) => {
      state.data = action.payload;
    },
    addElement: (state) => {
      const newElement = {
        id: uuid(),
        value: null,
        type: state.formData,
        required: false
      };
      state.data.push(newElement);
      state.formData = 'text';
    },
    deleteElement: (state, action) => {
      state.data = state.data.filter((el) => el.id !== action.payload);
    },
    duplicateElement: (state, action) => {
      const { elId, elType } = action.payload;
      const elIdx = state.data.findIndex((el) => el.id === elId);
      if (elIdx !== -1) {
        const newElement = {
          id: uuid(),
          value: null,
          type: elType,
          required: false
        };
        state.data.splice(elIdx + 1, 0, newElement);
      }
    },
    handleOnChangeSort: (state, action) => {
      state.data = action.payload.items;
    },
    handleValue: (state, action) => {
      const { id, value } = action.payload;
      const element = state.data.find((el) => el.id === id);
      if (element) {
        element.value = value;
      }
    },
    handleRequired: (state, action) => {
      const id = action.payload;
      const element = state.data.find((el) => el.id === id);
      if (element) {
        element.required = !element.required;
      }
    },
    handleElType: (state, action) => {
      const { id, type } = action.payload;
      const element = state.data.find((el) => el.id === id);
      if (element) {
        element.type = type;
      }
    },
    addOption: (state, action) => {
      const { id, newOption } = action.payload;
      const element = state.data.find((el) => el.id === id);
      if (element) {
        const optionWithId = {
          value: '',
          id: uuid() // Assign a unique ID to the new option
        };
        element.options = [...(element.options || []), optionWithId];
      }
    },
    handleDate: (state, action) => {
      const { id, dateVal } = action.payload;
      const element = state.data.find((el) => el.id === id);
      if (element) {
        element.date = dateVal;
      }
    },
    handleTime: (state, action) => {
      const { id, timeVal } = action.payload;
      const element = state.data.find((el) => el.id === id);
      if (element) {
        element.time = timeVal;
      }
    },
    handleOptionValues: (state, action) => {
      const { elId, optionId, optionVal } = action.payload;
      const element = state.data.find((el) => el.id === elId);
      if (element && element.options) {
        const reqOption = element.options.find((el) => el.id === optionId);
        reqOption.value = optionVal;
      }
    },
    deleteOption: (state, action) => {
      const { elId, optionId } = action.payload;
      const element = state.data.find((el) => el.id === elId);
      if (element) {
        element.options = (element.options || []).filter((opt) => opt.id !== optionId);
      }
    }
  }
});

export const {
  setTitle,
  setDescription,
  setFormData,
  addElement,
  deleteElement,
  duplicateElement,
  handleOnChangeSort,
  handleValue,
  handleRequired,
  handleElType,
  addOption,
  handleDate,
  handleTime,
  handleOptionValues,
  deleteOption,
  updateData
} = formSlice.actions;

export default formSlice.reducer;
