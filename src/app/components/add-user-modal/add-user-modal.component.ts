import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material';
import * as uuid from 'uuid';
import {User} from '../../shared/models/user.model';

export interface Tag {
  tag: string;
}

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {

  /**
   * Separator keys for tag box
   * @type {number[]}
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * Array of tags
   * @type {Tag[]}
   */
  tags: Tag[] = [];

  /**
   * Form group for new user info fields
   * @type {FormGroup}
   */
  form: FormGroup;

  /**
   * New user info
   * @type {User}
   */
  user: User = new User('', '', null, '', '', '', '', '', '', false,
      null, null, '', '', '', '', [], null);

  /**
   * @ignore
   */
  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddUserModalComponent>) { }

  /**
   * Call on component init
   */
  ngOnInit(): void {
    uuid.v4();
    this.form = this.fb.group({
      name: [],
      age: [],
      balance: [],
      eyeColor: [],
      isActive: new FormControl(),
      picture: [],
      gender: [],
      company: [],
      email: ['', [Validators.required, Validators.email]],
      phone: [],
      address: [],
      about: [],
      tags: [],
      guid: [uuid.v4()],
      id: [Math.random().toString(36).substr(2, 20)]
    });
  }

  /**
   * Save new user and close custom popup
   */
  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  /**
   * Close popup
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Add new tag to tags array and tags array
   * @param {MatChipInputEvent} event
   */
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({tag: value.trim()});
      this.form.controls.tags.setValue(this.tags);
    }

    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove tag from tags array and update tags array
   * @param {tag} tag
   */
  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.form.controls.tags.setValue(this.tags);
    }
  }

}
