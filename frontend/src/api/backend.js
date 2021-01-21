export async function get_posts(token) {
  const resp = await fetch("//127.0.0.1:8000/api/message/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const payload = await resp.json();
  // console.log(payload);

  return payload;
}

export async function create_post(token, text) {
  const resp = await fetch("//127.0.0.1:8000/api/message/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (resp.status !== 201) {
    console.error(resp.status);
    throw new Error("Backend Error");
  }

  return await resp.json();
}

export async function clear_posts(token) {
  const resp = await fetch("//127.0.0.1:8000/api/message/clear/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (resp.status !== 204) {
    console.error(resp.status);
    throw new Error("Backend Error");
  }
}

export async function delete_post(token, id) {
  const resp = await fetch(`//127.0.0.1:8000/api/message/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (resp.status !== 204) {
    console.error(resp.status);
    throw new Error("Backend Error");
  }
}

export async function login_post(username, password) {
  const resp = await fetch("//127.0.0.1:8000/auth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (resp.status !== 200) {
    console.error(resp.status);
    throw new Error("Backend Error");
  }
  return (await resp.json()).access;
}

export async function user_data(token) {
  const resp = await fetch("//127.0.0.1:8000/api/user/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const payload = await resp.json();
  console.log(payload);

  return payload;
}
