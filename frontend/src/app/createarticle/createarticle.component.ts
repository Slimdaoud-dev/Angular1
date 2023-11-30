import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthorService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {
  article = {
    title: "",
    description: "",
    content: "",
    tags: [] as string[] };

  image: any;

  tag!: string;  // Specify the type as string

  select(e: any) {
    this.image = e.target.files[0];
  }

  constructor(private dataservice: DataService , private _auth : AuthorService,private router : Router) { }

  ngOnInit(): void {
  }

  create() {
    let fd = new FormData();
    fd.append('title', this.article.title);
    fd.append('description', this.article.description);
    fd.append('content', this.article.content);
    fd.append('tags', this.article.tags.toString());
    fd.append('idAuthor', this._auth.getAutherDataFromToken()._id);
    fd.append('image', this.image);

    this.dataservice.create(fd).subscribe(
      res=>{
        this.router.navigate(['/home'])
      }
    )
  }
  addtag(){
    this.article.tags.push(this.tag);
    this.tag='';
  }
}
