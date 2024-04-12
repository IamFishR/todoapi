
class Prompts {
  constructor() {
  }

  async getPromt({ name }) {
    const prompts = {
        'logical': this.taskToPerformWithLogical,
        'chat': this.chatPrompt,
        'task': this.taskToPerform
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
}

module.exports = new Prompts();