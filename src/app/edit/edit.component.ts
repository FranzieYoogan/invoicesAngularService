import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from '../invoices.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  constructor(private invoices: InvoicesService, private router: Router){}

  id:any
  submit(event:any) {
    event.preventDefault()

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

    const id = this.invoices.getId()

    this.id = id

    console.log(this.id)

    this.invoices.putData(this.id,body).subscribe((config) => {

      console.log('updated',config)

    })

      this.router.navigate(['/'])

  }

  back() {

      this.router.navigate(['/'])

  }

}
