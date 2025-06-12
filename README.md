📺 Video API
1. Upload Video
POST /users/:user_id/videos

Headers: Authorization: Bearer <token>

Middleware: verifyToken, checkUserIdMatch, videoUploadLimiter, upload

Description: Mengunggah video baru milik user tertentu.

2. Update Video Metadata
PUT /users/:user_id/videos/:video_id

Headers: Authorization: Bearer <token>

Middleware: verifyToken, checkUserIdMatch, checkVideoOwnership

Description: Memperbarui metadata video seperti judul, deskripsi.

3. Upload Thumbnail
POST /users/:user_id/videos/:video_id/thumbnail

Headers: Authorization: Bearer <token>

Middleware: verifyToken, checkUserIdMatch, checkVideoOwnership, validateVideoId

Description: Mengunggah thumbnail untuk video tertentu.

4. Update Thumbnail
PUT /users/:user_id/videos/:video_id/thumbnail

Headers: Authorization: Bearer <token>

Middleware: verifyToken, checkUserIdMatch, checkVideoOwnership, validateVideoId

Description: Memperbarui thumbnail video.

5. Delete Thumbnail
DELETE /users/:user_id/videos/:video_id/thumbnail

Headers: Authorization: Bearer <token>

Middleware: verifyToken, checkUserIdMatch, checkVideoOwnership, validateVideoId

Description: Menghapus thumbnail video.

6. Delete Video
DELETE /users/:user_id/videos/:video_id

Headers: Authorization: Bearer <token>

Middleware: verifyToken, checkUserIdMatch, checkVideoOwnership, validateVideoId

Description: Menghapus video milik user.

7. Get All Videos
GET /videos

Description: Mengambil semua video yang tersedia secara publik.

8. Get Video by ID
GET /videos/:video_id

Middleware: validateVideoId

Description: Mengambil detail dari video berdasarkan ID.

9. Get User Channel by Slug
GET /channels/:slug/profile

Description: Mengambil profil channel berdasarkan slug.

10. Get Videos by Slug
GET /channels/:slug/videos

Description: Mengambil daftar video milik channel berdasarkan slug.

👤 User API
1. Register
POST /users/register

Body: { username, email, password }

Description: Mendaftarkan user baru.

2. Login
POST /users/login

Body: { email, password }

Description: Login dan mendapatkan token.

3. Logout
DELETE /users/logout

Headers: Authorization: Bearer <token>

Middleware: verifyToken

Description: Logout dan menghapus refresh token.

4. Get User by ID
GET /users/:user_id

Description: Mendapatkan detail user berdasarkan ID.

5. Delete User
DELETE /users/:user_id

Headers: Authorization: Bearer <token>

Middleware: verifyToken, checkUserIdMatch

Description: Menghapus user berdasarkan ID.

6. Update Username
PUT /users/:user_id/username

Headers: Authorization: Bearer <token>

Body: { newUsername }

Middleware: verifyToken, checkUserIdMatch

Description: Memperbarui username user.

7. Upload Profile Picture
POST /users/:user_id/profile-picture

Headers: Authorization: Bearer <token>

Description: Mengunggah foto profil.

8. Update Profile Picture
PUT /users/:user_id/profile-picture

Headers: Authorization: Bearer <token>

Description: Memperbarui foto profil.

9. Delete Profile Picture
DELETE /users/:user_id/profile-picture

Headers: Authorization: Bearer <token>

Description: Menghapus foto profil.

10. Refresh Token
GET /token

Description: Mendapatkan access token baru menggunakan refresh token.

📸 Community Post API
1. Upload Community Photo
POST /photos

Headers: Authorization: Bearer <token>

Description: Mengunggah foto komunitas.

2. Get Community Photo by ID
GET /photos/:photo_id

Description: Mengambil foto komunitas berdasarkan ID.

3. Delete Community Photo
DELETE /photos/:photo_id

Headers: Authorization: Bearer <token>

Middleware: checkPhotoOwnership

Description: Menghapus foto komunitas tertentu.

4. Get Community Posts by Channel Slug
GET /channels/:slug/community

Description: Mengambil semua post komunitas dari channel berdasarkan slug.
