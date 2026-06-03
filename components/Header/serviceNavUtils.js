import { serviceRoles, serviceRoleHashAliases } from "../../data/services";

function resolveServiceRoleId(hash) {
 if (!hash) return null;
 if (serviceRoles.some((role) => role.id === hash)) return hash;
 return serviceRoleHashAliases[hash] || null;
}

export function getServiceRoleFromHash() {
 if (typeof window === "undefined") return null;

 const hash = window.location.hash.replace("#", "");
 return resolveServiceRoleId(hash);
}

export function syncServiceRoleFromHash(setActiveRole) {
 const roleId = getServiceRoleFromHash();
 if (!roleId) return;

 setActiveRole(roleId);

 const el = document.getElementById(`role-${roleId}`);
 if (el) {
  setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
 }
}

export function navigateToServiceRole(roleId, pathname, router) {
 const normalizedPath = pathname?.replace(/\/$/, "") || "";
 const servicesPath = "/services";
 const target = `${servicesPath}/#${roleId}`;

 if (normalizedPath === servicesPath) {
  window.history.replaceState(null, "", target);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  return;
 }

 router.push(target);
}
