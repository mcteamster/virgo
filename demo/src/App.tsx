// Demo Environment for Virgo - https://virgo.tonz.io
import { useState } from 'react';
import Header from './components/Header';
import Cards from './components/Cards';
import TimezonePicker from './components/TimezonePicker';
import { Virgo, Virgo2AWS } from '@mcteamster/virgo' // Production
// import { Virgo, Virgo2AWS } from '../../src/index.ts' // Local Development

const styles = {
  body: {
    position: 'fixed' as const,
    inset: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
    gap: '2em',
    alignItems: 'center' as const,
    fontSize: 'min(1.5vh, 13px)',
    padding: '2em 1em 10em',
    boxSizing: 'border-box' as const,
  },
}

function App() {
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  const location = Virgo.getLocation(timezone)
  const awsRegion = Virgo2AWS.getClosestRegion({ origin: timezone })

  return (
    <div style={styles.body}>
      <Header />
      <Cards location={location} awsRegion={awsRegion} />
      <TimezonePicker timezone={timezone} onSelect={setTimezone} />
    </div>
  )
}

export default App
