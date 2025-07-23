export const setAcccessToken = (value) => {
  localStorage.setItem("access_token", value);
};

export const getAcccessToken = () => {
  return localStorage.getItem("access_token");
};

export const setProfile = (value) => {
  localStorage.setItem("profile", value);
};

export const getProfile = () => {
  // convert string json to object
  try {
    var profile = localStorage.getItem("profile");
    if (profile !== "" && profile !== null && profile !== undefined) {
      return JSON.parse(profile);
    }
    return null;
  } catch (err) {
    console.log("not found profile", err);
    return null;
  }
};

export const setPermission = (array) => {
  localStorage.setItem("permission", array);
};

export const getPermission = () => {
  try {
    //allow permission on any profile
    const profile = getProfile();
    if (profile && (profile.role_name || profile.permission)) {
      if (profile.role_name === 'Admin' || profile.permission === 'all') {
        return { all: true };
      } 
      else {
        return { pos: true, order: true, customer: true };
      }
    }
    // fallback to old permission array if needed
    var permission = localStorage.getItem("permission");
    if (permission !== "" && permission !== null && permission !== undefined) {
      return JSON.parse(permission);
    }
    return null;
  } catch (err) {
    console.log("not found permission", err);
    return null;
  }
};
