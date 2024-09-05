import { CSSProperties, useRef } from "react";
import toast from "react-hot-toast";
import { ImImage } from "react-icons/im";
import { MdOutlineAudioFile } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  selectMiscState,
  setIsFileMenu,
  setUploadingLoader,
} from "../../redux/reducers/misc";
import { CiVideoOn } from "react-icons/ci";
import { FiFile } from "react-icons/fi";

interface FileMenuProps {
  anchorEl: HTMLElement | null;
  chatId: string;
}

const FileMenu: React.FC<FileMenuProps> = ({ anchorEl, chatId }) => {
  // /
  const { isFileMenu } = useAppSelector(selectMiscState);
  const dispatch = useAppDispatch();

  const imageRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const closeFileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setIsFileMenu(false));
  };

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const files = Array.from(e.target.files || []);

    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`);

    dispatch(setUploadingLoader(true));
  };

  // Determine positioning based on the anchor element
  const getMenuStyles = (): CSSProperties => {
    if (!anchorEl) return {};

    const rect = anchorEl.getBoundingClientRect();

    return {
      position: "absolute",
      top: rect.top - 180, // Adjust `40` to position the menu above the anchor element
      left: rect.left,
      zIndex: 1100,
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      width: "10rem",
    };
  };

  return (
    <>
      {isFileMenu && anchorEl && (
        <>
          {/* Overlay to close the FileMenu */}
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.1)",
              zIndex: 1000,
              position: "fixed",
              top: 0,
              left: 0,
            }}
            onClick={closeFileMenu}
          ></div>

          <div style={getMenuStyles()} className="fileMenu-container">
            <ul>
              {/* one */}
              <li onClick={selectImage}>
                <div title="Image">
                  <ImImage size={24} />
                </div>
                <div style={{ marginLeft: "0.5rem", fontWeight: "bolder" }}>
                  <span>Image</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/gif"
                  style={{ display: "none" }}
                  onChange={(e) => fileChangeHandler(e, "Images")}
                  ref={imageRef}
                />
              </li>

              {/* two */}
              <li onClick={selectAudio}>
                <div title="Audio">
                  <MdOutlineAudioFile size={24} />
                </div>
                <div style={{ marginLeft: "0.5rem", fontWeight: "bolder" }}>
                  <span>Audio</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="audio/mpeg, audio/wav"
                  style={{ display: "none" }}
                  onChange={(e) => fileChangeHandler(e, "Audios")}
                  ref={audioRef}
                />
              </li>

              {/* three */}
              <li onClick={selectVideo}>
                <div title="Video">
                  <CiVideoOn size={24} />
                </div>
                <div style={{ marginLeft: "0.5rem", fontWeight: "bolder" }}>
                  <span>Video</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="video/mp4, video/webm, video/ogg"
                  style={{ display: "none" }}
                  onChange={(e) => fileChangeHandler(e, "Videos")}
                  ref={videoRef}
                />
              </li>

              {/* Four */}
              <li onClick={selectFile}>
                <div title="File">
                  <FiFile size={24} />
                </div>
                <div style={{ marginLeft: "0.5rem", fontWeight: "bolder" }}>
                  <span>File</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="*"
                  style={{ display: "none" }}
                  onChange={(e) => fileChangeHandler(e, "Files")}
                  ref={fileRef}
                />
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default FileMenu;
