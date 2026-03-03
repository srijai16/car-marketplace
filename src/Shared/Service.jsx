import axios from "axios";

const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

const BASE_URL = `https://api-${SendBirdApplicationId}.sendbird.com/v3`;

const headers = {
  "Content-Type": "application/json",
  "Api-Token": SendBirdApiToken,
};

/* ---------------- Format Car Result ---------------- */

const FormatResult = (resp) => {
  const grouped = {};

  resp.forEach((item) => {
    const listing = item.carListing;
    const image = item.carImages;

    if (!listing?.id) return;

    if (!grouped[listing.id]) {
      grouped[listing.id] = {
        ...listing,
        images: [],
      };
    }

    if (image) {
      grouped[listing.id].images.push(image);
    }
  });

  return Object.values(grouped);
};

/* ---------------- Create Sendbird User ---------------- */

const CreateSendBirdUser = async (userId, nickName, profileUrl) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users`,
      {
        user_id: userId,
        nickname: nickName,
        profile_url: profileUrl,
        issue_access_token: false,
      },
      { headers }
    );

    return response.data;
  } catch (error) {
    // If user already exists, ignore error
    if (error.response?.status === 400) {
      console.log("User already exists");
      return null;
    }
    throw error;
  }
};

/* ---------------- Create 1-to-1 Channel ---------------- */

const CreateSendBirdChannel = async (users, title) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/group_channels`,
      {
        user_ids: users,
        is_distinct: true, // prevents duplicate channel
        name: title,
        operator_ids: [users[0]],
      },
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Channel creation failed:", error.response?.data);
    throw error;
  }
};

export default {
  FormatResult,
  CreateSendBirdUser,
  CreateSendBirdChannel,
};