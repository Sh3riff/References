export class Telegram {
  private botToken: string
  constructor(botToken: string) {
    this.botToken = botToken
  }

  async sendMessage(payload: {
    chat_id: string
    text: string
  }): Promise<messageResponse> {
    return await this.baseJsonRequest('sendMessage', payload)
  }

  async replyMessage(payload: {
    chat_id: string
    message_id: number
    text: string
  }): Promise<replyResponse> {
    const reply_parameters = { message_id: payload.message_id }
    return await this.baseJsonRequest('sendMessage', {
      chat_id: payload.chat_id,
      text: payload.text,
      reply_parameters,
    })
  }

  async sendPhoto(payload: {
    chat_id: string
    base64Image: string
    caption: string
  }): Promise<photoResponse> {
    //
    const base64Data = payload.base64Image.replace(
      /^data:image\/\w+;base64,/,
      '',
    )
    const photo: Buffer<ArrayBuffer> = Buffer.from(base64Data, 'base64')
    const formData = new FormData()
    formData.append('chat_id', payload.chat_id)
    formData.append('photo', new Blob([photo], { type: 'image/png' }))
    formData.append('caption', payload.caption)

    const url = `https://api.telegram.org/bot${this.botToken}/sendPhoto`

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    return await res.json()
  }

  private async baseJsonRequest(method: string, body: any): Promise<any> {
    const url = `https://api.telegram.org/bot${this.botToken}/${method}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return await res.json()
  }
}



type baseResult = {
  message_id: number
  from: TelegramUser
  chat: TelegramChat
  date: number
}

export type messageResponse = {
  ok: true
  result: baseResult & { text: string }
}

export type photoResponse = {
  ok: true
  result: baseResult & {
    photo: Array<TelegramPhoto>
    caption: string
  }
}

export type replyResponse = {
  ok: true
  result: baseResult & {
    message_thread_id: number // id of the message replied
    // reply_to_message: messageResponse.result | photoResponse.result
    text: string
  }
}

type TelegramUser = {
  id: number
  is_bot: boolean
  first_name: string // Bot Name
  username: string // Bot Username
}

type TelegramChat = {
  id: number // groupId
  title: string // group name
  type: 'supergroup'
}

type TelegramPhoto = {
  file_id: string
  file_unique_id: string
  file_size: number
  width: number
  height: number
}
