// chsPourHouse.jsx
import "./chsPourHouse.css";
import data from "../../../../../JSON/chs_pour_house.json";
import { replaceSkippedDates } from "../replaceSkippedNumbers";

const ChsPourHouse = () => {
    const filterData = replaceSkippedDates(data, 0);
    const mappedData = filterData.map((item) => {
        return {
            name: item.name,
            date: item.date,
        };
    });
    console.log(mappedData)

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
