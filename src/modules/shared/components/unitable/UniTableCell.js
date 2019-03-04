import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { forEach } from 'ramda';
import { compare } from './lib/comparsions';

const UniTableCell = ({
  col,
  label,
  value,
  infos,
  unit,
  align,
  enumer,
  width,
}) => {
  const propsArr = { warning: false, error: false, textAlign: align };
  let icon = null;

  const checkMatch = i => {
    if (i.column === col && compare(i.comparsion)(i.value)(value)) {
      if (i.type !== '') propsArr[i.type] = true;
      icon = <Icon name={i.icon} />;
    }
  };

  if (infos) {
    forEach(checkMatch)(infos);
  }

  return (
    <Table.Cell
      className={`td-${col}`}
      key={col}
      {...propsArr}
      style={{
        width: `${width}%`,
      }}
    >
      {icon}
      {enumer && <span className="enumeration">{enumer}</span>}
      <span className="label">{`${label}: `}</span>
      <span className="value">{value + ' ' + unit}</span>
    </Table.Cell>
  );
};

export default UniTableCell;
