// musicFarm.jsx
import './musicFarm.css'
import data from "../../../../../JSON/music_farm.json";
import { replaceSkippedDates } from '../replaceSkippedNumbers';

const MusicFarm = () => {
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
                    <th>The Music Farm</th>
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

export default MusicFarm;
