// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sapphire via-royalblue to-quicksand">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-200 border-t-sapphire rounded-full animate-spin mb-4"></div>
      {/* Text */}
      <p className="text-white text-lg font-medium">Loading...</p>
    </div>
  );
}
