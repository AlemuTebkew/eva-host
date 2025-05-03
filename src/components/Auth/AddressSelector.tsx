import { useEffect, useState } from "react"

interface Option {
  label: string
  value: string
}

interface RegionSelectorProps {
  onChange: (location: {
    region: string
    city: string
    subCity: string
    woreda: string
  }) => void
  value?: {
    region: string
    city: string
    subCity: string
    woreda: string
  }
}

const mockData = {
  AddisAbaba: {
    Bole: {
      "Bole 01": ["01", "02", "03"],
      "Bole 02": ["01", "02"],
    },
    Arada: {
      "Arada 01": ["01", "02"],
    },
  },
  Oromia: {
    Adama: {
      "Adama 01": ["01"],
    },
  },
}

export default function RegionSelector({ onChange, value }: RegionSelectorProps) {
  const [region, setRegion] = useState(value?.region || "")
  const [city, setCity] = useState(value?.city || "")
  const [subCity, setSubCity] = useState(value?.subCity || "")
  const [woreda, setWoreda] = useState(value?.woreda || "")

  useEffect(() => {
    onChange({ region, city, subCity, woreda })
  }, [region, city, subCity, woreda])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Region */}
      <div>
        <label className="block mb-1 font-medium">Region</label>
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value)
            setCity("")
            setSubCity("")
            setWoreda("")
          }}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Region</option>
          {Object.keys(mockData).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block mb-1 font-medium">City</label>
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value)
            setSubCity("")
            setWoreda("")
          }}
          className="w-full border px-3 py-2 rounded"
          disabled={!region}
        >
          <option value="">Select City</option>
          {region &&
            Object.keys(mockData[region] || {}).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      </div>

      {/* SubCity */}
      <div>
        <label className="block mb-1 font-medium">Sub City</label>
        <select
          value={subCity}
          onChange={(e) => {
            setSubCity(e.target.value)
            setWoreda("")
          }}
          className="w-full border px-3 py-2 rounded"
          disabled={!city}
        >
          <option value="">Select SubCity</option>
          {region &&
            city &&
            Object.keys(mockData[region]?.[city] || {}).map((sc) => (
              <option key={sc} value={sc}>
                {sc}
              </option>
            ))}
        </select>
      </div>

      {/* Woreda */}
      <div>
        <label className="block mb-1 font-medium">Woreda</label>
        <select
          value={woreda}
          onChange={(e) => setWoreda(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          disabled={!subCity}
        >
          <option value="">Select Woreda</option>
          {region &&
            city &&
            subCity &&
            (mockData[region]?.[city]?.[subCity] || []).map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}
