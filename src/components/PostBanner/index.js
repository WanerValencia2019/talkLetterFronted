import React, { useContext } from 'react'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Icon, Typography } from '@mui/material';

import Comments from '../Comments';

import { authContext } from '../../context/Auth/authContext';
import { postContext } from '../../context/Post/postContext';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

function MenuPostOptions() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
      >
        <MoreIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <ContentPasteIcon />
          Copiar
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ShareIcon />
          Compartir
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default function PostBanner({ createdAt,id, title, content, likes, comments }) {
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(authContext);
  const { doDeleteLike, doAddLike } = useContext(postContext);  
  const verifyUserLiked = () => likes.find((v)=> v.userId === user._id)

	return (
		<div className="p-1 shadow bg-white mt-1 mb-2 max-h-64">
		<div className="flex flex-row justify-between">
			<div>
				<p className="text-md font-bold text-cursive">{title || 'Desconocido'}</p>
				<div className="flex flex-row">
				<p className="text-xs text-gray-800 mr-1 font-medium">Wanert Valencia</p>
				<p className="text-xs text-gray-500">{new Date(createdAt).toLocaleTimeString()}</p>
				</div>
			</div>
			<MenuPostOptions />
		</div>
		<div className="">
		 <Typography variant="body2" paragraph component="p">
     {content || 'Desconocido'}
     </Typography>
		</div>
		<div className="flex flex-row justify-around border-t-2 ">
    <div>
		 <IconButton
              size="large"
              color="primary"
              onClick={verifyUserLiked() ? ()=>doDeleteLike({id}):()=>doAddLike({id})}
      	>
        {verifyUserLiked() ? <ThumbUpAltIcon /> : <ThumbUpOutlinedIcon />}  
      	</IconButton>
        <span>{likes?.length}</span>
    </div>
    <div>
       	<IconButton 
       		  size="large"
              aria-label="show comments" 
              color="inherit"
              onClick={()=>setOpen(true)}              
       	>
        	<CommentOutlinedIcon />
      	</IconButton>
        <span>{comments?.length}</span>        
    </div>
		</div>
    <Comments open={open} setOpen={setOpen} idPost={id} titlePost={title || 'Desconocido'} comments={comments} />
		</div>
	)
}