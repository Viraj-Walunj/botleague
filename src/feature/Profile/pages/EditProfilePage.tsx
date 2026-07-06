import React, { useState } from "react";
import { updateUsername } from "../api/profile.api";
import EditProfileHeader from "../components/EditProfileHeader";
import EditProfileForm from "../components/EditProfileForm";
import useProfile from "../hooks/useProfile";
import GuardianForm from "../../Eligibility/components/GuardianForm";
import { useEligibility } from "../../Eligibility/hooks/useEligibility";

const EditProfilePage: React.FC = () => {
  const p = useProfile();
  const { eligibility, reload: reloadEligibility } = useEligibility();

  const isMinor = eligibility ? (eligibility.age >= 0 && eligibility.age < 18) : false;

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isSavingUsername, setIsSavingUsername] = useState(false);

  const handleUsernameClick = async () => {
    if (!isEditingUsername) {
      setIsEditingUsername(true);
      return;
    }
    try {
      setIsSavingUsername(true);
      if (p.username) {
        await updateUsername(p.username);
      }
      setIsEditingUsername(false);
    } catch (err) {
      console.error("Username update failed", err);
    } finally {
      setIsSavingUsername(false);
    }
  };

  return (
    <div className=" lg:pl-8 relative  isolate mx-auto flex w-full max-w-[1136px] flex-col gap-3 px-4 sm:px-6 lg:px-4 ">
      <h1 className="px-9 py-2 font-['Sarpanch'] text-[35px] font-normal antialiased tracking-[0.1em] leading-none w-auto h-[35px] text-gray-900 mt-4 inline-block"
      style={{ transform: 'scaleX(0.8)', transformOrigin: 'left' }}
      >Edit Profile</h1>

      <EditProfileHeader
        avatarSrc={p.profilePhotoUrl}
        onAvatarChange={p.handleAvatarChange}
        username={p.username}
        onUsernameChange={p.setUsername}
        isEditingUsername={isEditingUsername}
        isSavingUsername={isSavingUsername}
        onUsernameEditClick={handleUsernameClick}
        botleagueId={p.botleagueId}
      />

      <div className=" mt-3 flex w-full flex-col gap-6 rounded-[15px] border-[2px] border-transparent bg-origin-border p-5 lg:h-[547px] lg:w-[1079px] [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,rgba(1,98,209,0.5),rgba(140,108,255,0.5))_border-box]">
        {/* <h2 className="text-base font-bold text-gray-900 sm:text-lg">Personal Information</h2> */}
        <EditProfileForm
          firstName={p.firstName}
          setFirstName={p.setFirstName}
          lastName={p.lastName}
          setLastName={p.setLastName}
          // username={p.username}
          // teamName={p.teamName}
          dateOfBirth={p.dateOfBirth}
          setDateOfBirth={p.setDateOfBirth}
          phone={p.phone}
          setPhone={p.setPhone}
          email={p.email}
          address={p.address}
          setAddress={p.setAddress}
          onSave={p.handleUpdate}
          isLoading={p.isLoading}
          errors={p.errors}
          clearError={p.clearError}
        />
      </div>

      {(isMinor || (eligibility && eligibility.requiresGuardian)) && (
        <div className="mt-6">
          <GuardianForm onSaved={reloadEligibility} />
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;