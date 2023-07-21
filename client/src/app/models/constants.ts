export interface loginForm {
  email: string;
  password: string;
}
export interface signupForm {
  username: string;
  email: string;
  password: string;
}
export interface message {
  from: string;
  response: string;
}
export interface conversationData {
  name?: string;
  chats: message[];
}
