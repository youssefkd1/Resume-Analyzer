function LoadingState() {
  return (
    <div className="p-6 sm:p-8 max-w-md mx-auto">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto" />
        <h3 className="text-white/80 text-lg sm:text-xl font-semibold mt-4">Analyzing your resume</h3>
        <p className="text-sm text-slate-400 sm:text-base mt-2">
          Please wait while AI reviews your resume.
        </p>
      </div>
    </div>
  );
}

export default LoadingState;
