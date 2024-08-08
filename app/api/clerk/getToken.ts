import { auth, clerkClient } from "@clerk/nextjs/server";

export const getToken = async () => {
  const { userId } = auth();
  let token = "";
  const provider = "oauth_spotify";
  if (userId) {
    token = await clerkClient.users
      .getUserOauthAccessToken(userId, provider)
      .then((data) => data.data[0].token);
  }
  return token as string;
};
