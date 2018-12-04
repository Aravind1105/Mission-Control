import { connect } from "react-redux";
import { setEditContactFlag,updateContact } from "../../actions/contacts/";
import contactsDetails from "../../components/contacts/contactsDetails";

const mapStateToProps = (state, ownProps) => ({
   selectedContacts: state.contactsReducer.contacts[state.contactsReducer.contactsDetails],
   editContactFlag: state.contactsReducer.editContact
});

const mapDispatchToProps = dispatch => ({
   onEditClick: () => dispatch(setEditContactFlag()),
   onChange:(id, field, value) => dispatch(updateContact(id , field, value))
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(contactsDetails);
