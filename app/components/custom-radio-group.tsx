import React, { useState } from "react";
import { FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Option = {
  value: string;
  label: string;
};

type CustomRadioGroupProps = {
  label: string;
  description?: string;
  name: string;
  options: Option[];
  defaultValue?: string;
  onChange: (value: string) => void;
};

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  label,
  description,
  name,
  options,
  defaultValue,
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultValue || "");

  const handleChange = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      {description && <FormDescription>{description}</FormDescription>}
      {/* Add a description if needed */}
      <FormControl>
        <div className="flex flex-col items-center w-full space-y-4">
          <RadioGroup
            onValueChange={handleChange}
            value={selected}
            className="w-full flex flex-col gap-2"
          >
            {options.map((option) => (
              <label
                key={option.value}
                htmlFor={`${name}-${option.value}`}
                className={`flex items-center justify-center cursor-pointer rounded-md p-4 shadow transition-colors
                  ${
                    selected === option.value
                      ? "bg-[#7289da]/20 border border-[#7289da]"
                      : "bg-[#2f3136] hover:bg-[#3a3e44] active:bg-[#202225]"
                  }`}
              >
                {/* Hide the radio button and make the label clickable */}
                <RadioGroupItem
                  value={option.value}
                  id={`${name}-${option.value}`}
                  className="peer sr-only"
                />
                {/* Center the label */}
                <span className="text-white m-0">{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default CustomRadioGroup;
