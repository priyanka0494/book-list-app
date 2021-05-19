import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import From from './components/Form';
import Table from './components/Table';
import './App.css';

function App() {

	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [isbn, setIsbn] = useState('');
	const [currentBookId, setCurrentBookId] = useState(null);
	const [books, setBooks] = useState([]);

	const isInputValid = () => {
		return title.trim() === "" || author.trim() === "" || isbn.trim() === "";
	}

	const clearInputs = () => {
		setTitle("");
		setAuthor("");
		setIsbn("");
	}

	const addBook = () => {
		setBooks([...books, {
			bookTitle: title,
			bookAuthor: author,
			bookIsbn: isbn,
			bookId: uuidv4()
		}]);
	};

	const removeBook = (id) => {
		setBooks(books.filter(book => book.bookId !== id));
	}

	const editBook = (book) => {
		setTitle(book.bookTitle);
		setAuthor(book.bookAuthor);
		setIsbn(book.bookIsbn);
		setCurrentBookId(book.bookId);
	}

	const updateBook = () => {
		setBooks(books.map(book => book.bookId === currentBookId ? {...books, bookTitle: title, bookAuthor: author, bookIsbn: isbn} : book))
	}

	const cancelEdit = () => {
		clearInputs();
		setCurrentBookId(null);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		clearInputs();
		setCurrentBookId(null);
		if (isInputValid()) return;
		!currentBookId ? addBook() : updateBook();
	}

	return (
		<div className="App">
			<From
				title={title}
				setTitle={setTitle}
				author={author}
				setAuthor={setAuthor}
				isbn={isbn}
				setIsbn={setIsbn}
				currentBookId={currentBookId}
				handleSubmit={handleSubmit}
				cancelEdit={cancelEdit}
			/>
			<Table books={books} removeBook={removeBook} editBook={editBook}/>
		</div>
	);
}

export default App;
