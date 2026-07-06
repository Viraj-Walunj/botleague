import { useState } from "react";
import OtpInputGroup from "./OtpInputGroup";

interface Props {
  firstName: string;
  setFirstName: (v: string) => void;

  lastName: string;
  setLastName: (v: string) => void;

  // username: string;
  // teamName: string;

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
  " font-['Poppins'] text-[18px]  font-semibold uppercase leading-[16px] text-black/62  tracking-[0.6px] ";
const inputClass =
  "w-[470px] h-[60px] rounded-[10px] border border-[#BDBDBD] bg-[#F0F0F0] px-[20px] font-['Inter'] text-[25px] font-medium text-[#282828]/84 leading-normal tracking-[1px] text-lg text-gray-700 outline-none transition focus:border-blue-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 shadow-[inset_4px_4px_4px_0_rgba(0,0,0,0.25)]";
const errorClass = "text-xs text-red-500";
const getOtpClass =
  "font-['Inter'] text-[21px] font-bold text-[#8C6CFF] leading-[16px] tracking-[0px] transition hover:brightness-125 disabled:opacity-50 pr-6";

// const NO_TEAM_TEXT = "User not joined to a team yet";

/**
 * Editable form for the Edit Profile page ( /profile/edit ), styled to the
 * Figma "Edit Profile" spec, including inline OTP verification UI for
 * phone + email. Distinct from ProfileForm.tsx, which belongs to the
 * profile-filling ProfilePage and must stay untouched.
 */
export default function EditProfileForm({
  firstName, setFirstName,
  lastName, setLastName,
  // username,
  // teamName,
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

  // ── OTP UI state — presentational only for now; no backend calls yet ──
  const [emailInput, setEmailInput] = useState(email);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);

  return (
    <div className="flex flex-col gap-2 p-6">
      <div className="grid grid-cols-1 gap-x-1 gap-y-5.5 md:grid-cols-2 pl-1">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className={`${labelClass} pl-2`}>Full Name</label>
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

        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5 pr-5">
          <label className={`${labelClass} pl-2`}>Date of Birth</label>
          <input
            type="date"
            className={inputClass}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth}</p>}
        </div>

        {/* User Name — edited from the header, read-only here */}
        {/* <div className="flex flex-col gap-1.5">
          <label className={labelClass}>User Name</label>
          <input
            type="text"
            placeholder="e.g. MechMaster_01"
            className={inputClass}
            value={username}
            disabled
          />
        </div> */}

        {/* Team Name — comes from team API, not editable here */}
        {/* <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Team Name</label>
          <input
            type="text"
            placeholder="e.g. RoboWinners"
            className={inputClass}
            value={teamName === NO_TEAM_TEXT ? "" : teamName}
            disabled
          />
        </div> */}

        {/* Contact Number */}
        <div className="flex flex-col gap-1.5 relative">
          <label className={`${labelClass} pl-2`}>Contact Number</label>
          <div className="relative">
            <input
              type="tel"
              inputMode="numeric"
              placeholder="+91 -"
              className={`${inputClass} pr-24`}
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setPhoneOtpSent(true)}
              disabled={!phone || phoneOtpSent}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${getOtpClass}`}
            >
              Get OTP
            </button>
          </div>
        </div>

        {/* Contact OTP */}
        <div className="relative h-[60px] self-end pl-3 ">
          {phoneOtpSent && (
            <div className="absolute top-[2.5px] left-3">
            <OtpInputGroup onExpire={() => setPhoneOtpSent(false)} />
              </div>
          )}
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1.5">
          <label className={`${labelClass} pl-3`}>Email Address</label>
          <div className="relative">
            <input
              type="email"
              placeholder="botmakers12@gmail.com"
              className={`${inputClass} pr-24`}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setEmailOtpSent(true)}
              disabled={!emailInput || emailOtpSent}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${getOtpClass}`}
            >
              Get OTP
            </button>
          </div>
        </div>

        {/* Email OTP */}
        <div className="relative h-[60px] self-end pl-3">
          {emailOtpSent && (
            <div className="absolute top-[2.5px] left-3">
            <OtpInputGroup onExpire={() => setEmailOtpSent(false)} />
          </div>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1.5 pl-2 pt-4">
        <label className={`${labelClass} pl-1 pt-1`}>Address</label>
        <textarea
          placeholder="Enter your full address"
          className={`${inputClass} h-[128px] w-[980px] py-[12px] resize-y pt-4`}
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className={errorClass}>{errors.address}</p>}
      </div>

      {errors.global && (
        <p className="w-full max-w-[980px] ml-2 mt-6 mb-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-500">
          {errors.global}
        </p>
      )}

      <div className="flex w-full justify-end mt-1 ml-15">
        <button
          onClick={onSave}
          disabled={isLoading}
          className={`h-[55px] w-[220px] flex items-center justify-center rounded-lg text-lg font-['Poppins'] text-[20px] font-semibold uppercase tracking-[0.6px] text-white transition disabled:opacity-60 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] ${
            saveSuccess ? "bg-green-500" : "bg-gradient-to-b from-[#0162D1]/[0.75] to-[#8C6CFF]/[0.75] hover:brightness-110"
          }`}
        >
          {isLoading ? "Saving..." : saveSuccess ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
