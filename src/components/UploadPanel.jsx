import { useRef, useState } from 'react';

export default function UploadPanel({
  file,
  onFileChange,
  jobDescription,
  onJobDescriptionChange,
  onAnalyze,
  loading,
  canAnalyze,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function pickFile(nextFile) {
    if (!nextFile) return;
    if (nextFile.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    onFileChange(nextFile);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    pickFile(event.dataTransfer.files?.[0]);
  }

  return (
    <section className="panel">
      <h2 className="panel__title">Run an analysis</h2>
      <p className="panel__subtitle">
        Upload a resume and paste the job description to compare against.
      </p>

      <div
        className={`dropzone${dragging ? ' dropzone--active' : ''}${
          file ? ' dropzone--filled' : ''
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          hidden
          onChange={(e) => pickFile(e.target.files?.[0])}
        />
        <span className="dropzone__icon">PDF</span>
        {file ? (
          <>
            <strong>{file.name}</strong>
            <span className="muted">{(file.size / 1024).toFixed(0)} KB · click to replace</span>
          </>
        ) : (
          <>
            <strong>Drop your resume here</strong>
            <span className="muted">or click to browse · PDF up to 5MB</span>
          </>
        )}
      </div>

      <label className="field">
        <span className="field__label">Job description</span>
        <textarea
          className="field__input"
          rows={9}
          placeholder="Paste the job description you want to match against..."
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
        />
      </label>

      <button
        className="btn-primary"
        disabled={!canAnalyze}
        onClick={onAnalyze}
      >
        {loading ? 'Analyzing...' : 'Analyze resume'}
      </button>
    </section>
  );
}
