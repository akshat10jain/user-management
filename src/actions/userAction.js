import axios from 'axios';

export const getUserListAct = () => (dispatch) => {
    axios
        .get('https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json', {
            headers : {
                'Access-Control-Allow-Origin' : '*',
            }
        })
        .then((response) => {
            console.log('response',response);
            if (response.status) {
                dispatch({
                    type: 'USER_LIST_SUCCESS',
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: 'USER_LIST_FAILURE',
                    payload: response.error,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: 'USER_LIST_FAILURE',
                payload: error,
            });
        });
};

export const setItemAct = (data) => ({
    type:'SET_ITEM',
    payload: data
})

export const resetDetails = () => ({
    type: 'RESET_DETAILS',
});
