import { useEffect, useState } from "react";
import { getRegions, getCities, getSubCities, getWoredas } from "@/lib/api"; // Import your API functions
import { FormLabel } from "../ui/form";
import Select from 'react-select';

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

  const [region, setRegion] = useState("");
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
    <div className="flex flex-col space-y-4">
      <div>
        <label className="mb-1 text-xs">Region</label>
        <Select
          defaultValue={regions.find((r) => r.id === region)?.name || null}
          onChange={(option) => setRegion(option?.value || '')}
          options={regions.map((r) => ({ label: r.name, value: r.id }))}
          isClearable
          classNamePrefix="select"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs">City</label>
        <Select
          defaultValue={cities.find((c) => c.id === city)?.name || null}
          onChange={(option) => setCity(option?.value || '')}
          options={cities.map((c) => ({ label: c.name, value: c.id }))}
          isClearable
          isDisabled={!region}
          classNamePrefix="select"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Sub City</label>
        <Select
          defaultValue={subCities.find((sc) => sc.id === subCity)?.name || null}
          onChange={(option) => setSubCity(option?.value || '')}
          options={subCities.map((sc) => ({ label: sc.name, value: sc.id }))}
          isClearable
          isDisabled={!city}
          classNamePrefix="select"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs">Woreda</label>
        <Select
          defaultValue={woredas.find((w) => w.id === woreda)?.name || null}
          onChange={(option) => setWoreda(option?.value || '')}
          options={woredas.map((w) => ({ label: w.name, value: w.id }))}
          isClearable
          isDisabled={!subCity}
          classNamePrefix="select"
        />
      </div>
    </div>
  );
}
