import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../invoices.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import jspdf from 'jspdf';

@Component({
  selector: 'app-showdata',
  standalone: true,
  imports: [],
  templateUrl: './showdata.component.html',
  styleUrl: './showdata.component.scss'
})
export class ShowdataComponent implements OnInit {

  constructor(private invoices: InvoicesService){}

  data:any
  ngOnInit(): void {

    this.invoices.showData2().subscribe((config:any) => {

      console.log(config)
      this.data = config
    })

  }

  generatePdf() {

    const print: any = document.getElementById('containerAll');

    if (print) {
      html2canvas(print, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Calculate the dimensions of the PDF based on the canvas size
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('download.pdf');
      });
    } else {
      console.error('Element with id "containerAll" not found');
    }
  }
}


