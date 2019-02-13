import { connect } from 'react-redux';
import { contactsSearch } from '../../_actions';
import Search from '../../components/contacts/Search';

const mapStateToProps = state => ({
  value: state.contactsReducer.contactsSearch,
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(contactsSearch(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
