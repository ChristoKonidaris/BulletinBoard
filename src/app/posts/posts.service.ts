import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import{Post} from './post.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router){}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData)=>{
        return postData.posts.map((post: { title: any; content: any; _id: any; creator: any; }) =>{
          return{
            title: post.title,
            content: post.content,
            id: post._id,
            creator: post.creator
          }
        });
      }))
      .subscribe((transformedPosts)=>{
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, creator: string){
    const post: Post = {id: "", title:title, content: content, creator: creator };
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData)=>{
    const id = responseData.postId;
    post.id = id;
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
    this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(()=>{
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
