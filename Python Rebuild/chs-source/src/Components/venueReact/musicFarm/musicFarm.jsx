// musicFarm.jsx
import './musicFarm.css'
import data from "../../../../../JSON/music_farm.json";

const MusicFarm = () => {
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
                    <th>The Music Farm</th>
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

export default MusicFarm;
