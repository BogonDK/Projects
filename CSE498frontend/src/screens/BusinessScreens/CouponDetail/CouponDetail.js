import React from 'react';
import PageHeader from '../../../components/PageHeader/PageHeader';
import EmbeddedCalendar from "../../../components/EmbeddedCalendar";
import styles from './CouponDetail.css';
import { FooterContainer } from '../../../containers/footer';
import { getDashboard, getTable } from '../../../actions/businessDasboardAction';
import { json, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const coupondetails = () => {

    const navigate = useNavigate();

    return (
        <div align="center">
            <PageHeader screen={'/coupondetail'} />
            <div className="outline outline-2 outline-gray-200 rounded-lg px-2 mx-16">

                <div className=" space-x-6 flex items-center  justify-center p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                    <h3 className="flex items-left text-left text-gray-800 py-10 ml-2 text-5xl font-bold font-small leading-tight">Store Name</h3>
                    <div className="pl-4 py-16 mx-auto w-fit">
                        <div className="grid grid-cols-2 row-gap-8 md:grid-cols-4">
                            <div className="text-center px-3">
                                <h6 className="text-4xl font-bold text-purple-500 py-2">1,000</h6>
                                <p className="text-sm font-medium tracking-normal text-gray-800 uppercase lg:text-base">
                                    Total Redemptions
                                </p>
                            </div>
                            <div className="text-center px-3">
                                <h6 className="text-4xl font-bold text-purple-500 py-2">300</h6>
                                <p className="text-sm font-medium tracking-normal text-gray-800 uppercase lg:text-base">
                                    New Redemptions
                                </p>
                            </div>
                            <div className="text-center px-3">
                                <h6 className="text-4xl font-bold text-purple-500 py-2">34,300</h6>
                                <p className="text-sm font-medium tracking-normal text-gray-800 uppercase lg:text-base">
                                    Redemption amount
                                </p>
                            </div>
                            <div className="text-center px-3">
                                <h6 className="text-4xl font-bold text-purple-500 py-2">4</h6>
                                <p className="text-sm font-medium tracking-normal text-gray-800 uppercase lg:text-base">
                                    Offers released
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex items-center justify-between pt-2 w-full px-20'>
                <h2 className="justify-font-medium text-xl text-gray-900 pl-20 font-bold font-small">Coupon Details</h2>
                <button className='create' onClick={()=> navigate('/editoffer')}>Edit Offer</button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 flex justify-center">
                <table className=" text-sm text-left w-1/5 justify-start">
                    <thead className="text-lg uppercase bg-gray-50 border-b">
                        <tr>
                            <th scope="col" className="px-6 py-3  text-purple-400">
                                Labour Day
                            </th>
                            <td className="px-6 py-4">
                                SALE#8923
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-50 border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Offer Name
                            </th>
                            <td className="px-6 py-4">
                                Labour Day
                            </td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Availble On
                            </th>
                            <td className="px-6 py-4">
                                Online
                            </td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                NO. of products
                            </th>
                            <td className="px-6 py-4">
                                24
                            </td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Promotion Applied
                            </th>
                            <td className="px-6 py-4">
                                20%
                            </td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Terms and Conditions
                            </th>
                            <td className="px-6 py-4">
                                N/A
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="flex flex-col place-content-center items-center w-4/5 mt-5 bg-white px-5 py-5">
                <h2 className="text-xl font-bold pb-5">Coupons Used</h2>
                <div className="flex items-end flex-grow w-fit mt-2 pt-4 mx-3">
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">50</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-20 bg-purple-400"></div>	
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Oct 31</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">12</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-10 bg-purple-400"></div>		
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Nov 07</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">100</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-40 bg-purple-400"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Nov 14</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">10</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-5 bg-purple-400"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Nov 21</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">230</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-60 bg-purple-400"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Nov 28</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">50</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-20 bg-purple-400"></div>	
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Dec 05</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">12</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-10 bg-purple-400"></div>		
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Dec 12</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">100</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-40 bg-purple-400"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Dec 19</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">10</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-5 bg-purple-400"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Dec 26</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group w-16">
                        <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">230</span>
                        <div className="flex items-end w-8 pb-5">
                            <div className="relative flex justify-center flex-grow h-60 bg-purple-400"></div>
                        </div>
                        <span className="absolute bottom-0 text-xs font-bold">Jan 02</span>
                    </div>


                    
                </div>
            </div>

            </div>

            {/* bar graph */}


            {/* Competitive Analysis */}
            <div className='flex items-center justify-between pt-2 w-full px-20 py-5 mt-5'>
                <h2 className="justify-font-medium text-xl text-gray-900 pl-20 font-bold font-small">Transaction View</h2>
            </div>
            
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 flex justify-center">
                <table className=" text-sm text-left w-full">
                    <thead className="text-xs text-black uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Calvin Bouch
                            </th>
                            <td className="px-6 py-4">
                                Sept 04 2022 14:42
                            </td>
                            <td className="px-6 py-4">
                                New
                            </td>
                            <td className="px-6 py-4">
                                Online
                            </td>
                            <td className="px-6 py-4">
                                3
                            </td>
                            <td className="px-6 py-4">
                                $123.99
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Debbie Windler
                            </th>
                            <td className="px-6 py-4">
                                Sept 12 2022 10:23
                            </td>
                            <td className="px-6 py-4">
                                Existing
                            </td>
                            <td className="px-6 py-4">
                                Store
                            </td>
                            <td className="px-6 py-4">
                                4
                            </td>
                            <td className="px-6 py-4">
                                $5632.00
                            </td>
                        </tr>                        
                        <tr className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Holly Beler
                            </th>
                            <td className="px-6 py-4">
                                Sept 24 2022 16:20
                            </td>
                            <td className="px-6 py-4">
                                Existing
                            </td>
                            <td className="px-6 py-4">
                                Online
                            </td>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4">
                                $431.99
                            </td>
                        </tr>                        
                        <tr className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Lillie Kihn
                            </th>
                            <td className="px-6 py-4">
                                Sept 03 2022 12:20
                            </td>
                            <td className="px-6 py-4">
                                Existing
                            </td>
                            <td className="px-6 py-4">
                                Online
                            </td>
                            <td className="px-6 py-4">
                                2
                            </td>
                            <td className="px-6 py-4">
                                $2831.99
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='pt-5 justify-center'>
                <button className='create' onClick={()=> navigate('/calendar')}>Back to Home Screen</button>
            </div>
            {/* <EmbeddedCalendar /> */}
            <FooterContainer />
        </div>
        
        
        
    );
};

export default coupondetails;