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
} from "./CalendarCustomComponents";
import {
  IAppointment,
  IAddedAppointment,
  weatherArray,
} from "../demo-data/data";
import moment from "moment";
import ClaudIcon from "@material-ui/icons/CloudOutlined";
import nav from "../assets/nav.png";
import act from "../assets/act.png";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./Calendar.css";

interface ICalendar {
  calendarData: IAppointment[];
  themeType?: PaletteType;
}

const Calendar: React.FC<ICalendar> = ({ calendarData, themeType }) => {
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
      <CssBaseline />
      <div className="container">
        <div className="navigationPanel">
          <img className="navImage" alt="navImage" src={nav} />
        </div>
        <div className="body">
          <div className="weather">
            <div
              className="emptyCell"
              style={{
                backgroundColor: `${
                  themeType === "dark" ? "#424242" : "#efefef"
                }`,
              }}
            ></div>
            <table className="weatherTable">
              <tbody>
                <tr className="weatherTableRow">
                  {weatherArray.map((i) =>
                    i.day === today ? (
                      <td
                        className="weatherCell"
                        style={{
                          backgroundColor: `${
                            themeType === "dark" ? "#424242" : "white"
                          }`,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            color: `${
                              themeType === "dark" ? "#C3C3C3" : "black"
                            }`,
                          }}
                        >
                          {i.weather}{" "}
                        </span>
                        <ClaudIcon
                          style={{
                            color: themeType === "dark" ? "#C3C3C3" : "black",
                          }}
                        />
                      </td>
                    ) : (
                      <td
                        style={{
                          backgroundColor: `${
                            themeType === "dark" ? "#424242" : "#efefef"
                          }`,
                        }}
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
              style={{
                backgroundColor: `${
                  themeType === "dark" ? "#424242" : "#efefef"
                }`,
              }}
              className="calendarBottom"
            ></div>
          </div>
          <div className="activities">
            <img className="actImage" alt="actImage" src={act} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
