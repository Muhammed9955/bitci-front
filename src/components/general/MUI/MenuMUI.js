import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const defualtBtnStyle = {
  fontSize: ".7rem",
  textTransform: "capitalize",
  background: "none",
  display: "flex",
};
export default function MenuMUI({ options, btnStyle, onClose, SelectedDate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    setAnchorEl(null);
    onClose && onClose(item);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={
          btnStyle
            ? {
                ...btnStyle,
                ...defualtBtnStyle,
              }
            : defualtBtnStyle
        }
      >
        {SelectedDate ? SelectedDate : options[0]}
        {
          <ExpandMoreIcon
            style={{ fontSize: ".8rem", opacity: ".6", padding: "2px 0 0 2px" }}
          />
        }
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((i, n) => (
          <MenuItem key={n} onClick={() => handleClose(i)}>
            {i}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
