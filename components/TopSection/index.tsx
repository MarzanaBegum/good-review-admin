import React from "react";
import { ActionMeta } from "react-select";
import { dateFilterOptions } from "../../utils/const";
import SelectDropdown from "../SelectDropdown";

type SelectOption = {
  value: string;
  label: string;
};

type DataType = {
  title: string;
  statusFilterOptions?: SelectOption[];
  statusDefaultValue?: SelectOption;
  statusOnChange?: (value: unknown, actionMeta: ActionMeta<unknown>) => void;
  dateOnChange?: (value: unknown, actionMeta: ActionMeta<unknown>) => void;
};

const TopSection = ({
  title,
  statusFilterOptions,
  statusDefaultValue,
  statusOnChange,
  dateOnChange
}: DataType) => {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap gap-[16px] items-center justify-between pt-[40px] w-[100%]">
      <div className="">
        <h2 className="text-[22px] leading-[30px] font-medium lg:text-[28px] lg:leading-[40px] 3xl:text-[32px] 3xl:leading-[42px] lg:font-semibold text-[#1F2937]">
          {title}
        </h2>
      </div>
      <div className="flex flex-wrap justify-end gap-4">
        <SelectDropdown
          options={statusFilterOptions}
          defaultValue={statusDefaultValue}
          onChange={statusOnChange}
          placeholder="All orders"
        />
        <SelectDropdown
          options={dateFilterOptions}
          defaultValue={dateFilterOptions[0]}
          onChange={dateOnChange}
          placeholder="This month"
        />
      </div>
    </div>
  );
};

export default TopSection;
