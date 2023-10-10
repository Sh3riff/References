import { SESClient, SendEmailCommand, SendTemplatedEmailCommand} from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  credentials: {accessKeyId: process.env.AWS_ACCESS_TOKEN, secretAccessKey: process.env.AWS_SECRET_TOKEN},
  region: "us-east-1"
});


///////////////////////////////////////////////////// Send Email /////////////////////////////////////////////////////
const sendEmailCommand = new SendEmailCommand({
      Source: 'my@email.com',
      Destination: {
        ToAddresses: ['receiver@gmail.com']
      },
      Message: {
        Body: {
          Html: {
            Data: `<html lang="en"><h1>Hi ${name}</h1></html>`,
          },
        },
        Subject: {
          Data: 'New Contact Us Message'
        }
      }
    })

  await sesClient.send(sendEmailCommand)

///////////////////////////////////////////////////// Send Template Email /////////////////////////////////////////////////////

const command = new SendTemplatedEmailCommand({
        Destination: {ToAddresses: ['receiver@gmail.com']},
        Source: 'my@email.com',
        Template: "Welcome-template",
        TemplateData: JSON.stringify(payload)
      })
await sesClient.send(command)



///////////////////////////////////////////////////// Example Template Email Implementation /////////////////////////////////////////////////////

export class Sendmail {
    static async sendCommand (templateName, recipient, payload) {
      const command = new SendTemplatedEmailCommand({
        Destination: {ToAddresses: [recipient]},
        Source: process.env.EMAIL_SOURCE,
        Template: templateName,
        TemplateData: JSON.stringify(payload)
      })
      return await sesClient.send(command)
    }
    //{id, seller, buyer, email, price, title, firstName, paymentLink, description}
    static async newTransaction ({email, ...payload}) {
      return await this.sendCommand('kwiveti-buyer-new-transaction', email, payload)
    }
    // id, seller, firstName, approvalCode, resetLink, email
    static async paymentReceived ({email, ...payload}) {
      return await this.sendCommand('kwiveti-buyer-payment-recieved', email, payload)
    }
    // id, seller, firstName, email
    static async transactionCompleted ({email, ...payload}) {
      return await this.sendCommand('kwiveti-buyer-transaction-completed', email, payload)
    }
    
}
