import { useState } from "react";

interface Props {
  firstName: string;
  setFirstName: (v: string) => void;

  lastName: string;
  setLastName: (v: string) => void;

  username: string;
  teamName: string;

  dateOfBirth: string;
  setDateOfBirth: (v: string) => void;

  phone: string;
  setPhone: (v: string) => void;

  email: string;

  address: string;
  setAddress: (v: string) => void;

  onSave: () => void;
  isLoading: boolean;
  saveSuccess?: boolean;

  errors: {
    global?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    address?: string;
  };
  clearError: (field?: any) => void;
}

const labelClass =
  "text-[12px] font-semibold uppercase leading-[16px] tracking-widest tracking-[0.6px] text-[#4F4F4F]";
const inputClass =
  " w-full h-[51px] rounded-[8px] border border-[#BDBDBD] bg-[#F0F0F0] pt-[12px] pr-[14px] pb-[12px] pl-[13px] text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 shadow-[inset_4px_4px_4px_0_rgba(0,0,0,0.25)]";
const errorClass = "text-xs text-red-500";

const NO_TEAM_TEXT = "User not joined to a team yet";

export default function ProfileForm({
  firstName, setFirstName,
  lastName, setLastName,
  username,
  teamName,
  dateOfBirth, setDateOfBirth,
  phone, setPhone,
  email,
  address, setAddress,
  onSave,
  isLoading,
  saveSuccess = false,
  errors,
}: Props) {
  const [fullNameInput, setFullNameInput] = useState(
    () => [firstName, lastName].filter(Boolean).join(" ")
  );

  const handleFullNameChange = (value: string) => {
    setFullNameInput(value);
    const [first, ...rest] = value.trimStart().split(" ");
    setFirstName(first || "");
    setLastName(rest.join(" "));
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/[^0-9]/g, ""));
  };

  return (
    <div className=" flex flex-col gap-6">
      <div className=" grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        {/* Full Name */}
        <div className=" flex flex-col gap-1.5">
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className={inputClass}
            value={fullNameInput}
            onChange={(e) => handleFullNameChange(e.target.value)}
          />
          {(errors.firstName || errors.lastName) && (
            <p className={errorClass}>{errors.firstName || errors.lastName}</p>
          )}
        </div>

        {/* User Name — edited from the header, read-only here */}
        <div className=" flex flex-col gap-1.5">
          <label className={labelClass}>User Name</label>
          <input
            type="text"
            placeholder="e.g. MechMaster_01"
            className={inputClass}
            value={username}
            disabled
          />
        </div>

        {/* Date of Birth */}
        <div className="  flex flex-col gap-1.5">
          <label className={labelClass}>Date of Birth</label>
          <input
            type="date"
            className={inputClass}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth}</p>}
        </div>

        {/* Team Name — comes from team API, not editable here */}
        <div className=" flex flex-col gap-1.5">
          <label className={labelClass}>Team Name</label>
          <input
            type="text"
            placeholder="e.g. RoboWinners"
            className={inputClass}
            value={teamName === NO_TEAM_TEXT ? "" : teamName}
            disabled
          />
        </div>

        {/* Contact Number */}
        <div className=" flex flex-col gap-1.5">
          <label className={labelClass}>Contact Number</label>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="+91-"
            className={inputClass}
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
        </div>

        {/* Email Address — change flow lives in Settings */}
        <div className=" flex flex-col gap-1.5">
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            placeholder="e.g. botmakers12@gmail.com"
            className={inputClass}
            value={email}
            disabled
          />
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Address</label>
        <textarea
          placeholder="Enter your full address"
          className={`${inputClass} min-h-[100px] resize-y`}
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className={errorClass}>{errors.address}</p>}
      </div>

      {errors.global && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-500">
          {errors.global}
        </p>
      )}

      <div className="flex justify-center sm:justify-end">
        <button
          onClick={onSave}
          disabled={isLoading}
          className={`w-[209px] h-[40px] flex items-center justify-center rounded-lg text-sm font-bold uppercase tracking-wide text-white transition disabled:opacity-60 shadow-lg shadow-purple-500/30 ${
            saveSuccess ? "bg-green-500" : "bg-gradient-to-b from-[#0162D1] to-[#8C6CFF] hover:brightness-110"
          }`}
        >
          {isLoading ? "Saving..." : saveSuccess ? "✓ Saved!" : "Save Profile Data"}
        </button>
      </div>
    </div>
  );
}