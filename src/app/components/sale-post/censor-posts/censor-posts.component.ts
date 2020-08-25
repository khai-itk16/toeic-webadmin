import { Component, OnInit } from '@angular/core';
import { CensorPostService } from 'src/app/services/censor-post.service';
import { Configure } from 'src/app/configure';

@Component({
  selector: 'app-censor-posts',
  templateUrl: './censor-posts.component.html',
  styleUrls: ['./censor-posts.component.css']
})
export class CensorPostsComponent implements OnInit {

  public censorSalePosts = []
  public config = new Configure()

  constructor(private censorPostService: CensorPostService) { }

  ngOnInit(): void {
    this.censorPostService.getAllCensorPosts().subscribe(
      res => { 
        console.log(res)
        this.censorSalePosts = res
      },
      error => console.log(error)
    )
  }

  public onCensorPost(salePostid) {
    this.censorPostService.censorPost(salePostid).subscribe(
      res => {
        console.log(res)
        this.ngOnInit()
      },
      error => console.log(error)
    )
  }

  public onCancelPost(salePostid) {
    this.censorPostService.deletePost(salePostid).subscribe(
      res => {
        console.log(res)
        this.ngOnInit()
      },
      error => console.log(error)
    )
  }
}
