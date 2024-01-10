import React from "react";
import Select, { ActionMeta, StylesConfig } from "react-select";

type SelectOption = {
  value: string;
  label: string;
};
interface InputSelectType {
  label?: string;
  options: SelectOption[];
  labelClass?: string;
  placeholder?: string;
  defaultValue?: SelectOption;
  value?: SelectOption;
  className?: string;
  onChange?: any
}

const styles: StylesConfig = {
  singleValue: (style) => ({
    ...style,
    fontSize: 16,
    color: "#626F63",
    fontWeight: 400,
  }),
  input: (styles) => ({
    ...styles,

    padding: 0,
    margin: 0,
    fontSize: 14,
    width: "100%",
    ":focus": {
      outline: "none",
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: 16,
    color: "#626F63",
    fontWeight: 400,
  }),
  control: (styles) => ({
    ...styles,
    boxShadow: "none",
    borderColor: "none",
    background: "none",
    border: "none",
    minHeight: 58
  }),
  clearIndicator: (styles) => ({
    ...styles,
    display: "none",
  }),

  option: (styles, state) => {
    return {
      ...styles,
      ":hover": state.isSelected
        ? {}
        : {
            background: "#18BA33",
            color: "white",
            fontWeight: 400,
            cursor: "pointer",
          },
      backgroundColor: state.isSelected ? "#E8FCEC" : "transparent",
      fontSize: 16,
      borderRadius: 4,
      fontWeight: state.isSelected ? 400 : 400,
      color: state.isSelected ? "#17B532" : "black",
    };
  },
  valueContainer: (styles) => ({
    ...styles,
    paddingTop: 5,
    paddingBottom: 5,

    paddingLeft: 16,
  }),
  menu: (styles) => ({
    ...styles,
    paddingTop: 8,
    paddingBottom: 8,

    paddingLeft: 10,
    paddingRight: 10,
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
  container: (styles) => ({
    ...styles,

    ":focus": { outline: "none" },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#667085", // Custom colour
  }),
};

function ReactSelect(props: InputSelectType) {
  return (
    <div>
      <label
        className={
          "text-[16px] label text-[#031B07] leading-[23.36px] font-normal block" +
          " " +
          props.labelClass
        }
        htmlFor={props.label}
      >
        {props.label}
      </label>
      {props.label && <div className="pt-[10px]"></div>}
      <div className={`  rounded-[10px] bg-[#FAFAFA] ${props.className} `}>
        <Select
          styles={styles}
          options={props.options}
          value={props.value}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default ReactSelect;
