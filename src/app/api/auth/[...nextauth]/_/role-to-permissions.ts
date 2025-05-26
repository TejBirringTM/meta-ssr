import type { UserRoleOnProject } from "@/generated/lib/prisma";

export type UserPermissionsOnProject =
    | "delete:project"
    | "update:project"
    | "read:project"
    | "create:project:(resource)"
    | "delete:project:(resource)"
    | "update:project:(resource)"
    | "read:project:(resource)";

type ProjectId = string;
export type UserPermissions = Record<ProjectId, UserPermissionsOnProject[]>;

export function roleToPermissions(role?: UserRoleOnProject | null) {
    const permissions: UserPermissionsOnProject[] = [];
    if (!role) return permissions;
    // add viewer permissions
    permissions.push("read:project", "read:project:(resource)");
    // add editor permissions, if applicable
    if (role === "OWNER" || role === "EDITOR") {
        permissions.push(
            "create:project:(resource)",
            "update:project:(resource)",
            "delete:project:(resource)"
        );
    }
    // add owner permissions, if applicable
    if (role === "OWNER") {
        permissions.push("delete:project", "update:project");
    }
    return permissions;
}
