import "./Table.css"
import PropTypes from 'prop-types';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>CHS PourHouse</th>
          <th>Gaillard</th>
          <th>Music Farm</th>
          <th>Music Hall</th>
          <th>Royal American</th>
          <th>Theater 99</th>
          <th>The WindJammer</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ day, event}, index) => (
          <tr key={index}>
            <td>{day}</td>
            <td>{event}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      event: PropTypes.string.isRequired,
      venue: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Table;

