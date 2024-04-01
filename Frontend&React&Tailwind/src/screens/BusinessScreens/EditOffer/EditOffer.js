import React from 'react';
import PageHeader from '../../../components/PageHeader/PageHeader';
import ShoppingPic from '../../../images/login-temp.jpg';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import { getDashboard, getOffer} from '../../../actions/businessDasboardAction';
import { updateOffer } from '../../../actions/offersAction';
import { deleteOffer } from '../../../actions/offersAction';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import styles from './EditOffer.css';
import { FooterContainer } from '../../../containers/footer';


const EditOffer = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [date, setDate] = useState("2023-03-27");
    
    const onUpdate = async () => {
        const data = {
            title: document.getElementById("offerName").value,
            offerId: id,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
            description: document.getElementById("promoType").value,
            offerCode: document.getElementById("couponCode").value,
            offerImage: document.getElementById("imageOffer").files[0]
        };  
        console.log("data", data)
        const updatedOffer = await updateOffer(data);

    };

    const onDiscard = async () => {
        let text = "Are you sure you want to discard changes?";
        if (confirm(text) == true) {
            navigate('/calendar')
        } else {
            return
        }
    }

    const [userProfile, setUserProfile] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [editDetails, setData] = useState(null);


    useEffect(() => {
        if (!userProfile) {
            setUserProfile(id);
        }

        if (userProfile && editDetails) {
            // We have everything initialized
            setInitialized(true);
            console.log({editDetails})
        }

        const dashboard = async() => {
            const businessId = userProfile;
            const dashboardInfo = await getOffer(id);
            setData(JSON.parse(dashboardInfo));

        }

        if(!editDetails){
            dashboard();
        }
        
    }, [initialized, userProfile, window.localStorage.userProfile, editDetails]);


    return initialized ? (
            <div>
            <PageHeader screen={'/editoffer'}/>

            <h1 className='title'>Edit Offer</h1>

            <div  className="flex items-center justify-center p-12">
                <div  className="mx-auto w-full max-w-[550px]">
                    <form>
                    <div  className="-mx-3 flex flex-wrap">
                        <div  className="w-full px-3 sm:w-1/2">
                        <div  className="mb-5">
                            <label  className="mb-3 block text-base font-medium text-[#07074D]"> Offer Name* </label>
                            <input type="text" id="offerName" defaultValue={editDetails.title}  
                            className="w-full text-[#6B7280] rounded-md border border-[#e0e0e0] bg-white py-3 px-6  font-medium " required/>
                        </div>
                        </div>
                        <div  className="mb-5">
                        <label  className="mb-3 block text-base font-medium text-[#07074D]"> Coupon code* </label>
                        <input type="text" id="couponCode" defaultValue={editDetails.offerCode}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 font-medium text-[#6B7280] focus:border-[#6A64F1] focus:shadow-md" required/>
                    </div>
                    </div>
                    <div  className="mb-5">
                        <label  className="mb-3 block text-base font-medium text-[#07074D]"> Description* </label>
                        <input type="text" id="promoType" defaultValue={editDetails.description}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 font-medium text-[#6B7280] focus:border-[#6A64F1] focus:shadow-md" required/>
                    </div>

                    <div  className="-mx-3 flex flex-wrap">
                        <div  className="w-full px-3 sm:w-1/2">
                            <label  className="mb-3 block text-base font-medium text-[#07074D]">Start Date*</label>
                            <input type="date" id="startDate" defaultValue={editDetails.startDate}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 font-medium text-[#6B7280] focus:border-[#6A64F1] focus:shadow-md" required/>
                        </div>
                        <div  className="w-full px-3 sm:w-1/2">
                        <div  className="mb-5">
                        <label  className="mb-3 block text-base font-medium text-[#07074D]">End Date*</label>
                            <input type="date" id="endDate" defaultValue={editDetails.endDate}
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
                    
                    <DefaultButton
                        text={'Save'}
                        onPress={onUpdate}
                        disabled={false}/>
                        
                    </div>
                    </form>
                </div>
                </div>
            <FooterContainer />
        </div>
    ) : <></>;
};


export default EditOffer;



          