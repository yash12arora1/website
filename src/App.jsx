import { useEffect, useRef, useState } from "react";
import "./index.css";

const videos = [
  { id: 1, title: "Teaser 1", src: "/videos/teaser 1.mp4" },
  { id: 2, title: "Teaser 2", src: "/videos/teaser 2.mp4" },
  { id: 3, title: "Teaser 3", src: "/videos/teaser 3.mp4" },
  { id: 4, title: "Teaser 4", src: "/videos/teaser 4.mp4" },
  { id: 5, title: "Teaser 5", src: "/videos/teaser 5.mp4" },
  { id: 6, title: "Teaser 6", src: "/videos/teaser 6.mp4" },
  { id: 7, title: "Teaser 7", src: "/videos/teaser 7.mp4" },
  { id: 8, title: "Teaser 8", src: "/videos/teaser 8.mp4" },
  { id: 9, title: "Teaser 9", src: "/videos/teaser 9.mp4" },
  { id: 10, title: "Teaser 10", src: "/videos/teaser 10.mp4" },
  { id: 11, title: "Teaser 11", src: "/videos/teaser 11.mp4" },
  { id: 12, title: "Teaser 12", src: "/videos/teaser 12.mp4" },
  { id: 13, title: "Teaser 13", src: "/videos/teaser 13.mp4" },
];

function App() {
  const videoRefs = useRef({});
  const [isMobile, setIsMobile] = useState(false);
  const [playingMap, setPlayingMap] = useState({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const setVideoRef = (id, node) => {
    if (node) {
      videoRefs.current[id] = node;
    }
  };

  const updatePlayingState = (id, isPlaying) => {
    setPlayingMap((prev) => ({
      ...prev,
      [id]: isPlaying,
    }));
  };

  const toggleVideo = async (id) => {
    if (!isMobile) return;

    const video = videoRefs.current[id];
    if (!video) return;

    try {
      if (video.paused || video.ended) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.error("Video toggle failed:", error);
    }
  };

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Exclusive Video Teasers</h1>

          <p className="hero-subheading">
            For full videos and more content, message me on Discord or Telegram:
            <span> asher2aa</span>
          </p>
        </div>
      </header>

      <main className="videos-wrapper">
        <div className="video-grid">
          {videos.map((video) => {
            const isPlaying = !!playingMap[video.id];

            return (
              <div className="video-card" key={video.id}>
                <div className="video-frame">
                  <video
                    ref={(node) => setVideoRef(video.id, node)}
                    className="video-player"
                    controls
                    preload="metadata"
                    playsInline
                    controlsList="nodownload"
                    onPlay={() => updatePlayingState(video.id, true)}
                    onPause={() => updatePlayingState(video.id, false)}
                    onEnded={() => updatePlayingState(video.id, false)}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {isMobile && (
                    <button
                      type="button"
                      className={`mobile-tap-zone ${isPlaying ? "is-playing" : "is-paused"}`}
                      aria-label={`${isPlaying ? "Pause" : "Play"} ${video.title}`}
                      onClick={() => toggleVideo(video.id)}
                    >
                      {!isPlaying && (
                        <span className="mobile-overlay-ring">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="mobile-overlay-icon"
                          >
                            <path d="M8 5.5v13l10-6.5-10-6.5z" fill="currentColor" />
                          </svg>
                        </span>
                      )}
                    </button>
                  )}
                </div>

                <div className="video-info">
                  <h3>{video.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;