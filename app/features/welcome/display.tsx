export default function Display() {
  // 最初のフレーム画像のパス
  const posterUrl = "/videoframe_0.png";
  const videoUrl =
    "https://pub-7a979731de0f4f1ca0b71c909db24ff0.r2.dev/vid.mp4";

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
