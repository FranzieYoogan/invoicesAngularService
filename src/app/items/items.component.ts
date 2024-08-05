
import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../invoices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {

  constructor(private invoices: InvoicesService, private router: Router){}

  data:any
  ngOnInit(): void {

    this.invoices.getData().subscribe(config => {
      
      console.log('data',config)

      this.data = config

    });

  }

  showData(item:any) {

    this.invoices.showData(item).subscribe((config:any) => {

      console.log("data sent",config)

    })

    this.router.navigate(['/showdata'])

  }

  edit(item:any) {



    this.invoices.setId(item)
    console.log(this.invoices.getId())

    this.router.navigate(['/edit'])



  }

}
