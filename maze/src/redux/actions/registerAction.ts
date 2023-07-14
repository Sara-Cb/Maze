import { Dispatch } from "react";
import { RegisterAction, RegisterActionType } from "../../types/registerType";
import { AnyAction } from "redux";

const registerRequest = (): RegisterAction => ({
  type: RegisterActionType.REGISTER_REQUEST,
  loading: true,
  error: null,
});

const registerSuccess = (): RegisterAction => ({
  type: RegisterActionType.REGISTER_SUCCESS,
  loading: false,
  error: null,
});

const registerFailure = (error: string): RegisterAction => ({
  type: RegisterActionType.REGISTER_FAILURE,
  loading: false,
  error: error,
});

export const registerReset = (): RegisterAction => ({
  type: RegisterActionType.REGISTER_RESET,
  loading: false,
  error: null,
});

const registerFecth = (creative: {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  stageName: string;
  city: string;
  state: string;
  professions: string[];
  skills: string[] | null;
  bio: string | null;
}) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(registerRequest());
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creative),
      });
      if (response.status === 201) {
        dispatch(registerSuccess());
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(registerFailure(JSON.parse(error.message).message));
      } else {
        dispatch(
          registerFailure("An unknown error occurred during registration")
        );
      }
    }
  };
};

export default registerFecth;
