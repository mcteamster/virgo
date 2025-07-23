// Demo Environment for Virgo - https://virgo.tonz.io
import type { Properties } from 'csstype';
import { Virgo, Virgo2AWS } from '@mcteamster/virgo' // Production
// import { Virgo, Virgo2AWS } from '../../src/index.ts' // Local Development

function App() {
  let timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone
  // 'Asia/Tokyo' // Override timezone for testing
  const location = Virgo.getLocation(timezone)
  const awsRegion = Virgo2AWS.getClosestRegion({ origin: timezone })

  const styles: { [key: string]: Properties<string | number> } = {
    body: {
      width: '100%',
      height: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'calc(min(1vh, 2vw))'
    },
    title: {
      fontSize: '4.5em',
    },
    paragraph: {
      fontSize: '1.75em',
      padding: '0.5em',
    },
    subtitle: {
      fontSize: '1.5em',
    },
    card: {
      minWidth: '30em',
      margin: '1em',
      padding: '1em',
      borderRadius: '1em',
      backgroundColor: '#eee',
      color: '#111',
      cursor: 'pointer',
    },
    value: {
      fontSize: '3em',
    },
    link: {
      color: 'white',
    },
  }

  return (
    <div style={styles.body}>
      <div style={styles.title}>Virgo 📍</div>
      <div style={styles.paragraph}>
        Approximate Location by Time Zone
      </div>
      <div style={styles.paragraph}>
        <code>npm i @mcteamster/virgo</code>
      </div>
      <div style={{ ...styles.card }}>
        <div style={styles.subtitle}>Time Zone</div>
        <div style={styles.value}>{timezone}</div>
      </div>
      <div style={{ ...styles.card, backgroundColor: '#66CDAA' }} onClick={() => { window.open(`https://maps.apple.com/frame?center=${location.latitude}%2C${location.longitude}&span=4%2C10`, '_blank') }}>
        <div style={styles.subtitle}>Centroid Coordinates</div>
        <div style={styles.value}>Latitude: {location.latitude}</div>
        <div style={styles.value}>Longitude: {location.longitude}</div>
      </div>
      <div style={{ ...styles.card, backgroundColor: '#FF9900' }} onClick={() => { window.open('https://aws.amazon.com/about-aws/global-infrastructure/', '_blank') }}>
        <div style={styles.subtitle}>Closest AWS Region</div>
        <div style={styles.value}>{awsRegion.closestRegion}</div>
        <div style={styles.value}>~{awsRegion.distance.toFixed(3)} KM</div>
      </div>
      <div style={styles.paragraph}>
        Learn more on <a style={styles.link} href="https://github.com/mcteamster/virgo">GitHub</a>
      </div>
    </div>
  )
}

export default App
