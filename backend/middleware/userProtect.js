const admin_verification = async (req, res, next) => {
  const { user } = req.body;

  if (!user) {
    return res.status(500).json({ message: "UnAuthorized" });
  }

  if (user == "bola") {
    req.body.isAllowed = true;
  }

  next();
};

module.exports = { admin_verification };
