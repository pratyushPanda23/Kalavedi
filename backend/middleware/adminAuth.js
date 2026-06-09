const adminAuth = (req, res, next) => {
  const masterPasscode = process.env.ADMIN_PASSCODE || 'NB07@2026';
  
  // Extract passcode from either custom header x-admin-passcode OR standard Authorization header
  const clientPasscode = req.headers['x-admin-passcode'] || req.headers['authorization'];
  
  if (
    clientPasscode === masterPasscode || 
    clientPasscode === `Bearer ${masterPasscode}`
  ) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid administrative credentials.' });
  }
};

module.exports = adminAuth;
