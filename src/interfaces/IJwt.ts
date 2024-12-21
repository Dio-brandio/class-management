export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  name?: string;
  permission?: any;
  permissionTemplateId?: string;
  roleId?: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  isUser?: boolean;
  isCustomRole?: boolean;
}

export interface Tokens {
  // Access token used for authorization.
  accessToken: string;

  // Refresh token used to obtain a new access token.
  refreshToken: string;
}

export interface Payload {
  exp: number;
  iat: number;
  iss: string;
  user: User;
  id: string;
}

export interface JwtTokenData {
  id: string;
  email?: string;
  roleId?: string;
}
