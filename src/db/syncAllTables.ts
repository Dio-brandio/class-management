import * as models from "@models";

const syncAllTables = async () => {
  try {
    for (const model in models) {
      if ((model as any)?.associate) { (model as any).associate() }
    }
    models.Logs.associate();
    models.SecurityTokens.associate();
    models.Users.associate();
    models.Modules.associate();
    models.RolePermissions.associate();
    models.Roles.associate();
    models.UserRoles.associate();
    models.syncInstitueTable()
    models.syncBoardTable()
    models.syncClassTable()
    models.syncMediumTable()
    models.syncSubjectTable()
    models.syncStandardTable()
    models.syncBoardMediumTable()
    models.syncClassStandardTable()
    models.syncClassStandardTable()
    models.syncStandardSubjectTable()
    console.log("All tables have been synchronized.");
  } catch (error) {
    console.error("Error synchronizing tables:", error);
    process.exit(1);
  }
};

export { syncAllTables };
