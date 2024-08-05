import { Component } from '@angular/core';
import { InvoicesService } from '../invoices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private invoices: InvoicesService,
    private router: Router
  ){}

  submit() {

    const description:any = document.getElementById('description')
    const quantity:any = document.getElementById('quantity')
    const price:any = document.getElementById('price')
    const amount:any = document.getElementById('amount')

    const body = {

      description: description.value,
      quantity: quantity.value,
      price: price.value,
      amount: amount.value

    }

    this.invoices.postData(body).subscribe(config => {
      console.log('posted:', config)
    },
  error => console.log('post error', error));

  }

  route() {

    this.router.navigate(['/items'])

  }

}
