import PageHeader from '../../../components/PageHeader/PageHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton'
import axios from 'axios';
import EmbeddedCalendar from "../../../components/EmbeddedCalendar";
import { getDashboard, getTable, deleteOffer } from '../../../actions/businessDasboardAction';
import { json, useNavigate } from 'react-router-dom';
import styles from './Calendar.css';
import { FooterContainer } from '../../../containers/footer';
import { useEffect, useState } from 'react';

import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS
  } from 'chart.js/auto';

const calendar = () => {

    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [dashboardTotals, setData] = useState(null);
    const [tableOffers, setTable] = useState(null);
    const [tableList, setTableList] = useState(null);
    const [graphData, setGraphData] = useState(null);

    const OnDelete = async (offer) => {

        let text = "Are you sure you want to delete?";
        if (confirm(text) == true) {
            const data = {
                offerId: offer,
            }
            await deleteOffer(data);

            // Once the offer is deleted we need to get the updated list of offers
            // Setting the below values will cause the useEffect to run again and reset the values
            setInitialized(false);
            setTable(null);
            setTableList(null);
            setGraphData(null);
        } else {
            return
        }
    };

    useEffect(() => {
        if (!userProfile) {
            setUserProfile(JSON.parse(window.localStorage.userProfile));
        }

        if (userProfile && dashboardTotals && tableOffers) {
            // We have everything initialized
            setInitialized(true);
        }

        const dashboard = async() => {
            const businessId = JSON.parse(window.localStorage.userProfile).id
            const dashboardInfo = await getDashboard(businessId);
            setData(JSON.parse(dashboardInfo));

        }

        const table = async() => {
            const businessId = JSON.parse(window.localStorage.userProfile).id
            const tableInfo = await getTable(businessId);
            setTable(JSON.parse(tableInfo));
        }


        if(!dashboardTotals){
            dashboard();
        }

        if(!tableOffers){
            table();
        }


        function comp(a, b) {
            return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        }
        
        function compT(a) {
            return new Date().getTime() < new Date(a.endDate).getTime();
        }

        if(!tableList && tableOffers){

            var tableLst = []
            
            tableOffers.sort(comp);

            for (var i = 0; i < tableOffers.length; i++){
                const id = tableOffers[i].id
                if (compT(tableOffers[i])){
                    var row = <tr  className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">  
                                <td className="px-4 py-4 flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{tableOffers[i].title}
                                </td>
                                <td className="px-4 py-4">{tableOffers[i].offerCode}</td>
                                <td className="px-4 py-4">{tableOffers[i].description}</td>
                                <td className="px-4 py-4">{(new Date(tableOffers[i].startDate)).toDateString()}</td>
                                <td className="px-4 py-4">{(new Date(tableOffers[i].endDate)).toDateString()}</td>
                                <td className="px-6 py-4">{tableOffers[i].clips}</td>
                                <td className="px-6 py-4">{tableOffers[i].redemptions}</td>
                                <td className="px-2 py-2"><button id="edit" className=' hover:bg-violet-500 hover:scale-105 active:bg-violet-600' onClick={()=> navigate(`/editoffer/${id}`)}>Edit</button></td>
                                <td className="px-2 py-2"><button id="delete" className=' hover:bg-violet-500 hover:scale-105 active:bg-violet-600' onClick={() => OnDelete(id)}>Delete</button></td>
                          </tr>
                tableLst.push(row)
                }
                else{
                    var row = <tr  className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">  
                                <td className="px-4 py-4 flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{tableOffers[i].title}
                                </td>
                                <td className="px-4 py-4">{tableOffers[i].offerCode}</td>
                                <td className="px-4 py-4">{tableOffers[i].description}</td>
                                <td className="px-4 py-4">{(new Date(tableOffers[i].startDate)).toDateString()}</td>
                                <td className="px-4 py-4">{(new Date(tableOffers[i].endDate)).toDateString()}</td>
                                <td className="px-6 py-4">{tableOffers[i].clips}</td>
                                <td className="px-6 py-4">{tableOffers[i].redemptions}</td>
                                <td className="px-2 py-2"><button id="edit" className=' hover:bg-violet-500 hover:scale-105 active:bg-violet-600' onClick={()=> navigate(`/editoffer/${id}`)}>Edit</button></td>
                                <td className="px-2 py-2"><button id="delete" className=' hover:bg-violet-500 hover:scale-105 active:bg-violet-600' onClick={() => OnDelete(id)}>Delete</button></td>
                          </tr>
                tableLst.push(row)
                }
                
            }   

            setTableList(tableLst);
        }


        if(!graphData && tableOffers){

            var graphLst = []

            for (var i = 0; i < tableOffers.length; i++){
                var row = <div className="relative flex flex-col items-center flex-grow pb-5 group w-16 h-fit">
                                <span className="absolute top-0 -mt-6 text-xs font-bold group-hover:block">{tableOffers[i].redemptions}</span>
                                <div className="flex items-end w-10 pb-20 h-fit">
                                    <div className={`relative flex justify-center flex-grow h-[${30}px] graph`}></div> 	
                                </div>
                                <span className="absolute text-xs font-medium mt-12">{tableOffers[i].title}</span>
                            </div>
                graphLst.push(row)
            }   

            const data = {
                labels: [],
                datasets: [
                    {
                        label: 'Saves',
                        backgroundColor: 'rgba(220,220,220,1)',
                        data: []
                      },
                    {
                        label: 'Redemptions',
                        backgroundColor: 'rgba(75,192,192,1)',
                        data: []
                    }
                ]
              }
            for (var i = 0; i < tableOffers.length; i++){
                data.labels.push(tableOffers[i].title)
                data.datasets[0].data.push(tableOffers[i].clips)
                data.datasets[1].data.push(tableOffers[i].redemptions)
            }
            
            setGraphData(data);

        }

        
    }, [initialized, userProfile, window.localStorage.userProfile, dashboardTotals, tableOffers]);
                    



    return initialized ? (
        <div>
            <PageHeader screen={'/calendar'}/>
            <div className="outline outline-2 outline-gray-200 rounded-lg px-2 mx-16 hover:shadow-lg">
                <div className=" space-x-6 flex items-center  justify-around p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                    <h3 className="flex items-left text-left text-gray-800 py-8 ml-2 text-4xl font-bold font-small leading-tight">{userProfile.businessName}</h3>
                    <div className="pl-4 py-16 mx-auto w-fit">
                        <div className="grid grid-cols-2 row-gap-8 md:grid-cols-3">
                            <div className="text-center px-3">
                                <h6 className="total text-4xl font-bold py-2">{dashboardTotals.offers_total}</h6>
                                <p className="text-sm font-medium tracking-normal text-gray-800 uppercase lg:text-base">
                                    Offers released
                                </p>
                            </div>
                            <div className="text-center px-3">
                                <h6 className="total text-4xl font-bold py-2">{dashboardTotals.savings_total}</h6>
                                <p className="text-sm font-medium tracking-normal text-gray-800 uppercase lg:text-base">
                                    Offers Saved
                                </p>
                            </div>
                            <div className="text-center px-3">
                                <h6 className="total text-4xl font-bold py-2">{dashboardTotals.redemptions_total}</h6>
                                <p className="text-sm font-medium tracking-normal text-gray-800 uppercase lg:text-base">
                                    Offers Redeemed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex justify-end pr-10 mt-10">
                <DefaultButton size="small" text={'Create Offer'} onPress={()=> navigate('/createoffer')}/>
            </div>

            <div align="center">

            <div className='flex items-center justify-between pt-2 w-full pl-20'>
                <h2 className="justify-font-medium text-xl text-gray-900 pl-20 font-bold font-small py-5">Offers List</h2>
                <div className='flex items-center justify-end w-fit px-2'>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1 flex items-center"></div>
                    <h2 className="text-md flex items-center pr-4">Active</h2>
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-1 flex items-center"></div>
                    <h2 className="text-md flex items-center pr-16">Expired</h2>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-fit flex justify-center hover:shadow-xl">
                <table className=" text-sm text-left px-6">
                    <thead className="text-xs text-black uppercase bg-gray-50 dark:text-gray-600">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Start Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                End Date
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Saved
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Redeemed
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Edit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>

                    <tbody id="table">
                        {tableList}
                    </tbody>

                </table>
            </div>
            </div>
            

            <div className ="h-full " align="center">
                <div className='flex items-center justify-between pt-2 w-full px-20'>
                    <h2 className="justify-font-medium text-xl text-gray-900 pl-20 font-bold font-small py-5">Business Analysis</h2>
                </div>

                <div className="flex flex-col items-center w-4/5 mt-5 bg-white rounded-lg shadow-lg hover:shadow-xl px-5 py-5">
                    <h2 className="text-xl font-bold pb-5">Redeem Count</h2>
                    <div className="flex items-end flex-grow w-full h-[60vh] mt-2 pt-4 pb-4 mx-3">
                        {/* {graphList} */}
                        <Bar className='bar w-full h-full'
                            data={graphData}
                            options={{
                                maintainAspectRatio:false,
                                title:{
                                display:true,
                                text:'Offer redeem detail',
                                fontSize:15
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                            />
                    </div>
                </div>
            </div>

            <FooterContainer />
        </div>

        
        
        
    ) : <></>;
};

export default calendar;