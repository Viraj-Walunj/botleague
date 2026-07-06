import { User } from "lucide-react";
import pencilIcon from "../../../assets/pencil.svg"; 
import bLogo from "../../../assets/b-logo.svg";

interface EditProfileHeaderProps {
  avatarSrc?: string | null;
  onAvatarChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  username: string;
  onUsernameChange: (value: string) => void;
  isEditingUsername: boolean;
  isSavingUsername?: boolean;
  onUsernameEditClick: () => void;

  botleagueId: string;
  recruitmentStatus?: string;
}

/**
 * Header block for the Edit Profile page ( /profile/edit ), styled to the
 * Figma "Edit Profile" spec. Distinct from ProfileHeader.tsx, which belongs
 * to the read-only / profile-filling ProfilePage and must stay untouched.
 */
export default function EditProfileHeader({
  avatarSrc,
  onAvatarChange,
  username,
  onUsernameChange,
  isEditingUsername,
  isSavingUsername = false,
  onUsernameEditClick,
  botleagueId,
  recruitmentStatus = "Active",
}: EditProfileHeaderProps) {
  return (
    <div className=" mt-[30px] relative flex w-full max-w-[1079px] flex-col items-center gap-11 overflow-hidden rounded-[23px] border border-transparent bg-origin-border p-6  text-center sm:h-[336px] sm:flex-row sm:p-13 sm:text-left [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,rgba(1,98,209,0.5),rgba(140,108,255,0.5))_border-box] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      {/* Decorative star */}
      <svg
        className="pointer-events-none rotate-20 absolute left-2/3 top-1 h-30 w-40 -translate-x-1/6 -translate-y-2/5 text-blue-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={0.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2l2.6 6.6 7.1.5-5.5 4.5 1.9 6.9L12 16.9l-6.1 3.6 1.9-6.9-5.5-4.5 7.1-.5L12 2z"
        />
      </svg>

      {/* Avatar */}
      <div className="relative h-[277.72px] w-[266.01px] shrink-0 ml-3 mb-2 flex items-center justify-center ">

        {/* The "B" Logo Design - Positioned behind everything */}
        <div className=" absolute left-[-62px] top-[-25px] z-0 pointer-events-none">
        <img 
        src={bLogo} 
        alt="" 
        className="max-w-none"
        style={{ 
        width: '357px', 
        height: 'auto', 
        opacity: 1
        }} 
        />
        </div>

        <div className="relative z-10 [277.72px] w-[266.01px] overflow-hidden rounded-full border-2 border-white bg-white shadow-sm ">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="Profile avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className=" flex h-[277.72px] w-[266.01px] items-center justify-center bg-gradient-to-br from-[#0162D1]/20 to-[#8C6CFF]/20">
              <User className="h-24 w-24 text-gray-400 relative z-10" strokeWidth={1.5} />
            </div>
          )}
        </div>
      </div>

      {/* Identity + status block */}
      <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          {isEditingUsername ? (
            <input
              type="text"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              placeholder="Username"
              autoFocus
              className="border-b-2 border-blue-400 bg-transparent text-[35px] font-bold text-blue-600 outline-none"
            />
          ) : (
            <h1 className="flex items-center mt-2 pt-1 mb-1 font-['Sarpanch'] text-[60px] font-bold uppercase leading-[40px] tracking-[0.04px] bg-gradient-to-r from-[#0162D1] to-[#8C6CFF] bg-clip-text text-transparent">
              {username || "jett"}
            </h1>
          )}

          <span className="flex h-[27.07px] w-[81.06px] ml-2 mt-3 mb-0 items-center gap-2.5 rounded-full border border-green-[#00D31C] px-2 font-['Roboto'] text-[15px] font-semibold text-[#00D31C] ">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {recruitmentStatus}
          </span>

          <button
  type="button"
  onClick={onUsernameEditClick}
  className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#8C6CFF]/10 mt-2"
>
  <img 
    src={pencilIcon} 
    alt="Edit Profile" 
    className="h-[22px] w-[22px]" 
  />
</button>
        </div>

        <div className="mt-" >
          <p className=" mt-7 pt-2  font-['Poppins'] text-[18px] font-medium leading-[16px] tracking-[0.6px] text-[#000000]">
            BOTLEAGUE ID
          </p>
          <p className=" ml-1 mt-1 mb-1 pb-1 text-[35px] font-semibold leading-[32px] tracking-[0.12em] text-[#0162D1]">
            {botleagueId || "1234567"}
          </p>
        </div>

        <div className="flex items-center gap-4 pt-6 mb-1">
          <label className=" pt-1 flex h-[38px] w-[165px] whitespace-nowrap cursor-pointer items-center justify-center rounded-lg bg-gradient-to-b from-[#0162D1]/[0.75] to-[#8C6CFF]/[0.75] px-6 font-['Poppins'] text-[18px] font-medium text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition hover:brightness-110">
            {/* <Camera className="mr-2 h-4 w-4" strokeWidth={2} /> */}
            Change Avatar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarChange}
            />
          </label>

          <button
            type="button"
            onClick={onUsernameEditClick}
            disabled={isSavingUsername}
            className="mt-1 h-[38px] w-[138px] flex items-center justify-center rounded-[8px] border border-transparent bg-origin-border [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#0162D1,#8C6CFF)_border-box] shadow-[0_4px_4px_0_rgba(0,0,0,0.09)] transition hover:brightness-110 disabled:opacity-60"
          >
           <span className="font-['Poppins'] text-[18px] font-medium bg-gradient-to-r from-[#0162D1] to-[#8C6CFF] bg-clip-text text-transparent">
           {isSavingUsername ? "Saving..." : isEditingUsername ? "Save" : "Edit Profile"}
          </span>
          </button>
        </div>
      </div>
    </div>
  );
}
