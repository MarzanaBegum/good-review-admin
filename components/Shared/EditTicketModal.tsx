/* eslint-disable react/jsx-no-undef */
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextAreaField from "../TextAreaField";
import OverflowModal from "./OverFlowModal";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import { PhotoProvider, PhotoView } from "react-photo-view";
import {
  SupportData,
  useSupportRefetch,
} from "../../api-query/useSupportQuery";
import { api } from "../../api";
import NewCustomModal from "./NewCustomModal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: SupportData;
};

type TicketInitialType = {
  reply: string;
};

const validateSchema = Yup.object({
  reply: Yup.string().required().label("Reply"),
});

function EditTicketModal({ isOpen, onClose, data }: ModalProps) {
  const supportRefetch = useSupportRefetch();

  const [buttonLoading, setButtonLoading] = useState(false);

  const initialTicket: TicketInitialType = {
    reply: "",
  };

  const handleSubmit = async (value: TicketInitialType) => {
    if (buttonLoading) return;
    setButtonLoading(true);
    try {
      const apiObj = {
        type: "reply",
        text: value.reply,
      };

      await api.put("/ticket/" + data._id + "/admin-chat", apiObj);

      await supportRefetch();
      onClose();

      setButtonLoading(false);
    } catch (err: any) {
      const errMessage = err.response ? err.response.data.message : err.message;
      setButtonLoading(false);
      console.log(errMessage);
    }
  };

  return (
    <NewCustomModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-[calc(100vw-40px)] max-w-[800px] bg-white px-[16px] py-[30px] sm:p-[40px] rounded-[10px]"
    >
      <div>
        <Formik
          initialValues={initialTicket}
          onSubmit={handleSubmit}
          enableReinitialize
          validationSchema={validateSchema}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-[20px] sm:gap-[30px]">
                <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-[36px]">
                  <div className="w-[100%] h-[100%] sm:w-[50%]">
                    <div className="text-[16px] pb-1 label text-[#031B07] leading-[23.36px] font-semibold  flex gap-[10px]">
                      User Name
                    </div>

                    <div>
                      {data.userId.firstName} {data.userId.lastName}
                    </div>
                  </div>
                  <div className="w-[100%] sm:w-[50%]">
                    <div className="text-[16px] mb-1 label text-[#031B07] leading-[23.36px] font-semibold  flex gap-[10px]">
                      Email
                    </div>
                    <div>{data.userId.email}</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-[36px]">
                  <div className="w-[100%] h-[100%] sm:w-[50%]">
                    <div className="text-[16px] pb-1 label text-[#031B07] leading-[23.36px] font-semibold  flex gap-[10px]">
                      Subject
                    </div>

                    <div>{data.subject}</div>
                  </div>
                  <div className="w-[100%] sm:w-[50%]">
                    <div className="text-[16px] mb-1 label text-[#031B07] leading-[23.36px] font-semibold  flex gap-[10px]">
                      Related Order
                    </div>
                    <div>{data.relatedOrder}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {data.chats.map((v, i) => (
                    <div>
                      <div className="text-[16px] mb-1 label text-[#031B07] capitalize leading-[23.36px] font-semibold  flex gap-[10px]">
                        {v.type == "reply" ? "Reply - Good Reviews" : v.type}
                      </div>
                      <div className="w-full whitespace-normal">{v.text}</div>
                    </div>
                  ))}
                </div>
                <PhotoProvider>
                  {data.files.length > 0 && (
                    <div className="flex gap-2 w-full h-[100px]">
                      {data.files.map((v, i) => (
                        <PhotoView
                          key={"pic_" + i}
                          src={v}
                          height={100}
                          width={100}
                        >
                          <img
                            src={v}
                            width={100}
                            height={100}
                            className="object-cover cursor-pointer rounded bg-[#fafafa]"
                            alt=""
                          />
                        </PhotoView>
                      ))}
                    </div>
                  )}
                </PhotoProvider>
              </div>
              {data.status !== "solved" && (
                <>
                  <div className="mt-5 lg:mt-[30px]">
                    <TextAreaField
                      inputClass="!h-[100px]"
                      name="reply"
                      type="text"
                      required
                      label="Reply"
                      placeholder="Text here your reply..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row mt-[30px] sm:mt-[36px] gap-[14px] sm:gap-[20px] xl:gap-[33px] justify-center sm:justify-end">
                    <button
                      onClick={onClose}
                      className="w-[100%] h-[48px] sm:w-[192px] xl:w-[186px] xl:h-[53px] text-[18px] border border-[#C5C7D0] bg-[#FFFFFF] rounded-[8px] text-[#031B07] font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-[100%] h-[48px] sm:w-[192px] xl:w-[186px] xl:h-[53px] text-[18px] bg-[#17B532] rounded-[8px] justify-center items-center flex text-[#FFFFFF] font-medium cursor-pointer"
                    >
                      {buttonLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <LoadingAnimation color="#fff" />
                          <div className="text-sm">Loading...</div>
                        </div>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </NewCustomModal>
  );
}

export default EditTicketModal;
