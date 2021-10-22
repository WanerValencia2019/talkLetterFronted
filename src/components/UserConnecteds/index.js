import React, {useState, useEffect, useContext} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import io from 'socket.io-client';
import { authContext } from '../../context/Auth/authContext';

export default function UserConnecteds() {
  const { user } = useContext(authContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io(`http://127.0.0.1:8000`);
    socket.emit('user_connected', 
      {
       username: user?.username,
       firstName: user?.firstName, 
       lastName: user?.lastName
     })
    socket.on('new_user',(data)=>{
      setUsers(data);
      console.log(data);
    })

    return () => socket.close();
  }, [])

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {users.map((value) => {
      return (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonOutlinedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={value?.firstName + '' +value?.lastName} secondary={value.username} />
        </ListItem>
        );
    })}
    </List>
  );
}