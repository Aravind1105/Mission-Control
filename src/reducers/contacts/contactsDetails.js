const ContactDetails = (state = 0, action) => {
   switch (action.type) {
      case "CONTACT_DETAILS":
         return action.id;      
      default:
         return state;
   }
};

export default ContactDetails;
