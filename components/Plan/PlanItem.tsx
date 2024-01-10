import React, { useState } from "react";
import { serviceTab } from "../../utils/const";
import { useRouter } from "next/router";
import classNames from "classnames";
import pricingQuery from "../../api-query/usePricingQuery";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";

const PlanItem = () => {
  const router = useRouter();
  const [serviceState, setServiceState] = useState("fiverr");

  const { data, isLoading } = pricingQuery(serviceState);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <LoadingAnimation
          color="#14a02b"
          className="w-[60px] h-[60px]"
        ></LoadingAnimation>
      </div>
    );
  }
  return (
    <>
      {
        <div>
          <div className="w-[339px] h-[66px] mx-auto bg-[white] rounded-[6px] mt-[20px] mb-[20px] text-primary font-bold text-[17px] leading-[22px]  flex  sm:mt-[30px] sm:mb-[30px] md:mt-[40px] md:mb-[40px] 2xl:mb-[80px]">
            {serviceTab.map((item, index) => (
              <div
                key={index}
                onClick={() => setServiceState(item.title.toLowerCase())}
                className={classNames(
                  "w-1/2 h-full flex cursor-pointer hover:bg-[rgb(24,186,51,.1)] items-center justify-center border-b-[4px] rounded-b-[4px]",
                  serviceState === item.title.toLowerCase()
                    ? "border-[#18BA33]"
                    : "border-transparent"
                )}
              >
                {item.title}
              </div>
            ))}
          </div>
          {/* pricing card  */}
          {data && data.length > 0 ? (
            <div className="flex flex-col flex-wrap lg:flex-row gap-[20px] lg:gap-[30px] lg:justify-center px-[16px] xs:px-0">
              {data &&
                data.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="4xl:w-[460px] 3xl:w-[393.33px] 2xl:w-[380px] xl:w-[326.67px] lg:w-[268px] sm:w-[350px] xs:w-[343px] w-[100%] h-auto bg-[#F5F6F8] rounded-[10px] mx-auto lg:mx-0"
                  >
                    <div className="px-[20px] py-[20px]">
                      <div className="flex  items-center gap-[16px]">
                        {item.icon ? (
                          <img
                            src={item.icon}
                            alt=""
                            className="w-[47px] h-[47px] rounded-full"
                          />
                        ) : (
                          <img
                            src="/icons/package-icon.svg"
                            alt=""
                            className="w-[47px] h-[47px] rounded-full"
                          />
                        )}

                        <h3 className="text-[#031B07] first-letter:uppercase font-semibold text-[24px] leading-[30px]">
                          {item.packageType}
                        </h3>
                      </div>
                      <p className="mt-[16px] text-[#626F63] font-normal ">
                        <span className="text-primary font-semibold text-[32px] leading-[40px] mr-2">
                          ${item.price}
                        </span>{" "}
                        / per review
                      </p>
                      <p className="text-[#626F63] font-normal text-[16px] leading-[23.36px] mt-[8px]">
                        Looking for a specific type of client to work with? We
                        will find the perfect client that meets your exact
                        needs. We guarantee you will recieve a 5-star review or
                        we give your money back!
                      </p>
                      <div className="flex flex-col mt-[30px]">
                        {item.features.map(
                          (featureItem: any, index: number) => (
                            <div
                              key={index}
                              className="flex gap-[16px] mb-[20px]"
                            >
                              <img
                                src="/icons/cicle-icon.svg"
                                alt=""
                                className="w-[24px] h-[24px]"
                              />
                              <p className="text-[#031B07] text-[16px] font-normal leading-[23.36px]">
                                {featureItem.text}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                      <button
                        onClick={() =>
                          router.push(
                            `/dashboard/plan/custom-plan?editPlan=${item._id}`
                          )
                        }
                        className="mt-[20px] w-[100%] py-[11.5px]  rounded-[10px] border border-primary hover:bg-[#14a02b] transition-all duration-700 hover:text-white text-primary"
                      >
                        Edit plan
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-[#626F63]">
              No plan available under this service !
            </p>
          )}
        </div>
      }
    </>
  );
};

export default PlanItem;
