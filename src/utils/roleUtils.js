export function getDashboardPath(role) {
  switch (role) {
    case "admin":
      return "/dashboard/admin";
    case "user":
      return "/dashboard/user";
    default:
      return "/dashboard";
  }
}
