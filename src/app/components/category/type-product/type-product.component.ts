import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { TypeProductService } from 'src/app/services/type-product.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.css']
})
export class TypeProductComponent implements OnInit {

  typeProducts: any;
  groupId: Number

  constructor(public dialog: MatDialog,
    private typeProductService: TypeProductService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.groupId = Number(this.activatedRoute.snapshot.paramMap.get('groupId'));
    console.log(this.groupId)
    this.typeProductService.getAllTypeProducts(this.groupId).subscribe(
      res => {
        console.log(res)
        this.typeProducts = res
      },
      error => {
        console.log(error)
        this.typeProducts = null;
      }
    )
  }

  // filter
  filter
  key: string = 'typeProductName'; //set default
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
    let typeProductName = await this.opendDialog({tile: 'Thêm loại sản phẩm', name: ''})
    if (typeProductName != null) {
      let typeProduct = { 
        typeProductId: 0,
        typeName: typeProductName,
        groupProductDTO: {
          groupProductId: this.groupId,
          groupName: ""
        }
      }
      this.typeProductService.addTypeProduct(typeProduct)
        .subscribe(
          res => { 
            console.log(res)
            this.ngOnInit()
          }, 
          err => console.log(err))
    }
  }

  async updateTypeProduct(indexItem) {
    let typeProduct = this.typeProducts[indexItem]
    let name = await this.opendDialog({tile: 'Chỉnh sửa loại sản phẩm', name: typeProduct.typeName})
    if (name != null) { 
      typeProduct.typeName = name
      this.typeProductService.updateTypeProduct(typeProduct)
        .subscribe(
          res => { 
            console.log(res)
            this.ngOnInit()
          }, 
          err => console.log(err))
    }
  }

  deleteTypeProduct(typeProductId) {
    Swal.fire({
      title: 'Are you sure delete type product',
      // text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.typeProductService.delteTypeProduct(typeProductId).subscribe(
          res => {
            this.ngOnInit()
            Swal.fire(
              'Deleted!',
              'Type product has been deleted.',
              'success'
            )
        }, error => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Type product is safe',
          'error'
        )
      }
    })
  }
}
