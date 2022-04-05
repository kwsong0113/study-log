import React from 'react';
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

const list = [
  [
    { label: 'Study Log', icon: <SummarizeOutlinedIcon fontSize = "small" /> },
    { label: 'Study Note', icon: <NoteAltOutlinedIcon fontSize = "small" /> },
    { label: 'Planner', icon: <EventAvailableOutlinedIcon fontSize = "small" /> },
  ],
  [
    { label: 'Community', icon: <LanguageOutlinedIcon fontSize = "small" /> },
    { label: 'Share', icon: <IosShareOutlinedIcon fontSize = "small" /> },
  ],
  [
    { label: 'Setting', icon: <SettingsOutlinedIcon fontSize = "small" /> },
  ]
];


const LeftDrawer = ({ always }) => {
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
                subList.map(({ label, icon }) => (
                  <ListItem button key={label} disableRipple>
                    <ListItemIcon sx = {{ minWidth: '40px' }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={label} primaryTypographyProps = {{ fontSize: 12 }} sx = {{ ml: 0 }} />
                  </ListItem>
                ))
              }
            </List>
          </React.Fragment>
        ))
      }
    </Box>
  );
};

export default LeftDrawer;