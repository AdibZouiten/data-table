import React, { useEffect , useState } from 'react';
import axios from 'axios';
import './Table.css';



function Table() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);   

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://sheet.best/api/sheets/19ee97b6-68ab-485c-bd50-db7b1a82a808`);
            setData(response.data);
            setFilteredData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
    }, []);

    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        const filtered = data.filter(item => 
          item.Name.toLowerCase().includes(value) || 
          item.Email.toLowerCase().includes(value) || 
          item.Handle.toLowerCase().includes(value) || 
          item.Category.toLowerCase().includes(value) || 
          item.Url.toLowerCase().includes(value) ||
          item.Platform.toLowerCase().includes(value) ||
          item.Followers.toLowerCase().includes(value) ||
          item.Bio.toLowerCase().includes(value) 
        );
        setFilteredData(filtered);
    };

    return (
        <div>
            <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
                <div>
                <h2 class="text-2xl font-semibold leading-tight">Influencers Database</h2>
                </div>
                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div
                    class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                >
                <input type="text" placeholder='Search...' onChange={handleFilter}  class="form-input px-5 py-3 mx-5 my-3 search-bar"/>
                    <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Influencer
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Followers
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Platform
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Category
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Email
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Bio
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Url
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                        ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.email}>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div class="flex">
                                    <div class="ml-3">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                        {item.Name}
                                        </p>
                                        <p class="text-gray-600 whitespace-no-wrap">{item.Handle}</p>
                                    </div>
                                    </div>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{item.Followers}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{item.Platform}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{item.Category}</p>
                                </td>
                                <td class="px-1 py-5  border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{item.Email}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{item.Bio}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <a href={item.Url}>
                                    <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        <i class="fa-solid fa-link px-1 "></i>
                                        View
                                    </button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Table