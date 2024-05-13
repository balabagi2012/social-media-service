"use client";

import { use, useState } from "react";

const ProfileForm = () => {
  // TODO: react-hook-form
  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    company: "",
  });

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={profile.displayName}
        onChange={(e) =>
          setProfile({ ...profile, displayName: e.target.value })
        }
        placeholder="Name"
      />
      <input
        type="text"
        value={profile.phoneNumber}
        onChange={(e) =>
          setProfile({ ...profile, phoneNumber: e.target.value })
        }
        placeholder="Phone"
      />
      <input
        type="text"
        value={profile.photoURL}
        onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })}
        placeholder="Picture"
      />
      <input
        type="text"
        value={profile.company}
        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
        placeholder="Company"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
