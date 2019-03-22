import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../services/shared/User/user.service';
import {AlertService} from "../../../../../services/shared/Alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../../../../services/portal/Page/page.service";

declare var require: any;

@Component({
  template: require('./page.component.html'),
  styleUrls: ['./page.component.scss']
})


export class PageComponent implements OnInit {
  private pageId : string;
  private pageInformation : object;

  constructor(private pageService: PageService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.pageId = this.route.params['value'].pageId;
    this.pageInformation = await this.pageService.getPage(this.pageId)

  }
}