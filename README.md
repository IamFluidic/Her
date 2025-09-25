Love Website
A romantic React application with interactive challenges leading to a heartfelt proposal.
The main branch contains original code, which has a lot of features missing. "For-testing" branch includes the added feature.

Getting Started

Install dependencies:
npm install


Place assets:

Add the following files to public/:
heartbeat.mp3, giggle.mp3, chime.mp3, bg-music.mp3
images/me.jpg, images/friend.jpg, images/heart.gif, images/heart.png




Run the app:
npm start

The app will run at http://localhost:3000.

Build for production:
npm run build



Features

Interactive steps: Name challenge, qualities game, best person selection, and a romantic proposal.
Heart animations, confetti, and sound effects for a loving experience.
Customizable love note generator.

Dependencies

React 19.1.1
react-confetti 6.4.0
react-scripts 5.0.1

Folder Structure
love-website/
├── public/
│   ├── images/
│   │   ├── me.jpg
│   │   ├── friend.jpg
│   │   ├── heart.gif
│   │   ├── heart.png
│   ├── heartbeat.mp3
│   ├── giggle.mp3
│   ├── chime.mp3
│   ├── bg-music.mp3
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── BestPerson.js
│   │   ├── NameChallenge.js
│   │   ├── QualitiesGame.js
│   │   └── Proposal.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── README.md
└── .gitignore
