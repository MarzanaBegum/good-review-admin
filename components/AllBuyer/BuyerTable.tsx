import React, { useState } from "react";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import ClientsModal from "../Modal/ClientsModal";
import DeleteModal from "../Modal/DeleteModal";
import Pagination from "../Shared/Pagination";

const tableHead = ["buyer name", "buyer type", "Location", "Edit"];
const BuyerTable = ({ data, refetch,isLoading }: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [editData, setEditData] = useState([]);

  const handleDelete = (e: any) => {
    setDeletedId(e);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleEdit = (e: any) => {
    const filterData = data && data?.filter((item: any) => item._id === e);
    setEditData(filterData);
    setOpenModal(!openModal);
  };
  return (
    <>
      <Pagination
        dataArr={data || []}
        itemsPerPage={7}
        className="!justify-end pb-[100px] w-[100%]"
      >
        {(data) => (
          <div className="py-[30px]  lg:py-[50px] w-[100%]">
            <div className="modal-scroll">
              <table className="w-full text-left text-[#031B07] border-separate  border-spacing-y-3">
                <thead className="  text-[#031B07] text-[12px] lg:text-[14px]  bg-white">
                  <tr className="whitespace-nowrap">
                    {tableHead.map((item: any, index: number) => (
                      <th key={index} scope="col" className="px-6 py-3">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {data && data.length !== 0 ? (
                    data.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="mt-12 bg-white rounded-[15px] whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]"
                      >
                        <td className="px-6 py-4">
                          {item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)}
                        </td>
                        <td className="px-6 py-4 ">
                          {item.buyerType.charAt(0).toUpperCase() +
                            item.buyerType.slice(1)}
                        </td>

                        <td className="px-6 py-4 text-[#031B07]">
                          {item.address.charAt(0).toUpperCase() +
                            item.address.slice(1)}
                        </td>

                        <td className="relative px-6 py-4 flex gap-[8px]">
                          <img
                            onClick={() => handleEdit(item._id)}
                            src="/icons/edit-icon.svg"
                            alt=""
                            className="w-4 h-4 cursor-pointer lg:w-5 lg:h-5 "
                          />
                          <img
                            onClick={() => handleDelete(item._id)}
                            src="/icons/delete-user.svg"
                            alt=""
                            className="w-4 h-4 cursor-pointer lg:w-5 lg:h-5 "
                          />
                        </td>
                      </tr>
                    ))
                  ) : isLoading ? (
                    <tr className="whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]">
                      <td className="px-6 py-4">
                        <div className="flex gap-3 item-center">
                          <LoadingAnimation color="#18BA33" />
                          <div>Loading...</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr className="whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]">
                      <td className="px-6 py-2">
                        <div>No Buyer found!</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Pagination>
      <ClientsModal
        refetch={refetch}
        data={editData && editData}
        isOpen={openModal}
        handleModal={() => setOpenModal(!openModal)}
        actionType="update"
      />
      <DeleteModal
        refetch={refetch}
        deletedId={deletedId}
        isOpen={openDeleteModal}
        handleModal={() => setOpenDeleteModal(!openDeleteModal)}
      />
    </>
  );
};

export default BuyerTable;
