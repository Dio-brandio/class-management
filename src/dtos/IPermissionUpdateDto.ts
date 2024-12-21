export interface PermissionUpdateInput {
  userId: string;
  roleId: string;
  moduleIndex: number;
  permissions: {
    [key: string]: boolean;
  };
}
