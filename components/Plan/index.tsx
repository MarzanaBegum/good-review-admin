import React from "react";
import PlanItem from "./PlanItem";
import { useRouter } from "next/router";

const Plan = () => {
  const router = useRouter();
  return (
    <div className="py-[40px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] leading-[30px] font-medium lg:text-[24px] lg:leading-[40px] 3xl:text-[32px] 3xl:leading-[42px] lg:font-semibold text-[#1F2937]">
          Active Plans
        </h2>
        <button
          onClick={() =>
            router.push("/dashboard/plan/custom-plan?createPlan=true")
          }
          className="px-[15px] py-[10px] rounded-[10px] bg-[#18BA33] hover:bg-[#14a02b] transition-all duration-300 text-white text-[16px] font-normal"
        >
          Create plan
        </button>
      </div>

      <PlanItem />
    </div>
  );
};

export default Plan;
