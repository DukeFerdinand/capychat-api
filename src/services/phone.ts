import getTwilioClient, {Twilio} from 'twilio'

export class PhoneService {
  private client: Twilio
  private from = process.env.TWILIO_NUMBER

  constructor() {
    if (!process.env.TWILIO_SID || !process.env.TWILIO_TOKEN || !this.from) {
      throw new Error('TWILIO_SID or TWILIO_TOKEN or TWILIO_NUMBER not defined!')
    }

    this.client = getTwilioClient(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  }

  async sendMessage(to: string, message: string): Promise<string> {
    const sent = await this.client.messages.create({
      body: message,
      to,
      from: this.from
    })

    return sent.sid
  }
}