import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, getAllJobs, reset } from '../slices/jobsSlice'


// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ job, ...rest }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(reset());
  }, [])

  function handleDelete() {
    console.log(job._id)
    dispatch(deleteJob(job._id));
    navigate('/deleteSuccess');
  }

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertRoundedIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete}>
          <ListItemIcon>
            <DeleteRoundedIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {/* <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <ModeEditOutlineIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      </Menu>
    </>
  );
}
