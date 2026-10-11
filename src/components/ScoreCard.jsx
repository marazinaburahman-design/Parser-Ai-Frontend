function scoreColor(score) {
  if (score >= 75) return '#23d3a6';
  if (score >= 50) return '#ffb457';
  return '#ff6b81';
}

export default function ScoreCard({ result }) {
  const { score, fileName, matchedSkills, missingSkills } = result;
  const color = scoreColor(score);

  return (
    <div className="score-card">
      <div
        className="score-ring"
        style={{
          '--score-color': color,
          '--score-angle': `${score * 3.6}deg`,
        }}
      >
        <div className="score-ring__inner">
          <span className="score-ring__value">{score}</span>
          <span className="score-ring__label">/ 100</span>
        </div>
      </div>
      <div className="score-card__meta">
        <span className="score-card__file">{fileName}</span>
        <span className="muted">
          {matchedSkills.length} of {matchedSkills.length + missingSkills.length} required
          skills matched
        </span>
      </div>
    </div>
  );
}
