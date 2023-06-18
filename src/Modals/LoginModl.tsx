export interface LoginMod {
  id: number;
  email: string;
  private: string;
  createdDate: string;
  token: string;
  message: string
}
export interface SocialLoginMod {
  id: number;
  email: string;
  private: string;
  createdDate: string;
  token: string;
  image: any;
  name: string;
  role: string;
  responseCode: number;
  message: string;
}

export interface GuestData {
  createdDate: string;
  email: string;
  id: string;
  name: string;
  private: boolean;
  role: string;
  meetingId: string;
  eventTitle:string;
  inviteName:string;
}