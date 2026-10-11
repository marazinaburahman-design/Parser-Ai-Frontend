export default function SkillList({ title, skills, tone }) {
  return (
    <div className="skill-block">
      <h4 className={`skill-block__title skill-block__title--${tone}`}>
        {title} <span className="skill-block__count">{skills.length}</span>
      </h4>
      {skills.length === 0 ? (
        <p className="muted">None</p>
      ) : (
        <ul className="chips">
          {skills.map((skill) => (
            <li key={skill} className={`chip chip--${tone}`}>
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
