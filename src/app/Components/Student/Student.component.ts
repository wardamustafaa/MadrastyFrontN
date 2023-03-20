import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ClassesDataService } from 'src/app/layout/services/ClassesDataService';
import { DefinitionDataService } from 'src/app/layout/services/Definition';
import { EmployeeDataService } from 'src/app/layout/services/EmployeeDataService';
import { LevelsDataService } from 'src/app/layout/services/LevelsDataService';
import { PhasesDataService } from 'src/app/layout/services/PhasesDataService';
import { SchoolDataService } from 'src/app/layout/services/SchoolDataService';
import { StudentDataService } from 'src/app/layout/services/StudentDataService';

@Component({
	selector: 'kt-Student',
	templateUrl: './Student.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent implements OnInit {
	public students : any[] = [];

	model = {
		id:0,
        StudentName: '',
        StudentCivilianId: 0,
        StudentNationality: '',
        StudentSex: '',
        StudentDob: '',
        StudentAgeYear:0,
        StudentAgeMonth:0,
        StudentAgeDay: 0,
        StudentAcceptanceReason: '',
        StudentReligion: '',
        StudentDistrict:'',
        StudentSchool: '',
        phaseName:'',
		levelName:'',
		className:'',
		branch: '',
        educationalStatus:'',
        student_failure_years:'',
        studentStatus:'',
        BirthCertNo: 0,
        BirthCertSource: '',
        BirthCertDate: '',
        BirthLocation: '',
        GovName:'',

        CityName:'',
        Elkt3a:0,
        Street:'',
        Elgada:0,
        Building:0,
        BuildLevel:0,
        ApartNo:0,
        Phone:0,
        NameInEnglish:'',

        GuardianRelation:'',
        GuardianCivilianId:0,
        GuardMobile:0,
        WorkPhone:0,
        GuardianName:'',
        WorkName:'',
        JobName:'',
        Email:'',
        GuardgovName:'',
        GuardCityName:'',
        GuardKt3a:0,
        GuardStreet:'',
        GuardBuild:0,
        GuardBuildLevel:0,
        GuardPhone:0,

        MotherName:'',
        MotherCivilianId:0,
        MotherNationality:'',
        MotherPhone:0,
        MotherMobile:0,

	}

    sex: any[] =[];
    nat: any[] =[];
    reasons: any[] =[];
    religion: any[] =[];
    region: any[] =[];
    branch: any[] =[];
    school: any[] =[];
    phases: any[] =[];
    levels: any[] =[];
    classes: any[] =[];
    study_status: any[] =[];
    cert_source: any[] =[];
    relation: any[] =[];
    birth_loc: any[] =[];
    government: any[] =[];
    cities: any[] =[];

    constructor( private StudentDataService: StudentDataService, 
        private EmployeeService: EmployeeDataService ,
        private DefinitionDataService: DefinitionDataService,
        private SchoolDataService: SchoolDataService,
        private PhasesDataService: PhasesDataService,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService) {

        this.DefinitionDataService.GetBySCode("sex").subscribe(data => this.sex = data);

        this.DefinitionDataService.GetBySCode("nat").subscribe(data => this.nat = data);

        this.DefinitionDataService.GetBySCode("reasons").subscribe(data => this.reasons = data);

        this.DefinitionDataService.GetBySCode("religion").subscribe(data => this.religion = data);

        this.DefinitionDataService.GetBySCode("region").subscribe(data => this.region = data);

        this.DefinitionDataService.GetBySCode("branch").subscribe(data => this.branch = data);

        this.SchoolDataService.Get().subscribe(data => this.school = data);

        this.PhasesDataService.Get().subscribe(data => this.phases = data);

        this.LevelsDataService.Get().subscribe(data => this.levels = data);

		this.ClassesDataService.Get().subscribe(data => this.classes = data);

        this.DefinitionDataService.GetBySCode("study_status").subscribe(data => this.study_status = data);

		this.DefinitionDataService.GetBySCode("cert_source").subscribe(data => this.cert_source = data);

        this.DefinitionDataService.GetBySCode("birth_loc").subscribe(data => this.birth_loc = data);
        
        this.DefinitionDataService.GetBySCode("government").subscribe(data => this.government = data);
        
        this.DefinitionDataService.GetBySCode("city").subscribe(data => this.cities = data);
        
        this.DefinitionDataService.GetBySCode("relation").subscribe(data => this.relation = data);
    }
	
	submitForm(){
		this.StudentDataService.Save(this.model).subscribe(
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
            StudentName: '',
            StudentCivilianId: 0,
            StudentNationality: '',
            StudentSex: '',
            StudentDob: '',
            StudentAgeYear:0,
            StudentAgeMonth:0,
            StudentAgeDay: 0,
            StudentAcceptanceReason: '',
            StudentReligion: '',
            StudentDistrict:'',
            StudentSchool: '',
            phaseName:'',
            levelName:'',
            className:'',
            branch: '',
            educationalStatus:'',
            student_failure_years:'',
            studentStatus:'',
            BirthCertNo: 0,
            BirthCertSource: '',
            BirthCertDate: '',
            BirthLocation: '',
            GovName:'',

            CityName:'',
            Elkt3a:0,
            Street:'',
            Elgada:0,
            Building:0,
            BuildLevel:0,
            ApartNo:0,
            Phone:0,
            NameInEnglish:'',

            GuardianRelation:'',
            GuardianCivilianId:0,
            GuardMobile:0,
            WorkPhone:0,
            GuardianName:'',
            WorkName:'',
            JobName:'',
            Email:'',
            GuardgovName:'',
            GuardCityName:'',
            GuardKt3a:0,
            GuardStreet:'',
            GuardBuild:0,
            GuardBuildLevel:0,
            GuardPhone:0,

            MotherName:'',
            MotherCivilianId:0,
            MotherNationality:'',
            MotherPhone:0,
            MotherMobile:0,
        }
	}

	
	edit(){
        this.StudentDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.StudentDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getStudents();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getStudents(){

		this.StudentDataService.Get().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.students = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getStudents();

		

	}
}
