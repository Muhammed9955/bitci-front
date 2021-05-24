import React from "react";
import theme from "../../../theme";
import NumberInput from "components/atoms/NumberInput";

const InputCard = (title, value, format, onChange, secondCurrency) => {
  return (
    <div className="dashboard-input">
      <div
        className="row align-items-center "
        style={{
          borderRadius: "2px",
          border: "1px solid lightGrey",
          margin: "10px 2px",
          padding: "0px 5px",
          height: "1.5rem",
          // background: "red",
        }}
      >
        <div style={{ color: theme.colors.mainDarkGray }} className="mr-3">
          {/* {title} */}
          fiyat
        </div>

        <NumberInput
          // className={inputClass}
          value={value}
          format={format}
          // onChange={onChange}
          onChange={onChange}
          // placeholder="Fiyat"
        />
        <span
          // className="item-area"
          style={{ color: theme.colors.mainDarkGray }}
        >
          <small>{secondCurrency}</small>
        </span>
      </div>
    </div>
  );
};

export default InputCard;
