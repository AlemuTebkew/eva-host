import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="rounded-lg bg-orange-500 p-4 sm:p-6 text-white">
          <h3 className="mb-2 text-lg sm:text-xl font-bold">Stay up to date with our newsletters</h3>
          <p className="mb-4 text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Input type="email" placeholder="Email Address" className="bg-white text-gray-900" />
            <Button className="bg-blue-900 hover:bg-blue-800">Subscribe</Button>
          </div>
          <p className="mt-2 text-xs">By subscribing you agree to our Privacy Policy</p>
        </div>
      </div>
    </section>
  )
}
