import { Suspense } from "react"

export default UpdatePromptLayout = ({ children }) => {
  return (
    <Suspense fallback={<div className="font-bold text-3xl p-4 border-2 rounded-[10px] shadow-md">Loading....</div>}>
      {children}
    </Suspense>
  )

}
