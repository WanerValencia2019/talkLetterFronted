import React, {useContext} from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { adminAuthContext } from '../../context/AuthAdmin/adminAuthContext';

const columns = [
    {
        name: 'Usuario',
        selector: row => row.username,
        sortable: true,
    },
    {
        name: 'Nombre',
        selector: row => row.firstName,
        sortable: true,
    },
    {
        name: 'Apellidos',
        selector: row => row.lastName,
        sortable: true,
    },
    {
        name: 'Correo electrónico',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Rol',
        selector: row => row.role,
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


export default function TableUsersAdmin({ data, deleteUser }) {
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
                onClick={() => deleteUser(row?._id, adminAuth.user?.token)}
                className="h-7 w-7 bg-blue-500 cursor-pointer hover:text-red-500"
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
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
            title="Usuarios"
            highlightOnHover
            pagination
            paginationComponentOptions={paginationComponentOptions}
            paginationRowsPerPageOptions={[5, 10, 20, 30, 40]}
        />
    );
};