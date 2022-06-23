
import SessionStorage from "./session-storage";
import { reactive } from 'vue'

const auth = reactive({
  token: SessionStorage.token,
  logout() {
    this.token = null;
    SessionStorage.token = undefined;
  },
  login(token) {
    this.token = token;
    SessionStorage.token = token;
  }
})

export default auth;