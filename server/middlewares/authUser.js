import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  // console.log("Request Cookies:", req.cookies);
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Token Decode:", tokenDecode);
    if (tokenDecode.id) {
      // req.body.userId = tokenDecode.id;
      /*
      chưa gán đúng req.body.userId trong middleware authUser,
       nên bên is-auth không có userId, dẫn đến không truy xuất được
        user → setUser(null) → React hiểu là chưa
         login → redirect về login.
      */
      req.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
