/**
 * Set User Properties
 * @return {action}
 */
export const authSetUserDetails = (payload) => {
	return {
		type: 'AUTH_SET',
		payload
	}
};

/**
 * Delete User Properties
 * @return {action}
 */
export const authRemoveUserDetails = () => {
	return {
		type: 'AUTH_REMOVE'
	}
};