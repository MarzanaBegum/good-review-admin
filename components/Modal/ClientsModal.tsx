/* eslint-disable @next/next/no-img-element */
import { Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import InputField from "../InputField";
import CustomModal from "./CustomModal";
import * as Yup from "yup";
import CrossIcon from "../CustomIcons/CrossIcon";
import SelectField from "../SelectField";
import { api } from "../../api";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import { toast } from "react-toastify";
import { countries } from "../../utils/country";

type ClientModalType = {
  isOpen: boolean;
  handleModal: () => void;
  actionType: "create" | "update";
  refetch?: any;
  data?: any;
};

function ClientsModal({
  isOpen,
  handleModal,
  actionType,
  refetch,
  data,
}: ClientModalType) {
  const [isLoading, setIsLoading] = useState(false);
  const userData = data && data[0];

  const handleSubmit = (value: any) => {
    setIsLoading(true);
    const buyerData = {
      name: value.buyer_name,
      buyerType: value.buyer_type,
      country: value.country,
      address: value.address,
    };
    if (actionType === "create") {
      try {
        api.post("/buyer", buyerData).then((res: any) => {
          if (res.status === 200) {
            setIsLoading(false);
            handleModal();
            refetch();
          }
        });
      } catch (err) {
        toast.error("Something went wrong !");
        handleModal();
      }
    }
    if (actionType === "update") {
      try {
        api.put(`/buyer/${userData._id}`, buyerData).then((res: any) => {
          if (res.status === 200) {
            setIsLoading(false);
            handleModal();
            refetch();
          }
        });
      } catch (err) {
        toast.error("Something went wrong !");
        handleModal();
      }
    }
  };
  const initialValues = {
    buyer_name: userData !== undefined ? userData.name : "",
    buyer_type: userData !== undefined ? userData.buyerType : "",
    country: userData !== undefined ? userData.country : "",
    address: userData !== undefined ? userData.address : "",
  };
  const validationSchema = Yup.object().shape({
    buyer_name: Yup.string().required().label("Buyer Name"),
    buyer_type: Yup.string().required().label("Buyer Type"),
    country: Yup.string().required().label("Country"),
    address: Yup.string().required().label("Address"),
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={handleModal}
      className="w-[calc(100vw-40px)] sm:w-[470px] md:w-[598px] lg:w-[688px] 2xl:w-[800px] 3xl:w-[800px] bg-[#fff] rounded-[6px] relative modal-scroll"
    >
      <div className="p-[20px] ">
        <div
          onClick={handleModal}
          className="absolute top-[20px] right-[20px] cursor-pointer"
        >
          <CrossIcon stroke="#25282B" width={16} height={16} />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <h2 className="text-[#626F63] font-semibold text-[24px] md:text-[32px] leading-[43.84px] text-center">
                {actionType === "create" ? "Add Buyer" : "Update Buyer"}
              </h2>
              <div className="flex flex-col sm:flex-row gap-[24px] mt-[30px]">
                <div className="w-[100%] sm:w-[50%]">
                  <InputField
                    className="!w-[100%]"
                    inputClass=" !h-[48px] !w-full border-none !bg-[#FAFAFA] text-[#626F63] placeholder:text-[#626F63] font-normal text-[14px] rounded-[10px]"
                    placeholder="Type here"
                    name="buyer_name"
                    type="text"
                    label="Buyer Name"
                    labelClass="text-[#031B07] font-normal text-[16px] leading-[23.36px] "
                  />
                </div>
                <div className="w-[100%] sm:w-[50%]">
                  <InputField
                    className="!w-[100%]"
                    inputClass=" !h-[48px] !w-full border-none !bg-[#FAFAFA] text-[#626F63] placeholder:text-[#626F63] font-normal text-[14px] rounded-[10px]"
                    placeholder="Type here"
                    name="buyer_type"
                    type="text"
                    label="Buyer Type"
                    labelClass="text-[#031B07] font-normal text-[16px] leading-[23.36px] "
                  />
                </div>
              </div>
              <div className="mt-[30px]">
                <SelectField
                  name="country"
                  options={countries}
                  value={
                    userData && userData.country
                      ? {
                          label:
                            userData.country !== undefined
                              ? userData.country
                              : "",
                          value:
                            userData.country !== undefined
                              ? userData.country
                              : "",
                        }
                      : ("" as any)
                  }
                  label="Buyer’s Country"
                  placeholder="Select country"
                />
              </div>
              <div className="mt-[30px]">
                <InputField
                  className="!w-[100%]"
                  inputClass=" !h-[48px] !w-full border-none !bg-[#FAFAFA] text-[#626F63] placeholder:text-[#626F63] font-normal text-[14px] rounded-[10px]"
                  placeholder="Type here"
                  name="address"
                  type="text"
                  label="Buyer Address"
                  labelClass="text-[#031B07] font-normal text-[16px] leading-[23.36px] "
                />
              </div>
              <div className=" py-[20px] sm:float-right">
                <button
                  type="submit"
                  className="bg-[#17B532] px-[16px] py-[10px]  rounded-[10px] text-white text-[16px] font-normal w-[100%] sm:w-[160px]"
                >
                  {isLoading === true ? (
                    <div className="flex items-center justify-center">
                      <LoadingAnimation color="white" />
                    </div>
                  ) : actionType === "create" ? (
                    "Add Buyer"
                  ) : (
                    "Update Buyer"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </CustomModal>
  );
}

export default ClientsModal;
