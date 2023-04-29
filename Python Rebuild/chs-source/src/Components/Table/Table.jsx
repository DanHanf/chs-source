import "./Table.css";
import PropTypes from "prop-types";

const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Event</th>
                    <th>Venue</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({ day, event, venue }, index) => (
                    <tr key={index}>
                        {index % 3 === 0 && <td>{day}</td>}
                        <td>{event}</td>
                        <td>{venue}</td>
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

