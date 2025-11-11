import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

export default function Counter({ formData, setFormData, field, step }) {
  const handleIncrement = () => {
    setFormData((previousData) => ({
      ...previousData,
      [field]: Math.min(previousData[field] + step, 16),
    }));
  };

  const handleDecrement = () => {
    setFormData((previousData) => ({
      ...previousData,
      [field]: Math.max(previousData[field] - step, 0),
    }));
  };
  return (
    <div>
      <div className="flex gap-3 justify-center items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className="cursor-pointer">
          <CiCircleMinus className="text-4xl text-red-500 bg-black rounded-full" />
        </button>
        <span className="text-3xl font-bold">{formData[field]}</span>
        <button
          type="button"
          onClick={handleIncrement}
          className="cursor-pointer">
          <CiCirclePlus className="text-4xl bg-black rounded-full text-emerald-300" />
        </button>
      </div>
    </div>
  );
}
