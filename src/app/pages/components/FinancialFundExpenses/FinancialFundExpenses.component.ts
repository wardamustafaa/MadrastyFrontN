import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { FinancialFundDataService } from 'src/app/layout/services/FinancialFundDataService';

@Component({
	selector: 'kt-financialfund',
	templateUrl: './FinancialFundExpenses.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class FinancialFundComponent implements OnInit {
	public financialfund : any[] = [];

	model = {
		id:0,
		type_name:'',
		price:'',
		date: '',
		notes:'',
	}

	myModel: any = '';
    constructor( private FinancialFundDataService: FinancialFundDataService) {
			
    }
	
	submitForm(){
		alert(this.model.type_name);
		this.FinancialFundDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			
				this.resetForm();
			  },
			  error: (err)=>{
				console.log(err);
			  }
			}
		  )
	}

	resetForm(){
		this.model = {
			id:0,
			type_name:'',
			price:'',
			date: '',
			notes:'',
		 }
	}

	edit(){
        this.FinancialFundDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.financialfund = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.FinancialFundDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getfinancialfund();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getfinancialfund(){

		this.FinancialFundDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.financialfund = result['data'];
		
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getfinancialfund();

		

	}

}
