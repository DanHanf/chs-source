// chsPourHouse.jsx
import data from "../../../../JSON/chs_pour_house.json";
import PropTypes from "prop-types";

const ChsPourHouse = () => {
    const mappedData = [];

    data.forEach((item) => {
        const mappedItem = {
            name: item[0],
            date: item[1],
        };
        mappedData.push(mappedItem);
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>CHS Pour House</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(mappedData).map((key) => (
                    <tr key={key}>
                        <td>{mappedData[key].name}</td>
                        <td>{mappedData[key].date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

ChsPourHouse.propTypes = {
    mappedData: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ChsPourHouse;
