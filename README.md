# La-Spot-Main
A React-based parking system website powered by modern frontend and backend technologies.

## Tech Stack
Frontend: HTML, CSS, JavaScript, React, Vite </br>
Backend: MySQL (via MySQL Workbench)

## Project Structure and Notes
### Components Handling
- All components are located in the components/ folder.
- Each component should import its respective styles from the css/ folder.

### Global CSS Variables
Global root variables are defined in index.css.
- Includes styles for:
- Fonts and colors
- Font weights
- z-index values
- Base sizing
- Reusable CSS classes
- Scrollbar styling
- Table designs

### Purpose of App.jsx
- This file acts as the central hub for importing components.
- It passes them to main.jsx for rendering.

### Purpose of main.jsx
This file is in Strict Mode.

Avoid modifying it unless necessary for advanced configurations.

### Assets and Images
Store all images in the public/images/ folder for global accessibility.

### Running the App
```bash
cd LaSpot_Website
npm install       # Only needed for fresh git clones
npm run dev       # Start the development server
```

## Documentation
![Thumbnail 1](https://github.com/user-attachments/assets/c959e8f7-784d-4d35-9301-75d8dac39c98)
![Thumbnail 2](https://github.com/user-attachments/assets/22de7126-f8b0-4a2f-80a3-90b382340c4a)

### Demo Video
[![Watch the video](https://img.youtube.com/vi/Kud7pHdQtlI/hqdefault.jpg)](https://www.youtube.com/watch?v=Kud7pHdQtlI)
