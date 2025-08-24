import { ReactNode } from 'react'
import AppBar from './AppBar'
import FilterBar from './FilterBar'

export default function Layout({ children }: { children: ReactNode }){
  return (
    <div>
      <AppBar />
      <FilterBar />
      <main className="container" role="main">{children}</main>
      <footer className="container" style={{color:'var(--muted)', padding:'2rem 0'}}>
        © {new Date().getFullYear()} Dentsu World Services
      </footer>
    </div>
  )
}