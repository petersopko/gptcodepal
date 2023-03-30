export interface InputStorage {
  inputText: string
  codeInputs: string[]
}

export interface Message {
  role: string
  content: string
}

export interface Chat {
  messages: Message[]
  tokenCount: number
}
