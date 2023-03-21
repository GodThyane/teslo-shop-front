'use client';

import React, { useEffect, useState } from 'react';
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useUsers } from '@/hooks/useProducts';
import tesloApi from '@/api/tesloApi';
import { IUser } from '@/interfaces/user';

const Users = () => {
   const { users, isError } = useUsers('/users');
   const [myUsers, setMyUsers] = useState<IUser[]>([]);

   useEffect(() => {
      if (users) setMyUsers(users);
   }, [users]);

   if (!isError && !users) return <div>Cargando...</div>;

   const onRoleUpdated = async (userId: string, newRole: string) => {
      const prevUsers = [...myUsers];
      const updatedUsers = myUsers.map((user) => ({
         ...user,
         role: user._id === userId ? newRole : user.role,
      }));

      setMyUsers(updatedUsers);

      try {
         await tesloApi.patch(`admin/users/${userId}`, { role: newRole });
      } catch (e) {
         setMyUsers(prevUsers);
         alert('Error al actualizar el rol del usuario');
      }
   };

   const columns: GridColDef[] = [
      { field: 'email', headerName: 'Correo', width: 250 },
      { field: 'name', headerName: 'Nombre completo', width: 300 },
      {
         field: 'role',
         headerName: 'Rol',
         width: 300,
         // @ts-ignore
         renderCell: ({ row }: GridValueGetterParams) => {
            return (
               <Select
                  value={row.role}
                  label="Rol"
                  sx={{ width: '300px' }}
                  onChange={({ target }) =>
                     onRoleUpdated(row._id, target.value)
                  }
               >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="client">Client</MenuItem>
                  <MenuItem value="super-user">Super User</MenuItem>
                  <MenuItem value="SEO">SEO</MenuItem>
               </Select>
            );
         },
      },
   ];
   const rows = myUsers.map((user, index) => ({
      id: index + 1,
      email: user.email,
      name: user.name,
      role: user.role,
      _id: user._id,
   }));

   return (
      <Grid className="fadeIn">
         <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
            <DataGrid
               columns={columns}
               rows={rows}
               pageSize={10}
               rowsPerPageOptions={[10]}
            />
         </Grid>
      </Grid>
   );
};

export default Users;
