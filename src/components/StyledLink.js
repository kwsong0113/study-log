import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
  color: 'inherit',
  '&:focus, &:hover, &:visited, &:link, &:active': {
    textDecoration: 'none',
    color: 'inherit',
  }
});

export default StyledLink;