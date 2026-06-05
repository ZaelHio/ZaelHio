import { useState } from 'react'
import SystemSelect from './components/SystemSelect'
import ShadowdarkCreator from './components/shadowdark/ShadowdarkCreator'
import BSHCreator from './components/bsh/BSHCreator'

export default function App() {
  const [system, setSystem] = useState(null)

  if (!system) return <SystemSelect onSelect={setSystem} />
  if (system === 'shadowdark') return <ShadowdarkCreator onBack={() => setSystem(null)} />
  if (system === 'bsh') return <BSHCreator onBack={() => setSystem(null)} />
}
