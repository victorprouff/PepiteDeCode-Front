import {Component, inject} from '@angular/core';
import { Nugget } from "../../models";
import { AuthenticationService, NuggetService } from "../../services";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RedirectService } from "../../services/redirect.service";

@Component({
  selector: 'app-nuggets-list',
  templateUrl: './nuggets-list.component.html'
})
export class NuggetsListComponent {
  nuggetService = inject(NuggetService)
  redirect = inject(RedirectService)
  authenticationService = inject(AuthenticationService)
  modalService = inject(NgbModal)

  itemsPerPage = 5;
  currentPage = 1;

  nuggets: Nugget[] = [];
  userId: string = '';
  userIsAdmin = false;

  deleteNuggetId = '';
  totalItemsPages = 0;
  nbPage = 0;

  ngOnInit() {
    this.userId = this.authenticationService.GetUserFromToken?.id || ''
    this.userIsAdmin = this.authenticationService.GetUserFromToken?.isAdmin || false;

    this.getNuggets();
  }

  getNuggets() {
    this.nuggetService.getList(this.itemsPerPage, (this.currentPage - 1) * this.itemsPerPage)
        .subscribe(result => {
          this.nuggets = result.nuggets.map( (n) => new Nugget(n.id, n.userId, n.title, n.content, n.urlImage, n.creator, n.createdAt));

          this.totalItemsPages = result.nbOfNuggets
          this.nbPage = this.getNbOfPage(this.totalItemsPages)
        },
        error => {
          console.log("error:", error)
        })
  }

  previousPage() {
    this.currentPage = this.currentPage == 1 ? 1 : this.currentPage - 1;
    this.getNuggets();
  }

  nextPage() {
    this.currentPage = this.currentPage == this.nbPage ? this.nbPage : this.currentPage + 1;
    this.getNuggets();
  }

  update(id: string) {
    this.redirect.toUpdateNugget(id);
  }

  delete() {
    this.nuggetService.delete(this.deleteNuggetId).subscribe(_ =>
    {
      this.ngOnInit();
    });
  }

  open(content:any, nuggetId: string) {
    this.deleteNuggetId = nuggetId;

    this.modalService.open(content).result.then();
  }

  getNbOfPage(nbOfNuggets : number){
    return Math.ceil(nbOfNuggets / this.itemsPerPage);
  }
}
