import PropTypes from 'prop-types';

function TablePagination ({ pages, onChangePage, activePage }) {
  
  function handleClick (i) {
    return () => { onChangePage(i) }
  }

  function renderButtons (pagesCount) {
    let content = [];
      for (var i = 1; i <= pagesCount; i++) {
      content.push(
        <button
          key={i}
          type="button"
          className={'btn mx-2 ' + (activePage === i ? 'btn-success' : 'btn-warning')}
          onClick={handleClick(i)}
        >{i}</button>
      );
    }
    return content;
  }

  return ( <div className="d-flex"> { renderButtons(pages) } </div> )
}

TablePagination.propTypes = {
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
}

export default TablePagination