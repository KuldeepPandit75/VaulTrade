// Node.js Example
import axios from "axios";

async function validateAccessToken(req,res,next) {
    const accessToken=req.headers.authorization;
  const googleTokenInfoUrl = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;
  
  try {
    const response = await axios.get(googleTokenInfoUrl);
    console.log("Token is valid:", response.data);
    req.token=accessToken;
    next();
  } catch (error) {
    console.error("Invalid Token:", error.message);
    return res.status(404).json({msg:"invalid token"})
  }
}

export default validateAccessToken;