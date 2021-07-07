import React, { useState, useEffect } from 'react';
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
import { Document, Page, PDFDownloadLink, Image } from '@react-pdf/renderer';

const DetailQRCode = ({ qrCode, fileName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [qrImage, setQrImage] = useState('');

  useEffect(() => {
    setQrImage(document.querySelector('canvas').toDataURL('image/jpg', 0.3));
    setIsLoading(false);
  }, [qrCode]);

  const QrDocument = (
    <Document>
      <Page size="A4" style={{}}>
        <Image src={{ uri: qrImage }} style={{ height: 200, width: 200 }} />
      </Page>
    </Document>
  );

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
                {!isLoading && (
                  <PDFDownloadLink document={QrDocument} fileName={fileName}>
                    {({ blob, url, loading, error }) => (
                      <Button basic icon="print" />
                    )}
                  </PDFDownloadLink>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Container textAlign="center">
            <QRCode value={qrCode} size={200} renderAs="canvas" />
          </Container>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

export default DetailQRCode;
