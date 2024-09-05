import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectMiscState, setIsSearch } from "../../redux/reducers/misc";
import { useState } from "react";
import UserItem from "../shared/UserItem";

const Search = () => {
  const dispatch = useAppDispatch();

  const users = [1, 2, 3, 4];

  const [search, setSearch] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  console.log(search);

  const { isSearch } = useAppSelector(selectMiscState);

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
          {users.map((user, i) => (
            <UserItem key={i} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
