import React, { useState, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box'; 
import Masonry from '@mui/lab/Masonry';
import Fab from '@mui/material/Fab';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { UserDataContext } from '../components/UserDataProvider';
import TodosNote from '../components/TodosNote';

const reducer = ({ _id, changed, notes }, action) => {
	switch (action.type) {
		case 'addNote':
			return { _id, changed: true,
				notes: [...notes, { id: uuid(), title: '', lastModified: new Date(), todos: [] }]
			};
		case 'deleteNote':
			return { _id, changed: true,
				notes: notes.filter((note) => note.id !== action.payload.noteId)
			};
		case 'updateNoteTitle':
			return { _id, changed: true,
				notes: notes.map((note) => note.id === action.payload.noteId ? {
					...note,
					lastModified: new Date(),
					title: action.payload.title
				} : note )
			};
		case 'addTodo':
			return { _id, changed: true,
				notes: notes.map((note) => note.id === action.payload.noteId ? {
					...note,
					lastModified: new Date(),
					todos: [...note.todos, { id: uuid(), content: '', status: 0 }]
				} : note )
			};
		case 'deleteTodo':
			return { _id, changed: true,
				notes: notes.map((note) => note.id === action.payload.noteId ? {
					...note,
					lastModified: new Date(),
					todos: note.todos.filter((todo) => todo.id !== action.payload.todoId)
				} : note)
			};
		case 'updateTodoContent':
			return { _id, changed: true,
				notes: notes.map((note) => note.id === action.payload.noteId ? {
					...note,
					lastModified: new Date(),
					todos: note.todos.map((todo) => todo.id === action.payload.todoId ? { ...todo, content: action.payload.content } : todo)
				} : note)
			};
		case 'updateTodoStatus':
			return { _id, changed: true,
				notes: notes.map((note) => note.id === action.payload.noteId ? {
					...note,
					lastModified: new Date(),
					todos: note.todos.map((todo) => todo.id === action.payload.todoId ? { ...todo, status: action.payload.status } : todo)
				} : note)
			};
		default:
			return { _id, changed, notes };
	}
};

const TodosPage = () => {
	const { username: targetUsername } = useParams();
	const { username: loggedInUsername } = useContext(UserDataContext);
	const [state, dispatch] = useReducer(reducer, { _id: null, changed: false, notes: [] });

	useEffect(() => {
		document.activeElement?.blur();
	}, [])

	return (
		<>
			<Box sx = {{ overflowY: 'auto', p: 2 }}>
				<Masonry columns = {{ xs: 1, smd: 2, lg: 3, xl: 4 }} spacing = {2} sx = {{ m: 0 }}>
					{
						state.notes.map((note) => (
							<TodosNote key = {note.id} editable = {targetUsername === loggedInUsername} dispatch = {dispatch} note = {note} />
						))
					}
				</Masonry>
			</Box>
			{
				targetUsername === loggedInUsername && (
					<Fab size = "medium" color = "primary"
						onClick = {() => dispatch({ type: 'addNote' })}
						sx = {{position: 'absolute', bottom: 16, right: 24 }}
					>
						<AddOutlinedIcon fontSize = "small" />
					</Fab>
				)
			}
		</>
	);
};

export default TodosPage;