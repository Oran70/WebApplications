# ORoots Gallery

A dynamic web application to showcase a collection of plant root art. It features a responsive design, dynamic data loading, and a seamless deployment pipeline to Microsoft Azure.

**Live Site:** [https://oroots-ngj.westeurope-01.azurewebsites.net/frontend/pages/index.html](https://oroots-ngj.westeurope-01.azurewebsites.net/frontend/pages/index.html)

## Technologies Used

*   **Frontend**: HTML5, CSS3, vanilla JavaScript (ES6+)
*   **Backend Simulation**: `json-server` to provide a RESTful API for artworks.
*   **Deployment**: Automated CI/CD to Microsoft Azure App Service from GitHub.
*   **Runtime**: Node.js 20-LTS

## How to Run Locally

### 1. Prerequisites
You must have Node.js installed on your computer. This project is built and deployed using the **Node 20-LTS** version.

### 2. Setup
Clone the repository and install the required npm packages.
```bash
# Clone the project from GitHub
git clone https://github.com/Oran70/WebApplications.git

# Navigate into the project directory
cd WebApplications

# Install dependencies (like json-server)
npm install
```

### 3. Run the Local Server
A convenient startup script is provided for Windows.
```bash
# Run the local development server
.\\start.bat
```
This script executes the `npm run dev` command, which starts a `json-server` instance on `http://localhost:3000`.

### 4. View the Application
Open your web browser and navigate to:
`http://localhost:3000/frontend/pages/index.html`

## Deployment to Azure

This project is configured for **Continuous Deployment**. There are no manual deployment steps.

1.  **Make Changes:** Edit the code on your local machine.
2.  **Test Locally:** Run the application using `.\\start.bat` to ensure your changes work correctly.
3.  **Commit and Push:** Commit your changes to Git and push them to the `main` branch on GitHub.
    ```bash
    git add .
    git commit -m "Your descriptive commit message"
    git push origin main
    ```
4.  **Automatic Deployment:** Azure automatically detects the push to the `main` branch, pulls the latest code, and deploys it to the live website. The update will be live within a few minutes.

## Project Scripts (`package.json`)

Two main scripts are configured for this project:

*   `"dev"`: `json-server --watch backend/db.json --port 3000 --static ./`
    *   Used for **local development**. Runs the server on a fixed port (3000). Launched via `start.bat`.
*   `"start"`: `json-server --watch backend/db.json --host 0.0.0.0 --port $PORT --static ./`
    *   Used by the **Azure App Service** for deployment. It dynamically uses the port that Azure assigns via the `$PORT` environment variable.

## Project Structure
```
WebApplications/
├── backend/
│   └── db.json              # JSON database with artwork data
├── frontend/
│   └── pages/
│       ├── index.html       # Home page
│       ├── gallery.html     # Gallery page
│       └── ...              # Other HTML pages
├── assets/
│   └── images/              # Artwork images
├── scripts/
│   ├── script.js            # Main gallery functionality
│   └── add_script.js        # Add artwork functionality
├── styles.css               # Main stylesheet
├── package.json             # Project dependencies and scripts
├── start.bat                # Windows script for local development
└── README.md                # This file
```

## Features

- **Gallery Display**: View all artworks with pagination
- **Search & Filter**: Search by artwork name and sort by various criteria
- **Add New Artworks**: Add new root art pieces to the collection
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, elegant design with smooth animations

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

## API Endpoints

The application uses JSON Server to provide a REST API:

- `GET /artworks` - Get all artworks
- `POST /artworks` - Add a new artwork
- `GET /artworks/:id` - Get a specific artwork
- `PUT /artworks/:id` - Update an artwork
- `DELETE /artworks/:id` - Delete an artwork

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
