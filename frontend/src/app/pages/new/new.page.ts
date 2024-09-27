import { Component, OnInit } from '@angular/core';
import { TenantsService } from '@frontend/app/services/tenants.service';
import { Tenant } from '@shared/entity/tenant.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  tenant: Tenant = {} as Tenant;

  constructor(private tenantsService: TenantsService) { 
    this.tenantsService.getTenantInfo().subscribe(tenant => {
      this.tenant = tenant;
    });
  }

  ngOnInit() {  }

}