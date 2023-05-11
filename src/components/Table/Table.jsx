import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";

import './Table.css';



function Table() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [sorting, setSorting] = useState({ column: null, order: 'asc' });
    


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


    if (!data) {
        return <div>Loading...</div>;
    }



    const sortTable = (column) => {
        const newOrder = sorting.column === column && sorting.order === 'asc' ? 'desc' : 'asc';
        const sortedData = [...data].sort((a, b) => {
            if (column === 'Followers') {
                return sorting.order === 'asc' ? a[column] - b[column] : b[column] - a[column];
              }
            if (a[column] < b[column]) return sorting.order === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return sorting.order === 'asc' ? 1 : -1;
            return 0;
        });
        setSorting({ column, order: newOrder });
        setData(sortedData);
        setFilteredData(sortedData);
    };



    


    return (
        <div>
            <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className='flex justify-between px-4'>
                <h2 className="text-2xl font-semibold leading-tight">Influencers Database</h2>
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <i className="fa-solid fa-file-arrow-down mx-1"></i>
                    <CSVLink data={data} filename="Influencer-data.csv">Export as CSV</CSVLink>
                </button>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div
                    className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                >
                <input type="text" placeholder='Search...' onChange={handleFilter}  className="form-input px-5 py-3 mx-5 my-3 search-bar"/>      
                    <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                        <th onClick={() => sortTable('Name')}
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Influencer {sorting.column === 'Name' ? sorting.order === 'asc' ? '▲' : '▼' : '-'}
                        </th>
                        <th onClick={() => sortTable('Followers')}
                            className="Followers px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Followers {sorting.column === 'Followers' ? sorting.order === 'asc' ? '▲' : '▼' : '-'}
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Platform
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Category
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Email
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Bio
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Url
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                        ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.email}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                        {item.Name}
                                        </p>
                                        <p className="text-gray-600 whitespace-no-wrap">{item.Handle}</p>
                                    </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{item.Followers}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {(() => {
                                    switch (item.Platform) {
                                        case 'Tik Tok':
                                            return (
                                            <span
                                            className="text-xs px-3 bg-green-200 text-gray-800 rounded-full">
                                                Tik Tok
                                            </span>
                                            );
                                        case 'facebook':
                                            return (
                                            <span
                                            className="text-xs px-3 bg-blue-200 text-gray-800 rounded-full">
                                                facebook
                                            </span>
                                            );
                                        case 'instagram':
                                            return (
                                            <span
                                            className="text-xs px-3 bg-violet-200 text-gray-800 rounded-full">
                                                instagram
                                            </span>
                                            );
                                        
                                        default:
                                        return <span>-</span>;
                                    }
                                })()}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {(() => {
                                        switch (item.Category) {
                                            case 'Creatives':
                                            return (
                                                <span
                                                className="text-xs px-3 bg-yellow-200 text-gray-800 rounded-full">
                                                    Creatives
                                                </span>
                                            );
                                            
                                            case 'Ecommerce':
                                            return (
                                                <span
                                                className="text-xs px-3 bg-red-200 text-gray-800 rounded-full">
                                                    Ecommerce
                                                </span>
                                            );
                                            
                                            
                                            default:
                                            return <span>-</span>;
                                        }
                                    })()}
                                </td>
                                <td className="px-1 py-5  border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{item.Email}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{item.Bio}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <a href={item.Url}>
                                    <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        <i className="fa-solid fa-link px-1 "></i>
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