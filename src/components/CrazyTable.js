import api from '../utils/api'
import React from 'react';
import TableRow from './TableRow'
import TablePagination from './TablePagination'
import TableSearchField from './TableSearchField'

class CrazyTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      perPage: 50,
      currentPage: 1,
      initialNumberSortDirection: null,
      initialTitleSortDirection: null,
      searchKeyword: ''
    };
  }

  async componentDidMount() {
    const photos = await api.getPhotos();
    this.setState({ photos });
  }

  getPhotoFilteredByKeywords() {
    if (!this.state.photos?.length) { return [] }

    return this.state.photos
        .filter(item => item.title.includes(this.state.searchKeyword) ||
                        item.id === Number(this.state.searchKeyword)
        )
  }

  getPhotosToShow () {
    if (!this.state.photos?.length) { return [] }

    //filter by search field
    const filteredPhotos = this.state.searchKeyword ? this.getPhotoFilteredByKeywords() : this.state.photos;

    return filteredPhotos.slice(
      (this.state.currentPage - 1) * this.state.perPage,
      (this.state.currentPage) * this.state.perPage
    );
  }

  getPagesCount () {
    const photos = this.getPhotoFilteredByKeywords()
    if (!photos?.length) { return 0 }
    const pagesCount = Math.ceil(photos.length / this.state.perPage)
    return pagesCount > 0 ? pagesCount : 0;
  }

  changePage = (pageN) => {
    this.setState({
      currentPage: pageN
    });
  }

  sortBy (field, revers = true) {
    const sortDirection = revers ? 1 : -1;
    function compare( a, b ) {
      if ( a[field] < b[field] ){
        return 1 * sortDirection;
      }
      if ( a[field] > b[field] ){
        return -1 * sortDirection;
      }
      return 0;
    }
    
    this.setState({
      photos: this.state.photos.sort( compare )
    });
  }

  onTableNumberClickHandler = () => {
    let direction = this.state.initialNumberSortDirection;
    if (typeof direction !== 'boolean') {
      direction = true;
    }
    this.sortBy('id', direction)
    this.setState({
      initialNumberSortDirection: !direction,
      initialTitleSortDirection: null
    });
  }

  onTableTitleClickHandler = () => {
    let direction = this.state.initialTitleSortDirection;
    if (typeof direction !== 'boolean') {
      direction = false;
    }
    this.sortBy('title', direction)
    this.setState({
      initialNumberSortDirection: null,
      initialTitleSortDirection: !direction
    });
  }

  onTableSearch = (text) => {
    this.setState({
      searchKeyword: text.trim(),
      currentPage: 1
    })
  }

  renderTable () {
    const photosToShow = this.getPhotosToShow();
    if (!photosToShow?.length) return (<p>There are no photos yet...</p>)
    return (
      <div>
        <TablePagination
          pages={this.getPagesCount()}
          activePage={this.state.currentPage}
          onChangePage={this.changePage}
        />
        <div className="table-container">
          <table className="table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="cursor-pointer"
                    onClick={this.onTableNumberClickHandler}
                    width="50"
                  >
                    <span># {
                      typeof this.state.initialNumberSortDirection === 'boolean' ?
                        (this.state.initialNumberSortDirection ? '(v)' : '(^)') : ''
                      }
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer"
                    onClick={this.onTableTitleClickHandler}
                  >
                    <span>Title {
                      typeof this.state.initialTitleSortDirection === 'boolean' ?
                        (this.state.initialTitleSortDirection ? '(v)' : '(^)') : ''
                      }</span>
                  </th>
                  <th scope="col">Preview</th>
                </tr>
              </thead>
              <tbody>
                { photosToShow.map(item => <TableRow key={item.id} item={item} /> ) }
              </tbody>
          </table>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <TableSearchField onChange={this.onTableSearch} />
        {this.renderTable()}
      </div>
    )
  }
}
export default CrazyTable
