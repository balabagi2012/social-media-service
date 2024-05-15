export interface UserProfileEntity {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  company: string;
  friends: Record<string, boolean>;
}
