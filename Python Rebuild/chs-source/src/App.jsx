//import Calendar from './Components/Calendar/Calendar';
import Table from './Components/Table/Table';

const App = () => {
  const data = [
    { day: 'Sunday', event: 'Acoustic Jam', venue: 'The Blue Note' },
    { day: 'Sunday', event: 'Open Mic Night', venue: 'The Roxy' },
    { day: 'Monday', event: 'Karaoke Night', venue: 'The Karaoke Lounge' },
    { day: 'Tuesday', event: 'Trivia Night', venue: 'The Pub' },
    { day: 'Wednesday', event: 'Live Music', venue: 'The Loft' },
    { day: 'Thursday', event: 'Comedy Night', venue: 'The Chuckle Hut' },
    { day: 'Friday', event: 'DJ Night', venue: 'The Club' },
    { day: 'Saturday', event: 'Live Band', venue: 'The Arena' },
  ];

  const filteredData = {};

  data.forEach((item) => {
    if (filteredData[item.day]) {
      filteredData[item.day].push(item);
    } else {
      filteredData[item.day] = [item];
    }
  });

  return (
    <div>
      <h1>Events Calendar</h1>
      {Object.entries(filteredData).map(([day, events]) => (
        <div key={day}>
          <h2>{`${day}'s Events:`}</h2>
          <Table data={events} />
        </div>
      ))}
    </div>
  );
};

export default App;
