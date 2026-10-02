import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'Veritas Autos | Genuine Parts. Greater Journeys.',description:'Nigeria’s spare parts hub for cars, trucks, tyres, rims, oils and automotive essentials.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
