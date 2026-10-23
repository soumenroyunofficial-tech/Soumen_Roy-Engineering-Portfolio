import type { PortfolioItem, PortfolioSection } from '../data/resume';
import { Field } from './Field';

type Props = {
  section: PortfolioSection;
  sectionIndex: number;
  editing: boolean;
  onUpdateTitle: (sectionId: string, title: string) => void;
  onMoveSection: (sectionId: string, direction: -1 | 1) => void;
  onDeleteSection: (sectionId: string) => void;
  onAddItem: (sectionId: string) => void;
  onUpdateItem: <K extends keyof PortfolioItem>(sectionId: string, itemId: string, key: K, value: PortfolioItem[K]) => void;
  onMoveItem: (sectionId: string, itemId: string, direction: -1 | 1) => void;
  onDeleteItem: (sectionId: string, itemId: string) => void;
};

export function PortfolioSectionView({
  section,
  sectionIndex,
  editing,
  onUpdateTitle,
  onMoveSection,
  onDeleteSection,
  onAddItem,
  onUpdateItem,
  onMoveItem,
  onDeleteItem,
}: Props) {
  function renderEditor(item: PortfolioItem) {
    return (
      <div className="entry-editor">
        <Field label="Entry title" value={item.title} onChange={(value) => onUpdateItem(section.id, item.id, 'title', value)} />
        <Field label="Organization or subtitle" value={item.subtitle ?? ''} onChange={(value) => onUpdateItem(section.id, item.id, 'subtitle', value)} />
        <Field label="Dates or period" value={item.period ?? ''} onChange={(value) => onUpdateItem(section.id, item.id, 'period', value)} />
        <Field label="Short description" value={item.description ?? ''} onChange={(value) => onUpdateItem(section.id, item.id, 'description', value)} multiline rows={2} />
        <Field label="Details (one per line)" value={item.details.join('\n')} onChange={(value) => onUpdateItem(section.id, item.id, 'details', value.split('\n').map((line) => line.trim()).filter(Boolean))} multiline rows={4} />
        <Field label="Tags (comma-separated)" value={(item.tags ?? []).join(', ')} onChange={(value) => onUpdateItem(section.id, item.id, 'tags', value.split(',').map((tag) => tag.trim()).filter(Boolean))} />
        <div className="entry-edit-actions">
          <button className="text-button" type="button" onClick={() => onMoveItem(section.id, item.id, -1)}>Move up</button>
          <button className="text-button" type="button" onClick={() => onMoveItem(section.id, item.id, 1)}>Move down</button>
          <button className="text-button danger-text" type="button" onClick={() => onDeleteItem(section.id, item.id)}>Delete entry</button>
        </div>
      </div>
    );
  }

  function renderItem(item: PortfolioItem) {
    const isInterest = section.kind === 'interests';
    const isLanguage = section.kind === 'languages';
    const isSkill = section.kind === 'skills';
    return (
      <article className={`entry-card entry-${section.kind}`} key={item.id}>
        {editing ? renderEditor(item) : (
          <>
            <div className="entry-heading">
              <div>
                <h3>{item.title}</h3>
                {item.subtitle && <p className="entry-subtitle">{item.subtitle}</p>}
              </div>
              {item.period && <span className="period-label">{item.period}</span>}
            </div>
            {item.description && <p className="entry-description">{item.description}</p>}
            {item.details.length > 0 && (
              isSkill ? (
                <div className="skill-chip-list">{item.details.map((detail) => <span className="skill-chip" key={detail}>{detail}</span>)}</div>
              ) : (
                <ul className="detail-list">{item.details.map((detail, index) => <li key={`${item.id}-detail-${index}`}>{detail}</li>)}</ul>
              )
            )}
            {(isInterest || isLanguage || (!isSkill && item.tags && item.tags.length > 0)) && item.tags && item.tags.length > 0 && (
              <div className={`tag-list ${isInterest ? 'large-tags' : ''}`}>
                {item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
            )}
          </>
        )}
      </article>
    );
  }

  const sectionLabel = section.kind === 'projects' ? 'Selected work' : section.kind === 'skills' ? 'Capabilities' : 'Background';

  return (
    <section className={`cv-section section-${section.kind}`} id={section.id}>
      <div className="section-heading">
        <div className="section-kicker"><span>{String(sectionIndex + 2).padStart(2, '0')}</span><span>{sectionLabel}</span></div>
        <div className="section-title-wrap">
          {editing ? (
            <Field label="Section title" value={section.title} onChange={(value) => onUpdateTitle(section.id, value)} />
          ) : (
            <h2>{section.title}</h2>
          )}
          {editing && <div className="section-edit-actions">
            <button className="text-button" type="button" onClick={() => onMoveSection(section.id, -1)}>Move section up</button>
            <button className="text-button" type="button" onClick={() => onMoveSection(section.id, 1)}>Move section down</button>
            <button className="text-button danger-text" type="button" onClick={() => onDeleteSection(section.id)}>Delete section</button>
          </div>}
        </div>
      </div>
      <div className={`section-items items-${section.kind}`}>
        {section.items.length === 0 && !editing && <p className="empty-note">No entries in this section yet.</p>}
        {section.items.map(renderItem)}
        {editing && <button className="add-entry-button" type="button" onClick={() => onAddItem(section.id)}>+ Add information to {section.title || 'this section'}</button>}
      </div>
    </section>
  );
}
