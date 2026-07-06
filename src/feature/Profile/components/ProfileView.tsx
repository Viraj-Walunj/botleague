interface Props {
  firstName: string;
  lastName: string;
  username: string;
  teamName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
}

const NO_TEAM_TEXT = "User not joined to a team yet";

const labelClass =
  "text-[12px] font-semibold uppercase leading-[16px] tracking-widest tracking-[0.6px] text-[#4F4F4F]";
const valueClass =
  "min-h-[51px] w-full rounded-[8px] border border-[#E0E0E0] bg-white px-[13px] py-[12px] text-sm text-gray-800 flex items-center";

function formatDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Read-only display of the user's profile info. Renders the same fields
 * as ProfileForm.tsx but as static text — used on the main /profile page.
 * Editing happens on the separate /profile/edit page (EditProfileForm.tsx).
 */
export default function ProfileView({
  firstName,
  lastName,
  username,
  teamName,
  dateOfBirth,
  phone,
  email,
  address,
}: Props) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Full Name</label>
          <div className={valueClass}>{fullName}</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>User Name</label>
          <div className={valueClass}>{username || "—"}</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Date of Birth</label>
          <div className={valueClass}>{formatDate(dateOfBirth)}</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Team Name</label>
          <div className={valueClass}>
            {teamName === NO_TEAM_TEXT ? "—" : teamName || "—"}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Contact Number</label>
          <div className={valueClass}>{phone || "—"}</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Email Address</label>
          <div className={valueClass}>{email || "—"}</div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Address</label>
        <div className={`${valueClass} min-h-[100px] items-start whitespace-pre-wrap`}>
          {address || "—"}
        </div>
      </div>
    </div>
  );
}
