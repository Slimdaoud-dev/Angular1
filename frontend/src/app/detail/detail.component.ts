import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthorService } from '../services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id:any;
  articles : any;
  constructor(private act : ActivatedRoute , private dataservice : DataService,private _auth:AuthorService) { }

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get("id");
    this.dataservice.getarticlebyid(this.id).subscribe(
      res=>
        {this.articles=res;
          console.log(this.articles)
        }

        )
this._auth.getAutherDataFromToken()
  }



}
