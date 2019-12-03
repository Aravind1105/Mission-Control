import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderCell } from 'semantic-ui-react';

const UnitableHeaderCell = ({
  activeColumn,
  handleSort,
  mapDataFrom,
  name,
  sortDirection,
  textAlign,
  columnHeader
}) => {
  const nameKey = mapDataFrom || name.toLowerCase();

  return (
    <TableHeaderCell
      sorted={activeColumn === nameKey ? sortDirection : null}
      onClick={handleSort(nameKey)}
      textAlign={textAlign}
    >
      {columnHeader}
    </TableHeaderCell>
  );
};

UnitableHeaderCell.propTypes = {
  activeColumn: PropTypes.string,
  handleSort: PropTypes.func,
  mapDataFrom: PropTypes.string,
  name: PropTypes.string.isRequired,
  columnHeader: PropTypes.string,
  sortDirection: PropTypes.oneOf(['ascending', 'descending', '']),
  textAlign: PropTypes.oneOf(['left', 'right', 'center']),
};

UnitableHeaderCell.defaultProps = {
  activeColumn: '',
  mapDataFrom: null,
  handleSort: () => {},
  textAlign: 'left',
};

export default UnitableHeaderCell;
