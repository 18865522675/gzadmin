import { $ } from "./axios";

export default {
  signIn: params => $.post("Hide/signIn", params, { lock: true }),
  signOut: params => $.delete("Hide/signOut", params, { lock: true }),
  get_homeList: params => $.get("Hide/mainPage", params)
};
