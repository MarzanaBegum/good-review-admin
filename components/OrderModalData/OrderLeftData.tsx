import React from "react";
import { buyerTypeOptions } from "../../utils/const";
import SelectDropdown from "../SelectDropdown";
import { useQuery } from "react-query";
import BuyerQuery from "../../api-query/BuyerQuery";

const OrderLeftData = ({
  leftData,
  setBuyerId,
  buyerId,
  buyerData,
  buyerInfo,
}: any) => {
  // const { data, isLoading, refetch } = useQuery(
  //   ["get all buyer"],
  //   BuyerQuery()
  // );
  const options =
    buyerData &&
    buyerData.map((item: any) => ({
      label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      value: item._id,
    }));
  return (
    <div className="flex flex-col gap-[16px]">
      <div>
        <h2 className="text-[#031B07] mb-[10px] font-semibold text-[16px] leading-[19.36px]">
          Buyer Name
        </h2>
        {leftData && (
          <SelectDropdown
            options={options}
            defaultValue={{
              label: leftData.buyer
                ? leftData.buyer?.name.charAt(0).toUpperCase() +
                  leftData.buyer?.name.slice(1)
                : "No buyer added yet",
              value: leftData.buyer ? leftData.buyer.name.toLowerCase() : "",
            }}
            onChange={(e: any) => setBuyerId(e.value)}
            status={leftData.status}
            placeholder="Select buyer type"
          />
        )}
      </div>
      <div>
        <h2 className="text-[#031B07] font-semibold text-[16px] leading-[19.36px]">
          Package Type
        </h2>
        <p className="mt-[10px] text-[#334535] text-[16px] font-normal leading-[22px]">
          {leftData.packageType}
        </p>
      </div>
      <div>
        <h2 className="text-[#031B07] mb-[10px] font-semibold text-[16px] leading-[19.36px]">
          Buyer’s Type
        </h2>
        <input
          type="text"
          name=""
          readOnly
          id=""
          className="border border-[#E5E7EB] px-[20px]  rounded-[6px] h-[48px] focus:outline-none capitalize w-[100%]"
          value={
            buyerInfo && buyerInfo.length > 0
              ? buyerInfo[0].buyerType
              : leftData.buyer ?
                leftData.buyer?.buyerType.charAt(0).toUpperCase() +
                  leftData.buyer?.buyerType.slice(1) :"Add buyer first"
          }
        />
      </div>
    </div>
  );
};

export default OrderLeftData;
