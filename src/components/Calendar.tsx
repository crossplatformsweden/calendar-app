import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  EditingState,
  IntegratedEditing,
  ChangeSet,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  DragDropProvider,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { PaletteType } from "@material-ui/core";
import {
  IndicatorComponent,
  DayScaleEmptyCellComponent,
  AppointmentComponent,
  AppointmentContentComponent,
  TimeScaleLayoutComponent,
  DayScaleCellComponent,
  TimeTableCellComponent,
  TimeTableCellComponentDark,
  DayScaleCellComponentDark,
  DayScaleEmptyCellComponentDark,
} from "./CalendarCustomComponents";
import { IAppointment, IAddedAppointment, IWeather } from "../demo-data/data";
import moment from "moment";
import ClaudIcon from "@material-ui/icons/CloudOutlined";

import "./Calendar.css";

interface ICalendar {
  calendarData: IAppointment[];
  weatherData: IWeather[];
  themeType?: PaletteType;
}

const Calendar: React.FC<ICalendar> = ({
  calendarData,
  weatherData,
  themeType,
}) => {
  const [data, setData] = React.useState<IAppointment[]>(calendarData);
  const [today, setToday] = React.useState<number>();

  React.useEffect(() => {
    const currentDate = moment();
    let date = currentDate.toDate();
    switch (moment(date).format("dddd")) {
      case "Monday":
        setToday(1);
        break;
      case "Tuesday":
        setToday(2);
        break;
      case "Wednesday":
        setToday(3);
        break;
      case "Thursday":
        setToday(4);
        break;
      case "Friday":
        setToday(5);
        break;
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#55B57A",
      },
      type: themeType,
    },
    overrides: {
      MuiTableCell: {
        root: {
          borderBottom: "dotted 1px #B4B2B2",
        },
      },
    },
  });

  const commitChanges = React.useCallback(
    ({ added, changed, deleted }: ChangeSet) => {
      if (added) {
        const addedAppointment = added as IAddedAppointment;
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...addedAppointment }]);
      }
      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted));
      }
    },
    [data, setData]
  );

  return (
    <>
      <div className="weather">
        <div
          className={`emptyCell ${themeType === "dark" ? "dark" : "light"}`}
        ></div>
        <table className="weatherTable">
          <tbody>
            <tr className="weatherTableRow">
              {weatherData.map((i) =>
                i.day === today ? (
                  <td
                    className={`${
                      themeType === "dark" ? "weatherCell dark" : "weatherCell"
                    }`}
                  >
                    <span
                      className={`weatherContent ${
                        themeType === "dark" ? "dark" : "light"
                      }`}
                    >
                      {i.weather}{" "}
                    </span>
                    <ClaudIcon
                      className={`${
                        themeType === "dark" ? "cloudIconDark" : "cloudIcon"
                      }`}
                    />
                  </td>
                ) : (
                  <td
                    className={`${
                      themeType === "dark" ? "weatherCellDark" : "emptyTD"
                    }`}
                  ></td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="calendar">
        <MuiThemeProvider theme={theme}>
          <Paper>
            <Scheduler data={data} locale="se-SE">
              <EditingState onCommitChanges={commitChanges} />
              <IntegratedEditing />
              {themeType === "dark" ? (
                <WeekView
                  dayScaleCellComponent={DayScaleCellComponentDark}
                  dayScaleEmptyCellComponent={DayScaleEmptyCellComponentDark}
                  timeTableCellComponent={TimeTableCellComponentDark}
                  cellDuration={90}
                  startDayHour={6.5}
                  endDayHour={19}
                  excludedDays={[0, 6]}
                />
              ) : (
                <WeekView
                  timeScaleLayoutComponent={TimeScaleLayoutComponent}
                  dayScaleEmptyCellComponent={DayScaleEmptyCellComponent}
                  dayScaleCellComponent={DayScaleCellComponent}
                  timeTableCellComponent={TimeTableCellComponent}
                  cellDuration={90}
                  startDayHour={6.5}
                  endDayHour={19}
                  excludedDays={[0, 6]}
                />
              )}
              <Appointments
                appointmentComponent={AppointmentComponent}
                appointmentContentComponent={AppointmentContentComponent}
              />
              <AppointmentTooltip showDeleteButton showOpenButton />
              <AppointmentForm />
              <DragDropProvider />
              <CurrentTimeIndicator
                indicatorComponent={IndicatorComponent}
                updateInterval={1000}
              />
            </Scheduler>
          </Paper>
        </MuiThemeProvider>

        <div
          className={`calendarBottom ${
            themeType === "dark" ? "dark" : "light"
          }`}
        ></div>
      </div>
    </>
  );
};

export default Calendar;
