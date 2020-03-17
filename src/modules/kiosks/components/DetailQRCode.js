import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Segment,
  Header,
  Divider,
  Container,
  Button,
} from 'semantic-ui-react';
import QRCode from 'qrcode.react';

const id = Date.now();
const DetailQRCode = ({ qrCode }) => {
  const downloadQR = () => {
    const svg = window.document.getElementById(id);
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(
      '<svg shape-rendering="crispEdges" height="400" width="400" viewBox="0 0 25 25">',
    );
    printWindow.document.write(svg.innerHTML);
    printWindow.document.write('</svg>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Grid.Row>
      <Grid.Column>
        <Segment>
          <Grid>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={12}>
                <Header as="h3">QR Code</Header>
              </Grid.Column>
              <Grid.Column width={4} className="text-align-right">
                <Button onClick={downloadQR} basic icon="print" />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider />
          <Container textAlign="center">
            <QRCode value={qrCode} size={200} renderAs="svg" id={id} />
          </Container>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

DetailQRCode.propTypes = {
  qrCode: PropTypes.string.isRequired,
};

export default DetailQRCode;
