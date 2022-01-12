import prisma from "./prisma";

/** @type {[{id: number, name: string, key: string}]} */
let permissions;
/**
 * Initialize first
 * @param {number | any} roleId
 */
export async function initializePermissions(roleId) {
  if (typeof roleId === "number" && !permissions) {
    let models = await prisma.permissions.findMany({
      where: {
        roles: {
          some: {
            id: roleId
          }
        }
      }
    });
    if (models) {
      permissions = models;
    } else {
      permissions = [];
    }
  }
}
export const getPermissions = () => permissions;
/**
 * @param {string | number}
 * @returns {boolean}
 */
export const can = (i) =>
  typeof i === "string" || typeof i === "number"
    ? permissions.some((permission) =>
        typeof i === "string" ? permission.name === i : permission.id === i
      )
    : false;
