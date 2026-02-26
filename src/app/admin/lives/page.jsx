import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-(--dark1) text-white p-4">
      <div className="text-center space-y-5">
        <h1 className="text-9xl font-bold text-(--blue1) animate-bounce">404</h1>
        {/* <h2 className="text-2xl font-semibold">Oops! Page Not Found</h2> */}
        <h2 className="text-2xl font-semibold">Oops! Page is Under Development</h2>
        <p className="text-(--grey1) max-w-md mx-auto">
          Bhai, lagta hai aap ghalat raste par aa gaye hain. Ye page Under Development hai.
        </p>
        
        <Link href="/admin/dashboard">
          <Button className="bg-(--blue1) hover:opacity-90 px-8 h-12 rounded-xl mt-4">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}