import { useState, useRef, useEffect } from 'react';
import { allTimezones, getOffsetMinutes, formatOffset } from '../utils/timezone';

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

  const filtered = allTimezones.filter(tz =>
    tz.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (open) {
      const idx = filtered.findIndex(tz => tz === timezone)
      setHighlightedIndex(idx >= 0 ? idx : 0)
    }
  }, [open])

  useEffect(() => {
    highlightedItemRef.current?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex])

  const handleSelect = (tz: string) => {
    onSelect(tz)
    setSearch(tz)
    setOpen(false)
  }

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1em' }}>
      <div style={{ position: 'relative', maxWidth: '30em', margin: '0 auto' }}>
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setOpen(true); setHighlightedIndex(0) }}
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
          style={{ fontSize: '1.5em', padding: '0.6em 0.75em', borderRadius: '0.75em', border: '0.35em solid black', width: '100%', backgroundColor: 'white', cursor: 'text', fontWeight: 'bold', boxShadow: '0.2em 0.2em 0 black', boxSizing: 'border-box' }}
        />
        {!open && <span style={{ position: 'absolute', right: '1em', top: '0.75em', fontSize: '0.9em', color: '#999', pointerEvents: 'none' }}>
          {formatOffset(getOffsetMinutes(timezone))}
        </span>}
        {open && filtered.length > 0 && (
          <div style={{ position: 'absolute', bottom: 'calc(100% + 0.5em)', left: 0, right: 0, maxHeight: '15em', overflowY: 'auto', backgroundColor: 'white', border: '0.35em solid black', borderRadius: '0.75em', boxShadow: '0.2em 0.2em 0 black', zIndex: 100 }}>
            {filtered.map((tz, i) => (
              <div
                key={tz}
                ref={i === highlightedIndex ? highlightedItemRef : null}
                onMouseDown={() => handleSelect(tz)}
                onTouchStart={(e) => { e.preventDefault(); handleSelect(tz) }}
                style={{ fontSize: '1.1em', padding: '0.4em 0.75em', cursor: 'pointer', backgroundColor: i === highlightedIndex ? '#DDD' : 'white', fontWeight: i === highlightedIndex ? 'bold' : 'normal', display: 'flex', justifyContent: 'space-between', gap: '1em' }}
              >
                <span>{tz}</span>
                <span style={{ opacity: 0.6, flexShrink: 0 }}>{formatOffset(getOffsetMinutes(tz))}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ fontSize: '1.1em', textAlign: 'center', marginTop: '1em', marginBottom: '0.5em' }}>🔍 Tap or type to find a time zone</div>
      </div>
    </div>
  )
}
