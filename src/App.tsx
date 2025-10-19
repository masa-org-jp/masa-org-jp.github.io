import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-8 px-6 py-10">
      <div className="flex items-center gap-6">
        <a
          href="https://vite.dev"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400/70"
        >
          <img src={viteLogo} className="h-20 w-20" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-sky-400/70"
        >
          <img src={reactLogo} className="h-20 w-20" alt="React logo" />
        </a>
      </div>

      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-indigo-300/80">Welcome</p>
        <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Vite + React + Tailwind</h1>
        <p className="mt-3 max-w-xl text-balance text-base text-slate-300">
          Tailwind CSS is wired up. Try editing <code className="text-indigo-300">src/App.tsx</code> to see hot updates in action.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="rounded-full bg-indigo-500 px-6 py-2 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
        >
          Count is {count}
        </button>
        <p className="text-sm text-slate-400">
          Use Tailwind classes to style your components rapidly.
        </p>
      </div>
    </main>
  )
}

export default App
