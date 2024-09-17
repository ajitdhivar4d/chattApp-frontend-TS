// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

export interface SendFriendRequestResponse {
  success: boolean;
  message: string;
  error: {
    data: {
      message: string;
    };
  };
}

export interface SearchUser {
  _id: string;
  name: string;
  avatar: string;
}

export interface SearchUsersResponse {
  success: boolean;
  users: SearchUser[];
}

export interface DeleteChatResponse {
  success: boolean;
  message: string;
}

export interface LeaveGroupResponse {
  success: boolean;
  message: string;
}

export interface Chat {
  avatar: string[];
  groupChat: boolean;
  members: string[];
  name: string;
  _id: string;
}

export interface MyChatsResponse {
  success: boolean;
  chats: Chat[];
}

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat", "User", "Message"],

  // Endpoints
  endpoints: (builder) => ({
    // #1
    myChats: builder.query<MyChatsResponse, any>({
      query: () => ({
        url: "chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    // #2
    deleteChat: builder.mutation<DeleteChatResponse, { chatId: string }>({
      query: ({ chatId }) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    // #3
    leaveGroup: builder.mutation<LeaveGroupResponse, { chatId: string }>({
      query: ({ chatId }) => ({
        url: `chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    // #4
    searchUsers: builder.query<SearchUsersResponse, { name: string }>({
      query: ({ name }) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    // #5
    sendFriendRequest: builder.mutation<
      SendFriendRequestResponse,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: "user/sendrequest",
        method: "PUT",
        credentials: "include",
        body: { userId },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useMyChatsQuery,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
} = api;
