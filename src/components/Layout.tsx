import { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setSearch, toggleTheme } from '@/app/uiSlice'

export default function Layout({ children }: { children: ReactNode }){
  const dispatch = useAppDispatch()
  const search = useAppSelector(s => s.ui.search)

  return (
    <div>
      <header className="site">
        <div className="inner container">
          <div className="brand">DWS Blog</div>
          <div className="search">
            <input
              placeholder="Search posts..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              aria-label="Search posts"
            />
          </div>
          <button
            aria-label="Toggle theme"
            onClick={() => dispatch(toggleTheme())}
            style={{ background:'transparent', color:'var(--text)', border:'1px solid var(--border)', borderRadius: 10, padding: '.5rem .8rem', cursor:'pointer' }}
          >☼</button>
        </div>
      </header>
      <main className="container" role="main">{children}</main>
      <footer className="container" style={{color:'var(--muted)', padding:'2rem 0'}}>
        © {new Date().getFullYear()} DWS
      </footer>
    </div>
  )
}