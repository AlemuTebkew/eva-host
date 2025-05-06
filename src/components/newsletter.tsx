'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Email is required.")
      return
    }
    setError("")
    // Submit logic here (e.g., API call)
    console.log("Subscribed:", { fullName, email })
  }

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch bg-white rounded-xl overflow-hidden shadow-md border">
          {/* Left: Orange Background */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-500 text-white p-6 md:p-10 md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Stay up to date with our <br className="hidden md:block" /> newsletters
            </h2>
            <p className="text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
              purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor.
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>

          {/* Right: Form Section */}
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white">
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input
                  placeholder="e.g. John Dowry"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input
                  type="email"
                  placeholder="e.g. john.dowry@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="flex items-start space-x-4">
                <Button type="submit" className="bg-blue-700 hover:bg-blue-800">Subscribe</Button>
                <p className="text-xs text-gray-500">
                  Your data is in safe hands. Check out our{" "}
                  <a href="#" className="text-blue-600 font-medium underline">Privacy policy</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
