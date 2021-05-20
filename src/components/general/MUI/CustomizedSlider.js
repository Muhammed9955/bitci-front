import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import theme from "../../../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 37,
  },
  {
    value: 100,
  },
];

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    // height: 4,
  },
  thumb: {
    height: 0,
    width: 0,
    backgroundColor: "#fff",
    // border: "2px solid currentColor",
    // marginTop: -8,
    // marginLeft: -12,
    // marginTop: 8,
    marginLeft: -20,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider() {
  const classes = useStyles();
  const gray = theme.colors.gray;

  return (
    <div className={classes.root} style={{ fontSize: ".7rem" }}>
      {/* <Typography gutterBottom>pretto.fr</Typography> */}

      <div
        className="d-flex flex-row align-items-center justify-content-between"
        style={{ marginBottom: "-.8rem" }}
      >
        <div className="">$ 48.226,36</div>
        <div className="">$ 66.129,23</div>
      </div>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
      />
      <div
        className="d-flex flex-row align-items-center justify-content-between "
        style={{ marginTop: "-.8rem", color: gray }}
      >
        <div className="">En Düşük</div>
        <div className="">En Yüksek</div>
      </div>
    </div>
  );
}
