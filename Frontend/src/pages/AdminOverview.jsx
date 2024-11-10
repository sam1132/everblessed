import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaHandHoldingHeart, FaCalendarAlt } from "react-icons/fa";
import { Pie, Bar,Line } from 'react-chartjs-2';
import { Chart, Filler } from 'chart.js';

// Register the Filler plugin
Chart.register(Filler);
import { Chart as ChartJS, LineElement, PointElement, ArcElement, Title, LinearScale, BarElement, CategoryScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, LinearScale, BarElement, PointElement, Title, ArcElement, CategoryScale, Tooltip, Legend);

const AdminOverview = () => {

  const [selectedCategoryDonationMonth, setSelectedCategoryDonationMonth] = useState('1');

  const [totalCategoryDonationData, setTotalCategoryDonationData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Donations by Category',
        data: [],
        backgroundColor: '#36A2EB',
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  });


  useEffect(() => {
    const fetchCategoryDonationData = async () => {
      try {
        // Send the selected month in the request
        const response = await axios.post('http://localhost:4000/admin/donationEachCategory', {
          month: selectedCategoryDonationMonth,
        });

        // Map the response data into Chart.js format
        const data = response.data;
        const labels = data.map((item) => item._id); // Use donationType as labels
        const counts = data.map((item) => item.count); // Use count as data for the chart

        // Update the state with the chart data
        setTotalCategoryDonationData({
          labels: labels,
          datasets: [
            {
              label: 'Total Donations by Category',
              data: counts,
              backgroundColor: ['#36A2EB', '#1E7FB2', '#004B8C', '#0D4C73', '#7EC8F7'], // Blue color for bars
              borderColor: '#fff', // White border
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    fetchCategoryDonationData();
  }, [selectedCategoryDonationMonth]); // Effect will run whenever `selectedMonth` changes


  const categoryChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        bodyFont: {
          size: 16,
          weight: 'bold',
          family: 'Arial',
          color: 'black',
        },
      },
      legend: {
        labels: {
          font: {
            size: 16,
            weight: 'bold',
            family: 'Arial',
          },
          color: 'blue',
        },
      },
    },
  };

  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/getTotalDonationCount');
        setTotalDonations(response.data.totalDonations); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching total donation count:", error);
      }
    };

    fetchTotalDonations();
  }, []);

  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchDonationData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:4000/admin/getTotalDonationsPerMonth', {
          year: '2024',
        });
  
        if (response.data && Array.isArray(response.data)) {
          const transformedData = response.data.map((item) => ({
            month: item.month,   
            totalAmount: item.totalAmount, 
          }));
  
          const labels = transformedData.map(donation => donation.month); 
          const data = transformedData.map(donation => donation.totalAmount);
  
          setChartData({
            labels: labels,
            datasets: [{
              label: 'Total Donations per Month',
              data: data,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              pointBackgroundColor: '#36A2EB',
              fill: true,
              tension: 0.4,
            }],
          });
  
          setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Month',
                  font: {
                    size: 14,
                    weight: 'bold',
                    family: 'Arial',
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Total Donations',
                  font: {
                    size: 14,
                    weight: 'bold',
                    family: 'Arial',
                  },
                },
                beginAtZero: true,
                ticks: {
                  stepSize: 500,
                },
              },
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  font: {
                    size: 16,
                    weight: 'bold',
                  },
                },
              },
              tooltip: {
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: {
                  size: 16,
                },
                bodyFont: {
                  size: 14,
                },
              },
            },
          });
        }
      } catch (error) {
        console.error("Error fetching donation data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDonationData();
  }, []);
  
  
  
  const [lastMonthDonations, setLastMonthDonations] = useState(0);

  useEffect(() => {
    const fetchLastMonthDonations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/getLastMonthDonationCount');
        console.log(response.data);
        setLastMonthDonations(response.data.lastMonthDonations); 
      } catch (error) {
        console.error("Error fetching last month donation count:", error);
      }
    };

    fetchLastMonthDonations();
  }, []);



  const [totalDonors, setTotalDonors] = useState(0);

  useEffect(() => {
    const fetchTotalDonors = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/getTotalDonorsCount');
        console.log(response.data);
        setTotalDonors(response.data.totalDonors); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching total donors count:", error);
      }
    };

    fetchTotalDonors();
  }, []);


  const [donors, setDonors] = useState([]); // Store the donor data
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    const fetchLatestDonors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/getLatestDonors");
        console.log(response.data);
        setDonors(response.data); // Set fetched donors to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching latest donors:", error);
        setLoading(false);
      }
    };

    fetchLatestDonors(); // Call the fetch function
  }, []); //

  return (
    <>
      {/* Main stats section */}
      <div className="main grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {/* Total Donation */}
        <div className="p-4 bg-[#07c8f9] rounded shadow-md  w-[21.5rem] md:w-full lg:w-full">
          <p className="text-xl lg:text-2xl  text-white font-semibold">Total Donations</p>
          <div className="flex items-center my-5 font-sans font-bold text-xl md:text-2xl">
      <FaHandHoldingHeart className="mr-4 bg-purple-200 text-purple-400 h-10 w-10 p-2 rounded-full" />
      <span className="text-white">{totalDonations}</span>
    </div>
        </div>

        {/* Last month TOTAL Donation */}
        <div className="p-4 bg-[#0a85ed] rounded shadow-md w-[21.5rem] md:w-full lg:w-full">
      <p className="text-xl lg:text-2xl text-white font-semibold">Last Month Donation</p>
      <div className="flex items-center my-5 font-sans font-bold text-xl md:text-2xl">
        <FaCalendarAlt className="mr-4 bg-green-200 text-green-400 h-10 w-10 p-2 rounded-full" />
        <span className="text-white">{lastMonthDonations}</span>
      </div>
    </div>

        {/* TOTAL Donors */}
        <div className="p-4 bg-[#0d41e1] rounded shadow-md w-[21.5rem] md:w-full lg:w-full">
      <p className="text-xl lg:text-2xl text-white font-semibold">Total Donors</p>
      <div className="flex items-center my-5 font-sans font-bold text-xl md:text-2xl">
        <FaUser className="mr-4 bg-orange-200 text-orange-400 h-10 w-10 p-2 rounded-full" />
        <span className="text-white">{totalDonors}</span>
      </div>
    </div>
      </div>

      {/* Other sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Statistics */}
        <div className="lg:col-span-2 p-4 bg-gray-200 rounded shadow-md w-[21.5rem] md:w-full lg:w-full">
          Statistics
          <div className="w-full h-96">
          
      {isLoading ? (
        <p>Loading...</p>
      ) : chartData ? (
        <Bar data={chartData} options={chartOptions} /> // Use Line to render chart
      ) : (
        <p>No data available</p>
      )}
    
          </div>
        </div>

        {/* Fundraiser Status */}
        <div className="p-1 bg-gray-200 rounded shadow-md w-[21.5rem] md:w-full lg:w-full">
          <div className="font-bold text-lg text-center">Donations by Category



            <Pie data={totalCategoryDonationData} options={categoryChartOptions} />
            <p>Last Month</p>
          </div>
        </div>
      </div>

      {/* List of donors */}
      <div className="p-4 w-[21.5rem] md:w-full lg:w-full bg-[#71a9f7] rounded shadow-md mt-4">
      <div className="font-bold mb-2">List of Latest Donors</div>
      <div className="table-auto overflow-x-auto">
        <table className="w-full text-sm bg-[#71a9f7]">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left ">Email</th>
              <th className="px-2 py-1 text-left">Name</th>
              <th className="px-2 py-1 text-left">Campaign</th>
              <th className="px-2 py-1 text-left">Time</th>
              <th className="px-2 py-1 text-left">Donation</th>
            </tr>
          </thead>
          <tbody>  
            {/* Table rows */}
            {loading ? (
              <tr>
                <td colSpan={5} className="border px-2 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : donors.length > 0 ? (
              donors.map((donor, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1 font-semibold text-white">{donor.email}</td>
                  <td className="border px-2 py-1">{donor.name}</td>
                  {/* <td className="border px-2 py-1">{donor.campaign}</td> */}
                  <td className="border px-2 py-1">Doantion for Children</td>
                  <td className="border px-2 py-1">{new Date(donor.time).toLocaleDateString()}</td>  
                  {/* <td className="border px-2 py-1">{donor.time}</td> */}
                  <td className="border px-2 py-1">{donor.donation}</td>
                </tr>
              ))
            ) : (
              <tr>

               <td colSpan={5} className="border px-2 py-4 text-center">
                  No Donors
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
      
    </>
  );
};

export default AdminOverview;
