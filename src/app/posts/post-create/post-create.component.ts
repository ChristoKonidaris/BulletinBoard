import { Component, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import{PostsService} from '../posts.service';


@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredPostDescription = "";
  output!: string;
  isLoading = false;


  constructor(public postsService: PostsService, protected sanitizer: DomSanitizer){}

  onAddPost(form: NgForm){
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.postsService.addPost(form.value.enteredTitle, form.value.enteredPostDescription, form.value.creator);
    this.output = (this.sanitizer.sanitize(SecurityContext.HTML, form.value.enteredPostDescription))||"";
    this.isLoading = false;
    form.resetForm();
  }

}
