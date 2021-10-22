import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { adminAuthContext } from '../../context/AuthAdmin/adminAuthContext';

const columns = [
    {
        name: 'Nombre',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Fecha de creación',
        selector: row => new Date(row.createdAt).toLocaleDateString(),
        sortable: true,
    },
];

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};


export default function TableCategoriesAdmin({ data, deleteCategory }) {
    const history = useHistory();
    const adminAuth = useContext(adminAuthContext);

  const renderActions = ({ row }) => {    
    return (
        <div className="text-lg text-center flex flex-row">
            <IconButton
                onClick={() => history.push(`/admin/users/${row?._id}`)}
                className="h-7 w-7 bg-blue-500 cursor-pointer hover:text-blue-500"
            >
              <RemoveRedEyeOutlinedIcon />
            </IconButton>
            <IconButton
                onClick={() => history.push(`/admin/users/${row?._id}`)}
                className="h-7 w-7 bg-blue-500 cursor-pointer hover:text-yellow-500"
            >
              <EditOutlinedIcon />
            </IconButton>
             <IconButton
                onClick={() => deleteCategory(row?._id, adminAuth.user?.token) }
                className="h-7 w-7 bg-blue-500 cursor-pointer hover:text-red-500"
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
        </div>
    );
};
const renderHeader = (title) => {
    return (
        <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex flex-column justify-between">
                <p className="font-semibold text-gray-800 font-sm">{title}</p>
                <button
                    type="button"
                    onClick={() => history.push(`/admin/category/create`)}
                    className="p-3 cursor-pointer text-blue-500 hover:bg-blue-600 hover:text-white flex justify-center items-center  cursor-pointer p-1 rounded shadow"
                >                   
                    <p className="text-sm">Añadir</p>
                </button>
            </div>
        </div>
    );
};
    const actions = {
        name: 'Acciones',
        cell: (row) => renderActions({row}),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    };
    return (
        <DataTable
            columns={[...columns, actions]}
            data={data}
            title={renderHeader("Categorías")}
            highlightOnHover
            pagination
            paginationComponentOptions={paginationComponentOptions}
            paginationRowsPerPageOptions={[5, 10, 20, 30, 40]}
        />
    );
};