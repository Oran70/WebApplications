# ORoots Gallery

A beautiful web application showcasing plant root art with a modern, responsive design.

## Features

- 🖼️ **Gallery Display**: View all artworks with pagination
- 🔍 **Search & Filter**: Search by artwork name and sort by various criteria
- ➕ **Add New Artworks**: Add new root art pieces to the collection
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Clean, elegant design with smooth animations

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd WebApplications
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000/frontend/pages/index.html`

## Usage

### Viewing the Gallery
- Navigate to the Gallery page to see all artworks
- Use the search bar to find specific artworks by name
- Sort artworks by fruit type or date using the dropdown
- Navigate through pages using the pagination controls

### Adding New Artworks
1. Click "Add New Artwork" button in the gallery
2. Fill in the required information:
   - Artwork Name
   - Fruit Type
   - Group (optional)
   - Planted Date
   - Artwork Date
   - Image URL
3. Click "Save" to add the artwork to the collection

## Project Structure

```
WebApplications/
├── backend/
│   └── db.json              # JSON database with artwork data
├── frontend/
│   └── pages/
│       ├── index.html       # Home page
│       ├── gallery.html     # Gallery page
│       ├── about.html       # About page
│       ├── contact.html     # Contact page
│       └── add_artwork.html # Add artwork form
├── scripts/
│   ├── script.js           # Main gallery functionality
│   └── add_script.js       # Add artwork functionality
├── assets/
│   └── images/             # Artwork images
├── styles.css              # Main stylesheet
└── package.json            # Project configuration
```

## API Endpoints

The application uses JSON Server to provide a REST API:

- `GET /artworks` - Get all artworks
- `POST /artworks` - Add a new artwork
- `GET /artworks/:id` - Get a specific artwork
- `PUT /artworks/:id` - Update an artwork
- `DELETE /artworks/:id` - Delete an artwork

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: JSON Server (REST API)
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   - Change the port in package.json or kill the process using port 3000

2. **Images not loading**
   - Ensure image paths in db.json are correct
   - Check that image files exist in the assets/images directory

3. **API not responding**
   - Make sure the JSON server is running (`npm start`)
   - Check that db.json is in the correct location

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
