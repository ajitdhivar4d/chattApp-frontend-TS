import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { BiCamera } from "react-icons/bi";
import { bgGradient } from "../constants/color";
import { server } from "../constants/config";
import { useAppDispatch } from "../hooks/hooks";
import { userExists } from "../redux/reducers/auth";

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username,
          password: password,
        },
        config,
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } else {
        toast.error("An unexpected error occurred", {
          id: toastId,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();

    // Append only if avatar is not null
    if (avatar) {
      formData.append("avatar", avatar);
    }

    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("username", username);
    formData.append("password", password);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config,
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } else {
        toast.error("An unexpected error occurred", {
          id: toastId,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // File handler function
  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type and size
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // Example: 5MB max size
        toast.error("File size exceeds 2MB.");
        return;
      }

      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <div className="login-container">
        <div className="shadow-section">
          {isLogin ? (
            <>
              <div className="typography">Login</div>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
                className="login-form"
              >
                {/* Username */}
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className="btn primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Login
                </button>

                <p className="or-text">OR</p>

                <button
                  className="btn secondary"
                  type="button"
                  onClick={toggleLogin}
                  disabled={isLoading}
                >
                  Sign Up Instead
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="typography">Register</div>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
                className="login-form"
              >
                {/* Avatar */}
                <div className="avatar-container">
                  {preview ? (
                    <div className="avatar-section">
                      <img
                        src={preview}
                        alt="Avatar Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="avatar-section">
                      <div className="IconButton">
                        <>
                          <BiCamera />
                          <input
                            style={{
                              width: "80px",
                              cursor: "pointer",
                            }}
                            type="file"
                            accept="image/*"
                            onChange={fileHandler}
                          />
                        </>
                      </div>
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Bio */}
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={bio}
                    required
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                {/* Username */}
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className="btn primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Sign Up
                </button>

                <p className="or-text">OR</p>

                <button
                  className="btn secondary"
                  type="button"
                  onClick={toggleLogin}
                  disabled={isLoading}
                >
                  Login Instead
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
