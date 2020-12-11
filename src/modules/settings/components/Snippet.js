import React from 'react';
import ReactJson from 'react-json-view';

export default ({ content, title }) => (
  <>
    <h5>{title}</h5>
    <div className="settings-snippet-window">
      <ReactJson
        src={JSON.parse(content)}
        displayDataTypes={false}
        displayObjectSize={false}
        indentWidth={4}
        collapseStringsAfterLength={false}
        collapsed={false}
        enableClipboard={true}
        name={false}
      />
    </div>
  </>
);
