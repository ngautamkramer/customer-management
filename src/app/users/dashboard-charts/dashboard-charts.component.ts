import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Chart, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, RouterModule, RouterLink, CommonModule, MatSelectModule, MatProgressBarModule],
  templateUrl: './dashboard-charts.component.html',
  styleUrl: './dashboard-charts.component.css',
  providers: [ApiService],
})
export class DashboardChartsComponent {

  yearsList: any = [];
  yearCustomerData: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  selectedYear: number = new Date().getFullYear();
  chatLoaderStatus:boolean = false;

  constructor(private apiService: ApiService){}

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    datasets: [
      { data: this.yearCustomerData, label: 'Customers' },
    ]
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    //console.log(event, active);
  }

  
  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
   // console.log(event, active);
  }


  setDataOnChart(data: any) {
    let sampleData: any = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    let chartSampleData: any = [0,0,0,0,0,0,0,0,0,0,0,0];
    sampleData.forEach((emptyArray: any, index: number) => {
      let searchString = this.selectedYear + '-' + emptyArray;
      let checkArray:any = [];
      data.forEach((cst_data: any) => {
        if(cst_data.created_at.indexOf(searchString) > -1){
          checkArray.push(cst_data);
        }
      });
      chartSampleData[index] = checkArray.length;
    });
    this.barChartData.datasets[0].data = chartSampleData;
    this.chart?.update();
  }


  getAllCustomers(): void {
    let userInfo = this.apiService.getUserInfo(); 
    if(userInfo.user_id){  
      this.chatLoaderStatus = true; 
      this.apiService.getCustomers(userInfo.user_id).subscribe({
        next: (response) => {
          this.chatLoaderStatus = false;
          this.setDataOnChart(response.data);
        },
        error: (error) => {
          this.chatLoaderStatus = false;
          console.error('Error during POST:', error.message);
        }
      });
    }
  }
  

  setAllYearsInDropdown(startYear:number){
    const currentYear = new Date().getFullYear();
    for (let year = startYear; year <= currentYear; year++) {
      this.yearsList.push(year)
    }
    this.yearsList.reverse();
  }


  ngOnInit(): void {
    this.getAllCustomers();
    this.setAllYearsInDropdown(2020);
  }


  onSelectionChange(event: MatSelectChange): void {
    this.selectedYear = event.value;
    this.getAllCustomers();
  }


}
