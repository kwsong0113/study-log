import React from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search'
import { alpha } from '@mui/material/styles';

const Search = () => {
	return (
		<Box
			sx = {{
				display: 'flex',
				alignItems: 'center',
				border: '1px solid',
				border: 'solid 1px',
				borderColor: (theme) => alpha(theme.palette.grey[300], theme.palette.mode === 'dark' ? 1.0 : 0.3),
				borderRadius: 3,
				ml: 2,
				px: 1.5,
				bgcolor: '#AAA3',
				'&:hover': {
					bgcolor: '#FFF0'
				}
			}}
		>
			<SearchIcon sx = {{ fontSize: 16 }} />
			<InputBase
				sx = {(theme) => ({
					ml: 1,
					color: theme.palette.mode === 'dark' ? 'black' : 'white',
					fontSize: '12px',
					'& .MuiInputBase-input': {
						width: '20ch',
						transition: theme.transitions.create('width'),
						'&:focus': {
							width: '30ch'
						}
					}
				})}
				placeholder = "Search..."
			>
			</InputBase>
		</Box>
	);
};

export default Search;