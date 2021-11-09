import Calendar from "./components/Calendar";
import appointments from "./demo-data/today-data";

const App: React.FC = () => {
  return <Calendar calendarData={appointments} themeType="light" />;
};

export default App;
