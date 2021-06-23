import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { getUsers, setActiveUser } from '../../actions';
import {
  getUsersListState,
  getActiveUserState,
  getTotalUsers,
  getUsersListForTable,
} from '../../selectors';

import orderBy from 'lodash/orderBy';
import UsersDetail from '../UsersDetail';
import './styles.less';

const sortTypes = {
  ASC: 'ascending',
  DESC: 'descending',
};

const MobileUser = ({
  columns,
  data,
  fixed,
  headless,
  selectable,
  sortable,
  sortByColumn,
  sortDirection,
  onRowClick,
  rowLimit,
  getData,
  isLoading,
  excludeSortBy,
  setSortByInCaller,
  alignCenter,
  getUsers,
  setActiveUser,
  userList,
  list,
  activeUser,
  total,
  selectedId,
  ...rest
}) => {
  const [tableData, setTableData] = useState([]);
  const [direction, setDirection] = useState(
    sortTypes[sortDirection.toUpperCase()],
  );
  const [sortBy, setSortBy] = useState(sortByColumn);
  const [activeRow, setActiveRow] = useState(-1);
  const [open, setOpen] = React.useState(false);
  // const classes = useStyles();
  useEffect(() => {
    let res = data;
    if (sortBy) {
      res = getData
        ? data
        : orderBy(data, [sortBy], sortDirection.toLowerCase() || ['asc']);
      setTableData(res);
    }
    setTableData(res);
  }, [data]);

  useEffect(() => {
    if (setSortByInCaller) {
      setSortByInCaller({
        column: sortBy,
        direction: direction === sortTypes.ASC ? 'ASC' : 'DESC',
      });
    }
  }, [sortBy, direction]);

  useEffect(() => {
    setActiveUser(selectedId);
  }, [list]);

  const handlerHCellClick = key => () => {
    if (excludeSortBy.includes(key)) return;
    const method =
      sortBy === key && direction === sortTypes.ASC ? 'desc' : 'asc';

    if (getData) {
      const sort = [
        {
          column: key,
          direction: method.toUpperCase(),
        },
      ];
      getData({ sort });
    } else {
      const res = orderBy(data, [key], [method]);
      setTableData(res);
    }
    setDirection(sortTypes[method.toUpperCase()]);
    setSortBy(key);
  };

  const handlerRowClick = (item, i) => () => {
    setActiveUser(item._id);
  };

  const Row = ({ row, isEvenIdx }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow
          className="mobile-table-row"
          key={row}
          onClick={handlerRowClick(row)}
        >
          <TableCell
            className={
              isEvenIdx
                ? 'mobile-table-row-test even'
                : 'mobile-table-row-test odd'
            }
            style={{ padding: '6px 24px 6px 12px' }}
            key={row}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {row.name}
          </TableCell>
        </TableRow>
        <TableRow key={row.name}>
          <TableCell
            style={{
              paddingLeft: 0,
              paddingBottom: 0,
              paddingTop: 0,
              paddingRight: 0,
            }}
            colSpan={1}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <UsersDetail />
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  const resultData = rowLimit ? tableData.slice(0, rowLimit) : tableData;
  return (
    <TableContainer component={Paper}>
      <Table
        className="mobile-table"
        size="small"
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              className="mobile-table-head"
              align="left"
              component="th"
              size="small"
              scope="row"
            >
              <b>Name</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultData.map((row, i) => (
            <Row key={i} row={row} isEvenIdx={i % 2 === 0} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

MobileUser.prototypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string,
      formatter: PropTypes.func,
    }),
  ),
  data: PropTypes.array.isRequired,
  fixed: PropTypes.bool,
  rowLimit: PropTypes.number,
  headless: PropTypes.bool,
  selectable: PropTypes.bool,
  sortable: PropTypes.bool,
  sortByColumn: PropTypes.string,
  sortDirection: PropTypes.oneOf([sortTypes.ASC, sortTypes.DESC]),
  onRowClick: PropTypes.func,
  getData: PropTypes.func,
  isLoading: PropTypes.bool,
  excludeSortBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

MobileUser.defaultProps = {
  columns: [],
  list: [],
  headless: false,
  selectable: false,
  sortable: false,
  sortByColumn: '',
  sortDirection: 'ASC',
  excludeSortBy: [],
};
export const UserShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

MobileUser.propTypes = {
  getUsers: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(UserShape).isRequired,
};

const mapStateToProps = state => ({
  userList: getUsersListForTable(state),
  list: getUsersListState(state),
  selectedId: state.users.activeUserId,
  activeUser: getActiveUserState(state),
  isLoading: state.users.isLoading,
  total: getTotalUsers(state),
});

const mapDispatchToProps = {
  getUsers,
  setActiveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileUser);
