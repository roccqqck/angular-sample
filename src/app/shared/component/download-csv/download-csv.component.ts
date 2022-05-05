import { Component, OnInit } from '@angular/core';
import { DownloadCSVService } from './service/download-csv.service';

@Component({
  selector: 'app-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.css']
})
export class DownloadCSVComponent implements OnInit {

   data:any={
     id:'test',
     model:'testmodel',
     address:'address'
   }
  constructor(private downloadCSVService:DownloadCSVService) { }

  ngOnInit(): void {
  }

  saveAsCSV() {
    this.downloadCSVService.exportToCsv('myCsvDocumentName.csv', this.data);

    // if(this.reportLines.filteredData.length > 0){
    //   const items: CsvData[] = [];

    //   this.reportLines.filteredData.forEach(line => {
    //     let reportDate = new Date(report.date);
    //     let csvLine: CsvData = {
    //       date: `${reportDate.getDate()}/${reportDate.getMonth()+1}/${reportDate.getFullYear()}`,
    //       laborerName: line.laborerName,
    //       machineNumber: line.machineNumber,
    //       machineName: line.machineName,
    //       workingHours: line.hours,
    //       description: line.description
    //     }
    //     items.push(csvLine);
    //   });

    //   this.downloadCSVService.exportToCsv('myCsvDocumentName.csv', items);
    // }
  }
}
