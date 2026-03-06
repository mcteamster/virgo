import { useState } from 'react';

const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const },
  title: { fontSize: '2.5em' },
  paragraph: { fontSize: '1.25em', padding: '0.5em' },
  paragraphCentered: { fontSize: '1.25em', padding: '0.5em', textAlign: 'center' as const },
  link: { color: '#2C1A0E' },
  code: { cursor: 'pointer' as const, backgroundColor: '#e8d9b5', padding: '0.3em 0.6em', borderRadius: '0.4em', userSelect: 'none' as const },
}

export default function Header() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('npm i @mcteamster/virgo')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={styles.container}>
      <div style={styles.title}>Virgo 📍</div>
      <div style={styles.paragraph}>Approximate Location from Time Zone</div>
      <div style={styles.paragraphCentered}>
        <code style={styles.code} onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'npm i @mcteamster/virgo'}
        </code>
      </div>
      <div style={styles.paragraphCentered}>
        Learn more on <a style={styles.link} href="https://github.com/mcteamster/virgo">GitHub</a>
      </div>
    </div>
  )
}
