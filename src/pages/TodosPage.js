import React, { useState, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box'; 
import Masonry from '@mui/lab/Masonry';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';

import { UserDataContext } from '../components/UserDataProvider';
import TodosNote from '../components/TodosNote';
import LoadingBox from '../components/LoadingBox';
import ErrorMessage from '../components/ErrorMessage';

const domain = process.env.REACT_APP_API_DOMAIN;

export const EditingContext = React.createContext(false);

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
		case 'init':
			return {
				_id: action.payload.initialState._id,
				notes: action.payload.initialState.notes.map((note) => ({ ...note, lastModified: new Date(note.lastModified) })),
				changed: false
			};
		case 'reset':
			return {
				_id, notes,
				changed: false
			}
		default:
			return { _id, changed, notes };
	}
};

const TodosPage = () => {
	const { username: targetUsername } = useParams();
	const { username: loggedInUsername } = useContext(UserDataContext);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(0);
	const [isUpdating, setIsUpdating] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const [state, dispatch] = useReducer(reducer, { _id: null, changed: false, notes: [] });
	const [editing, setEditing] = useState(false);

	const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

	const showSnackbar = (severity, message) => {
		setSnackbarSeverity(severity);
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	}

	const updateTodos = () => {
		setIsUpdating(true);
		dispatch({ type: 'reset' })
		axios.post(`${domain}/todos/${targetUsername}`, { _id: state._id, notes: state.notes })
      .then(() => {
				setIsUpdating(false);
				showSnackbar("success", "Update Successful");
      })
      .catch((err) => {
				setIsUpdating(false);
				showSnackbar("error", "Update Failed");
      });
	}

	useEffect(() => {
		setEditing(false);
		setIsLoading((previousIsLoading) => previousIsLoading + 1);
		axios.get(`${domain}/todos/${targetUsername}`)
			.then((response) => {
				dispatch({ type: 'init', payload: { initialState: response.data }})
				setIsError(false);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
				setTimeout(() => setEditing(true), 1000);
			})
			.catch((error) => {
				setIsError(true);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
			});
	}, [targetUsername]);

	if (isLoading > 0) {
		return <LoadingBox />
	}

	if (isError) {
		return <ErrorMessage message = "User not found" />;
	}

	return (
		<EditingContext.Provider value = {editing}>
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
					<>
						<Fab size = "medium" color = "primary"
							onClick = {updateTodos} disabled = {!state.changed}
							sx = {{ position: 'absolute', bottom: 74, right: 24 }}
						>
							<PublishedWithChangesOutlinedIcon fontSize = "small" />
							{isUpdating && (
								<CircularProgress color = "warning" size = {60}
									sx = {{
										position: 'absolute', bottom: -6, right: -6, 
									}} 
								/>)
							}
						</Fab>
						<Fab size = "medium" color = "primary"
							onClick = {() => dispatch({ type: 'addNote' })}
							sx = {{position: 'absolute', bottom: 16, right: 24 }}
						>
							<AddOutlinedIcon fontSize = "small" />
						</Fab>
						<Snackbar open = {snackbarOpen} autoHideDuration = {5000} onClose = {handleSnackbarClose}>
							<Alert onClose = {handleSnackbarClose} severity = {snackbarSeverity} sx = {{ width: '100%' }}>
								{snackbarMessage}
							</Alert>
						</Snackbar>
					</>
				)
			}
		</EditingContext.Provider>
	);
};

export default TodosPage;