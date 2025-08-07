// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  /* הטוקן מגיע בכותרת:  Authorization: Bearer <JWT> */
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ msg: "אין טוקן – דרוש להתחבר" });
  }

  try {
    // מפענחים ע״י הסוד
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;    // לשימוש בראוטים
    next();
  } catch {
    return res.status(401).json({ msg: "טוקן לא תקין או פג תוקף" });
  }
};
