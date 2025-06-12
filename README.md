# 📦 Video Sharing Platform API

API ini terdiri dari 3 modul utama:
- 🎬 Video Management
- 👤 User Management
- 🖼️ Community Posts

## 🔐 Authentication & Token

| Method | Endpoint            | Description                       |
|--------|---------------------|-----------------------------------|
| POST   | `/users/login`      | Login user                        |
| GET    | `/token`            | Refresh token                     |
| DELETE | `/users/logout`     | Logout and revoke token           |

> 🛡️ Middleware:
- `verifyToken`: Validates JWT
- `refreshToken`: Issues a new token
- `checkUserIdMatch`: Ensures the user matches the route param `user_id`

---

## 🎬 Video API

### 🔒 Protected Routes (Require Token)

| Method | Endpoint                                                   | Description                         |
|--------|------------------------------------------------------------|-------------------------------------|
| POST   | `/users/:user_id/videos`                                   | Upload video                        |
| PUT    | `/users/:user_id/videos/:video_id`                         | Update video metadata               |
| POST   | `/users/:user_id/videos/:video_id/thumbnail`              | Upload video thumbnail               |
| PUT    | `/users/:user_id/videos/:video_id/thumbnail`              | Update video thumbnail               |
| DELETE | `/users/:user_id/videos/:video_id/thumbnail`              | Delete video thumbnail               |
| DELETE | `/users/:user_id/videos/:video_id`                         | Delete video                        |

### 🌍 Public Routes

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|-------------------------------------|
| GET    | `/videos`                        | Get all videos                      |
| GET    | `/videos/:video_id`              | Get video by ID                     |
| GET    | `/channels/:slug/profile`        | Get user public profile by slug     |
| GET    | `/channels/:slug/videos`         | Get all videos from channel (slug)  |

---

## 👤 User API

| Method | Endpoint                                      | Description                      |
|--------|-----------------------------------------------|----------------------------------|
| POST   | `/users/register`                             | Register a new user              |
| POST   | `/users/login`                                | Login user                       |
| GET    | `/users/:user_id`                             | Get user data                    |
| DELETE | `/users/:user_id`                             | Delete user                      |
| PUT    | `/users/:user_id/username`                    | Update username                  |

### 🖼️ Profile Picture Management

| Method | Endpoint                                      | Description                      |
|--------|-----------------------------------------------|----------------------------------|
| POST   | `/users/:user_id/profile-picture`             | Upload profile picture           |
| PUT    | `/users/:user_id/profile-picture`             | Update profile picture           |
| DELETE | `/users/:user_id/profile-picture`             | Delete profile picture           |

---

## 🖼️ Community Post API

| Method | Endpoint                          | Description                           |
|--------|-----------------------------------|---------------------------------------|
| POST   | `/photos`                         | Upload community post photo (token)   |
| GET    | `/photos/:photo_id`              | Get post photo by ID                   |
| GET    | `/channels/:slug/community`       | Get community posts by channel slug   |
| DELETE | `/photos/:photo_id`              | Delete photo (only owner, token)       |

---

## 🧾 Middleware yang Digunakan

| Middleware Name           | Fungsi                                                                       |
|---------------------------|------------------------------------------------------------------------------|
| `verifyToken`             | Validasi token JWT                                                           |
| `refreshToken`            | Mengembalikan token baru                                                     |
| `checkUserIdMatch`        | Memastikan `user_id` sesuai dengan user yang login                           |
| `checkVideoOwnership`     | Memastikan video dimiliki oleh user                                          |
| `validateVideoId`         | Validasi ID video                                                            |
| `validateUserId`          | Validasi ID user                                                             | 
| `upload`                  | Multer untuk upload video/file                                               |
| `videoUploadLimiter`      | Membatasi frekuensi upload video                                             |
| `syncVideosWithStorage`   | Sinkronisasi metadata dengan storage/hosting                                 |
| `checkPhotoOwnership`     | Memastikan foto komunitas dimiliki oleh user yang menghapus                  |

---

## 📌 Catatan Tambahan

- Gunakan header:  
