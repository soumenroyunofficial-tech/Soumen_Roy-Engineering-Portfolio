import { useMemo, useRef, useState } from 'react';
import { originalResume, type PortfolioItem, type PortfolioProfile, type PortfolioSection } from './data/resume';
import { Field } from './components/Field';
import { PortfolioSectionView } from './components/PortfolioSectionView';

type ThemeId = 'navy' | 'blue' | 'forest' | 'plum' | 'midnight';
type UndoRecord =
  | { kind: 'item'; sectionId: string; item: PortfolioItem; index: number }
  | { kind: 'section'; section: PortfolioSection; index: number };

const PROFILE_KEY = 'soumen-roy-portfolio-profile-v1';
const THEME_KEY = 'soumen-roy-portfolio-theme-v1';

const themes: { id: ThemeId; name: string; description: string; swatch: string }[] = [
  { id: 'navy', name: 'Navy & paper', description: 'Calm navy, graphite and warm white', swatch: '#16334b' },
  { id: 'blue', name: 'Cobalt', description: 'Cool slate with a clear cobalt accent', swatch: '#2859c5' },
  { id: 'forest', name: 'Forest', description: 'Deep green with a fresh lime accent', swatch: '#315744' },
  { id: 'plum', name: 'Plum', description: 'Muted plum with a soft rose accent', swatch: '#674e72' },
  { id: 'midnight', name: 'Midnight', description: 'A deep, high-contrast dark palette', swatch: '#80a5ff' },
];

function isPortfolioProfile(value: unknown): value is PortfolioProfile {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<PortfolioProfile>;
  return typeof candidate.name === 'string' && typeof candidate.headline === 'string' &&
    typeof candidate.location === 'string' && typeof candidate.phone === 'string' &&
    typeof candidate.email === 'string' && typeof candidate.summary === 'string' &&
    Array.isArray(candidate.sections) && candidate.sections.every((section) =>
      section && typeof section.id === 'string' && typeof section.title === 'string' &&
        Array.isArray(section.items) && section.items.every((item) =>
        item && typeof item.id === 'string' && typeof item.title === 'string' &&
        Array.isArray(item.details) && (item.tags === undefined || Array.isArray(item.tags)),
      ),
    );
}

function loadProfile(): PortfolioProfile {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (isPortfolioProfile(parsed)) return parsed;
    }
  } catch {
    // Fall back to the resume data if browser storage is unavailable or unreadable.
  }
  return structuredClone(originalResume);
}

function loadTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(THEME_KEY) as ThemeId | null;
    return themes.some((theme) => theme.id === stored) ? stored! : 'navy';
  } catch {
    return 'navy';
  }
}

function makeId(prefix: string) {
  return `${prefix}-${typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Date.now().toString(36)}`;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h3l1.2 4.1-2 1.7a15 15 0 0 0 6 6l1.7-2L21 14v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 5c0-1.1.9-2 2-2Z" /></svg>;
}

function App() {
  const [profile, setProfile] = useState<PortfolioProfile>(loadProfile);
  const [draft, setDraft] = useState<PortfolioProfile | null>(null);
  const [theme, setTheme] = useState<ThemeId>(loadTheme);
  const [undoRecord, setUndoRecord] = useState<UndoRecord | null>(null);
  const [notice, setNotice] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const editing = draft !== null;
  const visibleProfile = draft ?? profile;
  const pageSections = useMemo(() => visibleProfile.sections, [visibleProfile.sections]);

  function beginEdit() {
    setDraft(structuredClone(profile));
    setUndoRecord(null);
    setNotice('Editing a draft. Save your changes or cancel to discard them.');
  }

  function updateProfile<K extends 'name' | 'headline' | 'location' | 'phone' | 'email' | 'summary'>(key: K, value: PortfolioProfile[K]) {
    setDraft((current) => current ? { ...current, [key]: value } : current);
  }

  function updateSection(sectionId: string, updater: (section: PortfolioSection) => PortfolioSection) {
    setDraft((current) => current ? {
      ...current,
      sections: current.sections.map((section) => section.id === sectionId ? updater(section) : section),
    } : current);
  }

  function updateSectionTitle(sectionId: string, title: string) {
    updateSection(sectionId, (section) => ({ ...section, title }));
  }

  function updateItem<K extends keyof PortfolioItem>(sectionId: string, itemId: string, key: K, value: PortfolioItem[K]) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.map((item) => item.id === itemId ? { ...item, [key]: value } : item),
    }));
  }

  function saveChanges() {
    if (!draft) return;
    setProfile(draft);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(draft));
      setNotice('Changes saved in this browser. Export a JSON backup to move them to another device.');
    } catch {
      setNotice('Changes are active for this visit, but browser storage is unavailable. Export a backup to keep them.');
    }
    setDraft(null);
    setUndoRecord(null);
  }

  function cancelChanges() {
    setDraft(null);
    setUndoRecord(null);
    setNotice('Draft changes discarded. Your last saved profile is unchanged.');
  }

  function changeTheme(nextTheme: ThemeId) {
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
      setNotice('This color choice will last for this visit; browser storage is unavailable.');
    }
  }

  function addItem(sectionId: string) {
    const item: PortfolioItem = {
      id: makeId('item'),
      title: 'New entry',
      subtitle: '',
      period: '',
      description: '',
      details: [],
      tags: [],
    };
    updateSection(sectionId, (section) => ({ ...section, items: [...section.items, item] }));
    setNotice('Entry added. Fill it in below, then save your changes.');
  }

  function addSection() {
    if (!draft) return;
    const section: PortfolioSection = {
      id: makeId('section'),
      title: 'New section',
      kind: 'custom',
      items: [{ id: makeId('item'), title: 'New entry', details: [], tags: [] }],
    };
    setDraft({ ...draft, sections: [...draft.sections, section] });
    setNotice('Section added. Edit its title and entry details below.');
  }

  function deleteItem(sectionId: string, itemId: string) {
    if (!draft) return;
    const section = draft.sections.find((entry) => entry.id === sectionId);
    const index = section?.items.findIndex((entry) => entry.id === itemId) ?? -1;
    const item = section?.items[index];
    if (!item || index < 0) return;
    setUndoRecord({ kind: 'item', sectionId, item, index });
    updateSection(sectionId, (entry) => ({ ...entry, items: entry.items.filter((candidate) => candidate.id !== itemId) }));
    setNotice('Entry removed. Use Undo to restore it before saving.');
  }

  function deleteSection(sectionId: string) {
    if (!draft) return;
    const index = draft.sections.findIndex((section) => section.id === sectionId);
    const section = draft.sections[index];
    if (!section || index < 0) return;
    setUndoRecord({ kind: 'section', section, index });
    setDraft({ ...draft, sections: draft.sections.filter((candidate) => candidate.id !== sectionId) });
    setNotice('Section removed. Use Undo to restore it before saving.');
  }

  function undoDelete() {
    if (!draft || !undoRecord) return;
    if (undoRecord.kind === 'section') {
      setDraft((current) => {
        if (!current) return current;
        const sections = [...current.sections];
        sections.splice(Math.min(undoRecord.index, sections.length), 0, undoRecord.section);
        return { ...current, sections };
      });
    } else {
      setDraft((current) => {
        if (!current) return current;
        return {
          ...current,
          sections: current.sections.map((section) => {
            if (section.id !== undoRecord.sectionId) return section;
            const items = [...section.items];
            items.splice(Math.min(undoRecord.index, items.length), 0, undoRecord.item);
            return { ...section, items };
          }),
        };
      });
    }
    setUndoRecord(null);
    setNotice('Removed information restored. Save to keep this change.');
  }

  function moveItem(sectionId: string, itemId: string, direction: -1 | 1) {
    updateSection(sectionId, (section) => {
      const from = section.items.findIndex((item) => item.id === itemId);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= section.items.length) return section;
      const items = [...section.items];
      [items[from], items[to]] = [items[to], items[from]];
      return { ...section, items };
    });
  }

  function moveSection(sectionId: string, direction: -1 | 1) {
    setDraft((current) => {
      if (!current) return current;
      const from = current.sections.findIndex((section) => section.id === sectionId);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= current.sections.length) return current;
      const sections = [...current.sections];
      [sections[from], sections[to]] = [sections[to], sections[from]];
      return { ...current, sections };
    });
  }

  function exportBackup() {
    const data = { format: 'soumen-roy-portfolio', version: 1, exportedAt: new Date().toISOString(), profile: visibleProfile, theme };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'soumen-roy-portfolio-backup.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice('A JSON backup has been downloaded. You can import it in this browser or another one.');
  }

  async function importBackup(file?: File) {
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      const candidate = parsed && typeof parsed === 'object' && 'profile' in parsed
        ? (parsed as { profile: unknown }).profile
        : parsed;
      if (!isPortfolioProfile(candidate)) throw new Error('That file does not contain a compatible portfolio profile.');
      if (!window.confirm('Import this backup and replace the current profile? Export a backup first if you may need the current version.')) return;
      const imported = structuredClone(candidate);
      setProfile(imported);
      setDraft(null);
      setUndoRecord(null);
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(imported));
        const maybeTheme = parsed && typeof parsed === 'object' && 'theme' in parsed
          ? (parsed as { theme?: unknown }).theme
          : undefined;
        if (typeof maybeTheme === 'string' && themes.some((entry) => entry.id === maybeTheme)) changeTheme(maybeTheme as ThemeId);
        setNotice('Backup imported and saved in this browser.');
      } catch {
        setNotice('Backup imported for this visit, but browser storage is unavailable.');
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not read that backup file.');
    } finally {
      if (fileInput.current) fileInput.current.value = '';
    }
  }

  function resetToResume() {
    if (!window.confirm('Restore the original resume content and default color? This replaces locally saved edits in this browser.')) return;
    const restored = structuredClone(originalResume);
    setProfile(restored);
    setDraft(null);
    setUndoRecord(null);
    changeTheme('navy');
    try {
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(THEME_KEY);
    } catch {
      // The reset still takes effect for this visit.
    }
    setNotice('Original resume restored in this browser.');
  }

  return (
      <div className="site-shell" data-theme={theme}>
      <header className="topbar no-print">
        <a className="brand" href="#top" aria-label={`${visibleProfile.name} home`}>
          <span className="brand-mark" aria-hidden="true"><span>S</span><i>R</i></span>
          <span className="brand-name">{visibleProfile.name} <small>Engineering Portfolio</small></span>
        </a>
        <nav className="top-links" aria-label="Main navigation">
          {pageSections.filter((section) => ['experience', 'projects', 'skills'].includes(section.kind)).slice(0, 3).map((section) => (
            <a href={`#${section.id}`} key={section.id}>{section.title}</a>
          ))}
        </nav>
        <a className="top-contact" href={`mailto:${visibleProfile.email}`}>Contact <ArrowIcon /></a>
      </header>

      <main id="top">
        <section className="hero page-width" aria-labelledby="profile-name">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> ENGINEERING · EMBEDDED SYSTEMS · ROBOTICS</div>
            {editing ? (
              <div className="hero-edit-fields">
                <Field label="Name" value={visibleProfile.name} onChange={(value) => updateProfile('name', value)} />
                <Field label="Professional headline" value={visibleProfile.headline} onChange={(value) => updateProfile('headline', value)} multiline rows={2} />
              </div>
            ) : (
              <>
                <h1 id="profile-name">{visibleProfile.name}<span className="name-period">.</span></h1>
                <p className="hero-headline">{visibleProfile.headline}</p>
              </>
            )}
            <div className="hero-rule"><span /></div>
            <p className="hero-statement">Building thoughtful systems where mathematical reasoning meets real-world hardware.</p>
            <div className="contact-lines">
              {editing ? (
                <>
                  <Field label="Location" value={visibleProfile.location} onChange={(value) => updateProfile('location', value)} />
                  <Field label="Email" value={visibleProfile.email} onChange={(value) => updateProfile('email', value)} />
                  <Field label="Phone" value={visibleProfile.phone} onChange={(value) => updateProfile('phone', value)} />
                </>
              ) : (
                <>
                  <span>{visibleProfile.location}</span>
                  <a href={`mailto:${visibleProfile.email}`}><MailIcon />{visibleProfile.email}</a>
                  <a href={`tel:${visibleProfile.phone.replace(/\s/g, '')}`}><PhoneIcon />{visibleProfile.phone}</a>
                </>
              )}
            </div>
            <div className="hero-actions no-print">
              <a className="primary-link" href="#projects">Explore selected work <ArrowIcon /></a>
              {!editing && <button className="secondary-button" type="button" onClick={beginEdit}>Edit profile</button>}
            </div>
          </div>
        </section>

        <div className="control-band no-print">
          <div className="page-width control-inner">
            <div className="theme-control" aria-label="Choose a color theme">
              <span className="toolbar-label">Color theme</span>
              <div className="theme-options">
                {themes.map((choice) => (
                  <button
                    key={choice.id}
                    className={`theme-choice ${theme === choice.id ? 'is-selected' : ''}`}
                    type="button"
                    aria-label={`${choice.name}: ${choice.description}`}
                    aria-pressed={theme === choice.id}
                    title={choice.name}
                    onClick={() => changeTheme(choice.id)}
                  >
                    <span style={{ backgroundColor: choice.swatch }} />
                    <span className="theme-choice-name">{choice.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="toolbar-actions">
              {editing ? (
                <>
                  <button className="button button-primary" type="button" onClick={saveChanges}>Save changes</button>
                  <button className="button button-quiet" type="button" onClick={cancelChanges}>Cancel</button>
                  <button className="button button-quiet" type="button" onClick={addSection}>+ Add section</button>
                </>
              ) : (
                <>
                  <button className="button button-primary" type="button" onClick={beginEdit}>Edit CV</button>
                  <button className="button button-quiet" type="button" onClick={() => window.print()}>Print / Save PDF</button>
                </>
              )}
              <button className="button button-quiet" type="button" onClick={exportBackup}>Export JSON</button>
              <button className="button button-quiet" type="button" onClick={() => fileInput.current?.click()}>Import backup</button>
              <button className="button button-quiet reset-button" type="button" onClick={resetToResume}>Reset</button>
              <input ref={fileInput} className="visually-hidden" type="file" accept="application/json,.json" onChange={(event) => void importBackup(event.target.files?.[0])} aria-label="Choose a portfolio JSON backup" />
            </div>
          </div>
        </div>

        <div className="notice-strip no-print" aria-live="polite">
          <div className="page-width notice-inner">
            <span className="notice-icon" aria-hidden="true">i</span>
            <span>{notice || 'Your saved edits and color choice stay in this browser. Export a JSON backup to move them to another device.'}</span>
            {undoRecord && editing && <button className="undo-button" type="button" onClick={undoDelete}>Undo</button>}
          </div>
        </div>

        <section className="summary-band page-width" aria-labelledby="summary-title">
          <div className="section-kicker"><span>01</span><span>Profile</span></div>
          <div className="summary-content">
            <h2 id="summary-title">A little about<br />how I work.</h2>
            {editing ? (
              <Field label="Professional summary" value={visibleProfile.summary} onChange={(value) => updateProfile('summary', value)} multiline rows={6} />
            ) : (
              <p>{visibleProfile.summary}</p>
            )}
          </div>
        </section>

        <section className="contents-band page-width no-print" aria-label="Sections in this CV">
          <span className="contents-label">On this page</span>
          <div className="contents-links">
            {pageSections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
          </div>
        </section>

        <div className="resume-sections page-width">
          {pageSections.map((section, sectionIndex) => (
            <PortfolioSectionView
              key={section.id}
              section={section}
              sectionIndex={sectionIndex}
              editing={editing}
              onUpdateTitle={updateSectionTitle}
              onMoveSection={moveSection}
              onDeleteSection={deleteSection}
              onAddItem={addItem}
              onUpdateItem={updateItem}
              onMoveItem={moveItem}
              onDeleteItem={deleteItem}
            />
          ))}
        </div>

        <section className="closing-band page-width">
          <div className="closing-mark" aria-hidden="true">SR<span>+</span></div>
          <div><span className="closing-kicker">LET’S CONNECT</span><h2>Interested in building<br />something useful?</h2></div>
          <a className="primary-link" href={`mailto:${visibleProfile.email}`}>Get in touch <ArrowIcon /></a>
        </section>
      </main>

      <footer className="site-footer page-width">
        <span>© {new Date().getFullYear()} {visibleProfile.name}. Portfolio content supplied by the owner.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
      <div className="print-only print-contact">{visibleProfile.email} · {visibleProfile.phone} · {visibleProfile.location}</div>
    </div>
  );
}

export default App;
