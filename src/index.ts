import greeter from './greeter';

class Student {
  fullName: string;
  constructor(public firstName: string,
    public middleInitial: string,
    public lastName: string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

let user = new Student("Jane123", "M.", "User");

const greeting = document.getElementById('greeting');
greeting.innerText = greeter(user);
