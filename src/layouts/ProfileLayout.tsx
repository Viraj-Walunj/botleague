import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import insta from "../assets/Instagram.png";
import youtube from "../assets/youtube.png";
import { updateUsername } from "../feature/Profile/api/profile.api";
import ProfileHeader from "../feature/Profile/components/ProfileHeader";
import ProfileCard from "../feature/Profile/components/ProfileCard";
import socialBanner from "../assets/social-banner.png";
import airplaneDecoration from "../assets/airplane-decoration.png";

interface Props {
  children: React.ReactNode;

  avatarSrc?: string | null;
  onAvatarChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  username?: string;
  onUsernameChange?: (val: string) => void;

  botleagueId?: string;
}

export default function ProfileLayout({
  children,
  avatarSrc,
  onAvatarChange,
  username,
  onUsernameChange,
  botleagueId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleUsernameClick = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      setIsSaving(true);
      if (username) {
        await updateUsername(username);
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Username update failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative isolate mx-auto flex w-full max-w-[1136px] flex-col gap-3 px-4 sm:px-6 lg:px-4">
      {/* Decorative background illustration #1 — matches Figma "image 120": 12% opacity, 38.03° rotation */}
      <img
        src={airplaneDecoration}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[420px] -z-10 w-[334px] rotate-[38deg] select-none opacity-[0.12]"
      />

      {/* Decorative background illustration #2 — Figma "image 118": 15% opacity, -10.37° rotation.
          No x/y in the exported data — placed near the header as a starting point, nudge to taste. */}
      <img
        src={airplaneDecoration}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 -top-10 -z-10 w-[352px] -rotate-[10.37deg] select-none opacity-[0.15]"
      />

      <ProfileHeader
        avatarSrc={avatarSrc}
        onAvatarChange={onAvatarChange}
        username={username ?? ""}
        onUsernameChange={(val) => onUsernameChange?.(val)}
        isEditingUsername={isEditing}
        isSavingUsername={isSaving}
        onUsernameEditClick={handleUsernameClick}
        botleagueId={botleagueId ?? ""}
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <ProfileCard title="Personal Information">
          {children}
        </ProfileCard>

        <div className="flex w-full flex-col items-center gap-6 overflow-hidden rounded-xl border border-transparent bg-white bg-origin-border p-5 lg:h-[611px] lg:w-[368px] [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#0162D1,#8C6CFF)_border-box]">
          <img
            src={socialBanner}
            alt="Community banner"
            className="h-[499px] w-[328px] object-cover rounded-[10px]"
          />

          <div className="flex w-full items-center justify-center gap-3 px-1 pb-5">
            <span className="flex h-[37px] w-[131px] items-center text-[25px] font-normal leading-[40px] tracking-[-0.02em] text-black antialiased ">
              Follow us :
            </span>
            <a className="flex h-[27.89px] w-[40px] shrink-0 items-center justify-center transition hover:opacity-85">
              <img src={youtube} alt="YouTube" className="h-[27.89px] w-[40px] object-contain" />
            </a>
            <a className="flex h-[33px] w-[33px] items-center justify-center text-blue-600 transition hover:opacity-85">
              <FaFacebook className="h-[33px] w-[33px]" />
            </a>
            <a className="flex h-[33px] w-[33px] items-center justify-center transition hover:opacity-85">
              <img src={insta} alt="Instagram"
                className="h-[33px] w-[33px] object-contain" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}