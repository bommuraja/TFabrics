import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product";
// import { AuthService } from "../../../../shared/services/auth.service";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";

declare var $: any;

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {

  searchText;
  productList: Product[];
  loading = false;
  brands = ["All", "Apple", "Realme", "Nokia", "Motorolla"];

  selectedBrand: "All";

  page = 1;
  constructor(
    // public authService: AuthService,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAllProducts();

   
  }

  getAllProducts() {
    this.loading = true;
    const x = this.productService.getProducts();


    x.snapshotChanges().subscribe(
      (product) => {
        this.loading = false;
        this.productList = [];
        product.forEach((element) => {
          const y = { ...element.payload.toJSON(), $key: element.key };
          this.productList.push(y as Product);
        });
      },
      (err) => {
        this.toastrService.error("Error while fetching Products", err);
      }
    );
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  editProduct(product: Product){
    $("#adminEditProduct #productKey").val(product.$key)[0].dispatchEvent(new Event("input", { bubbles: true }));
    $("#adminEditProduct #productName").val(product.productName)[0].dispatchEvent(new Event("input", { bubbles: true }));
    $("#adminEditProduct #productCategory").val(product.productCategory)[0].dispatchEvent(new Event("input", { bubbles: true }));
    $("#adminEditProduct #productDescription").val(product.productDescription)[0].dispatchEvent(new Event("input", { bubbles: true }));
    $("#adminEditProduct #productPrice").val(product.productPrice)[0].dispatchEvent(new Event("input", { bubbles: true }));
    $("#adminEditProduct #productQuatity").val(product.productQuatity)[0].dispatchEvent(new Event("input", { bubbles: true }));
    $("#adminEditProduct #productSeller").val(product.productSeller)[0].dispatchEvent(new Event("input", { bubbles: true }));
    $("#adminEditProduct #productImageUrl").val(product.productImageUrl)[0].dispatchEvent(new Event("input", { bubbles: true }));
    $("#adminEditProduct").modal("show");
    
    //$("#exampleModalLong product.productName").val('test2');
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

}
