export class Employee {
  private static EMPLOYEE_NUMBER = 0;
  private id: number;
  private name: string;
  private lastname: string;
  private role: string;

  constructor(name: string, lastname: string, role: string) {
    this.name = name;
    this.lastname = lastname;
    this.role = role;
    this.id = Employee.EMPLOYEE_NUMBER++;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getLastname(): string {
    return this.lastname;
  }

  getRole(): string {
    return this.role;
  }
}
