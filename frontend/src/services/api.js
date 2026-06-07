export const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    credentials: "include", // send cookies (JWT token from backend)
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    // ignore JSON parse errors
  }

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const authApi = {
  register(payload) {
    // { name, email, password }
    return request("/api/v1/auth/register", {
      method: "POST",
      body: payload,
    });
  },

  verifyOtp(payload) {
    // { email, otp }
    return request("/api/v1/auth/verify-otp", {
      method: "POST",
      body: payload,
    });
  },

  login(payload) {
    // { email, password }
    return request("/api/v1/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  logout() {
    return request("/api/v1/auth/logout", {
      method: "POST",
    });
  },

  updatePassword(payload) {
    return request("/api/v1/auth/password/update", {
      method: "PUT",
      body: payload,
    });
  },

  forgetPassword(payload) {
    // payload: { email }
    return request("/api/v1/auth/password/forget", {
      method: "POST",
      body: payload,
    });
  },

  resetPassword(token, payload) {
    // token from reset link, payload: { password, confirmPassword }
    return request(`/api/v1/auth/password/reset/${token}`, {
      method: "PUT",
      body: payload,
    });
  },

  me() {
    return request("/api/v1/auth/me");
  },
};

export const bookApi = {
  getAll() {
    return request("/api/v1/book/all");
  },
  get(id) {
    return request(`/api/v1/book/${id}`);
  },
  add(payload) {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("author", payload.author);
    formData.append("description", payload.description);
    formData.append("price", payload.price);
    formData.append("quantity", payload.quantity);
    if (payload.coverFile) {
      formData.append("cover", payload.coverFile);
    }
    return request("/api/v1/book/admin/add", {
      method: "POST",
      body: formData,
    });
  },
  update(id, payload) {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("author", payload.author);
    formData.append("description", payload.description);
    formData.append("price", payload.price);
    formData.append("quantity", payload.quantity);
    if (payload.coverFile) {
      formData.append("cover", payload.coverFile);
    }
    return request(`/api/v1/book/admin/update/${id}`, {
      method: "PUT",
      body: formData,
    });
  },
  delete(id) {
    return request(`/api/v1/book/delete/${id}`, { method: "DELETE" });
  },
};

export const borrowApi = {
  recordBorrow(id, payload) {
    // payload: { email }
    return request(`/api/v1/borrow/record-borrow-book/${id}`, {
      method: "POST",
      body: payload,
    });
  },
  requestBorrow(id) {
    return request(`/api/v1/borrow/request/${id}`, { method: "POST" });
  },
  getRequests() {
    return request("/api/v1/borrow/requests");
  },
  approveRequest(requestId) {
    return request(`/api/v1/borrow/requests/${requestId}/approve`, {
      method: "PUT",
    });
  },
  declineRequest(requestId, payload = {}) {
    return request(`/api/v1/borrow/requests/${requestId}/decline`, {
      method: "PUT",
      body: payload,
    });
  },
  myBorrowed() {
    return request("/api/v1/borrow/my-borrowed-books");
  },
  adminBorrowedList() {
    return request("/api/v1/borrow/borrowed-books-by-users");
  },
  returnBook(bookId, payload) {
    // payload: { email }
    return request(`/api/v1/borrow/return-borrowed-book/${bookId}`, {
      method: "PUT",
      body: payload,
    });
  },
};

export const userApi = {
  getAll() {
    return request("/api/v1/user/all");
  },
  updateRole(id, role) {
    return request(`/api/v1/user/role/${id}`, {
      method: "PUT",
      body: { role },
    });
  },
  toggleStatus(id, isActive) {
    return request(`/api/v1/user/status/${id}`, {
      method: "PUT",
      body: { isActive },
    });
  },
  async addAdmin({ name, email, password, avatarFile }) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/user/add/new-admin`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok || data.success === false) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  },
};
