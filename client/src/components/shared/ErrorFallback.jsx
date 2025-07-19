export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="max-w-xl flex flex-col justify-center mx-auto text-center">
      <div className="bg-gradient-to-r from-white/20 via-white/40 to-white/20 backdrop-blur-md shadow-xl rounded-2xl border border-white/60 max-w-xl mx-auto text-center px-12 py-4">
        <h1>
          <strong>An error has occurred:</strong>
        </h1>
        <p>{error?.message}</p>
        <button
          className="mt-4 px-4 py-2 rounded-xl bg-gray-300/50 hover:bg-gray-300 border border-white/60 cursor-pointer text-black"
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      </div>
    </div>
  );
};
