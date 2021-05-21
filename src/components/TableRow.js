import PropTypes from 'prop-types';

function TableRow ({ item }) {

  return (
    <tr>
      <th scope="row">{item.id}</th>
      <td>{item.title}</td>
      <td><img src={item.thumbnailUrl} alt="Thumbnail" /></td>
    </tr>
  )
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired
}

export default TableRow
