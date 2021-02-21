import {Component, OnInit} from '@angular/core';
import {TransferServiceService} from '../transfer-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public data;
  public cachedData;
  public searchVal;
  public formShow = false;
  public firstname;
  public lastname;
  public email;
  public req = false;
  public checked = false;
  public updName: string;
  public updSurname: string;
  public updEmail: string;
  public unique: string;
  public upd = false;

  constructor(private api: TransferServiceService) {
  }

  ngOnInit(): any {
    this.getProducts();
    this.sendSession();
  }

  public getProducts(): void {
    const sess = localStorage.getItem(String(0));
    this.api.apiCall().subscribe((res) => {
      this.data = this.cachedData = res.resource;
      if (sess) {
        this.data = this.cachedData.filter(elem => elem.name.toLowerCase().includes(sess) || elem.surname.toLowerCase().includes(sess));
      }
    });
  }

  public getSession(): void {
    localStorage.setItem(String(0), this.searchVal);
    if (this.searchVal.length > 0) {
      this.data = this.cachedData.filter(elem => elem.name.toLowerCase().includes(this.searchVal)
        || elem.surname.toLowerCase().includes(this.searchVal));
    } else {
      this.getProducts();
    }
  }

  public sendSession(): void {
    if (!localStorage.getItem(String(0))) {
      this.searchVal = '';
    } else {
      this.searchVal = localStorage.getItem(String(0));
    }
  }


  public formHandle(): void {
    this.formShow = !this.formShow;
    this.req = false;
    this.upd = false;
  }

  public addUser(): void {
    if (this.firstname && this.firstname.length >= 1 && this.lastname
      && this.lastname.length >= 1 && this.email && this.email.length >= 1) {
      this.data.unshift({name: this.firstname, surname: this.lastname, email: this.email});
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.formShow = false;
      this.req = false;
    } else {
      this.req = true;
    }
  }

  public delete(name): void {
    this.data = this.data.filter(elem => elem.name !== name);
  }

  public check(): void {
    if (this.checked) {
      for (const data of this.data) {
        data.checked = false;
      }
      this.checked = !this.checked;
    } else {
      for (const data of this.data) {
        data.checked = true;
      }
      this.checked = !this.checked;
    }
  }

  public delChecked(): void {
    if (confirm('Are you sure?')) {
      this.data = this.data.filter(elem => elem.checked === false);
    }
  }

  public change(val): void {
    for (const elem of this.data) {
      if (val === elem.name) {
        elem.checked = !elem.checked;
      }
    }
  }

  public update(val): void {
    this.upd = !this.upd;
    this.formShow = false;
    this.unique = val;
    for (const searchValElement of this.data) {
      if (val === searchValElement.name) {
        this.updName = searchValElement.name;
        this.updSurname = searchValElement.surname;
        this.updEmail = searchValElement.email;
        break;
      }
    }
  }

  public updUser(val): void {
    for (const firstnameElement of this.data) {
      if (this.unique === firstnameElement.name) {
        firstnameElement.name = val.updName;
        firstnameElement.surname = val.updSurname;
        firstnameElement.email = val.updEmail;
      }
    }
    this.updName = this.updSurname = this.updEmail = '';
    this.upd = false;
  }
}


