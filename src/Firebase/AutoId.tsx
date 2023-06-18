import moment from 'moment';

export class AutoId {
  static newId(): string {
    // Alphanumeric characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    let autoId = '';
    for (let i = 0; i < 5; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    //assert(autoId.length === 20, 'Invalid auto ID: ' + autoId);
    return autoId;
  }

  static newIntId(): string {
    // Alphanumeric characters
    const chars = '0123456789';
    let autoId = '';
    for (let i = 0; i < 5; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    //assert(autoId.length === 20, 'Invalid auto ID: ' + autoId);
    return autoId;
  }

  static staticIdForDate(): string {
    // Alphanumeric characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    let autoId = '';
    for (let i = 0; i < 10; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    //assert(autoId.length === 20, 'Invalid auto ID: ' + autoId);
    return autoId;
  }

  static imageName(): string {
    let imageName = Date.now()
    return imageName + this.staticIdForDate();
  }

  // static convertToTime(timeStr: any) {
  //   var t = new Date(timeStr);
  //   var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);

  //   return this.tConvert(formatted);
  // }

  // static tConvert(time: any) {

  //   time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  //   if (time.length > 1) {
  //     time = time.slice(1);
  //     time[5] = +time[0] < 12 ? ' am' : ' pm';
  //     time[0] = +time[0] % 12 || 12;
  //   }
  //   return time.join('');
  // }
}

