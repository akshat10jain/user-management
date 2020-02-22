import React from 'react';

class Pagination extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pager:{}
        }
    };

    componentDidUpdate(prevProps) {
        const { items, searchName, isSorting, initialPage } = this.props;
        if (items.length > prevProps.items.length && searchName === '') {
                this.setPage(initialPage);
        }
        if (searchName !== prevProps.searchName) {
            this.setPage(initialPage);
        }
        if (isSorting === true && prevProps.isSorting === false) {
            this.setPage(initialPage);
        }
    }

    setPage(page) {
        const { items, onChangePage, isSortingDone } = this.props;
        let { pager } = this.state;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        // get new pager object for specified page
        pager = this.getPager(items.length, page);
        // get new page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        // update state
        this.setState({ pager: pager });
        // call change page function in parent component
        onChangePage(pageOfItems);
        isSortingDone();
    }

    getPager(totalItems, currentPage) {
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 10
        const pageSize = 10;
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);
        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // create an array of pages
        const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        const { pager } = this.state;
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        return (
            <ul className="pagination">
                <ul className="pagination">
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                    </li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <a onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>
                </ul>
            </ul>
        )
    }

}

export default Pagination;