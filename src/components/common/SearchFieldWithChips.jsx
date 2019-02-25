import React from 'react';

import Select from 'react-select';
import FormLabel from '@material-ui/core/FormLabel';
// import { colourOptions } from '../data';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default () => (
  <React.Fragment>
    <FormLabel component="legend">Select who to invite: (optional)</FormLabel>
    <Select
      defaultValue={options[0]}
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  </React.Fragment>
);
