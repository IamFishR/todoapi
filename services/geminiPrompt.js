
class Prompts {
  constructor() {
  }

  async getPromt({ name }) {
    const prompts = {
        'logical': this.taskToPerformWithLogical,
        'chat': this.chatPrompt,
        'task': this.taskToPerform,
        'sms': this.smsAnalysis,
        'hdfcBankSms': this.hdfcBankSmsAnalysis,
    }

    return prompts[name]();
  }

  async taskToPerformWithLogical() {
    // Describe in detail the task you would like model to perform
    return "Summarize this text and provide a logical response like do we have to take all these steps into consideration? If not, which steps are important: ";
  }

  async chatPrompt() {
    return "User is matured man and engineer by profession so make sure to reply by providing valuable content or verified content: ";
  }

  async taskToPerform() {
    return "User have multiple tasks and wanted to add new task provided below, provide the details of the tasks by using below information it should be less than 5: ";
  }

  async smsAnalysis() {
    return "User have received a message, provide the details of the message in json format: ";
  }

  async hdfcBankSmsAnalysis() {
    return `
      Promt: Bank SMS Analysis - HDFC Bank, India
      Consider: Take a look at below requirements before proceeding with the analysis:
      - is the message from HDFC Bank?
      - what is the type of message? alert, auto-pay, credit card, debit card, account balance, loan, EMI, investment, insurance, mutual fund, fixed deposit, recurring deposit, tax, bill payment, cheque, ATM, OTP, UPI, NEFT, RTGS, IMPS, mobile banking, net banking, advertisement, offer, etc.
      - amount mentioned in the message? If yes is it credited or debited? the amount?
      - name of the person or company mentioned in the message? the name?
      - date mentioned in the message? the date?
      - reference number mentioned in the message? the reference number?
      - any other important information mentioned in the message? the information?
      - response should be in json format. start the json with -- { -- and end the json with -- } --
      - use columns like type, amount, name, date, reference, information, account number, etc.

    `
  }
}

module.exports = new Prompts();