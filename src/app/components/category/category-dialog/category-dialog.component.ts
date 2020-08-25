import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeProductService } from 'src/app/services/type-product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { containAllBlankCharacter } from 'src/app/common/custom-validator-account';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  formGroup: FormGroup

  constructor(private typeProductService: TypeProductService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
    
  ngOnInit(): void {
    console.log(this.data)
    this.formGroup = this.formBuilder.group({
      name: [this.data.name, [Validators.required,  Validators.maxLength(100), containAllBlankCharacter]],
    });
  }

  get formGroupControl() { return this.formGroup.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    let name = this.formGroup.get("name").value
    console.log(name)
    this.dialogRef.close(name);
  }

}
