import { getMe } from "../redux/actions/creativeAction";
import { store } from "../redux/store/store";
import { Creative } from "../types/creativeType";

const dispatch = store.dispatch;

export const updateCreativeImage = async (
  token: string,
  username: string,
  image: File | null
): Promise<Creative | string> => {
  try {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("http://localhost:8080/api/creatives/image", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const updatedCreative: Creative = await response.json();
      dispatch(getMe(username));
      return updatedCreative;
    } else {
      throw new Error("Failed to update creative image");
    }
  } catch (error: unknown | Error) {
    return "An unknown error occurred while updating the creative image.";
  }
};

export const getCreative = (username: string) => {
  return async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/creatives/${username}`
      );
      if (response.ok) {
        const creative: Creative = await response.json();
        return creative;
      } else {
        throw new Error("Failed reading creative");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
      } else {
        console.log("An unknown error occurred reading creative.");
      }
    }
  };
};

export const isUserFollowed = (token: string, username: string) => {
  return async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/creatives/follow/${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const isFollowed: boolean = await response.json();
        return isFollowed;
      } else {
        throw new Error("Failed to get follow");
      }
    } catch (error: unknown | Error) {
      return "An unknown error occurred while getting the follow.";
    }
  };
};
