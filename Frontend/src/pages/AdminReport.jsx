import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie, Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Chart as ChartJS, LineElement, PointElement, ArcElement, Title, LinearScale, BarElement, CategoryScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(ChartDataLabels, LineElement, LinearScale, BarElement, PointElement, Title, ArcElement, CategoryScale, Tooltip, Legend);


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


  const [chartOptions, setChartOptions] = useState({});

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

          // Extract labels and data from the response
          const labels = donations.map(donation => donation._id);
          const data = donations.map(donation => donation.count);

          // Update chart data with dynamic labels and data
          setChartData({
            labels: labels,
            datasets: [{
              label: `Donations to ${selectedNgo} in ${selectedMonth}`,
              data: data,
              borderColor: '#2196f3',
              backgroundColor: 'rgba(33, 150, 243, 0.2)',
              borderWidth: 2,
              fill: true, // Filling under the line (optional, you can set this to false if you prefer a line chart)
              tension: 0.4, // Smooth curve (optional)
            }],
          });

          // Set chart options with customization
          setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  font: {
                    size: 16,
                    weight: 'bold',
                    family: 'Arial',
                  },
                  color: '#0d47a1',
                },
              },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: (tooltipItem) => {
                    return `Total Donations: $${tooltipItem.raw}`;
                  },
                },
              },
              // Disable data labels for this chart
              datalabels: {
                display: false, // Hide data labels
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                  font: {
                    size: 20,
                    weight: 'bold',
                    family: 'Arial',
                  },
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Donated Quantity',
                },
                ticks: {
                  beginAtZero: true,
                  stepSize: 50,
                },
              },
            },
            animation: {
              duration: 1000,
            },
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
      backgroundColor: ['#a9d6e5', '#61a5c2', '#2c7da0', '#014f86', '#01497c', '#012a4a'],
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
            backgroundColor: ['#a9d6e5', '#61a5c2', '#2c7da0', '#014f86', '#01497c', '#012a4a'],
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
          family: 'Segoe UI',
          color: 'black',
        },
      },
      legend: {
        labels: {
          font: {
            size: 14, // Legend label font size
            weight: 'bold', // Legend label font weight
            family: 'Poppins', // Legend label font family
          },
          color: '#004e89', // Legend label color
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
            backgroundColor: ['#0466c8', '#023e7d', '#001233'],
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
            size: 18,
            weight: 'bold',
            family: 'Poppins',
          },
          color: '#031d44',
        },
      },
    },
    cutout: '50%', // Creates a donut shape
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
              backgroundColor: ['#64b5f6', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#031d44'], // Blue color for bars
              borderColor: '#fff',
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
        enabled: true, // Tooltips can still be enabled for additional info on hover
      },
      legend: {
        display: true,
        labels: {
          font: {
            size: 16,
            weight: 'bold',
            family: 'Arial',
          },
          color: 'blue',
        },
      },
      datalabels: {
        display: true,
        color: 'black', // Label color
        anchor: 'end',   // Position the label on top of the bar
        align: 'end',    // Align the label to the top
        font: {
          size: 14,
          weight: 'bold',
        },
        formatter: (value) => value, // Format to display the actual value
      },
    },
    scales: {
      y: {
        display: false, // Remove the Y-axis
      },
      x: {
        grid: {
          display: false,
          font: {
            size: 20
          } // Remove gridlines from X-axis if needed
        },
        title: {
          display: true,
          text: 'Donation Categories',
          font: {
            size: 16,
            weight: 'bold',
            family: 'Arial',
          },
          color: 'black',
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
            backgroundColor: ['#91e5f6', '#84d2f6', '#59a5d8', '#386fa4', '#133c55'],
            borderColor: 'white',  // Border color
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
        labels: {
          font: {
            size: 20, // Set the font size of the legend labels
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,  // Ensures that the X-axis starts from 0
        title: {
          display: true,
          text: 'Required Items',  // X-axis label
          font: {
            size: 18, // Font size of the X-axis label
          },
        },
        ticks: {
          font: {
            size: 14, // Font size of the X-axis tick values
          },
        },
      },
      y: {
        beginAtZero: true,  // Ensures that the Y-axis starts from 0
        title: {
          display: true,
          text: 'Count',  // Y-axis label
          font: {
            size: 18, // Font size of the Y-axis label
          },
        },
        ticks: {
          font: {
            size: 14, // Font size of the Y-axis tick values
          },
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
    <div className="grid gap-2 h-screen " >
      <div className="NGO flex gap-3">
        <div className="barchartNGO w-1/2 bg-blue-500 rounded-sm p-3">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-white text-xl">Top Donors</p>
            <div>
              <label htmlFor="month" className="text-white font-medium mr-2">Choose a Month:</label>
              <select
                name="month"
                id="month"
                value={topdonorMonth}
                onChange={(e) => setTopDonorMonth(e.target.value)}
                className="p-2 rounded bg-white text-black"
              >
                <option value="">Select Month</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
          <p className='font-bold text-blue-900 text-center text-xl'>Total NGOs According to Type</p>
          <hr className="border-t-4 border-gray-300 mb-4 mt-2 bg-blue-900" />
          {/* Render Pie Chart */}
          <Pie data={NGOTypeData} options={pieoptions} />
        </div>

      </div>

      <div className="User flex-auto">
        <div className="DonationStatus w-full px-5 py-5 bg-blue-100 rounded-md p-3 h-full">
          <h2 className="font-semibold text-lg mb-4">NGO Donations</h2>

          {/* Dropdown container with Flexbox */}
          <div className="flex justify-between items-center mb-4">
            {/* NGO Dropdown on the Left */}
            <div className="w-1/2 mr-2">
              <label htmlFor="ngos" className="block text-gray-700 font-medium">Choose an NGO:</label>
              <select
                name="ngos"
                id="ngos"
                value={selectedNgo}
                onChange={(e) => setSelectedNgo(e.target.value)}
                className="w-full p-2 rounded bg-white border border-gray-300"
              >
                <option value="">Select an NGO</option>
                {ngoNames.map((ngo) => (
                  <option key={ngo._id} value={ngo.ngoname}>
                    {ngo.ngoname}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Dropdown on the Right */}
            <div className="w-1/2 ml-2">
              <label htmlFor="month" className="block text-gray-700 font-medium">Choose a Month:</label>
              <select
                name="month"
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full p-2 rounded bg-white border border-gray-300"
              >
                <option value="">Select Month</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Render Line Chart */}
          <div className="chart-container mt-6">
            {selectedNgo && selectedMonth && (
              <Line
                data={chartData}
                options={chartOptions}
              />
            )}
          </div>
        </div>
      </div>


      <div className="flex space-x-1 h-96">
        <div className="Donors flex-1 flex flex-col gap-2">
          <div className="topdonors px-3 py-4 bg-blue-100 rounded-sm">
            {/* Flex container for alignment */}
            <div className="flex justify-between items-center mb-4">
              {/* Donation Status text on the left */}
              <h2 className="text-lg font-semibold">Donation Status by Month</h2>

              {/* Container for label and dropdown on the right */}
              <div className="flex items-center">
                <label htmlFor="month" className="text-gray-700 font-medium ml-16">Choose a Month:</label>
                <select
                  name="month"
                  id="month"
                  value={selectedDonationStatusMonth}
                  onChange={(e) => setSelectedDonationStatusMonth(e.target.value)}
                  className="p-2 rounded bg-white border border-gray-300"
                >
                  <option value="">Select Month</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Render Donut Chart */}
            <Pie data={statusData} options={donutOptions} />
          </div>




          <div className="topDonationsEachCategory px-3 py-4 flex-1 bg-blue-200 rounded-sm mb-6">
            <div className="flex items-center justify-between mb-2 ml-20">
              <h2 className="font-bold">Total Donations in Each Category</h2>
              <div>
                <label htmlFor="month" >Choose a Month:</label>
                <select
                  name="month"
                  id="month"
                  value={selectedCategoryDonationMonth}
                  onChange={(e) => setSelectedCategoryDonationMonth(e.target.value)}
                  className="p-2 rounded"
                >
                  <option value="">Select Month</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Bar data={totalCategoryDonationData} options={categoryChartOptions} />
          </div>

        </div>

        <div className="Donors flex-1 flex flex-col gap-2 ">
          <div className="DonationNeed px-3 py-4 flex-1  bg-blue-100 rounded-sm">

            <h2 className='text-center text-lg font-semibold'>Bar Chart for Things Needed</h2>
            <Bar data={donationNeedChartData} options={needoptions} />
          </div>
          <div className="DonationAccToPickupLocation w-full whitespace-normal bg-blue-700 rounded-sm p-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white text-lg font-semibold mr-20">Donations acc to pickup location</span>
              <div>
                <label htmlFor="month" className="text-white ">Choose a Month:</label>
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
              </div>
            </div>

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
