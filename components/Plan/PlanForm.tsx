///plan form
import React, { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { api } from "../../api";
import InputField from "../Shared/InputField";
import CrossIcon from "../CustomIcons/CrossIcon";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import ReactSelect from "../ReactSelect";
import { packageTypeOptions, serviceTypeOptions } from "../../utils/const";

const schema = Yup.object().shape({
  serviceType: Yup.object()
    .required("Write service type here")
    .label("Service Type"),
  packageType: Yup.object()
    .required("Write package type here")
    .label("Package Type"),
  price: Yup.number().positive().integer().required("Package Price"),
  packageDescription: Yup.string()
    .required("Enter package description here")
    .label("Package Description"),
  icon: Yup.mixed(),
  features: Yup.string().label("Feature"),
});
const PlanForm = () => {
  const router = useRouter();
  const { createPlan, editPlan } = router.query;
  const [featureValue, setFeatureValue] = useState<String>("");
  const [features, setFeatures] = useState<any[]>([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, refetch } = useQuery(
    ["get-plan", editPlan],
    () => api.get(`/pricing/${editPlan}`),
    {
      enabled: !!editPlan,
      onSuccess: (data) => {
        setValue("serviceType", {
          value: data.data[0].serviceType,
          label:
            data.data[0].serviceType.charAt(0).toUpperCase() +
            data.data[0].serviceType.slice(1),
        });
        setValue("packageType", {
          value: data.data[0].packageType,
          label:
            data.data[0].packageType.charAt(0).toUpperCase() +
            data.data[0].packageType.slice(1),
        });
        setValue("price", data.data[0].price);
        setValue("packageDescription", data.data[0].packageDescription);
        setValue("icon", data.data[0].icon);
        setFeatures(data.data[0].features);
      },
    }
  );
  const handleAddFeatures = () => {
    if (featureValue !== "") {
      setFeatures([...features, { text: featureValue }]);
      setValue("features", "");
    }
  };

  const handleRemoveFeature = (e: any) => {
    const filterFeature = features.filter(
      (item: any, index: number) => index !== e
    );
    setFeatures(filterFeature);
  };

  const handleUploadIcon = async (e: File) => {
    const formData = new FormData();
    formData.append("file", e);

    const { data } = await api.post("/bucket-store/upload", formData);
    return data;
  };

  const handleDeletePlan = async () => {
    try {
      if (editPlan !== undefined) {
        const response = await api.delete(`/pricing/${editPlan}`);
        toast.success("Plan deleted successfully");
        refetch();
        await router.push("/dashboard/plan");
      }
    } catch (err: any) {
      const errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
    }
  };

  const onSubmit = async (value: any) => {
    if (buttonLoading) return;
    setButtonLoading(true);
    try {
      const formData = {
        serviceType: value.serviceType.value,
        packageType: value.packageType.value,
        packageDescription: value.packageDescription,
        features,
        price: value.price,
        icon: value.icon,
      };
      if (createPlan !== undefined) {
        const response = await api.post("/pricing", formData);

        reset();
        setFeatures([]);
        toast.success("Plan created successfully");
      } else {
        const response = await api.put(`/pricing/${editPlan}`, formData);
        toast.success("Plan updated successfully");
      }
      refetch();
      setButtonLoading(false);
    } catch (err: any) {
      const errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
      setButtonLoading(false);
    }
  };

  const numberInputOnWheelPreventChange = (e: any) => {
    // Prevent the input value change
    e.target.blur();
    // Prevent the page/container scrolling
    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };
  return (
    <div className="py-[40px]">
      <h2 className="text-[22px] leading-[30px] font-medium lg:text-[24px] lg:leading-[40px] 3xl:text-[32px] 3xl:leading-[42px] lg:font-semibold text-[#1F2937]">
        {createPlan !== undefined ? "Create Plan" : "Edit Plan"}
      </h2>
      <div className="pb-[20px]"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-[20px] bg-[#FFFFFF] rounded-[10px]">
          <div className="flex flex-col md:flex-row gap-[24px]">
            <div className="w-[100%] md:w-[50%]">
              <Controller
                name="serviceType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ReactSelect
                    options={serviceTypeOptions}
                    label="Service Type"
                    placeholder="Select service Type"
                    className={`${
                      errors.serviceType
                        ? "border-red-500 border text-red-500"
                        : "focus:border-none"
                    }`}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.serviceType && (
                <p className="mt-2 text-sm text-red-500 first-letter:capitalize">
                  {errors.serviceType?.message?.toString()}
                </p>
              )}
            </div>
            <div className="w-[100%] md:w-[50%]">
              <Controller
                name="packageType"
                control={control}
                render={({ field: { onChange, value} }) => (
                  <ReactSelect
                    options={packageTypeOptions}
                    label="Package Type"
                    placeholder="Select package Type"
                    className={`${
                      errors.packageType
                        ? "border-red-500 border text-red-500"
                        : "focus:border-none"
                    }`}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.packageType && (
                <p className="mt-2 text-sm text-red-500 first-letter:capitalize">
                  {errors.packageType?.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-[24px] mt-[30px] items-center">
            <div className="w-[100%] md:w-[50%]">
              <label
                htmlFor=""
                className="text-[16px] text-[#031B07] font-normal leading-[23.36px] block"
              >
                Package Price
              </label>
              <input
                {...register("price")}
                type="number"
                placeholder="$0"
                onWheel={numberInputOnWheelPreventChange}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-", "."].includes(e.key) &&
                  e.preventDefault()
                }
                className={`${
                  errors.price
                    ? "!border-red-500 border text-red-500"
                    : "focus:border-none"
                } text-[14px] leading-[146%] text-[#667085] bg-[#FAFAFA]  font-normal mt-2 focus:outline-none rounded-[10px] w-full h-[58px] px-[12px] placeholder:text-[#626F63]`}
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-500 first-letter:capitalize">
                  {errors.price?.message?.toString()}
                </p>
              )}
            </div>
            <div className="w-[100%] md:w-[50%]">
              <label
                htmlFor=""
                className="text-[16px] text-[#031B07] font-normal leading-[23.36px] block"
              >
                Package Icon
              </label>
              <div
                className={`${
                  errors.icon
                    ? "border-red-500 border text-red-500"
                    : "focus:border-none"
                } flex justify-between items-center px-[16px] py-[14px] w-[100%] bg-[#FAFAFA] mt-[10px] rounded-[10px]`}
              >
                <input
                  name="icon"
                  type="file"
                  className="text-[#667085] w-[50%] flex  placeholder:text-[#626F63]"
                  accept="image/*"
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (files?.length) {
                      const res = await handleUploadIcon(files[0]);
                      setValue("icon", res?.location);
                    }
                  }}
                />
                <h3 className="text-sm w-[50%] text-[#17B532] truncate">
                  {data && data.data[0].icon}
                </h3>
              </div>
              {errors.icon && (
                <p className="mt-2 text-sm text-red-500 first-letter:capitalize">
                  {errors.icon?.message?.toString()}
                </p>
              )}
            </div>
          </div>

          {/* text area  */}
          <div className="mt-[30px]">
            <label
              htmlFor=""
              className="text-[16px] text-[#031B07] font-normal leading-[23.36px] block"
            >
              Package Description
            </label>
            <textarea
              {...register("packageDescription", { required: true })}
              rows={5}
              cols={5}
              placeholder="Write your message here"
              className={classNames(
                errors.packageDescription
                  ? "border-red-500 border text-red-500"
                  : "focus:border-none",
                "mt-2 w-full p-[12px] outline-none text-[14px] leading-[146%] font-normal text-[#667085] bg-[#FAFAFA] placeholder:text-[#626F63] rounded-[10px]"
              )}
            />
            {errors.packageDescription && (
              <p className="mt-2 text-sm text-red-500 first-letter:capitalize">
                {errors.packageDescription?.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <div className="mt-[30px] p-[30px] bg-[#FFFFFF] rounded-[10px]">
          <div className="relative">
            <InputField
              {...register("features")}
              placeholder="Type features"
              label="Add Features"
              onChange={(e: any) => setFeatureValue(e.target.value)}
              className={`${
                errors.features
                  ? "!border-red-500 text-red-500"
                  : "focus:border-none"
              } text-[#667085] bg-[#FAFAFA] py-[29px] border-none placeholder:text-[#626F63]`}
            />
            {errors.features && (
              <p className="mt-2 text-sm text-red-500 first-letter:capitalize">
                {errors.features?.message?.toString()}
              </p>
            )}

            <button
              type="button"
              disabled={!!!featureValue}
              onClick={handleAddFeatures}
              className="absolute top-[-15px] right-0  py-[6px] rounded-[10px] bg-[#17B532] text-white transition-all duration-300 px-[10px]"
            >
              {features && features?.length === 0 ? "Add feature" : "Add more"}
            </button>
          </div>

          <div className="flex flex-col gap-[8px] mt-[30px]">
            {features &&
              features?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="w-[100%] h-[48px] bg-[#E8FCEC] rounded-[8px] px-[16px] flex items-center justify-between text-[#626F63] text-[16px] font-normal"
                >
                  <p>{item.text}</p>
                  <div
                    onClick={() => handleRemoveFeature(index)}
                    className="cursor-pointer"
                  >
                    {" "}
                    <CrossIcon width={16} />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="py-[60px]">
          <button
            type="submit"
            className="float-right w-[105px] rounded-[10px] h-[48px]  bg-[#17B532] hover:bg-[#14a02b] transition-all duration-300 text-white text-[16px] font-normal"
          >
            {buttonLoading ? (
              <span className="flex items-center justify-center">
                <LoadingAnimation color="white" />
              </span>
            ) : createPlan !== undefined ? (
              "Create"
            ) : (
              "Update"
            )}
          </button>
          {editPlan !== undefined && (
            <button
              type="button"
              onClick={handleDeletePlan}
              className="float-right mr-[20px] w-[105px] rounded-[10px] h-[48px]  bg-[#ec0505] hover:bg-[#d40808] transition-all duration-300 text-white text-[16px] font-normal"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlanForm;
