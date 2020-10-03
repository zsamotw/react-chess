import MessageStatus from "./message-status.model";

export default interface Message {
  content: string
  status: MessageStatus | undefined
}