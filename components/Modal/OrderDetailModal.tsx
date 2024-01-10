/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useState } from "react";
import CrossIcon from "../CustomIcons/CrossIcon";
import RatingRead from "../RatingRead";
import CustomModal from "./CustomModal";
import OrderLeftData from "../OrderModalData/OrderLeftData";
import OrderRightData from "../OrderModalData/OrderRightData";
import { toast } from "react-toastify";
import { api } from "../../api";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import { useQuery } from "react-query";
import BuyerQuery from "../../api-query/BuyerQuery";
import classNames from "classnames";

type OrderDetailsModalType = {
  isOpen: boolean;
  handleModal: () => void;
  data?: any;
  orderRefetch?: any;
};

function OrderDetailsModal({
  isOpen,
  handleModal,
  data,
  orderRefetch,
}: OrderDetailsModalType) {
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [statusType, setStatusType] = useState(data.status.toLowerCase());
  const [videoReview, setVideoReview] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const {
    data: buyerData,
    isLoading,
    refetch,
  } = useQuery(["get all buyer"], BuyerQuery());
  const buyerInfo =
    buyerData && buyerData.filter((buyer: any) => buyer._id === buyerId);
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      if (buyerId !== "" || data.buyer) {
        const response = await api.put(`/review/${data._id}`, {
          status: statusType,
        });
        toast.success(`Order updated successfully`);
      } else if (statusType === "cancelled") {
        const response = await api.put(`/review/${data._id}`, {
          status: statusType,
        });
        toast.success(`Order cancelled successfully`);
      } else {
        toast.error("Add a buyer for this order");
      }

      if (buyerInfo && buyerInfo.length > 0) {
        const response = await api.put(`/review/${data._id}`, {
          buyer: buyerInfo?.[0]._id,
          buyerCountry: buyerInfo?.[0].country,
          buyerType: buyerInfo?.[0].buyerType,
        });
      }

      await api.post("/send-notification", {
        userId: data.userId._id || " ",
        title: "Your order status has been updated",
        desc: `Your order status updated to ${statusType}`,
      });
      setLoading(false);
      orderRefetch();
      handleModal();
    } catch (err: any) {
      const errMessage = err.response ? err.response.data.message : err.message;
      setLoading(false);
      handleModal();
      toast.error(errMessage);
    }
  };
  const updateVideoReview = async () => {
    if (uploadLoading === false) {
      setLoading(true);
      try {
        const response = await api.put(`/review/${data._id}`, {
          videoReview: videoReview,
        });
        await api.post("/send-notification", {
          userId: data.userId._id || " ",
          title: "Video review has been updated",
          desc: `Your order video review has been uploaded`,
        });
        setLoading(false);
        orderRefetch();
        toast.success(`Video review updated successfully`);
        handleModal();
      } catch (err) {
        toast.error("Failed to update video review");
      }
    }
  };

  const handleUploadVideoReview = async (e: File) => {
    const formData = new FormData();
    formData.append("file", e);
    const { data } = await api.post("/bucket-store/upload", formData);
    return data;
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={handleModal}
      className="w-[calc(100vw-40px)] sm:w-[550px] lg:w-[610px] 2xl:w-[700px] 3xl:w-[800px] bg-[#fff] rounded-[6px] relative modal-scroll"
    >
      <div className="p-[20px] sm:p-[40px]">
        <div
          onClick={handleModal}
          className="absolute top-[16px] right-[16px] sm:top-[30px] sm:right-[30px] w-[24px] h-[24px] rounded-full border border-[#676B68] flex justify-center items-center cursor-pointer"
        >
          <CrossIcon width={15} height={15} stroke="#676B68" />
        </div>
        <h2 className="font-semibold text-[25px] sm:text-[32px] leading-[43.84px] text-[#626F63] text-center">
          Order Details
        </h2>
        <div className="mt-[30px]">
          <div className="flex flex-col sm:flex-row justify-between gap-[40px]">
            <div className="flex flex-col gap-[16px] w-[100%] sm:w-[50%]">
              <OrderLeftData
                leftData={data}
                setBuyerId={setBuyerId}
                buyerData={buyerData}
                buyerInfo={buyerInfo}
              />
              <div className="flex flex-col gap-[10px]">
                <h2 className="text-[#031B07] font-semibold text-[16px] leading-[19.36px] ">
                  Gig Url
                </h2>
                <a
                  href={data.gigUrl}
                  target="_blank"
                  rel="noreferrer"
                  className=" text-[16px] font-normal leading-[22px] text-[#5286FE] w-[100%] truncate"
                >
                  {data.gigUrl}
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-[16px] w-[100%] sm:w-[50%]">
              <OrderRightData
                rightData={data}
                setStatusType={setStatusType}
                buyerInfo={buyerInfo}
              />
              <div className="flex flex-col gap-[10px]">
                <h2 className="text-[#031B07] font-semibold text-[16px] leading-[19.36px] ">
                  Ratting
                </h2>
                <RatingRead width={24} height={24} rating={data.rating} />
              </div>
              <div className="flex items-center gap-[12px]">
                <div
                  className={classNames(
                    " w-[16px] h-[16px]  border border-[#CCCED6] rounded-[4px] text-white flex items-center justify-center",
                    data.privateFeedback && "bg-primary border border-primary"
                  )}
                >
                  {data.privateFeedback && <p className="text-[14px]">✔</p>}
                </div>
                <p className="font-normal text-[14px] leading-[20.44px] text-[#031B07]">
                  Private Feedback
                </p>
              </div>
            </div>
          </div>
          {data.customReview !== undefined && (
            <div className="mt-[16px]">
              <h2 className="text-[#031B07] font-semibold text-[16px] leading-[19.36px]">
                Custom review messaage
              </h2>
              <p className="text-[#334535] mt-[10px] font-normal text-[16px] leading-[22px]">
                {data.customReview}
              </p>
            </div>
          )}
          {data.status === "completed" && (
            <div className="mt-[16px]">
              <h2 className="text-[#031B07] mb-[15px] font-semibold text-[16px] leading-[19.36px]">
                Update Video review
              </h2>
              <div className="flex flex-col items-center sm:flex-row gap-[15px]">
                <input
                  type="file"
                  name="file"
                  accept="video/*"
                  className="w-[100%] sm:w-[50%] bg-[#f7f4f4] py-[17px] text-[14px] font-normal placeholder:text-[#626F63] focus:outline-none px-[16px] text-[#667085] rounded-[10px]"
                  onChange={async (e) => {
                    const files = e.target.files;
                    setUploadLoading(true);
                    if (files?.length) {
                      const res = await handleUploadVideoReview(files[0]);
                      setVideoReview(res?.location);
                      setUploadLoading(false);
                    }
                  }}
                />
                <button
                  className="w-[100%] sm:w-[172px] h-[40px] bg-primary hover:bg-[#14a02b] transition-all duration-200 rounded-[10px] text-[white] font-medium text-[14px] leading-[19px]"
                  onClick={updateVideoReview}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <LoadingAnimation color="white" />
                    </span>
                  ) : uploadLoading === true ? (
                    <div className="flex items-center justify-center">
                      <LoadingAnimation color="white" />
                      wait..
                    </div>
                  ) : (
                    "Add video review"
                  )}
                </button>
              </div>
            </div>
          )}
          {data.status === "in progress" && (
            <div className="mt-[16px]">
              <h2 className="text-[#031B07] font-semibold text-[16px] leading-[19.36px]">
                Video review
              </h2>
              <p className="mt-[10px] text-[#626F63] font-semibold text-[16px] leading-[19.36px]">
                Will be available when order is completed
              </p>
            </div>
          )}
          {data.status !== "completed" && (
            <div onClick={handleStatusChange} className="flex justify-center">
              <button className="w-[172px] h-[40px] bg-primary hover:bg-[#14a02b] transition-all duration-200 rounded-[10px] text-[white] font-medium text-[14px] leading-[19px] mt-[30px] ">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <LoadingAnimation color="white" />
                  </span>
                ) : (
                  "Update order"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
}

export default OrderDetailsModal;
