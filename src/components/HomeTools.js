import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

const HOMETOOLS_CONENT1 = [
	{
		title: 'Study Log',
		icon: <DriveFileRenameOutlineOutlinedIcon sx = {{ fontSize: 40, color: 'primary.lightMain' }}/>,
		comment: 'Every component you need is ready for production Build at an accelerated pace without sacrificing flexibility or control'
	}
]

const HOMETOOLS_CONENT2 = [
	{
		title: 'Study Log',
		icon: <DriveFileRenameOutlineOutlinedIcon sx = {{ fontSize: 40, color: 'primary.lightMain' }}/>,
		comment: 'Every component you need is ready for production Build at an accelerated pace without sacrificing flexibility or control'
	}
]

const HomeTools = () => {
	return (
		<Box
			sx = {{
				bgcolor: '#00000011',
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
					<Box sx = {{ display: 'flex', alignItems: 'center', py: 4 }}>
						<Box sx = {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mr: 3 }}>
							{icon}
							<Typography variant = "body2" sx = {{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>{title}</Typography>
						</Box>
						<Typography variant = "body2" sx = {{ fontSize: 13 }}>{comment}</Typography>
					</Box>
				))
			}
			<Typography variant = "h6">Convenient and Beautiful</Typography>
			{HOMETOOLS_CONENT2.map(({ title, icon, comment }) =>
				(
					<Box sx = {{ display: 'flex', alignItems: 'center', py: 4 }}>
						<Box sx = {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mr: 3 }}>
							{icon}
							<Typography variant = "body2" sx = {{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>{title}</Typography>
						</Box>
						<Typography variant = "body2" sx = {{ fontSize: 13 }}>{comment}</Typography>
					</Box>
				))
			}
		</Box>
	);
};

export default HomeTools;