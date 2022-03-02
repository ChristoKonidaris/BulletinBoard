import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import {Post} from '../post.model';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit, OnDestroy{

 posts: Post[] = [];
 userIsAuthenticated = false;
 isLoading = false;
 userId!: string;
 private postsSub: Subscription = new Subscription;
 private authStatusSub!: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService){}

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) =>{
    this.posts = posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId);
    this.isLoading = false;
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
