import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { GroupProductService } from 'src/app/services/group-product.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-group-product',
  templateUrl: './group-product.component.html',
  styleUrls: ['./group-product.component.css']
})
export class GroupProductComponent implements OnInit {

  groupProducts: any;

  constructor(public dialog: MatDialog,
    private groupProductService: GroupProductService) { }


  ngOnInit(): void {
    this.groupProductService.getAllGroupProducts().subscribe(
      res => {
        console.log(res)
        this.groupProducts = res
      },
      error => {
        console.log(error)
        this.groupProducts = null;
      }
    )
  }

  // filter
  filter
  key: string = 'groupProductName'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
  // end filter

  async opendDialog(data): Promise<any> {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '50vw', height: '40vh',
      data: data
    });
    return dialogRef.afterClosed()
      .toPromise()
      .then(result => {
          console.log("The dialog was closed " + result);
          return Promise.resolve(result);
      });
  }

  async createGroupProduct() {
    let groupProductName = await this.opendDialog({tile: 'Thêm nhóm sản phẩm', name: ''})
    if (groupProductName != null) {
      this.groupProductService.addGroupProduct(groupProductName)
        .subscribe(
          res => { 
            console.log(res)
            this.ngOnInit()
          }, 
          err => console.log(err))
    }
  }

  async updateGroupProduct(indexItem) {
    let groupProduct = this.groupProducts[indexItem]
    let name = await this.opendDialog({tile: 'Chỉnh sửa nhóm sản phẩm', name: groupProduct.groupName})
    if (name != null) { 
      groupProduct.groupName = name
      this.groupProductService.updateGroupProduct(groupProduct)
        .subscribe(
          res => { 
            console.log(res)
            this.ngOnInit()
          }, 
          err => console.log(err))
    }
  }

  delteGroupProduct(groupProductId) {
    Swal.fire({
      title: 'Are you sure delete group product',
      // text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.groupProductService.delteGroupProduct(groupProductId).subscribe(
          res => {
            this.ngOnInit()
            Swal.fire(
              'Deleted!',
              'Group product has been deleted.',
              'success'
            )
        }, error => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Group product is safe',
          'error'
        )
      }
    })
  }
}
