import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

import { postContext } from '../../context/Post/postContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
    <div className="flex flex-row justify-between items-center">
      <div>
       {children}
      </div>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{            
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) 
      : null}
      </div>
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



export default function Comments({ idPost, comments, titlePost, open, setOpen }) {
  const { doAddComent } = useContext(postContext);
  const [message, setMessage] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sendComment = (e) => {
    e.preventDefault();
    doAddComent({id: idPost, message})
    setMessage('');
  }

  const renderComments = () => {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {comments?.map((comment) => {
          return (<>
             <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ width: 32, height: 32 }}>{comment?.firstName ? comment?.firstName[0]:'D'}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${comment?.firstName} ${comment?.lastName}`}
          secondary={
            <React.Fragment>
            <Typography 
            variant="body2"
            component="span"
            sx={{            
              color: (theme) => theme.palette.grey[700],
            }}
            >
              {comment?.message}
            </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
         </> );
        })}
      </List>
    );
  }

  return (
    <div className="">
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {titlePost}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        {comments?.length > 0 ? renderComments(): <h4>No hay comentarios todavia</h4>}
        <form onSubmit={sendComment} className="w-full">
          <TextField required value={message} onChange={(e)=>setMessage(e.target.value)} fullWidth multiline   placeholder="Qué opinas?"
             InputProps={{
               endAdornment:
               <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                  color="primary"
                  type="submit"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            
          }}
          />
        </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}