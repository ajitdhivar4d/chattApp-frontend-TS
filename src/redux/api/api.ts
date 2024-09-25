import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

interface SendAttachmentsResponse {
  success: boolean;
  message: {
    content: string;
    attachments: string[];
    sender: string;
    chat: string;
  };
}

interface AddGroupMembersResponse {
  success: boolean;
  message: string;
}

interface RemoveGroupMemberResponse {
  success: boolean;
  message: string;
}

interface RenameGroupResponse {
  success: boolean;
  message: string;
}

interface ChatDetailsResponse {
  success: boolean;
  chat: {
    _id: string;
    name: string;
    groupChat: boolean;
    creator: string;
    members: {
      _id: string;
      name: string;
      avatar: string;
    }[];
  };
}

interface Group {
  _id: string;
  name: string;
  groupChat: boolean;
  avatar: string[];
}

interface MyGroupsResponse {
  success: boolean;
  groups: Group[];
}

interface NewGroupResponse {
  success: boolean;
  message: string;
}

interface AvailableFriend {
  _id: string;
  name: string;
  avatar: string;
}

export interface AvailableFriendsResponse {
  success: boolean;
  message: string;
  friends?: AvailableFriend[];
}

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
    acceptFriendRequest: builder.mutation<
      AcceptFriendRequestResponse,
      { requestId: string; accept: boolean }
    >({
      query: (data) => ({
        url: "user/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat", "Notifications"],
    }),

    // #8
    availableFriends: builder.query<
      AvailableFriendsResponse,
      { chatId?: string }
    >({
      query: ({ chatId }) => {
        let url = `user/friends`;
        if (chatId) url += `?chatId=${chatId}`;

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    // #9
    newGroup: builder.mutation<
      NewGroupResponse,
      { name: string; members: string[] }
    >({
      query: ({ name, members }) => ({
        url: "chat/new",
        method: "POST",
        credentials: "include",
        body: { name, members },
      }),
      invalidatesTags: ["Chat"],
    }),

    // #10
    myGroups: builder.query<MyGroupsResponse, void>({
      query: () => ({
        url: "chat/my/groups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    // #11
    chatDetails: builder.query<
      ChatDetailsResponse,
      { chatId: string; populate?: boolean }
    >({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url += "?populate=true";

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    // #12
    renameGroup: builder.mutation<
      RenameGroupResponse,
      { chatId: string; name: string }
    >({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        method: "PUT",
        credentials: "include",
        body: { name },
      }),
      invalidatesTags: ["Chat"],
    }),

    // #13
    removeGroupMember: builder.mutation<
      RemoveGroupMemberResponse,
      { chatId: string; userId: string }
    >({
      query: ({ chatId, userId }) => ({
        url: `chat/removemember`,
        method: "PUT",
        credentials: "include",
        body: { chatId, userId },
      }),
      invalidatesTags: ["Chat"],
    }),

    // #14
    addGroupMembers: builder.mutation<
      AddGroupMembersResponse,
      { members: string[]; chatId: string }
    >({
      query: ({ members, chatId }) => ({
        url: `chat/addmembers`,
        method: "PUT",
        credentials: "include",
        body: { members, chatId },
      }),
      invalidatesTags: ["Chat"],
    }),

    // #15
    getMessages: builder.query<any, { chatId: string; page: number }>({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    // #16
    sendAttachments: builder.mutation<SendAttachmentsResponse, any>({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        credentials: "include",
        body: data,
      }),
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
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useMyGroupsQuery,
  useChatDetailsQuery,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMembersMutation,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
} = api;
