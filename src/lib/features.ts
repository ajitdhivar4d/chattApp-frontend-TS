// /dpr_auto/w_200
export const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};

export const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

  if (fileExt === "mp3" || fileExt === "wav") return "audio";
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

export const getOrSaveFromStorage = ({
  key,
  value,
  get,
}: {
  key: string;
  value?: any;
  get?: boolean;
}) => {
  if (get) return JSON.parse(localStorage.getItem(key) ?? "null");
  else localStorage.setItem(key, JSON.stringify(value));
};
