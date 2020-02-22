import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserListAct, setItemAct, resetDetails } from "../../actions/userAction";
import Pagination from "./pagination";

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageOfItems: [],
            users:[],
            sort: {
                column: null,
                direction: 'asc',
            },
            isSorting: false,
            searchName:''
        };
    }

    componentDidMount() {
        const { getUserList, reset } = this.props;
        reset();
        getUserList();
    }

    componentDidUpdate(prevProps) {
        const { userListData } = this.props;
        if (prevProps.userListData.length < userListData.length) {
            this.updateState();
        }
    }

    updateState = () => {
        const { userListData } = this.props;
        this.setState({
            users: userListData
        })
    };

    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    };

    handleChange = (e) => {
        this.setState({
            searchName:e.target.value
        })
    };

    sort = (e, key) => {
        const { sort, users } = this.state;
        const direction = sort.column ? (sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        const sortedUserList = users.sort((a, b) => {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        });
        if (direction === 'asc') {
            sortedUserList.reverse();
        }

        this.setState({
            users: sortedUserList,
            isSorting: true,
            sort: {
                column:key,
                direction,
            }
        });
    };

    isSortingDone = () => {
        this.setState({
            isSorting: false,
        })
    };

    handleRoute = (id, item) => {
        const { setItem, history } = this.props;
        setItem(item)
        history.push(`/users/${id}`);
    }

    render() {
        const { pageOfItems, users, sort, searchName, isSorting } = this.state;
        console.log('users',users);
        let userList=[];
        userList=[...users];
        if (searchName !== '') {
            userList = users.filter((item) => item.first_name.toLowerCase().includes(searchName.toLowerCase()) )
        }
        return(
            <React.Fragment>
                <div className="main">
                <div className="table-filter ">
                    <input
                        className="search"
                        value={searchName}
                        onChange={(e)=>this.handleChange(e)}
                        placeholder="Search Name"
                    />
                </div>
                <div id="tableID">
                    <table className="table-list" data-currentpage="1">
                        <thead>
                        <tr>
                        <th>First Name

                                <span
                                className={sort.column === 'first_name' && sort.direction === 'desc'? "desc" : 'caret'}
                                onClick={(e) =>this.sort(e,'first_name')}
                                >
                                </span>
                        </th>
                        <th>Last Name
                            <span
                                    className={sort.column === 'last_name' && sort.direction === 'desc'? "desc" : 'caret'}
                                    onClick={(e) =>this.sort(e,'last_name')}
                                >
                            </span>
                        </th>
                        <th>Company Name

                                <span
                                    className={sort.column === 'company_name' && sort.direction === 'desc'? "desc" : 'caret'}
                                    onClick={(e) =>this.sort(e,'company_name')}
                                >
                                </span>
                        </th>
                            <th>City
                                    <span
                                        className={sort.column === 'city' && sort.direction === 'desc'? "desc" : 'caret'}
                                        onClick={(e) =>this.sort(e,'city')}
                                    >
                                    </span>
                            </th>
                            <th>State
                                    <span
                                        className={sort.column === 'state' && sort.direction === 'desc'? "desc" : 'caret'}
                                        onClick={(e) =>this.sort(e,'state')}
                                   >
                                    </span>

                            </th>
                            <th>Zip
                                    <span
                                        className={sort.column === 'zip' && sort.direction === 'desc'? "desc" : 'caret'}
                                        onClick={(e) =>this.sort(e,'zip')}
                                    >
                                    </span>
                            </th>
                            <th>Email
                                    <span
                                        className={sort.column === 'email' && sort.direction === 'desc'? "desc" : 'caret'}
                                        onClick={(e) =>this.sort(e,'email')}
                                    >
                                    </span>
                            </th>
                            <th>Web
                                    <span
                                        className={sort.column === 'web' && sort.direction === 'desc'? "desc" : 'caret'}
                                        onClick={(e) =>this.sort(e,'web')}
                                    >
                                    </span>
                            </th>
                            <th>Age
                                    <span
                                        className={sort.column === 'age' && sort.direction === 'desc'? "desc" : 'caret'}
                                        onClick={(e) =>this.sort(e,'age')}
                                    >
                                    </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="list">
                        {pageOfItems.map((item) => {
                            return (
                                <tr
                                    key={Math.random()}
                                    onClick={()=>{this.handleRoute(item.id,item)}}
                                >
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.company_name}</td>
                                    <td>{item.city}</td>
                                    <td>{item.state}</td>
                                    <td>{item.zip}</td>
                                    <td>{item.email}</td>
                                    <td>{item.web}</td>
                                    <td>{item.age}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="9" className="table-footer">
                                <Pagination
                                    items={userList}
                                    isSortingDone={this.isSortingDone}
                                    isSorting={isSorting}
                                    searchName={searchName}
                                    initialPage={1}
                                    onChangePage={this.onChangePage}
                                />
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(
    ({ user }) => ({
        userListData: user.userListData,
    }),
    dispatch => ({
        getUserList: () => dispatch(getUserListAct()),
        setItem: data => dispatch(setItemAct(data)),
        reset:() => dispatch(resetDetails())
    })
)(UserList);