import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const matModules: any[] = [
    MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatDialogModule,
    MatFormFieldModule, MatInputModule
  ]
  
  @NgModule({
    imports: matModules,
    exports: matModules
  })
  export class MaterialModule { }