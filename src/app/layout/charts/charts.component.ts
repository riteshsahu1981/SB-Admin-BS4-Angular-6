import {  Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { GameserviceService } from '../../gameservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})

export class ChartsComponent implements OnInit {
    public mychart = [];
	public years = [];
	public selectedYear : any;
	public gamesReleasesData: any;
	public selectedAge : any;
	public gamesAgeData : any;
	public age=[];
	public genre = [];
	public selectedGenre="Action";
	public gamesGenreData: any;
 
    // Pie
    public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string = 'pie';
 
    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // events
    public chartClicked(e: any): void {
        // console.log(e);
		alert("I am clicked");
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }


    constructor(public gameserviceService: GameserviceService) {
	}

    ngOnInit() {
		this.getSales();//barchart
		this.getYears();
		this.selectedYear=2017;
		this.onYearSelected(this.selectedYear);
		
		this.getAge();
		this.selectedAge=18;
		this.onAgeSelected(this.selectedAge);
		
		this.genre = ["NonGame","Indie","Action","Adventure", "Casual", "Strategy","RPG" ,"Simulation", "EarlyAccess", "FreeToPlay", "Sports", "Racing", "MassivelyMultiplayer" ];
		this.onGenreSelected(this.selectedGenre);
	}
	
	getYears(){
		this.gameserviceService.getYears().subscribe((data: {}) => {
			
			for ( let  key in data){
				this.years[key]=data[key].ReleaseYear;				
			}
			 
		});
	}
	onYearSelected(val:any){
		this.gameserviceService.getGamesReleases(val).subscribe((data: {}) => {
			console.log(data);
			this.gamesReleasesData=data
		});
	}
	getAge(){
		this.gameserviceService.getAge().subscribe((data: {}) => {
			for ( let  key in data){
				this.age[key]=data[key].RequiredAge;				
			} 
		});
	}
	
	onAgeSelected(val:any){
		this.gameserviceService.getGamesAge(val).subscribe((data: {}) => {
			console.log(data);
			this.gamesAgeData=data
		});
	}
	
	onGenreSelected(val:any){
		this.gameserviceService.getGamesGenre(val).subscribe((data: {}) => {
			console.log(data);
			this.gamesGenreData=data
		});
	}
	
	getSales() {
		this.gameserviceService.getSales().subscribe((salesdata: {}) => {
			let salecount: any=[];
			let salelable: any=[];
			for ( let  key in salesdata){
				salecount[key]=salesdata[key].total_sales;
				salelable[key]=salesdata[key].publisher.substring(0,10);
				
			}
			this.mychart = new Chart("canvas", {
				type: 'bar',
				data: {
					labels: salelable,
					datasets: [
						{
							label: "Game wise sales chart",
							data:salecount,
							backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)'
							],
							borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)'
							],
							borderWidth: 1
						}
					]
				},
				options: {
					scales: {
						xAxes : [{
							display: true
						}],
						yAxes: [{
							ticks: {
								beginAtZero:true
							},
							display: true
						}]
					},
					legend: {display:false}
				}
				
			});
		});	 
	}
}
//https://www.youtube.com/watch?v=RTzi5DS7On4 