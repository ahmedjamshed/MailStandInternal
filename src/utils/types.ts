export enum Headline {
  "H100",
  "H200",
  "H300",
  "H400",
  "H500",
  "H600",
  "H700",
}

export enum Paragraph {
  "P100",
  "P200",
  "p300",
}

export type TeammateUser = {
  first_name: String | null;
  last_name: String | null;
  company_name: String | null;
  email: String | null;
  password: String | null;
  timezone: String | null;
  agency_mode: Boolean | null;
  team_invite: String | null;
  referred_by: String | null;
};
export type LoginInputs = {
  email: string;
  password: string;
};
export type agency_mode = {
  yes: boolean;
  No: boolean;
};

export type BasicAuthHeader = {
  username: string;
  password: string;
};

export type VerificationCode = {
  code: string;
};
