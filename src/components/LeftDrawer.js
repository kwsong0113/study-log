import React, { useState, useMemo, useContext } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';

import ThemeModeDialog from './ThemeModeDialog';
import StyledLink from './StyledLink';
import { UserDataContext } from './UserDataProvider';

const LeftDrawer = ({ always, onClose }) => {
  const { username } = useContext(UserDataContext);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const list = useMemo(() => ([
    [
      { label: 'Study Log', icon: <SummarizeOutlinedIcon fontSize = "small" />, link: username ? `/studylog/${username}` : '/pleasesignin' },
      { label: 'Todos', icon: <EventAvailableOutlinedIcon fontSize = "small" />, link: username ? `/todos/${username}` : '/pleasesignin' },
    ],
    [
      { label: 'Community', icon: <LanguageOutlinedIcon fontSize = "small" />, link: '/community' },
      { label: 'Share', icon: <IosShareOutlinedIcon fontSize = "small" /> },
    ],
    [
      {
        label: 'Setting', icon: <SettingsOutlinedIcon fontSize = "small" />,
        onClick: handleClickOpen
      },
    ]
  ]), [username]);

  return (
    <>
      <Box onClick = {always ? undefined : onClose}>
        <Toolbar />
        { !always && <Toolbar variant = "dense" /> }
        {
          list.map((subList, index) => (
            <React.Fragment key = {index}>
              <Divider variant = "middle" />
              <List>
                {
                  subList.map(({ label, icon, onClick, link }) => {
                    const item = (
                      <ListItem button disableRipple onClick = {onClick} >
                        <ListItemIcon sx = {{ minWidth: '40px' }}>
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={label} primaryTypographyProps = {{ fontSize: 12 }} sx = {{ ml: 0 }} />
                      </ListItem>
                    );
                    if (link) {
                      return (
                        <StyledLink key = {label} to = {link}>{item}</StyledLink>
                      );
                    } else {
                      return <React.Fragment key = {label}>{item}</React.Fragment>;
                    }
                  })
                }
              </List>
            </React.Fragment>
          ))
        }
      </Box>
      <ThemeModeDialog onClose = {handleClose} open = {dialogOpen} canToggleMode = {true}/>
    </>
  );
};

export default LeftDrawer;