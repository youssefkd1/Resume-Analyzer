function UploadPanel({ aiReady, onFileUpload }) {
  return (
    <div className="upload-area">
      <div className="upload-zone">
        <div className="text-5xl text-white">📄</div>
        <p className="text-xl text-white/80 mt-4">Click or Drag PDF here to upload</p>
        <p className="text-sm text-white/60 mt-2">Supported: PDF files only</p>
        <input
          type="file"
          disabled={!aiReady}
          id="file-upload"
          accept=".pdf"
          onChange={onFileUpload}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className={`inline-block mt-4 cursor-pointer px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            aiReady
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/50"
              : "bg-gray-600 text-gray-300 opacity-50 cursor-not-allowed"
          }`}
        >
          Choose PDF File
        </label>
      </div>
    </div>
  );
}

export default UploadPanel;
