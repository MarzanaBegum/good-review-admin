import classNames from "classnames";
import React from "react";
import { statusOptions } from "../../utils/const";
import SelectDropdown from "../SelectDropdown";

const stylePTag =
  "mt-[10px] text-[#334535] text-[16px] font-normal leading-[22px]";
const styleH2Tag = "text-[#031B07] font-semibold text-[16px] leading-[19.36px]";

const OrderRightData = ({ rightData, setStatusType, buyerInfo }: any) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div>
        <h2 className={`${styleH2Tag} mb-[10px]`}>Buyer’s Country</h2>
        <input
          type="text"
          name=""
          readOnly
          className="border border-[#E5E7EB] px-[20px]  rounded-[6px] h-[48px] focus:outline-none w-[100%]"
          value={
            buyerInfo && buyerInfo.length > 0
              ? buyerInfo[0].country
              : rightData.buyer
              ? rightData.buyer?.country.charAt(0).toUpperCase() +
                rightData.buyer?.country.slice(1)
              : "Add buyer first"
          }
        />
      </div>
      <div>
        <h2 className={styleH2Tag}>Gig Price</h2>
        <p className={stylePTag}>${rightData.gigPrice}</p>
      </div>
      <div>
        <h2 className={styleH2Tag}>Status</h2>
        {rightData.status !== "completed" ? (
          <SelectDropdown
            options={statusOptions}
            defaultValue={{
              label:
                rightData.status.charAt(0).toUpperCase() +
                rightData.status.slice(1),
              value: rightData.status.toLowerCase(),
            }}
            onChange={(e: any) => {
              setStatusType(e.value);
            }}
            placeholder="Select status"
            className={classNames(stylePTag)}
          />
        ) : (
          <p className="mt-[10px] text-primary text-[16px] font-normal leading-[22px]">
            {rightData.status}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderRightData;
