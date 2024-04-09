import { signal, effect} from "@preact/signals-react"

export const currentUser = signal<string | null>(null)

effect(()=>{
  const session = localStorage.getItem('currentUser')
  console.log("session storage: ", session)
})

