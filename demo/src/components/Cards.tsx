const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const },
  subtitle: { fontSize: '1.1em', paddingTop: '0.5em' },
  subtitleCompact: { fontSize: '1.1em', paddingTop: '0.25em' },
  card: {
    width: '28em',
    maxWidth: 'calc(100vw - 4em)',
    margin: '0.5em 0',
    padding: '1em',
    boxSizing: 'border-box' as const,
    borderRadius: '1em',
    border: '0.5em solid #2C1A0E',
  },
  cardCompact: { padding: '0.5em 1em' },
  coordinateCard: { backgroundColor: '#4DBD96' },
  awsCard: { backgroundColor: '#F0920A', cursor: 'pointer' as const },
  mapWrapper: { position: 'relative' as const, width: '100%', height: '16em', borderRadius: '0.5em', backgroundColor: '#d6cbb0', display: 'flex', alignItems: 'center' as const, justifyContent: 'center' as const },
  mapPlaceholder: { position: 'absolute' as const, inset: 0, display: 'flex', alignItems: 'center' as const, justifyContent: 'center' as const, color: '#8a7a5a', fontSize: '1.1em' },
  map: { position: 'absolute' as const, inset: 0, width: '100%', height: '100%', border: 'none', borderRadius: '0.5em', display: 'block' as const },
  value: { fontSize: '2em' },
  valueRow: { display: 'flex', justifyContent: 'space-around' as const, gap: '1em', marginTop: 0 },
  awsValueRow: { display: 'flex', justifyContent: 'space-around' as const, gap: '1em', marginTop: '0.25em', fontSize: '1.5em' },
  muted: { opacity: 0.7 },
  disclaimer: { fontSize: '0.75em', opacity: 0.6, marginTop: '0.5em' },
}

interface Location {
  latitude: number;
  longitude: number;
}

interface AwsRegion {
  closestRegion: string;
  distance: number;
}

interface Props {
  location: Location;
  awsRegion: AwsRegion;
}

export default function Cards({ location, awsRegion }: Props) {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, ...styles.coordinateCard }}>
        <div style={styles.mapWrapper}>
          <div style={styles.mapPlaceholder}>Loading map...</div>
          <iframe
            title="map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 5},${location.latitude - 2.5},${location.longitude + 5},${location.latitude + 2.5}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
            style={styles.map}
          />
        </div>
        <div style={styles.subtitle}>Estimated Coordinates</div>
        <div style={{ ...styles.value, ...styles.valueRow }}>
          <span>Lat: {location.latitude}</span>
          <span>Long: {location.longitude}</span>
        </div>
      </div>
      <div style={{ ...styles.card, ...styles.cardCompact, ...styles.awsCard }} onClick={() => { window.open('https://aws.amazon.com/about-aws/global-infrastructure/', '_blank') }}>
        <div style={styles.subtitleCompact}>Nearby AWS Region</div>
        <div style={{ ...styles.value, ...styles.awsValueRow }}>
          <span>{awsRegion.closestRegion}</span>
          <span style={styles.muted}>{awsRegion.distance.toFixed(0)} KM</span>
        </div>
        <div style={styles.disclaimer}>* Estimated region may not be the closest in larger time zones</div>
      </div>
    </div>
  )
}
