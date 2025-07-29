export function WIP({}) {
  return (
    <div className="absolute inset-0 bg-black/1 backdrop-blur-sm z-10 flex items-center justify-center p-6">
      <div className="bg-white text-black p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-2">🚧 Work in Progress</h2>
        <p className="text-sm text-gray-700">
          This page is currently under construction. Please check back later.
        </p>

        <p className="text-sm text-gray-700 py-2 text-primary">
          <a href="https://beta.masteringbackend.com/">
            {" "}
            Click here to visit the old platform.
          </a>
        </p>
      </div>
    </div>
  );
}
