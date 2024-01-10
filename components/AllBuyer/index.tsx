import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BuyerQuery from '../../api-query/BuyerQuery';
import BuyerTypeQuery from '../../api-query/BuyerTypeQuery';
import ClientsModal from '../Modal/ClientsModal';
import SelectDropdown from '../SelectDropdown';
import BuyerTable from './BuyerTable';

const AllBuyer = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState("");
    
    const {data:buyerType} = useQuery(["get buyerType"], BuyerTypeQuery());
    const uniqueType = Array.from (new Set(buyerType));
    const optionArray = [...uniqueType, "all"]
    const {data, isLoading, refetch} = useQuery(["get buyer"], BuyerQuery(selectedValue));

    const buyerTypeOption = optionArray && optionArray.map((item:any) => (
         {value: item === "all" ? "" : item, label: `${item.charAt(0).toUpperCase() + item.slice(1) } Buyer`,}
         
    ));
    
    const handleOnChange = (e:any) => {
        setSelectedValue(e.value)
    }

    return (
        <>
            <div className="py-[20px] md:py-[40px]">
                <div className="flex items-center justify-between">
                    <div className="flex gap-[24px] items-center">
                        <h2 className="text-[22px] leading-[30px] font-medium lg:text-[24px] lg:leading-[40px] 3xl:text-[32px] 3xl:leading-[42px] lg:font-semibold text-[#1F2937]">
                            All Buyers
                        </h2>
                        <button onClick={() => setOpenModal(!openModal)} className='hidden sm:block px-[15px] py-[8px] rounded-[10px] bg-[#18BA33] text-white text-[16px] font-normal'>Add Buyer</button>
                    </div>


                    <SelectDropdown
                        options={buyerTypeOption}
                        defaultValue={buyerTypeOption?.[0]}
                          onChange={handleOnChange}
                        placeholder="Client Type"
                    />
                </div>

                <button onClick={() => setOpenModal(!openModal)} className='mt-[20px] sm:hidden w-[100%] px-[15px] py-[8px] rounded-[10px] bg-[#18BA33] text-white text-[16px] font-normal'>Add Buyer</button>
                <div className=''>
                   
                    <BuyerTable data={data} refetch={refetch} isLoading={isLoading}/>
                </div>
            </div>
            <ClientsModal  refetch={refetch} isOpen={openModal} handleModal={() => setOpenModal(!openModal)} actionType="create"/>
        </>
    );
};

export default AllBuyer;
