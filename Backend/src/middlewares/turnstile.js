const { env } = require("../../envParser");

const validateTurnstile = async (req, res, next) => {
  try {
    const { turnstileToken } = req.body;
    const remoteip = req.userIP;

    const validation = await fetch(env.CLOUDFLARE_TURNSTILE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET,
        response: turnstileToken,
        remoteip: remoteip,
      }),
    });

    if (validation.ok) {
      next();
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (e) {
    console.log("TurnStile Error: ", e.message);
    throw new Error("UnauthorizedError");
  }
};

module.exports = { validateTurnstile };
