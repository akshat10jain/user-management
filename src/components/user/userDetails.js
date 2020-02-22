import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';

class UserDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }

    handleBack = () => {
        const { history } = this.props;
        history.push('/');
    }

    render() {
        const { selectedUserDetails } = this.props;
        return(
            <React.Fragment>
                <div>
                    <button
                        className="btn"
                        onClick={this.handleBack}
                    >back
                    </button>
                {selectedUserDetails && !_.isEmpty(selectedUserDetails) ?
                    <div className="userDetails">
                        <h1>{`${selectedUserDetails.first_name} ${selectedUserDetails.last_name}`}</h1>
                        <p>Company Name: {selectedUserDetails.company_name}</p>
                        <p>City: {selectedUserDetails.city}</p>
                        <p>State: {selectedUserDetails.state}</p>
                        <p>Zip: {selectedUserDetails.zip}</p>
                        <p>Email: {selectedUserDetails.email}</p>
                        <p>Web: {selectedUserDetails.web}</p>
                        <p>Age: {selectedUserDetails.age}</p>
                    </div>
                :
                    <h1>No user Selected</h1>
                }
                </div>
            </React.Fragment>
        )
    }
}

export default connect(
    ({ user }) => ({
        selectedUserDetails: user.selectedUserDetails,
    }),
    null
)(UserDetails);