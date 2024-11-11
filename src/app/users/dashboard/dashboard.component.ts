import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmBoxComponent } from '../../dialogbox/confirm-box/confirm-box.component';
import { MatSortModule, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, MatTableModule, MatPaginatorModule, MatButtonModule, RouterModule, CommonModule, MatIconModule, MatTooltipModule, MatButtonModule, MatDialogModule, MatSortModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [ApiService, DatePipe]
})
export class DashboardComponent {

  constructor(private router: Router, private apiService: ApiService, public dialog: MatDialog){

  }

  allInfoData: any = '';
  displayedColumns: string[] = ['id', 'name', 'mobile_number', 'address', 'visit_date', 'created_at', 'star'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  allDataSourceTmp: any;
  userInfo: any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCustomers(): any {
    this.userInfo = this.apiService.getUserInfo(); 
    if(this.userInfo.user_id){   
      this.apiService.getCustomers(this.userInfo.user_id).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.allDataSourceTmp = response.data;
          console.log(response.data);
        },
        error: (error) => {
          console.error('Error during POST:', error.message);
        }
      });
    }
  }
  
  ngOnInit(): void {
    this.getAllCustomers();
  }


  deleteCustomer(customer_id: string) {
    
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '400px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { content: 'Are you sure you want to delete this record?' , title: 'Confirm' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiService.deleteCustomers(this.userInfo.user_id, customer_id).subscribe({
          next: (response) => {
            this.allDataSourceTmp = this.allDataSourceTmp.filter((obj:any) => obj['c_id'] !== customer_id);
            this.dataSource.data = this.allDataSourceTmp;
          },
          error: (error) => {
            console.error('Error during POST:', error.message);
          }
        });
      }else{
        console.log("----- cancel -----");
      }
    });

  }


  sortData(sort: Sort) {

    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'mobile_number':
          return this.compare(a.mobile_number, b.mobile_number, isAsc);
        case 'address':
          return this.compare(a.address, b.address, isAsc);
        case 'visit_date':
          return this.compare(a.visit_date, b.visit_date, isAsc);
        default:
          return 0;
      }
    });

  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
}


export interface PeriodicElement {
  name: string;
  mobile_number: number;
  address: string;
  visit_date: string,
  id: string,
  created_at: string
}
