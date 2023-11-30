import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  articles: any;
 

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.dataservice.getallarticles().subscribe(
      res => {
        this.articles = res;
      }
    );


  }
}
