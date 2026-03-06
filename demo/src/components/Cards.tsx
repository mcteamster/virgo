const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const },
  subtitle: { fontSize: '1.1em' },
  card: {
    minWidth: '20em',
    margin: '1em',
    padding: '1em',
    borderRadius: '1em',
    border: '0.5em solid black',
    cursor: 'pointer' as const,
  },
  value: { fontSize: '2em' },
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
      <div style={styles.subtitle}>Estimated Coordinates</div>
      <div style={{ ...styles.card, backgroundColor: '#66CDAA' }} onClick={() => { window.open(`https://maps.apple.com/frame?center=${location.latitude}%2C${location.longitude}&span=4%2C10`, '_blank') }}>
        <div style={styles.value}>Latitude: {location.latitude}</div>
        <div style={styles.value}>Longitude: {location.longitude}</div>
      </div>
      <div style={styles.subtitle}>Closest AWS Region</div>
      <div style={{ ...styles.card, backgroundColor: '#FF9900' }} onClick={() => { window.open('https://aws.amazon.com/about-aws/global-infrastructure/', '_blank') }}>
        <div style={styles.value}>{awsRegion.closestRegion}</div>
        <div style={styles.value}>{awsRegion.distance.toFixed(0)} KM</div>
      </div>
    </div>
  )
}
