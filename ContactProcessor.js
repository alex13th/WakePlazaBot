class ContactProcessor {
  constructor(dataAdapter) {
    this._dataAdapter = dataAdapter;

    this.commandHandlers = {};
    this.commandHandlers['contact'] = this.cmdContact;
  }

  proceedCommand(cmd) {
    this.commandHandlers[cmd.name].apply(this, cmd);
  }

  proceedContact(contact) {
    let row = [];
    row.push(contact["user_id"]);
    row.push(contact["first_name"]);
    row.push(contact["phone_number"]);

    this._dataAdapter.deleteReserveRow(0, contact["user_id"]);
    this._dataAdapter.appendReserveRow(row);
  }

  cmdContact() {
    let keyboard;
    let buttons = [];

    buttons.push([{text: strSendContactButton, request_contact: true}]);
    buttons.push([{text: strRefuseContactButton}]);
    keyboard = {keyboard: buttons, one_time_keyboard: true, resize_keyboard: true};

    this.message = {text: getContactText, keyboard: keyboard};
  }
}