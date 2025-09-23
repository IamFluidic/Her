// import React from "react";
// import SpotifyEmbed from "react-spotify-embed";

// const SpotifyPlayer = () => {
//   // Test with a public playlist URI
//   const playlistUri = "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"; // Today's Top Hits for testing

//   return (
//     <div>
//       <h3 className="fade-in" style={{ color: "#e11d48", marginBottom: "10px" }}>
//         Our Playlist 💕
//       </h3>
//       <SpotifyEmbed
//         wide
//         link={playlistUri}
//         theme="black"
//       />
//     </div>
//   );
// };

// export default SpotifyPlayer;

import React from "react";

const SpotifyPlayer = () => {
  return (
    <div className="spotify-player">
      <h3 className="fade-in" style={{ color: "#e11d48", margin: "0 0 10px 0", textAlign: "center" }}>
        Our Playlist 💕
      </h3>
      <iframe
        src="https://open.spotify.com/embed/playlist/2fTJDWv55xJRgpGppnDxQM?si=c6b8c42e486e4996"
        width="100%"
        height="380" // Increased height for better visibility
        frameBorder="0"
        allow="encrypted-media; autoplay"
        title="Spotify Playlist"
        style={{ borderRadius: "12px", maxWidth: "500px", margin: "0 auto" }}
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
