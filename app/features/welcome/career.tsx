export default function Career() {
  return (
    <div className="w-full p-4 text-sm">
      <h3 className="font-semibold mb-4">Career</h3>

      <div className="space-y-6">
        <div>
          <div className="text-xs opacity-60 mb-1">2025.06 - Present</div>
          <div className="font-medium">Mobile App Development</div>
          <div className="text-xs opacity-75 mt-1">React Native, GCP</div>
        </div>

        <div>
          <div className="text-xs opacity-60 mb-1">2022.12 - 2024.12</div>
          <div className="font-medium">AI Web Development Venture</div>
          <div className="text-xs opacity-75 mt-1">
            LLM PoC, SaaS Development
          </div>
        </div>

        <div>
          <div className="text-xs opacity-60 mb-1">2021.04 - 2022.11</div>
          <div className="font-medium">Robot System Integrator</div>
          <div className="text-xs opacity-75 mt-1">
            Computer Vision, Image Processing
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs opacity-75 mb-2">Favorite Tech Stack</div>
        <div className="text-xs opacity-60">
          TypeScript, Python, Rust, React Router, Hono, FastAPI, Axum, GCP,
          CloudFlare
        </div>
      </div>
    </div>
  );
}
