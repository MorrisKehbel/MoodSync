import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  if (!req.headers.cookie) {
    return next(new Error("Unauthorized, please sign in", { cause: 401 }));
  }

  const cookies = req.headers.cookie?.split("; ");
  const cookieArrays = cookies.map((cookie) => cookie.split("="));
  const cookiesObj = Object.fromEntries(cookieArrays);

  const { token } = cookiesObj;

  if (!token) {
    return next(new Error("Unauthorized, please sign in", { cause: 401 }));
  }

  try {
    const { userId, userRole } = jwt.verify(token, process.env.JWT_SECRET);

    if (!userId) {
      return next(new Error("Invalid token payload", { cause: 401 }));
    }

    req.userId = userId;
    req.userRole = userRole;

    next();
  } catch (err) {
    return next(new Error("Unauthorized", { cause: 401 }));
  }
};

export default verifyToken;
