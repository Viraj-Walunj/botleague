import React from "react";
import ProfileLayout from "../../../layouts/ProfileLayout";
import ProfileView from "../components/ProfileView";
import useProfile from "../hooks/useProfile";
import CategoryBadge from "../../../shared/components/CategoryBadge";
import GuardianForm from "../../Eligibility/components/GuardianForm";
import { useEligibility } from "../../Eligibility/hooks/useEligibility";
import ShareButton from "../../../shared/components/ShareButton";


const ProfilePage: React.FC = () => {
  const p = useProfile();
  const { eligibility, reload: reloadEligibility } = useEligibility();

  const isMinor = eligibility ? (eligibility.age >= 0 && eligibility.age < 18) : false;

  return (
    <div>
      <ProfileLayout
        avatarSrc={p.profilePhotoUrl}
        onAvatarChange={p.handleAvatarChange}
        username={p.username}
        onUsernameChange={p.setUsername}
        botleagueId={p.botleagueId}
      >
        {/* Share public profile link */}
        {p.botleagueId && (
          <div className="mb-3">
            <ShareButton
              url={`${window.location.origin}/user/${p.botleagueId}`}
              label="Share Profile"
              size="sm"
            />
          </div>
        )}

        {/* Competition Category Badge */}
        {eligibility?.category && (
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            <CategoryBadge category={eligibility.category} size="md" showAgeRange />
            {!eligibility.canRegister && eligibility.blockReason && (
              <span style={{ fontSize: "0.75rem", color: "#f87171", fontWeight: 500 }}>
                ⚠ {eligibility.blockReason}
              </span>
            )}
          </div>
        )}

        <ProfileView
          firstName={p.firstName}
          lastName={p.lastName}
          username={p.username}
          teamName={p.teamName}
          dateOfBirth={p.dateOfBirth}
          phone={p.phone}
          email={p.email}
          address={p.address}
        />

        {/* Guardian Info — shown for users under 18 */}
        {(isMinor || (eligibility && eligibility.requiresGuardian)) && (
          <div className="mt-6">
            <GuardianForm onSaved={reloadEligibility} />
          </div>
        )}
      </ProfileLayout>
    </div>
  );
};

export default ProfilePage;