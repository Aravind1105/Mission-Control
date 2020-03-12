import React from 'react';
import { FormTextArea as TextArea } from 'semantic-ui-react';

import './styles.less';

const FormTextArea = ({ form, field, ...props }) => {
  return <TextArea {...field} {...props} />;
};

export default FormTextArea;
