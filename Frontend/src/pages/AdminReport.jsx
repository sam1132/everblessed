import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, ArcElement, Title, LinearScale, BarElement, CategoryScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, LinearScale, BarElement, PointElement, Title, ArcElement, CategoryScale, Tooltip, Legend);


const AdminReport = () => {

  const [ngoNames, setNgoNames] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');


  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Donations',
      data: [],
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    }],
  });


  useEffect(() => {
    if (selectedNgo && selectedMonth) {
      const fetchDonationData = async () => {
        try {
          // Send both the NGO ID and the selected month in the request body
          const response = await axios.post('http://localhost:4000/admin/getDonations', {
            ngoname: selectedNgo,
            month: selectedMonth,
          });
          const donations = response.data;
          console.log(donations);

          const labels = donations.map(donation => donation._id); // Assuming donations have a '_id' field for date
          const data = donations.map(donation => donation.count); // Assuming donations have 'totalAmount'

          setChartData({
            labels: labels,
            datasets: [{
              label: `Donations to ${selectedNgo}`,
              data: data,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            }],
          });
        } catch (error) {
          console.error("Error fetching donation data:", error);
        }
      };

      fetchDonationData();
    }
  }, [selectedNgo, selectedMonth]);



  useEffect(() => {

    const fetchNgoNames = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/ngolist');
        console.log(response) // Adjust API URL if needed
        setNgoNames(response.data);
      } catch (error) {
        console.error("Error fetching NGO names:", error);
      }
    };
    fetchNgoNames();
  }, []);


  const [NGOTypeData, setNGOTypeData] = useState({
    labels: [],
    datasets: [{
      label: "NGO Types",
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7B7A3'], // Adjust as needed
      borderColor: '#fff',
      borderWidth: 1,
    }],
  });


  useEffect(() => {
    const fetchNGOTypeData = async () => {
      try {
        // Send both the NGO ID and the selected month in the request body
        const response = await axios.get('http://localhost:4000/admin/getNGOTypes');
        const donations = response.data;
        console.log(donations);

        const labels = donations.map(donation => donation._id); // Assuming donations have a '_id' field for date
        const data = donations.map(donation => donation.count); // Assuming donations have 'count'

        setNGOTypeData({
          labels: labels,
          datasets: [{
            label: "Types",
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7B7A3'], // Pie chart background colors
            borderColor: '#fff',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    fetchNGOTypeData();

  }, []);

  const pieoptions = {
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
            size: 16, // Legend label font size
            weight: 'bold', // Legend label font weight
            family: 'Arial', // Legend label font family
          },
          color: 'blue', // Legend label color
        },
      },
    },
  };


  const [selectedDonationStatusMonth, setSelectedDonationStatusMonth] = useState('1');

  const [statusData, setStatusData] = useState({
    labels: [],
    datasets: [{
      label: "Donation Types",
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      borderColor: '#fff',
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    // If no month is selected, skip the fetch
    if (!selectedDonationStatusMonth) {
      console.log("No month selected, skipping fetch.");
      return;
    }

    const fetchStatusData = async () => {
      try {
        // Send the selected month in the request body
        const response = await axios.post('http://localhost:4000/admin/getDonationStatus', {
          month: selectedDonationStatusMonth,
        });

        const donations = response.data;
        console.log(donations);

        // If no donations are found, log a message and exit
        if (donations && donations.length === 0) {
          console.log('No donations found for this month.');
          return;
        }

        // Prepare labels and data for the donut chart
        const labels = donations.map(donation => donation._id); // Using _id for labels
        const data = donations.map(donation => donation.count); // Using count for data

        // Update the chart data state
        setStatusData({
          labels: labels,
          datasets: [{
            label: "Donation Types",
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: '#fff',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    // Call the fetchStatusData function
    fetchStatusData();

  }, [selectedDonationStatusMonth]); // Run the effect when the selected month changes

  // Options for the donut chart
  const donutOptions = {
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
    cutout: '60%', // Creates a donut shape
  };

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
              backgroundColor: '#36A2EB', // Blue color for bars
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



  const [donationNeedChartData, setDonationNeedChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Things Needed',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',  // Bar color
      borderColor: 'rgba(54, 162, 235, 1)',  // Border color
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    const fetchNeedData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/getDonationNeed');
        const data = response.data;

        // Map the fetched data to the chart's format
        const labels = data.map(item => item._id);  // Extract thing names (e.g., Food, Water, etc.)
        const counts = data.map(item => item.count);  // Extract counts of donations

        // Update the chartData state with the labels and counts
        setDonationNeedChartData({
          labels: labels,
          datasets: [{
            label: 'Things Needed',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',  // Bar color
            borderColor: 'rgba(54, 162, 235, 1)',  // Border color
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error("Error fetching donation need data:", error);
      }
    };

    fetchNeedData();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  const needoptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} requests`,  // Format tooltip text
        },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,  // Ensures that the X-axis starts from 0
        title: {
          display: true,
          text: 'Required Items',  // X-axis label
        },
      },
      y: {
        beginAtZero: true,  // Ensures that the Y-axis starts from 0
        title: {
          display: true,
          text: 'Donation Count',  // Y-axis label
        },
      },
    },
  };


  const [locationPickup, setLocationPickup] = useState([]);
  const [locationMonth, setLocationMonth] = useState('1');  // Default to January

  useEffect(() => {
    const fetchLocationPickupData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/admin/getDonationsAccToPickupLocation', {
          month: locationMonth,
        });
        setLocationPickup(response.data);  // Store the data in state
      } catch (error) {
        console.error("Error fetching donations by location:", error);
      }
    };

    fetchLocationPickupData();
  }, [locationMonth]);  // Fetch data whenever locationMonth changes



  
  
      const [topdonorMonth, setTopDonorMonth] = useState('1');
      const [topDonors, setTopDonors] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
  
      useEffect(() => {
          const fetchTopDonors = async () => {
              if (!locationMonth) return;
  
              setLoading(true);
              setError('');
              
              try {
                  const response = await axios.post('http://localhost:4000/admin/getTopDonors', { month: topdonorMonth });
                  setTopDonors(response.data);
              } catch (err) {
                  console.error('Error fetching data:', err);
                  setError('Failed to fetch data');
              } finally {
                  setLoading(false);
              }
          };
  
          fetchTopDonors();
      }, [topdonorMonth]); 

  return (
    <div className="grid gap-2 h-screen">
      <div className="NGO flex gap-3">
        <div className="barchartNGO w-1/2 bg-blue-400 rounded-sm p-3">
          
        <label htmlFor="month" className="text-white">Choose a Month:</label>
              <select
                  name="month"
                  id="month"
                  value={topdonorMonth}
                  onChange={(e) => setTopDonorMonth(e.target.value)}
                  className="block mb-4 p-2 rounded bg-white text-black"
              >
                  <option value="">Select Month</option>
                  {[...Array(12)].map((_, i) => (
                      <option key={i} value={i + 1}>
                          {new Date(0, i).toLocaleString('default', { month: 'long' })}
                      </option>
                  ))}
              </select>
  
              {loading ? (
                  <div className="text-white">Loading...</div>
              ) : error ? (
                  <div className="text-white">{error}</div>
              ) : (
                <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-white">
                    <thead className="sticky top-0 bg-blue-800">
                        <tr>
                            <th className="border-b-2 px-4 py-2">Name</th>
                            <th className="border-b-2 px-4 py-2">Email</th>
                            <th className="border-b-2 px-4 py-2">Donation Count</th>
                        </tr>
                    </thead>
                    <tbody>
                            {/* Map through topDonors to render data */}
                            {topDonors.map((donor, index) => (
                                <tr key={index} className="border-b">
                                    <td className="border-b px-4 py-2">{donor.user.name}</td>
                                    <td className="border-b px-4 py-2">{donor.user.email}</td>
                                    <td className="border-b px-4 py-2 text-center">{donor.donationCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        <div className="NGOTypes w-1/2 bg-blue-100 rounded-sm p-3">
          <h3>Total NGOs According to Type</h3>
          {/* Render Pie Chart */}
          <Pie data={NGOTypeData} options={pieoptions} />
        </div>

      </div>


      <div className="User flex-auto">
        <div className="DonationStatus w-full bg-blue-300 rounded-sm p-3 h-full">
          <h2>Bar Chart of Donations to an NGO</h2>

          <label htmlFor="ngos">Choose an NGO:</label>
          <select
            name="ngos"
            id="ngos"
            value={selectedNgo}
            onChange={(e) => setSelectedNgo(e.target.value)}
          >
            <option value="">Select an NGO</option>
            {ngoNames.map((ngo) => (
              <option key={ngo._id} value={ngo.ngoname}>
                {ngo.ngoname}
              </option>
            ))}
          </select>

          <label htmlFor="month">Choose a Month:</label>
          <select
            name="month"
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>

          {/* Render Line Chart */}
          <div className="chart-container mt-6">
            {selectedNgo && selectedMonth && (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {

                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Date',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Amount ($)',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-1 h-96">
        <div className="Donors flex-1 flex flex-col gap-2">
          <div className="topdonors px-3 py-4  bg-blue-500 rounded-sm">

            <label htmlFor="month">Choose a Month:</label>
            <select
              name="month"
              id="month"
              value={selectedDonationStatusMonth}
              onChange={(e) => setSelectedDonationStatusMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <h2>Donation Status by Month</h2>
            {/* Render Donut Chart */}
            <Pie data={statusData} options={donutOptions} />
          </div>


          <div className="topDonationsEachCategory px-3 py-4 flex-1  bg-blue-200 rounded-sm">
            Total Donations in Each category
            <label htmlFor="month">Choose a Month:</label>
            <select
              name="month"
              id="month"
              value={selectedCategoryDonationMonth}
              onChange={(e) => setSelectedCategoryDonationMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <Bar data={totalCategoryDonationData} options={categoryChartOptions} />
          </div>
        </div>

        <div className="Donors flex-1 flex flex-col gap-2 ">
          <div className="DonationNeed px-3 py-4 flex-1  bg-blue-100 rounded-sm">

            <h2>Bar Chart for Things Needed</h2>
            <Bar data={donationNeedChartData} options={needoptions} />
          </div>

          <div className="DonationAccToPickupLocation w-full whitespace-normal bg-blue-700 rounded-sm p-3">
            Donations acc to pickup location
            <label htmlFor="month">Choose a Month:</label>
            <select
              name="month"
              id="month"
              value={locationMonth}
              onChange={(e) => setLocationMonth(e.target.value)}
              className="mt-2 p-2 bg-white border border-gray-300 rounded"
            >
              <option value="">Select Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>

            {/* List with max height and scrollable */}
            <div className="mt-3 max-h-80 overflow-y-auto">
              <table className="min-w-full table-auto text-white">
                <thead className="sticky -top-2 bg-blue-700">
                  <tr>
                    <th className="border-b-2 px-4 py-2">Pickup Location</th>
                    <th className="border-b-2 px-4 py-2">Donations Count</th>
                  </tr>
                </thead>
                <tbody>
                  {locationPickup.map((location, index) => (
                    <tr key={index}>
                      <td className="border-b px-4 py-2">{location._id}</td>
                      <td className="border-b px-4 py-2 text-center">{location.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminReport;
