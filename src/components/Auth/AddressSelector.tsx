import { useEffect, useState } from "react";
import { getRegions, getCities, getSubCities, getWoredas } from "@/lib/api"; // Import your API functions
import { FormLabel } from "../ui/form";

interface RegionSelectorProps {
  onChange: (location: {
    region: string;
    city: string;
    subCity: string;
    woreda: string;
  }) => void;
  value?: {
    region: string;
    city: string;
    subCity: string;
    woreda: string;
  };
}

export default function RegionSelector({
  onChange,
  value,
}: RegionSelectorProps) {
  const [regions, setRegions] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [subCities, setSubCities] = useState<any[]>([]);
  const [woredas, setWoredas] = useState<any[]>([]);

  const [region, setRegion] = useState(value?.region || "");
  const [city, setCity] = useState(value?.city || "");
  const [subCity, setSubCity] = useState(value?.subCity || "");
  const [woreda, setWoreda] = useState(value?.woreda || "");

  // Fetch regions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { data } = await getRegions();
        console.log("Fetched regions:", data);
        setRegions(data || []);
      } catch (error) {
        console.error("Failed to fetch regions:", error);
      }
    };
    fetchRegions();
  }, []);

  // Fetch cities when a region is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (region) {
        try {
          const { data } = await getCities(region);
          setCities(data || []);
        } catch (error) {
          console.error("Failed to fetch cities:", error);
        }
      } else {
        setCities([]);
      }
      setCity("");
      setSubCities([]);
      setSubCity("");
      setWoredas([]);
      setWoreda("");
    };
    fetchCities();
  }, [region]);

  // Fetch sub-cities when a city is selected
  useEffect(() => {
    const fetchSubCities = async () => {
      if (city) {
        try {
          const { data } = await getSubCities(city);
          setSubCities(data || []);
        } catch (error) {
          console.error("Failed to fetch sub-cities:", error);
        }
      } else {
        setSubCities([]);
      }
      setSubCity("");
      setWoredas([]);
      setWoreda("");
    };
    fetchSubCities();
  }, [city]);

  // Fetch woredas when a sub-city is selected
  useEffect(() => {
    const fetchWoredas = async () => {
      if (subCity) {
        try {
          const { data } = await getWoredas(subCity);
          setWoredas(data || []);
        } catch (error) {
          console.error("Failed to fetch woredas:", error);
        }
      } else {
        setWoredas([]);
      }
      setWoreda("");
    };
    fetchWoredas();
  }, [subCity]);

  // Notify parent component of changes
  useEffect(() => {
    onChange({ region, city, subCity, woreda });
  }, [region, city, subCity, woreda]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Region */}
      <div>
        <label className="mb-1 text-xs">Region</label>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full rounded border px-3 py-1 text-sm"
          required
        >
          <option className="text-xs" value="">Select Region</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id} className="text-xs">
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="mb-1 block text-xs">City</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded border px-3 py-1 text-sm"
          disabled={!region}
          required
        >
          <option className="text-sm" value="">Select City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id} className="text-sm">
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* SubCity */}
      <div>
        <label className="mb-1 block text-sm">Sub City</label>
        <select
          value={subCity}
          onChange={(e) => setSubCity(e.target.value)}
          className="w-full rounded border px-3 py-1 text-sm"
          disabled={!city}
          required
        >
          <option className="text-sm" value="">Select SubCity</option>
          {subCities.map((sc) => (
            <option key={sc.id} value={sc.id} className="text-sm">
              {sc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Woreda */}
      <div>
        <label className="mb-1 block text-xs">Woreda</label>
        <select
          value={woreda}
          onChange={(e) => setWoreda(e.target.value)}
          className="w-full rounded border px-3 py-1 text-sm"
          disabled={!subCity}
        >
          <option value="">Select Woreda</option>
          {woredas?.map((w) => (
            <option key={w.id} value={w.id} className="text-sm">
              {w.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
