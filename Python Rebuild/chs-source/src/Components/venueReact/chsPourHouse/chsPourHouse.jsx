// chsPourHouse.jsx
import "./chsPourHouse.css";
import data from "../../../../../JSON/chs_pour_house.json";
//import PropTypes from "prop-types";

const ChsPourHouse = () => {
    const mappedData = data.map((item) => {
        return {
            name: item[0],
            date: item[1],
        };
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>CHS Pour House</th>
                </tr>
            </thead>
            <tbody>
                {mappedData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ChsPourHouse;
