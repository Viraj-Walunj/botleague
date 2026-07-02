import { Camera, User } from "lucide-react";

interface ProfileHeaderProps {
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

export default function ProfileHeader({
  avatarSrc,
  onAvatarChange,
  username,
  onUsernameChange,
  isEditingUsername,
  isSavingUsername = false,
  onUsernameEditClick,
  botleagueId,
  recruitmentStatus = "ACTIVE",
}: ProfileHeaderProps) {
  return (
    <div className=" mt-[18px] relative flex w-full flex-col items-center gap-8 overflow-hidden rounded-[12px] border border-transparent bg-origin-border p-6 text-center sm:h-[202.58px] sm:flex-row sm:p-8 sm:text-left [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#0162D1,#8C6CFF)_border-box]">
      {/* Decorative star  */}
      <svg
        className="pointer-events-none absolute -right-4 top-6 h-24 w-24 text-blue-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2l2.6 6.6 7.1.5-5.5 4.5 1.9 6.9L12 16.9l-6.1 3.6 1.9-6.9-5.5-4.5 7.1-.5L12 2z"
        />
      </svg>

      {/* Avatar */}
      <div className="relative h-32 w-32 shrink-0">
        <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-100">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="Profile avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center">
              <User className="h-12 w-12 text-gray-400" strokeWidth={1.5} />
            </div>
          )}
        </div>

        <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-violet-600 text-white shadow-md transition hover:bg-violet-700">
          <Camera className="h-4 w-4" strokeWidth={2} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onAvatarChange}
          />
        </label>
      </div>

      {/* Identity + status block */}
      <div className="flex flex-1 flex-col items-center gap-2 sm:items-start">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">

          {isEditingUsername ? (
            <input
              type="text"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              placeholder="Username"
              autoFocus
              className="border-b-2 border-blue-400 bg-transparent text-2xl font-bold text-blue-600 outline-none"
            />
          ) : (
            <h1 className="flex h-[40px] w-[156px] items-center font-['Sarpanch'] text-[35px] font-normal leading-none tracking-[-2px]  bg-gradient-to-r from-[#0162D1] to-[#8C6CFF] bg-clip-text text-transparent">
              @{username || "UserID"}
            </h1>
          )}

          <button
            onClick={onUsernameEditClick}
            disabled={isSavingUsername}
            className="flex h-[24px] w-[84px] items-center justify-center rounded-full bg-[#0162D1]/[0.41] text-sm font-semibold text-white transition hover:bg-[#0162D1]/[0.60] disabled:opacity-60"
          >
            {isSavingUsername ? "..." : isEditingUsername ? "Save" : "Profile"}
          </button>
        </div>

        <p className="text-sm text-gray-800">
          Recruitment Status:{" "}
          <span className="font-bold text-green-600">{recruitmentStatus}</span>
        </p>

        <div>
          <p className="text-[10px] font-bold  leading-[16px] tracking-[1px] uppercase tracking-wide text-gray-800">
            Botleague ID
          </p>
          <p className="flex h-[32px] w-[163px] items-center text-lg font-semibold text-blue-600">
            {botleagueId || "BL-PENDING"}
          </p>
        </div>
      </div>
    </div>
  );
}