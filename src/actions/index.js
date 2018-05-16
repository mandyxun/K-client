import axios from "axios";

export const FETCH_PROFILES = "fetch_profiles";
export const FETCH_PROFILE = "fetch_profile";
export const CREATE_PROFILE = "create_profile";
export const DELETE_PROFILE = "delete_profile";

const Profile_URL = 'http://' + window.location.hostname + ':3000/admin';

////GET admin profiles list
export function fetchProfiles() {
  const request = axios.get(`${Profile_URL}/admin-profiles`);

  return {
    type: FETCH_PROFILES,
    payload: request
  };
}

//POST one admin profile
export function createProfile(values, callback) {
  const request = axios
    .post(`${Profile_URL}/admin-profiles`, values)
    .then(() => callback());

  return {
    type: CREATE_PROFILE,
    payload: request
  };
}

//GET one admin profile
export function fetchProfile(id) {
  const request = axios.get(`${Profile_URL}/admin-profiles/${id}`);

  return {
    type: FETCH_PROFILE,
    payload: request
  };
}

export function deleteProfile(id, callback) {
  // eslint-disable-next-line 
  const request = axios.delete(`${Profile_URL}/admin-profiles/${id}`)
    .then(() => callback());

  return {
    type: DELETE_PROFILE,
    payload: id
  };
}