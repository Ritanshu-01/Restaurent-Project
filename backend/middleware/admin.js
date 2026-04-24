module.exports = (req, res, next) => {
  const mainAdminEmail = (process.env.MAIN_ADMIN_EMAIL || process.env.ADMIN_EMAIL || '').toLowerCase();
  const userEmail = String(req.user?.email || '').toLowerCase();
  if (!req.user || !req.user.isAdmin || !mainAdminEmail || userEmail !== mainAdminEmail) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
