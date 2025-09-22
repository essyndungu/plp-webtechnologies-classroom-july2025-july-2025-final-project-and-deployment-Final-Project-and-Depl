// Sample book data
let books = [
    {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        year: 1960,
        status: "available"
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        year: 1949,
        status: "checked-out"
    },
    {
        id: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        year: 1925,
        status: "available"
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        year: 1813,
        status: "available"
    },
    {
        id: 5,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        year: 1951,
        status: "checked-out"
    },
    {
        id: 6,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        genre: "Non-Fiction",
        year: 1988,
        status: "available"
    }
];

let filteredBooks = [...books];

// Function to show different sections
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Function to display books
function displayBooks(booksToShow) {
    const container = document.getElementById('booksContainer');
    container.innerHTML = '';

    if (booksToShow.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem;">No books found matching your search.</p>';
        return;
    }

    booksToShow.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-genre">${book.genre}</div>
            <div class="book-status ${book.status}">
                ${book.status === 'available' ? 'Available' : 'Checked Out'}
            </div>
        `;
        container.appendChild(bookCard);
    });
}

// Function to search books
function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        filteredBooks = [...books];
    } else {
        filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.genre.toLowerCase().includes(searchTerm)
        );
    }
    
    displayBooks(filteredBooks);
}

// Function to add a new book
function addBook(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const newBook = {
        id: books.length + 1,
        title: formData.get('title'),
        author: formData.get('author'),
        genre: formData.get('genre'),
        year: parseInt(formData.get('year')),
        status: 'available'
    };
    
    books.push(newBook);
    filteredBooks = [...books];
    
    // Reset form
    form.reset();
    
    // Show success message
    alert('Book added successfully!');
    
    // Switch to catalog to show the new book
    showSection('catalog');
    displayBooks(filteredBooks);
}

// Event listeners that run when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form
    document.getElementById('addBookForm').addEventListener('submit', addBook);

    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });

    // Initial display of books
    displayBooks(filteredBooks);
});