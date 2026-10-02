import './globals.css';
export const metadata = {
  title: 'Veritas Autos | The Spare Parts Hub',
  description: 'A spare parts marketplace for drivers, workshops, retailers and fleet operators. Shop vehicle parts, oils, tyres, rims and commercial truck parts.',
  applicationName: 'Veritas Autos',
  robots: { index: true, follow: true },
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#151719' };
export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
