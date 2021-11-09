import * as React from "react";
import {
  Appointments,
  WeekView,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import classNames from "clsx";

const useStyles = makeStyles((theme) => ({
  line: {
    height: "2px",
    borderTop: `2px #55B57A solid`,
    width: "100%",
    transform: "translate(0, -1px)",
  },
  circle: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    background: "#55B57A",
  },
  nowIndicator: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: ({ top }: { top?: string | undefined }) => top,
  },
  background: {
    backgroundColor: "#EFEFEF",
  },
  whiteBG: {
    backgroundColor: "white",
  },
  appointmentBackground: {
    backgroundColor: "#FBF1CC",
    border: "none",
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
  },
  appointmentImage: {
    height: 61,
    paddingLeft: 5,
    paddingTop: 5,
  },
  appointmentContent: {
    color: "black",
  },
}));

export const IndicatorComponent: React.FC<
  CurrentTimeIndicator.IndicatorProps & {
    [x: string]: any;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
  }
> = ({ top, ...restProps }) => {
  const classes = useStyles({ top });
  return (
    <div {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </div>
  );
};

export const DayScaleEmptyCellComponent: React.FC<
  WeekView.DayScaleEmptyCellProps & {
    [x: string]: any;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
  }
> = ({ ...restProps }) => {
  const classes = useStyles({});
  const week = moment().week() - 1;
  return (
    <>
      <WeekView.DayScaleEmptyCell className={classes.background} {...restProps}>
        <div className="weekContainer">
          <div className="week">
            <h4> V {week}</h4>
          </div>
        </div>
      </WeekView.DayScaleEmptyCell>
    </>
  );
};

export const AppointmentComponent: React.FC<
  Appointments.AppointmentProps & {
    [x: string]: any;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    children: any;
  }
> = ({ children, ...restProps }) => {
  const classes = useStyles({});
  const startDate = +moment(children[1].props.data.startDate).format("HH");
  const endDate = +moment(children[1].props.data.endDate).format("HH");
  const dateRes = endDate - startDate;

  return (
    <>
      <Appointments.Appointment
        className={classes.appointmentBackground}
        {...restProps}
      >
        <div style={{ display: `${dateRes > 3 ? "block" : "none"}` }}>
          <img
            className={classes.appointmentImage}
            alt="img"
            src="https://picsum.photos/200"
          />
        </div>

        {children}
      </Appointments.Appointment>
    </>
  );
};

export const AppointmentContentComponent: React.FC<
  Appointments.AppointmentContentProps & {
    [x: string]: any;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
  }
> = ({ children, ...restProps }) => {
  const classes = useStyles({});

  return (
    <>
      <Appointments.AppointmentContent
        className={classes.appointmentContent}
        {...restProps}
      >
        {children}
      </Appointments.AppointmentContent>
    </>
  );
};

export const TimeScaleLayoutComponent: React.FC<
  WeekView.TimeScaleLayoutProps & {
    [x: string]: any;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
  }
> = ({ ...restProps }) => {
  const classes = useStyles({});

  return (
    <>
      <WeekView.TimeScaleLayout {...restProps} className={classes.background} />
    </>
  );
};

export const DayScaleCellComponent: React.FC<
  WeekView.DayScaleCellProps & {
    [x: string]: any;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
  }
> = ({ ...props }) => {
  const classes = useStyles({});
  const { startDate } = props;
  const date = new Date(startDate);

  return (
    <>
      {date.getDate() === new Date().getDate() ? (
        <WeekView.DayScaleCell {...props} className={classes.whiteBG} />
      ) : (
        <WeekView.DayScaleCell {...props} className={classes.background} />
      )}
    </>
  );
};

export const TimeTableCellComponent = ({ ...props }) => {
  const classes = useStyles({});
  const { startDate } = props;
  const date = new Date(startDate);

  return (
    <>
      {date.getDate() === new Date().getDate() ? (
        <WeekView.TimeTableCell {...props} className={classes.whiteBG} />
      ) : (
        <WeekView.TimeTableCell {...props} className={classes.background} />
      )}
    </>
  );
};