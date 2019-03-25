import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Progress, List } from 'semantic-ui-react';
import { forEach } from 'ramda';
import { compare } from './lib/comparsions';

const UniTableCellWrapper = ({
  col,
  children,
  width,
  toggleExpand,
  cellProps,
}) => (
  <Table.Cell
    className={`td-${col}`}
    {...cellProps}
    style={{
      width: `${width}%`,
    }}
    onClick={() => toggleExpand()}
  >
    {children()}
  </Table.Cell>
);

const UniTableCell = ({
  cellStyle,
  col,
  label,
  value,
  infos,
  unit,
  align,
  enumer,
  width,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(true);
  const cellProps = { warning: false, error: false, textAlign: align };
  let icon = null;

  const checkMatch = i => {
    if (i.column === col && compare(i.comparsion)(i.value)(value)) {
      if (i.type !== '') cellProps[i.type] = true;
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
        {listValues &&
          listValues.map(value => (
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
      <></>
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
    <UniTableCellWrapper toggleExpand={toggleExpand} cellProps={cellProps}>
      {() => {
        switch (cellStyle) {
          case 'list':
            console.log(value);
            return (
              <>
                <span className="value">
                  {typeof value === 'object' ? Object.keys(value)[0] : value}
                  {expanded ? (
                    <Icon name="angle down" />
                  ) : (
                    <Icon name="angle right" />
                  )}
                </span>
                {expanded && createList(value)}
              </>
            );
          default:
            return (
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
        }
      }}
    </UniTableCellWrapper>
  );
};

UniTableCell.propTypes = {
  cellStyle: PropTypes.oneOf(['default', 'progress', 'list']),
  col: PropTypes.string.isRequired,
  lable: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object.isRequired,
  ]),
  infos: PropTypes.array.isRequired,
  unit: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  enumer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  name: PropTypes.string.isRequired,
};

UniTableCell.defaultProps = {
  cellStyle: 'default',
};

export default UniTableCell;
