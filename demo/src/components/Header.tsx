const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const },
  title: { fontSize: '2.5em' },
  paragraph: { fontSize: '1.25em', padding: '0.5em' },
  paragraphCentered: { fontSize: '1.25em', padding: '0.5em', textAlign: 'center' as const },
  link: { color: 'black' },
}

export default function Header() {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Virgo 📍</div>
      <div style={styles.paragraph}>Approximate Location from Time Zone</div>
      <div style={styles.paragraphCentered}>
        <code>npm i @mcteamster/virgo</code>
      </div>
      <div style={styles.paragraphCentered}>
        Learn more on <a style={styles.link} href="https://github.com/mcteamster/virgo">GitHub</a>
      </div>
    </div>
  )
}
