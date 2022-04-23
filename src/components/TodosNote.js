import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import { Typography } from '@mui/material';

const StyledTextField = ({ editable, sx, ...elseProps }) => {
  if (!editable) return (
    <Typography variant = "body2" sx = {{ py : 0.5, px: 0.5, ...sx}}>
      {elseProps.value}
    </Typography>
  )
  return (
    <TextField {...elseProps} multiline variant = "filled" inputProps = {{ autoFocus: true }}
      sx = {{
        '& .MuiInputBase-root': {
          '&::before': { border: 'none', },
          '&::after': { border: 'none', },
          '&:hover': { bgcolor: 'action.hover', '&::before': { border: 'none !important' } },
          '&:focus-within': { bgcolor: 'action.focus' },
          background: 'none',
          py: 0.5, px: 0.5,
          ...sx
        },
      }}
    />
  );
}

const Todo = ({ editable, id, value, status, onChangeContent, onClickStatus, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <Box sx = {{ display: 'flex', alignItems: 'flex-start' }}>
      <IconButton
        id = {`${id}-iconbutton`}
        onClick = {editable ? (showDelete ? onDelete : onClickStatus) : () => {}} disableRipple
        sx = {{ p: 0, mt: 0.5, mr: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
      >
        {
          showDelete ? <DeleteOutlineOutlinedIcon color = "error" /> : (
            status === 0 ? <RadioButtonUncheckedOutlinedIcon /> : (
            status === 1 ? <BuildCircleOutlinedIcon color = "info" /> : <CheckCircleOutlinedIcon color = "success" />
            )
          )
        }
      </IconButton>
      <StyledTextField editable = {editable} fullWidth value = {value} onChange = {onChangeContent} sx = {{ fontSize: 14, textDecorationLine: status === 2 ? 'line-through' : 'none' }}
        onFocus = {() => setShowDelete(true)}
        onBlur = {(event) => {
          if (event.relatedTarget?.id === `${id}-iconbutton`) return;
          setShowDelete(false)
        }}
      />
    </Box>
  );
};

const TodosNote = ({ editable, dispatch, note: { id: noteId, title, lastModified, todos }}) => {
  return (
    <Card
      sx = {{
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'border.main',
      }}
    >
      <CardHeader
        sx = {{
          pt: 1,
          pb: 1.5,
          bgcolor: '#AAA2',
        }}
        // disableTypography
        action = {
         <></>
        }
        title={
          <Box sx = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: -1.2 }}>
            <StyledTextField editable = {editable} maxRows = {1} fullWidth sx = {{ fontSize: 16, fontWeight: '500', color: 'primary.main', mx: -0.5, pt: editable ? 0.2 : 1.2, pb: editable ? 0.2 : 0.9 }}
              value = {title} onChange = {(event) => dispatch({ type: 'updateNoteTitle', payload: { noteId, title: event.target.value }})}  
            />
            <Box display = "inline">
              {
                editable ? (
                  <Box sx = {{ display: 'flex', }}>
                    <IconButton
                      onClick = {() => dispatch({ type: 'addTodo', payload: { noteId } })}
                    >
                      <AddTaskOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick = {() => dispatch({ type: 'deleteNote', payload: { noteId }})}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <></>
                )
              }
            </Box>
          </Box>
        }
        subheader={
          <Typography variant = "caption" sx = {{ fontSize: 11, color: 'text.secondary' }}>
            {`Last modified on ${lastModified.toLocaleString('en-US', { dateStyle: "medium", timeStyle: "short" })}`}
          </Typography>
        }
      />
      <CardContent sx = {{ pb: '16px !important' }}>
        { 
          todos.map(({ id: todoId, content, status }) => (
            <Todo key = {todoId} id = {todoId} editable = {editable} value = {content} status = {status}
              onChangeContent = {(event) => dispatch({ type: 'updateTodoContent', payload: { noteId, todoId, content: event.target.value } })}
              onClickStatus = {() => dispatch({ type: 'updateTodoStatus', payload: { noteId, todoId, status: (status + 1) % 3 } })}
              onDelete = {() => dispatch({ type: 'deleteTodo', payload: { noteId, todoId } })}
            />
          ))
        }
      </CardContent>
    </Card>
  );
};

export default TodosNote;