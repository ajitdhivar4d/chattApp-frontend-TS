// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

interface AcceptFriendRequestResponse {
  success: boolean;
  message: string;
  senderId?: string;
}


export interface AllRequests {
  _id: string;
  sender: {
    _id: string;
    name: string;
    avatar: string;
  };
}

export interface GetNotificationsResponse {
  success: boolean;
  allRequests: AllRequests[];
}

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
  tagTypes: ["Chat", "User", "Message", "Notifications"],

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

    // #6
    getNotifications: builder.query<GetNotificationsResponse, void>({
      query: () => ({
        url: `user/notifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    // #7
    acceptFriendRequest: builder.mutation<AcceptFriendRequestResponse, { requestId: string, accept: boolean } >({
      query: (data) => ({
        url: "user/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat", "Notifications"],
    }),
  }),
});

export const {
  useMyChatsQuery,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
} = api;
