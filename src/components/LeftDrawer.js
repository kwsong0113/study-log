import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';

import { styled } from '@mui/material/styles';

import { ThemeModeContext } from '../App';
import ThemeModeDialog from './ThemeModeDialog';
import StyledLink from './StyledLink';

const LeftDrawer = ({ always }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const themeModeContext = useContext(ThemeModeContext);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const list = useMemo(() => ([
    [
      { label: 'Study Log', icon: <SummarizeOutlinedIcon fontSize = "small" />, link: "/studylog/helloing-develop" },
      { label: 'Todos', icon: <EventAvailableOutlinedIcon fontSize = "small" />, link: "/todos/helloing-develop" },
    ],
    [
      { label: 'Community', icon: <LanguageOutlinedIcon fontSize = "small" />, link: "/community" },
      { label: 'Share', icon: <IosShareOutlinedIcon fontSize = "small" /> },
    ],
    [
      {
        label: 'Setting', icon: <SettingsOutlinedIcon fontSize = "small" />,
        onClick: handleClickOpen
      },
    ]
  ]), []);

  return (
    <Box>
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
      <ThemeModeDialog onClose = {handleClose} open = {dialogOpen} canToggleMode = {true}/>
    </Box>
  );
};

export default LeftDrawer;