export function requireAuth(user) {
  if (!user) {
    throw new Error('Authentication required');
  }
}
