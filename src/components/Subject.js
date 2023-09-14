import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "justifty-end",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  chipColor: {
    backgroundColor: "#333996",
    color: "white",
  },
}));

const chipData = [
  { avatar: "F", label: "Food" },
  { avatar: "S", label: "Sports" },
  { avatar: "M", label: "Movies" },
  { avatar: "W", label: "Work" },
  { avatar: "T", label: "Travel" },
  { avatar: "O", label: "Other" },
];

export default function Chips({ onClickSubject, values }) {
  const classes = useStyles();

  const handleClick = (subject) => {
    onClickSubject(subject);
  };

  return (
    <div className={classes.root}>
      {chipData.map((item, index) => (
        <Chip
          key={index}
          avatar={<Avatar>{item.avatar}</Avatar>}
          label={item.label}
          clickable
          style={
            values.taskSubject === item.label
              ? { backgroundColor: "#333996", color: "white" }
              : {}
          }
          onClick={() => {
            handleClick(item.label);
          }}
        />
      ))}
    </div>
  );
}
