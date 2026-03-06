import { useState, useRef, useEffect } from 'react';
import { allTimezones, getOffsetMinutes, formatOffset } from '../utils/timezone';

const NUMERIC_RE = /^[+-]?\d+:?\d*$/

const styles = {
  container: { position: 'fixed' as const, bottom: 0, left: 0, right: 0, padding: '1em' },
  inner: { position: 'relative' as const, maxWidth: '30em', margin: '0 auto' },
  input: { fontSize: '1.5em', padding: '0.6em 0.75em', borderRadius: '0.75em', borderBottomRightRadius: 0, border: '0.35em solid #2C1A0E', width: '100%', backgroundColor: 'white', cursor: 'text' as const, fontWeight: 'bold', boxShadow: '0.25em 0.25em 0 #2C1A0E', boxSizing: 'border-box' as const },
  offset: { position: 'absolute' as const, right: '1em', top: '0.75em', fontSize: '0.9em', color: '#999', pointerEvents: 'none' as const },
  dropdown: { position: 'absolute' as const, bottom: 'calc(100% + 0.5em)', left: 0, right: 0, maxHeight: '15em', overflowY: 'auto' as const, backgroundColor: 'white', border: '0.35em solid #2C1A0E', borderRadius: '0.75em', boxShadow: '0.25em 0.25em 0 #2C1A0E', zIndex: 100 },
  item: { fontSize: '1.1em', padding: '0.4em 0.75em', cursor: 'pointer' as const, display: 'flex', justifyContent: 'space-between' as const, gap: '1em' },
  hint: { fontSize: '1.1em', textAlign: 'center' as const, marginTop: '1em', marginBottom: '0.5em' },
}

interface Props {
  timezone: string;
  onSelect: (tz: string) => void;
}

export default function TimezonePicker({ timezone, onSelect }: Props) {
  const [search, setSearch] = useState(timezone)
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const highlightedItemRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef(search)
  const timezoneRef = useRef(timezone)
  searchRef.current = search
  timezoneRef.current = timezone

  const normalise = (s: string) => s.toLowerCase().replace(/[ _]/g, ' ')
  const isNumeric = NUMERIC_RE.test(search.trim())
  const filtered = isNumeric
    ? allTimezones
    : allTimezones.filter(tz => normalise(tz).includes(normalise(search)))

  useEffect(() => {
    if (open) {
      const idx = filtered.findIndex(tz => tz === timezone)
      setHighlightedIndex(idx >= 0 ? idx : 0)
    }
  }, [open])

  useEffect(() => {
    if (!open || !isNumeric) return
    const [h, m = '0'] = search.trim().replace(/^([+-])/, '').split(':')
    const sign = search.trim().startsWith('-') ? -1 : 1
    const targetMinutes = sign * (parseInt(h) * 60 + (parseInt(m) || 0))
    const idx = allTimezones.findIndex(tz => getOffsetMinutes(tz) >= targetMinutes)
    setHighlightedIndex(idx >= 0 ? idx : allTimezones.length - 1)
  }, [search, open])

  useEffect(() => {
    highlightedItemRef.current?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex])

  const handleSelect = (tz: string) => {
    onSelect(tz)
    setSearch(tz)
    setOpen(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setOpen(true); if (!NUMERIC_RE.test(e.target.value.trim())) setHighlightedIndex(0) }}
          onFocus={() => { setSearch(''); setOpen(true) }}
          onBlur={() => setTimeout(() => { setOpen(false); if (!allTimezones.includes(searchRef.current)) setSearch(timezoneRef.current) }, 0)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightedIndex(i => Math.min(i + 1, filtered.length - 1)) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightedIndex(i => Math.max(i - 1, 0)) }
            if (e.key === 'PageDown') { e.preventDefault(); setHighlightedIndex(i => Math.min(i + 8, filtered.length - 1)) }
            if (e.key === 'PageUp') { e.preventDefault(); setHighlightedIndex(i => Math.max(i - 8, 0)) }
            if (e.key === 'Enter') handleSelect(filtered[highlightedIndex] ?? timezoneRef.current)
            if (e.key === 'Escape') { handleSelect(timezoneRef.current); inputRef.current?.blur() }
          }}
          placeholder="London, Sydney, Tokyo..."
          style={styles.input}
        />
        {!open && <span style={styles.offset}>{formatOffset(getOffsetMinutes(timezone))}</span>}
        {open && filtered.length > 0 && (
          <div style={styles.dropdown}>
            {filtered.map((tz, i) => (
              <div
                key={tz}
                ref={i === highlightedIndex ? highlightedItemRef : null}
                onMouseDown={() => handleSelect(tz)}
                onTouchStart={(e) => { e.preventDefault(); handleSelect(tz) }}
                style={{ ...styles.item, backgroundColor: i === highlightedIndex ? '#DDD' : 'white', fontWeight: i === highlightedIndex ? 'bold' : 'normal' }}
              >
                <span>{tz}</span>
                <span style={{ opacity: 0.6, flexShrink: 0 }}>{formatOffset(getOffsetMinutes(tz))}</span>
              </div>
            ))}
          </div>
        )}
        <div style={styles.hint}>🔍 Tap or type to find a time zone</div>
      </div>
    </div>
  )
}
