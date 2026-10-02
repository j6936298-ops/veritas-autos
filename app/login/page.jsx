import Link from 'next/link';import AuthForm from '../auth-form';
export const metadata={title:'Sign in | Veritas Autos'};
export default function LoginPage(){return <div className="page-shell"><header className="simple-header"><Link href="/" className="brand"><img src="/assets/veritas-autos-logo.png" alt=""/><span>VERITAS <b>AUTOS</b><small>THE SPARE PARTS HUB</small></span></Link><Link className="text-link" href="/">← Back to marketplace</Link></header><main className="simple-main"><AuthForm mode="login"/></main></div>}
