import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  SearchUser,
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { selectMiscState, setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  const { isSearch } = useAppSelector(selectMiscState);

  const [searchUser] = useLazySearchUsersQuery();
  const [sendFriendRequest, { isLoading: isLoadingSendFriendRequest }] =
    useSendFriendRequestMutation();

  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<SearchUser[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  console.log(search);

  const addFriendHandler = async (id: string) => {
    try {
      const result = await sendFriendRequest({ userId: id });
      if ("data" in result) {
        toast.success(
          result.data?.message ?? "Friend request sent successfully",
        );
      } else if ("error" in result) {
        if (
          "data" in result.error &&
          result.error.data &&
          typeof result.error.data === "object" &&
          "message" in result.error.data
        ) {
          toast.error(result.error.data.message as string);
        } else {
          toast.error("An error occurred");
        }
      }
    } catch (error) {
      console.error("Failed to send friend request:", error);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser({ name: search })
        .then(({ data }) => setUsers(data?.users || []))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search]);

  return (
    <>
      <div
        style={{ display: isSearch ? "block" : "none" }}
        className="search-dialog-overlay"
        id="dialog-overlay"
        onClick={() => dispatch(setIsSearch(false))}
      ></div>
      <div className="search-dialog-content" id="dialog-content">
        {/* one */}
        <div
          style={{
            fontSize: "20px",
            textAlign: "center",
            padding: "16px 24px",
            fontWeight: "bolder",
          }}
        >
          Find People
        </div>

        {/* two */}
        <div className="searchInput">
          <BiSearch size={24} />
          <input type="text" value={search} onChange={onChangeHandler} />
        </div>

        <ul>
          {users.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
