const initialState = {
    userListData: [],
    selectedUserDetails:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LIST_SUCCESS':
            return {
                ...state,
                userListData:action.payload
            }
        case 'USER_LIST_FAILURE':
            return {
                ...state,
                userListData:[]
            }
        case 'SET_ITEM':
            return {
                ...state,
                selectedUserDetails: action.payload
            }
        case 'RESET_DETAILS':
            return {
                ...state,
                userListData:[],
            }
        default:
            return state;
    }
};