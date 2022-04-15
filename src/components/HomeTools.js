import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import OfflineBoltOutlinedIcon from '@mui/icons-material/OfflineBoltOutlined';
import { OfflineBoltRounded } from '@mui/icons-material';

const HOMETOOLS_CONENT1 = [
	{
		title: 'Study Log',
		icon: <DriveFileRenameOutlineOutlinedIcon sx = {{ fontSize: 40, color: 'primary.lightMain' }} />,
		comment: 'Every day, summarize what you learned and write it as a concise study log. Looking up previous study logs helps you recall what you have studied.'
	},
	{
		title: 'Todos',
		icon: <EventAvailableOutlinedIcon sx = {{ fontSize: 40, color: 'primary.lightMain' }} />,
		comment: 'Before you start studying, create a study plan and learning goals. Continuously update your plan and check if you achieved the goals.'
	}
]

const HOMETOOLS_CONENT2 = [
	{
		title: 'Always',
		icon: <PhoneIphoneOutlinedIcon sx = {{ fontSize: 40, color: 'primary.lightMain' }}/>,
		comment: 'You can view and edit your study log with any device including a phone, tablet, laptop, or desktop if you have an internet connection. Connect to SLog everywhere, every time!'
	},
	{
		title: 'Easy',
		icon: <OfflineBoltOutlinedIcon sx = {{ fontSize: 40, color: 'primary.lightMain' }}/>,
		comment: 'SLog provides a user interface that enables a user to edit and share study log easily. It also makes your study life easier.'
	},	
	{
		title: 'Design',
		icon: <ColorLensOutlinedIcon sx = {{ fontSize: 40, color: 'primary.lightMain' }}/>,
		comment: 'You can customize your SLog page by selecting color and light/dark mode theme. Choosing a proper theme makes your study record look beautiful and well organized.'
	}
]

const HomeToolsItem = ({ title, icon, comment }) => (
	<Box sx = {{ display: 'flex', alignItems: 'center', py: 4 }}>
		<Box sx = {{ flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 90, ml: -2 }}>
			{icon}
			<Typography variant = "body2" sx = {{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', mt: 0.2 }}>{title}</Typography>
		</Box>
		<Typography variant = "body2" sx = {{ fontSize: 13 }}>{comment}</Typography>
	</Box>
);


const HomeTools = () => {
	return (
		<Box
			sx = {{
				bgcolor: (theme) => theme.palette.mode === 'light' ? '#0000000E' : '#00000027',
				borderRadius: 3,
				ml: {xs: 0, md: 5},
				px: 3,
				pt: 3,
			}}
		>
			<Typography gutterBottom variant = "subtitle1" sx = {{ color: 'primary.lightMain', fontWeight: 600, fontSize: 15 }}>Why SLog?</Typography>
			<Typography variant = "h6">Study Efficiently with Great Tools</Typography>
			{HOMETOOLS_CONENT1.map(({ title, icon, comment }) =>
				(
					<HomeToolsItem key = {title} title = {title} icon = {icon} comment = {comment} />
				))
			}
			<Typography variant = "h6">Convenient and Beautiful</Typography>
			{HOMETOOLS_CONENT2.map(({ title, icon, comment }) =>
				(
					<HomeToolsItem key = {title} title = {title} icon = {icon} comment = {comment} />
				))
			}
		</Box>
	);
};

export default HomeTools;