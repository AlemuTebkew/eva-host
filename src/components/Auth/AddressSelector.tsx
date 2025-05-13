import { useEffect, useState } from "react";
import { getRegions, getCities, getSubCities, getWoredas } from "@/lib/api"; // Import your API functions
import { FormLabel } from "../ui/form";
import Select from 'react-select';
import { useFormContext } from "react-hook-form";

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
  const { formState: { errors } } = useFormContext();
  const [regions, setRegions] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [subCities, setSubCities] = useState<any[]>([]);
  const [woredas, setWoredas] = useState<any[]>([]);

  // Initialize state with provided values
  const [region, setRegion] = useState(value?.region || "");
  const [city, setCity] = useState(value?.city || "");
  const [subCity, setSubCity] = useState(value?.subCity || "");
  const [woreda, setWoreda] = useState(value?.woreda || "");

  // Update local state when value prop changes
  // useEffect(() => {
  //   if (value) {
  //     setRegion(value.region || "");
  //     setCity(value.city || "");
  //     setSubCity(value.subCity || "");
  //     setWoreda(value.woreda || "");
  //   }
  // }, [value]);

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
          console.log("Fetched cities:", data);
          setCities(data || []);
        } catch (error) {
          console.error("Failed to fetch cities:", error);
        }
      } else {
        setCities([]);
      }
      // Only reset if region changed
      if (region !== value?.region) {
        setCity("");
        setSubCities([]);
        setSubCity("");
        setWoredas([]);
        setWoreda("");
      }
    };
    fetchCities();
  }, [region, value?.region]);

  // Fetch sub-cities when a city is selected
  useEffect(() => {
    const fetchSubCities = async () => {
      if (city) {
        try {
          const { data } = await getSubCities(city);
          console.log("Fetched sub-cities:", data);
          setSubCities(data || []);
        } catch (error) {
          console.error("Failed to fetch sub-cities:", error);
        }
      } else {
        setSubCities([]);
      }
      // Only reset if city changed
      if (city !== value?.city) {
        setSubCity("");
        setWoredas([]);
        setWoreda("");
      }
    };
    fetchSubCities();
  }, [city, value?.city]);

  // Fetch woredas when a sub-city is selected
  useEffect(() => {
    const fetchWoredas = async () => {
      if (subCity) {
        try {
          const { data } = await getWoredas(subCity);
          console.log("Fetched woredas:", data);
          setWoredas(data || []);
        } catch (error) {
          console.error("Failed to fetch woredas:", error);
        }
      } else {
        setWoredas([]);
      }
      // Only reset if subCity changed
      if (subCity !== value?.subCity) {
        setWoreda("");
      }
    };
    fetchWoredas();
  }, [subCity, value?.subCity]);

  // Notify parent component of changes
  useEffect(() => {
    onChange({ region, city, subCity, woreda });
  }, [region, city, subCity, woreda, onChange]);

  const customStyles = {
    control: (base: any, state: { isDisabled: boolean }) => ({
      ...base,
      minHeight: '42px',
      borderColor: errors?.region || errors?.city || errors?.subCity ? '#ef4444' : '#e2e8f0',
      '&:hover': {
        borderColor: errors?.region || errors?.city || errors?.subCity ? '#ef4444' : '#94a3b8'
      },
      boxShadow: 'none',
      '&:focus-within': {
        borderColor: errors?.region || errors?.city || errors?.subCity ? '#ef4444' : '#1e40af',
        boxShadow: '0 0 0 2px rgba(30, 64, 175, 0.2)'
      },
      backgroundColor: state.isDisabled ? '#f1f5f9' : 'white'
    }),
    option: (base: any, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#1e40af' 
        : state.isFocused 
          ? '#e2e8f0' 
          : 'white',
      color: state.isSelected ? 'white' : '#1e293b',
      '&:hover': {
        backgroundColor: state.isSelected ? '#1e40af' : '#f1f5f9'
      }
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 9999
    })
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Region */}
      <div className="space-y-2">
        <FormLabel className="text-sm font-medium text-gray-700">
          Region <span className="text-red-500">*</span>
        </FormLabel>
        <Select
          value={regions.find(r => r.id === region) || null}
          onChange={(option: any) => setRegion(option?.id || "")}
          options={regions}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          placeholder="Select Region"
          isClearable
          isDisabled={regions.length === 0}
          required
        />
        {errors?.region && (
          <p className="mt-1 text-sm text-red-500">Region is required</p>
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <FormLabel className="text-sm font-medium text-gray-700">
          City <span className="text-red-500">*</span>
        </FormLabel>
        <Select
          value={cities.find(c => c.id === city) || null}
          onChange={(option: any) => setCity(option?.id || "")}
          options={cities}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          placeholder="Select City"
          isClearable
          isDisabled={!region || cities.length === 0}
          styles={customStyles}
          required
        />
        {errors?.city && (
          <p className="mt-1 text-sm text-red-500">City is required</p>
        )}
      </div>

      {/* SubCity */}
      <div className="space-y-2">
        <FormLabel className="text-sm font-medium text-gray-700">
          Sub City <span className="text-red-500">*</span>
        </FormLabel>
        <Select
          value={subCities.find(sc => sc.id === subCity) || null}
          onChange={(option: any) => setSubCity(option?.id || "")}
          options={subCities}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          placeholder="Select SubCity"
          isClearable
          isDisabled={!city || subCities.length === 0}
          styles={customStyles}
          required
        />
        {errors?.subCity && (
          <p className="mt-1 text-sm text-red-500">Sub City is required</p>
        )}
      </div>

      {/* Woreda */}
      <div className="space-y-2">
        <FormLabel className="text-sm font-medium text-gray-700">Woreda</FormLabel>
        <Select
          value={woredas.find(w => w.id === woreda) || null}
          onChange={(option: any) => setWoreda(option?.id || "")}
          options={woredas}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          placeholder="Select Woreda"
          isClearable
          isDisabled={!subCity || woredas.length === 0}
          styles={customStyles}
        />
      </div>
    </div>
  );
}
