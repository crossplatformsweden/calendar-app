import Calendar from "./components/Calendar";
import appointments from "./demo-data/today-data";
import { weatherArray } from ".//demo-data/data";
import nav from "./assets/nav.png";
import act from "./assets/act.png";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="navigationPanel">
          <img className="navImage" alt="navImage" src={nav} />
        </div>
        <div className="body">
          <Calendar
            calendarData={appointments}
            weatherData={weatherArray}
            themeType="dark"
          />
          <div className="activities">
            <img className="actImage" alt="actImage" src={act} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
