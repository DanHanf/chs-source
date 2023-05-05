//App.jsx
//import Calendar from './Components/Calendar/Calendar';
//import Table from './Components/Table/Table';
import './App.css'
import ChsPourHouse from './Components/venueReact/chsPourHouse/chsPourHouse';
import MusicFarm from './Components/venueReact/musicFarm/musicFarm';


const App = () => {

  return (
            <body>
                <header>
                    <h1>
                        Welcome to CHS Source!
                    </h1>
                    <h2>Your place for independent venue schedules</h2>
                </header>
                <main>
                    <div className='chs-pour-house'>
                        <ChsPourHouse />
                    </div>
                    <div className='music-farm'>
                        <MusicFarm />
                    </div>
                </main>
            </body>
  );
};

export default App;
