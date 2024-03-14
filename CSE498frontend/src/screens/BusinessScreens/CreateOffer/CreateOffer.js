import React, { useEffect, useState } from 'react';
import PageHeader from '../../../components/PageHeader/PageHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import styles from './CreateOffer.css';
import { createNewOffer } from '../../../actions/offersAction';
import { useNavigate } from 'react-router-dom';
import { FooterContainer } from '../../../containers/footer';

const Create_Offer = () => {

    const [userProfile, setUserProfile] = useState(null);
    const [initialized, setInitialized] = useState(false);

    const business = JSON.parse(localStorage.getItem('userProfile'));


    useEffect(() => {
        if (!userProfile) {
            setUserProfile(business);
        }

        if (userProfile) {
            // We have everything initialized
            console.log({userProfile})
            setInitialized(true);
        }
    }, [userProfile, business]);

    const onCreate = async () => {
        const data = {
            title: document.getElementById("offerName").value,
            businessId: business.id,
            startDate: document.getElementById("start").value,
            endDate: document.getElementById("end").value,
            description: document.getElementById("promoType").value,
            offerCode: document.getElementById("couponCode").value,
            offerImage: document.getElementById("imageOffer").files[0]
        };

        const createOffer = await createNewOffer(data);
        console.log("success: ", createOffer)

    };


    return initialized ? (
        <div>
            <PageHeader screen={'/createoffer'}/>
            <h1 className='title'>Create Offer</h1>

            <div  className="flex items-center justify-center p-12">
                <div  className="mx-auto w-full max-w-[550px]">
                    <form>
                    <div  className="-mx-3 flex flex-wrap">
                        <div  className="w-full px-3 sm:w-1/2">
                        <div  className="mb-5">
                            <label  className="mb-3 block text-base font-medium text-[#07074D]"> Offer Name* </label>
                            <input type="text" id="offerName" placeholder="Offer Name"  className="w-full text-[#6B7280] rounded-md border border-[#e0e0e0] bg-white py-3 px-6  font-medium " required/>
                        </div>
                        </div>
                        <div  className="w-full px-3 sm:w-1/2">
                        <div  className="mb-5">
                            <label  className="mb-3 block text-base font-medium text-[#07074D]"> Offer Code* </label>
                            <input type="text" id="couponCode" placeholder="Offer Code"  className="w-full text-[#6B7280] rounded-md border border-[#e0e0e0] bg-white py-3 px-6  font-medium " required/>
                        </div>
                        </div>
                    </div>
                    <div  className="mb-5">
                        <label  className="mb-3 block text-base font-medium text-[#07074D]"> Description* </label>
                        <input type="text" id="promoType" placeholder="Description" 
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 font-medium text-[#6B7280] focus:border-[#6A64F1] focus:shadow-md" required/>
                    </div>

                    <div  className="-mx-3 flex flex-wrap">
                        <div  className="w-full px-3 sm:w-1/2">
                            <label  className="mb-3 block text-base font-medium text-[#07074D]">Start Date*</label>
                            <input type="date" id="start" 
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 font-medium text-[#6B7280] focus:border-[#6A64F1] focus:shadow-md" required/>
                        </div>
                        <div  className="w-full px-3 sm:w-1/2">
                        <div  className="mb-5">
                        <label  className="mb-3 block text-base font-medium text-[#07074D]">End Date*</label>
                            <input type="date" id="end" 
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 font-medium text-[#6B7280] focus:border-[#6A64F1] focus:shadow-md" required/>
                        </div>
                        </div>
                        < div className='offer-image'>
                            <label className='input-label'>
                                Offer Image
                            </label>
                            <input type="file" accept=".png, .jpg, .jpeg" id="imageOffer"/>
                        </div>
                    </div>
                    <div>
                    <DefaultButton text={'Create'} onPress={onCreate} disabled={false}/>
                    </div>
                    </form>
                </div>
                </div>
            <FooterContainer />
        </div>
    ) : <></>;
};

export default Create_Offer;

