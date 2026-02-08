import { currentUser } from "@clerk/nextjs/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function checkUser() {
  const user = await currentUser();
  console.log(user);

  if (!user) {
    console.log("No user found!");
    return null;
  }

  if (!STRAPI_API_TOKEN) {
    console.error("Strapi token missing in .env.local!!");
    return null;
  }

  const subscriptionTier = "free";

  try {
    // CHECKING IF USER EXISTS IN STRAPI
    const existingUserResponse = await fetch(
      `${STRAPI_URL}/api/users?filters[clerkId][$eq]=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      },
    );
    if (!existingUserResponse.ok) {
      const responseText = await existingUserResponse.text();
      console.log(`Error encountered: ${responseText}`);
      return null;
    }

    const existingUserData = await existingUserResponse.json();
    console.log(existingUserData);

    // IF USER EXISTS IN STRAPI
    if (existingUserData.length > 0) {
      const existingUser = existingUserData[0];
      console.log(existingUser);

      if (existingUser.subscriptionTier !== subscriptionTier) {
        await fetch(`${STRAPI_URL}/api/users/${existingUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({ subscriptionTier }),
        });
      }

      return { subscriptionTier, ...existingUser };
    }

    //? IF DOES NOT EXIST IN STRAPI, CHECK ROLE AND CREATE ONE
    // CHECK ROLE
    const rolesResponse = await fetch(
      `${STRAPI_URL}/api/users-permissions/roles`,
      {
        headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
      },
    );

    const rolesData = await rolesResponse.json();
    console.log(rolesData);
    const authenticatedRole = rolesData.roles.find(
      (role) => role.type === "authenticated",
    );

    if (!authenticatedRole) {
      console.error("user not authenticated!!!");
      return null;
    }

    // CREATE USER
    const userData = {
      username:
        user.username || user.emailAddresses[0].emailAddress.split("@")[0],
      email: user.emailAddresses[0].emailAddress,
      password: `clerk_managed_${user.id}_${Date.now()}`,
      confirmed: true,
      blocked: false,
      role: authenticatedRole.id,
      clerkId: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl || "",
      subscriptionTier,
    };

    const newUserCreation = await fetch(`${STRAPI_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(userData),
    });

    if (!newUserCreation.ok) {
      const resText = await newUserCreation.text();
      console.error(`Error creating user: ${resText}`);
      return null;
    }

    const newUser = await newUserCreation.json();
    return newUser;
  } catch (error) {
    console.error(`Error in check user: ${error.message}`);
    return null;
  }
}

export default checkUser;
