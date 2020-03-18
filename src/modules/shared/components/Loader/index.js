import React from 'react';
import { Dimmer, Loader as Loading } from 'semantic-ui-react';

const Loader = () => (
  <Dimmer active inverted>
    <Loading size="large">Loading</Loading>
  </Dimmer>
);

export default Loader;
