import MessageStatus from "./message-status";

export default interface Message {
  content: string
  status: MessageStatus | undefined
}