import { useState } from 'react';
import './App.css';
import UploadPanel from './components/UploadPanel';
import ScoreCard from './components/ScoreCard';
import SkillList from './components/SkillList';
import { analyzeResume } from './api';

const SAMPLE_JD = `We are hiring a Full Stack Engineer to build modern web apps.
Requirements: strong React and Node.js experience, TypeScript, REST API design,
MongoDB or PostgreSQL, Docker, AWS, and familiarity with CI/CD and unit testing.
Bonus: Next.js, GraphQL, and Kubernetes.`;

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canAnalyze =
    Boolean(file) && jobDescription.trim().length > 0 && !loading;

  async function handleAnalyze() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription.trim());

      const data = await analyzeResume(formData);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand__logo">0 → Shipped</span>
          <span className="brand__tag">Resume Parser</span>
        </div>
        <a
          className="brand__link"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          mock build
        </a>
      </header>

      <section className="hero">
        <h1 className="hero__title">
          How well does your resume match the job?
        </h1>
        <p className="hero__subtitle">
          Upload a PDF resume and a job description to get a match score, the
          skills you already have, and the ones you are missing.
        </p>
      </section>

      <main className="workspace">
        <UploadPanel
          file={file}
          onFileChange={setFile}
          jobDescription={jobDescription}
          onJobDescriptionChange={setJobDescription}
          onAnalyze={handleAnalyze}
          loading={loading}
          canAnalyze={canAnalyze}
        />

        <section className="panel panel--results">
          <h2 className="panel__title">Match report</h2>

          {error && <div className="alert">{error}</div>}

          {!result && !error && (
            <div className="empty">
              <p className="empty__title">No analysis yet</p>
              <p className="muted">
                Your score and skill breakdown will appear here. Try this sample
                JD:
              </p>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setJobDescription(SAMPLE_JD)}
              >
                Use sample job description
              </button>
            </div>
          )}

          {result && (
            <div className="report">
              <ScoreCard result={result} />
              <SkillList
                title="Skills found"
                tone="found"
                skills={result.matchedSkills}
              />
              <SkillList
                title="Missing skills"
                tone="missing"
                skills={result.missingSkills}
              />
              {result.resumeSkills?.length > 0 && (
                <SkillList
                  title="All skills detected in resume"
                  tone="neutral"
                  skills={result.resumeSkills}
                />
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        Mock scoring for now — the AI comparison layer plugs in next.
      </footer>
    </div>
  );
}

export default App;
