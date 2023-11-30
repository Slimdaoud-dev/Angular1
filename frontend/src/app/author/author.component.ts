import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  id:any;
  author:any;
  articles : any;
  constructor(private act:ActivatedRoute , private _auth :AuthorService,private dataservice : DataService,private router :Router) { }

  ngOnInit(): void {
  this.id = this.act.snapshot.paramMap.get("id");

  this._auth.getAutherById(this.id).subscribe(
    res=>{
      this.author = res;
      console.log(this.author)
    }



  )

  this.dataservice.getByAutherId(this.id).subscribe(
    res=>
      {this.articles=res;
        console.log(this.articles)
      }

      )

  }
  nav(){
    this.router.navigate(['/create'])
  }

}
