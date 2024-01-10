/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../api";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import CustomModal from "./CustomModal";

type DeleteModalType = {
    isOpen: boolean;
    handleModal: () => void;
    deletedId?: string;
    refetch? : any;
};

function DeleteModal({ isOpen, handleModal, deletedId, refetch }: DeleteModalType) {
    const [isLoading, setIsLoading] = useState(false);
    const handleDelete = () => {
        setIsLoading(true);
        try {
        api.delete(`/buyer/${deletedId}`)
        .then((res:any) => {
           if(res.status === 200) {
            setIsLoading(false);
            refetch();
            handleModal();
           } else {
            toast.error("Something went wrong !");
            handleModal();
           }
        })
        } catch(err){
            toast.error("Something went wrong!");
            handleModal();
        }
    }

    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={handleModal}
            className="w-[calc(100vw-40px)] sm:w-[470px] md:w-[598px] lg:w-[688px] 2xl:w-[800px] 3xl:w-[800px] bg-[#fff] rounded-[6px] relative modal-scroll"
        >
            <div className="p-[20px] sm:p-[40px] text-center">
                <h1 className="text-[32px] text-[#626F63] font-semibold leading-[43.84px]">Are you Sure to want to Delete ?</h1>

                <div className="mt-[40px] sm:flex sm:justify-end">
                    <div className="flex flex-col sm:flex-row gap-[8px] sm:gap-[16px]">
                        <button onClick={handleModal} className=" py-[10px] rounded-[10px] bg-[#e22828] w-[100%] sm:w-[80px] text-white font-normal text-[16px]">No</button>
                        <button onClick={handleDelete} className=" py-[10px] rounded-[10px] w-[100%] sm:w-[80px] text-white font-normal text-[16px] bg-[#17B532]">{isLoading === true ? <div className="flex justify-center items-center"> <LoadingAnimation color="white" /></div> : "Yes"}</button>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
}

export default DeleteModal;


