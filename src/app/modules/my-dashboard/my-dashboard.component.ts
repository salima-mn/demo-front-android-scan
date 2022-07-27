import { Component, OnInit } from '@angular/core';
import {Color, Label, MultiDataSet} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {ImeiService} from "../../services/imei.service";
import Swal from "sweetalert2";
import {Operation} from "../../models/operation";
import {User} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {OperationService} from "../../services/operation.service";

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {


  //Pour bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: MultiDataSet[] = [];

  barChartData1:any[]=[];

  //Pour doughnut chart
  donutColors = [
    {
      backgroundColor: [
        '#adeebf',
        '#ffda91',
        '#ffacac',
        '#7cff78',
        '#edff66',
        '#56fcff',
      ]
    }
  ];

  doughnutChartLabels: Label[] = ['PUBG', 'Call of Duty', 'Fortnite'];
  doughnutChartData: MultiDataSet = [
    [53, 30, 17]
  ];
  doughnutChartType: ChartType = 'polarArea';

    typeDashboard: string='1';
    typeDashboardOp: string='1';


    doughnutChartLabelsOp: Label[] = ['PUBG', 'Call of Duty', 'Fortnite'];
    doughnutChartDataOp: MultiDataSet = [
        [53, 30, 17]
    ];

    barChartDataOp: MultiDataSet[] = [];
    barChartLabelsOp: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
    operation: Operation=new Operation();
    listUsers: User[]=[];
    searchForm: FormGroup;

    constructor(private imeiService:ImeiService, private fb:FormBuilder, private userService:UserService, private operationService:OperationService) {
        this.searchForm= this.fb.group({
            dateDebut: [
                this.operation.dateOperation, Validators.required
            ],
            name: [
                this.operation.name , Validators.required
            ]
        })
    }

  ngOnInit(): void {
     this.userService.getUsers().subscribe(users =>{
         console.log("users: ",users)
         this.listUsers=users;
     })

      this.search();
     this.switchToDonughtForm();

  }

    justRefresh() {
       console.log("juste refresh dashboard")
    }

    switchToBarForm() {
        this.typeDashboard='2';
        this.barChartLabels=[];
        this.barChartData1=[];
        this.barChartData=[];

        this.imeiService.getGeneralStateIMEI().subscribe((data:any[] ) =>{
            console.log("barChart: ",data)
            if(data.length === 0){
                Swal.fire({
                    text: 'Il y a pas de résultat pour le moment!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                })

            }else{
                for (let i = 0; i < data.length; i++) {
                    this.barChartLabels.push(data[i][1]);
                    this.barChartData.push(data[i][0]);
                }
                if( document.getElementById('refresh') != null)
                document.getElementById('refresh').click();

            }
            console.log("barChartLabels 2 : ",this.barChartLabels)
            console.log("barChartData 2 : ",this.barChartData)
        })
    }

    switchToDonughtForm() {
        this.typeDashboard='1';
        this.doughnutChartLabels= [];
        this.doughnutChartData= [];

        this.imeiService.getGeneralStateIMEI().subscribe((data:any[]) =>{
            console.log("length data: ",data);
            console.log("length data: ",data.length);
            for (let i = 0; i < data.length; i++) {
                this.doughnutChartLabels.push(data[i][1]);
                this.doughnutChartData.push(data[i][0]);
                if( document.getElementById('refresh') != null)
                document.getElementById('refresh').click();
            }

            console.log("Etat doughnutChartData: ",this.doughnutChartLabels)
            console.log("Etat doughnutChartLabels: ",this.doughnutChartData)
        })
    }

    switchToBarFormOp() {
        this.typeDashboardOp='2';
        this.barChartLabelsOp= [];
        this.barChartDataOp= [];

        if(this.listDataOperation.length === 0){
            Swal.fire({
                text: 'Il y a pas de résultat avec ces critéres de recherche!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
            })

        }else{
            for (let i = 0; i < this.listDataOperation.length; i++) {
                this.barChartLabelsOp.push(this.listDataOperation[i][1]);
                this.barChartDataOp.push(this.listDataOperation[i][0]);
            }
            if( document.getElementById('refresh1') != null)
                document.getElementById('refresh1').click();

        }
        console.log("barChartLabels op 2 : ",this.barChartLabelsOp)
        console.log("barChartData op 2 : ",this.barChartDataOp)
    }

    switchToDonughtFormOp() {
        this.typeDashboardOp = '1';
        this.doughnutChartLabelsOp = [];
        this.doughnutChartDataOp = [];

        if(this.listDataOperation.length === 0){
            Swal.fire({
                text: 'Il y a pas de résultat avec ces critéres de recherche!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
            })

        }else{
        for (let i = 0; i < this.listDataOperation.length; i++) {
            this.doughnutChartLabelsOp.push(this.listDataOperation[i][1]);
            this.doughnutChartDataOp.push(this.listDataOperation[i][0]);
            if (document.getElementById('refresh1') != null)
                document.getElementById('refresh1').click();
        }
    }
    }

    justRefresh1() {
        console.log("refreshing of operation Dashboard ...");
    }

    get f(){
        return this.searchForm.controls;
    }

    listDataOperation:any[];

    search() {
        console.log("operation dateDebut: ", this.searchForm.controls.dateDebut.value)
        console.log("operation name: ", this.searchForm.controls.name.value)

        if(this.f.dateDebut.value != null)
        this.operation.dateOperation=this.transformDate(this.f.dateDebut.value);
        this.operation.name=this.f.name.value;

        console.log("operation : ",this.operation)

        this.doughnutChartLabelsOp= [];
        this.doughnutChartDataOp= [];

        this.operationService.getOperations(this.operation).subscribe((data:any[]) =>{
            console.log("data of operation: ",data)
            if(data.length == 0){
                Swal.fire('Warning', 'Il y a pas d\'historiques pour le moment!', 'warning');
            }
            this.listDataOperation=data;
            for (let i = 0; i < data.length; i++) {
                this.doughnutChartLabelsOp.push(data[i][1]);
                this.doughnutChartDataOp.push(data[i][0]);
                if( document.getElementById('refresh1') != null)
                    document.getElementById('refresh1').click();
            }

        })
    }

    transformDate(date: any):string{
        let res:string;
        if(date.day < 10 && date.month < 10) res='0'+date.day+'0-'+date.month+'-'+date.year;

        if(date.day > 10 && date.month < 10) res=date.day+'0-'+date.month+'-'+date.year;

        if(date.day < 10 && date.month > 10) res='0'+date.day+'-'+date.month+'-'+date.year;

        if(date.day > 10 && date.month < 10) res=date.day+'-'+date.month+'-'+date.year;

        return res;

    }
}
