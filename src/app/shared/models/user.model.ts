export class User {
  public about: string;
  public address: string;
  public age: number;
  public balance: string;
  public company: string;
  public email: string;
  public eyeColor: string;
  public gender: string;
  public guid: string;
  public isActive: boolean;
  public latitude: number;
  public longitude: number;
  public name: string;
  public phone: string;
  public picture: string;
  public registered: string;
  public tags: string[];
  public _id: number;

  constructor(about: string, address: string, age: number, balance: string, company: string, email: string,
              eyeColor: string, gender: string, guid: string, isActive: boolean, latitude: number, longitude: number,
              name: string, phone: string, picture: string, registered: string, tags: string[], _id: number) {
  this.about = about;
  this.address = address;
  this.age = age;
  this.balance = balance;
  this.company = company;
  this.email = email;
  this.eyeColor = eyeColor;
  this.gender = gender;
  this.guid = guid;
  this.isActive = isActive;
  this.latitude = latitude;
  this.longitude = longitude;
  this.name = name;
  this.phone = phone;
  this.picture = picture;
  this.registered = registered;
  this.tags = tags.slice();
  this._id = _id;
  }
}
