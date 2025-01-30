const db =  require("../util/helper");


const RoleModel = {
    getPermissionsByRole: async (roleId) => {
        const sql = `
            SELECT p.name 
            FROM permissions p
            INNER JOIN role_permissions rp ON p.id = rp.permission_id
            WHERE rp.role_id = :roleId
        `;
        const [permissions] = await db.query(sql, { roleId });
        return permissions.map((p) => p.name);
    },
};

module.exports = RoleModel;