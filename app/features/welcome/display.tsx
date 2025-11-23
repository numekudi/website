export default function Display() {
  const posterUrl = "https://cdn.primitive-ojisan.com/about/videoframe_0.png";
  const videoUrl = "https://cdn.primitive-ojisan.com/about/vid.mp4";

  return (
    <div className="w-full overflow-clip">
      <div className="w-full aspect-video relative">
        <video
          muted
          playsInline
          autoPlay
          loop
          className="w-full h-full object-cover video-filter pointer-events-none absolute top-0 left-0"
          src={videoUrl}
          poster={posterUrl}
        />
      </div>
    </div>
  );
}
