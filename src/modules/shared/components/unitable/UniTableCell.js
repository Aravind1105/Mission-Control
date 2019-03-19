import React, { useState } from 'react';
import { Table, Icon, Progress, List } from 'semantic-ui-react';
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
  const [expanded, setExpanded] = useState(true);
  const propsArr = { warning: false, error: false, textAlign: align };
  let icon = null;

  const checkMatch = i => {
    if (i.column === col && compare(i.comparsion)(i.value)(value)) {
      if (i.type !== '') propsArr[i.type] = true;
      icon = i.icon && <Icon name={i.icon} />;
    }
  };

  if (infos) {
    forEach(checkMatch)(infos);
  }

  const getLabelColor = value => {
    switch (true) {
      case value < 25:
        return 'red';
      case value < 50:
        return 'orange';
      case value < 75:
        return 'yellow';
      case value < 100:
        return 'green';
      case value === 100:
        return 'olive';
      default:
        return 'blue';
    }
  };

  const isProgressUnit = unit => {
    return unit.indexOf('progress--') > -1;
  };
  const isLabelUnit = unit => {
    return unit.indexOf('label--') > -1;
  };

  const isExtended = value => {
    return typeof value === 'object';
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const createList = listValues => {
    listValues = listValues[Object.keys(listValues)];
    return (
      <List style={{ marginTop: '3px' }} size="tiny" color={'pink'}>
        {listValues.map(value => (
          <List.Item key={value.text}>
            <List.Icon
              name="circle"
              size="tiny"
              verticalAlign="middle"
              style={{ marginRight: '7px' }}
              color={'teal'}
            />
            {value.text}
          </List.Item>
        ))}
      </List>
    );
  };

  const createCellContent = (unit, value) => {
    return isExtended(value) ? (
      <>
        <span className="value">
          {Object.keys(value)[0]}
          {expanded ? <Icon name="angle down" /> : <Icon name="angle right" />}
        </span>
        {expanded && createList(value)}
      </>
    ) : (
      <>
        {icon}
        <span className="value">
          {`${
            (unit === '€' || unit === '$') && typeof value === 'number'
              ? value.toFixed(2)
              : value
          } ${unit}`}
        </span>
      </>
    );
  };

  return (
    <Table.Cell
      className={`td-${col}`}
      {...propsArr}
      style={{
        width: `${width}%`,
      }}
      onClick={() => toggleExpand()}
    >
      {createCellContent(unit, value)}
    </Table.Cell>
  );
};

export default UniTableCell;
