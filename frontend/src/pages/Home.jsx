import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Laper? <br /> Kami Siap Antar! 🍔</h1>
          <p style={styles.subtitle}>
            Pesan makanan favoritmu dengan mudah dan cepat. <br />
            Ribuan menu lezat siap diantarkan ke pintumu.
          </p>
          <Link to="/menu" style={styles.btn}>Pesan Sekarang</Link>
        </div>
        <div style={styles.heroImage}>🍜</div>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <span style={styles.featureIcon}>🚀</span>
          <h3 style={styles.featureTitle}>Cepat & Mudah</h3>
          <p style={styles.featureDesc}>Pesan dalam hitungan detik, makanan tiba dalam hitungan menit.</p>
        </div>
        <div style={styles.featureCard}>
          <span style={styles.featureIcon}>🍽️</span>
          <h3 style={styles.featureTitle}>Menu Beragam</h3>
          <p style={styles.featureDesc}>Ratusan pilihan menu dari berbagai kategori untuk semua selera.</p>
        </div>
        <div style={styles.featureCard}>
          <span style={styles.featureIcon}>💳</span>
          <h3 style={styles.featureTitle}>Pembayaran Mudah</h3>
          <p style={styles.featureDesc}>Berbagai metode pembayaran tersedia untuk kenyamananmu.</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fff9f6',
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '80px 80px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ffe0d0',
  },
  heroContent: {
    maxWidth: '500px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: '1.2',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.7',
    marginBottom: '32px',
  },
  btn: {
    display: 'inline-block',
    backgroundColor: '#ff6b35',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: '0 4px 15px rgba(255,107,53,0.4)',
  },
  heroImage: {
    fontSize: '180px',
    lineHeight: '1',
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    padding: '64px 80px',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '32px',
    textAlign: 'center',
    flex: 1,
    maxWidth: '280px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  featureIcon: {
    fontSize: '40px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    margin: '16px 0 8px',
  },
  featureDesc: {
    fontSize: '14px',
    color: '#888',
    lineHeight: '1.6',
  },
}