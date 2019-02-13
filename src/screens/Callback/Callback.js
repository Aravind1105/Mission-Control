import React, { Component } from 'react';

import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

class Callback extends Component {
  render() {
    return (
      <div>
        <ClipLoader css={override} sizeUnit={'px'} size={150} color={'#123abc'} loading={this.state.loading} />
      </div>
    );
  }
}

export default Callback;
